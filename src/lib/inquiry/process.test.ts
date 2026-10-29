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

  describe("with a store (MongoDB)", () => {
    function fakeStore(saveResult: { ok: true; id: string } | { ok: false; reason: "not-configured" | "failed" }) {
      return { save: vi.fn(async () => saveResult), markDelivery: vi.fn(async () => {}) };
    }

    it("saves, emails, records the delivery and returns the id", async () => {
      const store = fakeStore({ ok: true, id: "abc123" });
      const deliver = vi.fn(ok);
      const state = await processInquiry("speaking", form(validInvite), { deliver, store, clientKey: "s1" });
      expect(state).toMatchObject({ status: "success", id: "abc123" });
      expect(store.save).toHaveBeenCalledWith("speaking", validInvite, expect.objectContaining({ clientKey: "s1" }));
      expect(store.markDelivery).toHaveBeenCalledWith("abc123", { ok: true, mode: "webhook" });
    });

    it("still succeeds when saved but the email fails", async () => {
      const store = fakeStore({ ok: true, id: "abc124" });
      const deliver = vi.fn(async () => ({ ok: false as const, reason: "failed" as const }));
      const state = await processInquiry("speaking", form(validInvite), { deliver, store, clientKey: "s2" });
      expect(state.status).toBe("success");
      expect(store.markDelivery).toHaveBeenCalledWith("abc124", { ok: false, reason: "failed" });
    });

    it("still succeeds when emailed but the save fails", async () => {
      const store = fakeStore({ ok: false, reason: "failed" });
      const state = await processInquiry("speaking", form(validInvite), { deliver: vi.fn(ok), store, clientKey: "s3" });
      expect(state.status).toBe("success");
      expect(store.markDelivery).not.toHaveBeenCalled();
    });

    it("fails with code 'failed' when both save and email fail", async () => {
      const store = fakeStore({ ok: false, reason: "failed" });
      const deliver = vi.fn(async () => ({ ok: false as const, reason: "failed" as const }));
      const state = await processInquiry("speaking", form(validInvite), { deliver, store, clientKey: "s4" });
      expect(state).toMatchObject({ status: "error", code: "failed" });
    });

    it("reports 'unavailable' when neither database nor email is configured", async () => {
      const store = fakeStore({ ok: false, reason: "not-configured" });
      const deliver = vi.fn(async () => ({ ok: false as const, reason: "not-configured" as const }));
      const state = await processInquiry("speaking", form(validInvite), { deliver, store, clientKey: "s5" });
      expect(state).toMatchObject({ status: "error", code: "unavailable" });
    });
  });
});
