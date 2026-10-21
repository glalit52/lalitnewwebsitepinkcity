import { describe, expect, it } from "vitest";
import { callRequestSchema, speakingInviteSchema } from "./schema";

describe("inquiry schemas", () => {
  describe("speakingInviteSchema", () => {
    it("accepts a complete valid speaking invite", () => {
      const parsed = speakingInviteSchema.safeParse({
        name: "Dr. Anand Sharma",
        email: "anand@university.edu",
        event: "Global AI Summit",
        when: "October 2027, Tokyo",
        message: "Keynote lecture on AI and climate resilience.",
      });
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.name).toBe("Dr. Anand Sharma");
        expect(parsed.data.when).toBe("October 2027, Tokyo");
      }
    });

    it("transforms empty optional date to undefined", () => {
      const parsed = speakingInviteSchema.safeParse({
        name: "Sara Lee",
        email: "sara@corp.com",
        event: "Annual Forum",
        when: "",
        message: "Looking for an inspirational talk on entrepreneurship.",
      });
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.when).toBeUndefined();
      }
    });

    it("rejects invalid emails and short messages", () => {
      const invalidEmail = speakingInviteSchema.safeParse({
        name: "Test",
        email: "not-an-email",
        event: "Event",
        message: "A talk on startups.",
      });
      expect(invalidEmail.success).toBe(false);

      const shortMsg = speakingInviteSchema.safeParse({
        name: "Test",
        email: "test@example.com",
        event: "Event",
        message: "Short",
      });
      expect(shortMsg.success).toBe(false);
    });

    it("rejects whitespace-only names", () => {
      const result = speakingInviteSchema.safeParse({
        name: "   ",
        email: "test@example.com",
        event: "Event",
        message: "A meaningful keynote invitation description.",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("callRequestSchema", () => {
    it("accepts valid services (mini, standard, deep-dive)", () => {
      for (const service of ["mini", "standard", "deep-dive"] as const) {
        const parsed = callRequestSchema.safeParse({
          service,
          name: "Rohan Patel",
          email: "rohan@startup.io",
          topic: "Discussing Series A fundraising and market expansion.",
        });
        expect(parsed.success).toBe(true);
      }
    });

    it("rejects unknown call services", () => {
      const parsed = callRequestSchema.safeParse({
        service: "coffee-chat",
        name: "Rohan",
        email: "rohan@startup.io",
        topic: "General catchup on startups and life.",
      });
      expect(parsed.success).toBe(false);
    });

    it("requires topic to be at least 10 characters", () => {
      const parsed = callRequestSchema.safeParse({
        service: "mini",
        name: "Rohan",
        email: "rohan@startup.io",
        topic: "Hi there",
      });
      expect(parsed.success).toBe(false);
    });
  });
});
