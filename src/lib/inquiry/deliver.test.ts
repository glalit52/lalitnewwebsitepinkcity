import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { deliverInquiry, formatInquiryEmail } from "./deliver";

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
    });

    it("delivers via Webhook when INQUIRY_WEBHOOK_URL is set", async () => {
      delete process.env.RESEND_API_KEY;
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
    });
  });
});
