import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Deliver } from "./deliver";
import { processInquiry } from "./process";
import { resetRateLimit } from "./rate-limit";

function form(fields: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

const validInvite = {
  name: "Asha Rao",
  email: "asha@example.org",
  event: "Climate Summit, IIT Delhi",
  when: "March 2027, Delhi",
  message: "A keynote on AI for sustainable agriculture.",
};

const ok: Deliver = async () => ({ ok: true, mode: "webhook" });

describe("processInquiry", () => {
  beforeEach(() => resetRateLimit());

  it("delivers a valid speaking invitation", async () => {
    const deliver = vi.fn(ok);
    const state = await processInquiry("speaking", form(validInvite), { deliver, clientKey: "a" });
    expect(state.status).toBe("success");
    expect(deliver).toHaveBeenCalledWith("speaking", validInvite);
  });

  it("returns field errors and keeps values when invalid", async () => {
    const deliver = vi.fn(ok);
    const state = await processInquiry(
      "speaking",
      form({ ...validInvite, name: "   ", email: "not-an-email", message: "hi" }),
      { deliver, clientKey: "b" },
    );
    expect(deliver).not.toHaveBeenCalled();
    expect(state.status).toBe("error");
    if (state.status !== "error") return;
    expect(state.fieldErrors).toMatchObject({
      name: "Your name is required.",
      email: "Enter a valid email address.",
      message: expect.stringContaining("at least 10"),
    });
    expect(state.values?.event).toBe(validInvite.event);
  });

  it("treats the optional date field as optional", async () => {
    const deliver = vi.fn(ok);
    const state = await processInquiry("speaking", form({ ...validInvite, when: "" }), { deliver, clientKey: "c" });
    expect(state.status).toBe("success");
    expect(deliver.mock.calls[0][1]).not.toHaveProperty("when", "");
  });

  it("silently drops honeypot submissions", async () => {
    const deliver = vi.fn(ok);
    const state = await processInquiry("speaking", form({ ...validInvite, website: "spam.example" }), {
      deliver,
      clientKey: "d",
    });
    expect(state.status).toBe("success");
    expect(deliver).not.toHaveBeenCalled();
  });

  it("validates call requests against the known services", async () => {
    const deliver = vi.fn(ok);
    const bad = await processInquiry("call", form({ service: "free-lunch", name: "A", email: "a@b.co", topic: "Fundraising plan" }), {
      deliver,
      clientKey: "e",
    });
    expect(bad.status).toBe("error");
    const good = await processInquiry("call", form({ service: "deep-dive", name: "A", email: "a@b.co", topic: "Fundraising plan" }), {
      deliver,
      clientKey: "e",
    });
    expect(good.status).toBe("success");
  });

  it("reports an honest error when delivery is not configured or fails", async () => {
    const notConfigured: Deliver = async () => ({ ok: false, reason: "not-configured" });
    const failed: Deliver = async () => ({ ok: false, reason: "failed" });
    const a = await processInquiry("speaking", form(validInvite), { deliver: notConfigured, clientKey: "f" });
    const b = await processInquiry("speaking", form(validInvite), { deliver: failed, clientKey: "g" });
    expect(a).toMatchObject({ status: "error", message: expect.stringContaining("aren’t available") });
    expect(b).toMatchObject({ status: "error", message: expect.stringContaining("try again") });
  });

  it("rate-limits repeated submissions per client", async () => {
    const deliver = vi.fn(ok);
    let last;
    for (let i = 0; i < 6; i++) last = await processInquiry("speaking", form(validInvite), { deliver, clientKey: "h" });
    expect(deliver).toHaveBeenCalledTimes(5);
    expect(last).toMatchObject({ status: "error", message: expect.stringContaining("Too many") });
  });

  it("labels development-mode deliveries so the UI does not overstate success", async () => {
    const dev: Deliver = async () => ({ ok: true, mode: "dev-log" });
    const state = await processInquiry("call", form({ service: "mini", name: "A", email: "a@b.co", topic: "Hello there!" }), {
      deliver: dev,
      clientKey: "i",
    });
    expect(state).toMatchObject({ status: "success", message: expect.stringContaining("Development mode") });
  });
});
