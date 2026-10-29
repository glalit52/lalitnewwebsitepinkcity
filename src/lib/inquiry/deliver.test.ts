import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { DEFAULT_INBOX_EMAILS, deliverInquiry, formatInquiryEmail, parseInboxEmails } from "./deliver";

describe("deliverInquiry and formatInquiryEmail", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    process.env = originalEnv;
  });

  describe("parseInboxEmails", () => {
    it("defaults to both client inboxes when unset or blank", () => {
      expect(DEFAULT_INBOX_EMAILS).toEqual(["lalit@sensegrass.com", "glalit52@gmail.com"]);
      expect(parseInboxEmails(undefined)).toEqual(["lalit@sensegrass.com", "glalit52@gmail.com"]);
      expect(parseInboxEmails("  ")).toEqual(["lalit@sensegrass.com", "glalit52@gmail.com"]);
    });

    it("splits a comma-separated list, trimming, de-duplicating and dropping invalid entries", () => {
      expect(parseInboxEmails(" a@one.com, b@two.org ,A@one.com,not-an-email,, c@three.io ")).toEqual([
        "a@one.com",
        "b@two.org",
        "c@three.io",
      ]);
    });

    it("falls back to the defaults when every entry is invalid", () => {
      expect(parseInboxEmails("nope, also nope")).toEqual([...DEFAULT_INBOX_EMAILS]);
    });
  });

  describe("formatInquiryEmail", () => {
    it("formats speaking invitation email with proper headers and reply-to", () => {
      const email = formatInquiryEmail(
        "speaking",
        {
          name: "John Doe",
          email: "john@example.com",
          event: "Tech Summit",
          when: "Nov 2026",
          message: "Would love you to speak about AI and soil intelligence.",
        },
        "lalit@sensegrass.com",
      );

      expect(email.subject).toContain("Tech Summit");
      expect(email.subject).toContain("John Doe");
      expect(email.replyTo).toBe("john@example.com");
      expect(email.plainText).toContain("Tech Summit");
      expect(email.plainText).toContain("Would love you to speak");
      expect(email.html).toContain("lalit@sensegrass.com");
      expect(email.html).toContain("john@example.com");
    });

    it("formats call request email with service details", () => {
      const email = formatInquiryEmail(
        "call",
        {
          name: "Jane Smith",
          email: "jane@startup.com",
          service: "deep-dive",
          topic: "Scaling to European markets.",
        },
        "lalit@sensegrass.com",
      );

      expect(email.subject).toContain("Jane Smith");
      expect(email.subject).toContain("DEEP-DIVE");
      expect(email.replyTo).toBe("jane@startup.com");
      expect(email.plainText).toContain("Scaling to European markets");
    });

    it("lists every recipient in the routing line", () => {
      const email = formatInquiryEmail(
        "call",
        { name: "Jane", email: "jane@startup.com", service: "mini", topic: "Hi" },
        ["lalit@sensegrass.com", "glalit52@gmail.com"],
      );
      expect(email.html).toContain("Routing to <strong>lalit@sensegrass.com, glalit52@gmail.com</strong>");
    });
  });

  describe("deliverInquiry routing", () => {
    it("returns dev-log mode when no credentials are set in development", async () => {
      delete process.env.RESEND_API_KEY;
      delete process.env.INQUIRY_WEBHOOK_URL;
      vi.stubEnv("NODE_ENV", "development");

      const res = await deliverInquiry("speaking", { name: "Test", email: "test@co.com", event: "E", message: "M" });
      expect(res).toEqual({ ok: true, mode: "dev-log" });
    });

    it("returns not-configured in production when neither key nor webhook is set", async () => {
      delete process.env.RESEND_API_KEY;
      delete process.env.INQUIRY_WEBHOOK_URL;
      vi.stubEnv("NODE_ENV", "production");

      const res = await deliverInquiry("speaking", { name: "Test", email: "test@co.com", event: "E", message: "M" });
      expect(res).toEqual({ ok: false, reason: "not-configured" });
    });

    it("delivers directly via Resend when RESEND_API_KEY is present", async () => {
      process.env.RESEND_API_KEY = "re_test_12345";
      delete process.env.INQUIRY_WEBHOOK_URL;
      delete process.env.INQUIRY_INBOX_EMAIL;

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ id: "email-123" }),
      });
      global.fetch = mockFetch;

      const res = await deliverInquiry("call", {
        name: "Founder",
        email: "founder@co.com",
        service: "standard",
        topic: "Fundraising",
      });

      expect(res).toEqual({ ok: true, mode: "email" });
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.resend.com/emails",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: "Bearer re_test_12345",
          }),
        }),
      );
      const bodies = mockFetch.mock.calls.map((c) => JSON.parse(c[1].body as string));
      expect(bodies.map((b) => b.to)).toEqual([["lalit@sensegrass.com"], ["glalit52@gmail.com"]]);
      expect(bodies.every((b) => b.reply_to === "founder@co.com")).toBe(true);
    });

    it("sends to every address in a comma-separated INQUIRY_INBOX_EMAIL", async () => {
      process.env.RESEND_API_KEY = "re_test_12345";
      process.env.INQUIRY_INBOX_EMAIL = "first@example.com, second@example.com";
      delete process.env.INQUIRY_WEBHOOK_URL;

      const mockFetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: "email-456" }) });
      global.fetch = mockFetch;

      const res = await deliverInquiry("call", { name: "F", email: "f@co.com", service: "mini", topic: "T" });

      expect(res).toEqual({ ok: true, mode: "email" });
      const bodies = mockFetch.mock.calls.map((c) => JSON.parse(c[1].body as string));
      expect(bodies.map((b) => b.to)).toEqual([["first@example.com"], ["second@example.com"]]);
    });

    it("still succeeds when Resend rejects one inbox (e.g. sandbox sender)", async () => {
      process.env.RESEND_API_KEY = "re_test_12345";
      delete process.env.INQUIRY_INBOX_EMAIL;
      delete process.env.INQUIRY_WEBHOOK_URL;
      vi.spyOn(console, "error").mockImplementation(() => {});

      const mockFetch = vi
        .fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ id: "email-789" }) })
        .mockResolvedValueOnce({ ok: false, status: 403, text: async () => "testing emails only" });
      global.fetch = mockFetch;

      const res = await deliverInquiry("call", { name: "F", email: "f@co.com", service: "mini", topic: "T" });

      expect(res).toEqual({ ok: true, mode: "email" });
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it("fails when Resend rejects every inbox and no webhook is set", async () => {
      process.env.RESEND_API_KEY = "re_test_12345";
      delete process.env.INQUIRY_INBOX_EMAIL;
      delete process.env.INQUIRY_WEBHOOK_URL;
      vi.spyOn(console, "error").mockImplementation(() => {});

      global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 403, text: async () => "forbidden" });

      const res = await deliverInquiry("call", { name: "F", email: "f@co.com", service: "mini", topic: "T" });

      expect(res).toEqual({ ok: false, reason: "failed" });
    });

    it("delivers via Webhook when INQUIRY_WEBHOOK_URL is set", async () => {
      delete process.env.RESEND_API_KEY;
      delete process.env.INQUIRY_INBOX_EMAIL;
      process.env.INQUIRY_WEBHOOK_URL = "https://hooks.zapier.com/test";

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
      });
      global.fetch = mockFetch;

      const res = await deliverInquiry("speaking", {
        name: "Speaker",
        email: "speaker@event.com",
        event: "TEDx",
        message: "Keynote",
      });

      expect(res).toEqual({ ok: true, mode: "webhook" });
      expect(mockFetch).toHaveBeenCalledWith(
        "https://hooks.zapier.com/test",
        expect.objectContaining({
          method: "POST",
        }),
      );
      const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
      expect(body.recipients).toEqual(["lalit@sensegrass.com", "glalit52@gmail.com"]);
      expect(body.recipient).toBe("lalit@sensegrass.com, glalit52@gmail.com");
    });
  });
});
