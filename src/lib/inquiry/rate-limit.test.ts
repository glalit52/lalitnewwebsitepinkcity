import { beforeEach, describe, expect, it } from "vitest";
import { isRateLimited, resetRateLimit } from "./rate-limit";

describe("rate-limit", () => {
  beforeEach(() => {
    resetRateLimit();
  });

  it("permits initial requests up to MAX_PER_WINDOW (5)", () => {
    const key = "client-1";
    const start = 1_000_000;

    for (let i = 1; i <= 5; i++) {
      expect(isRateLimited(key, start + i * 1000)).toBe(false);
    }

    // 6th request within the window should be blocked
    expect(isRateLimited(key, start + 6000)).toBe(true);
  });

  it("resets counter after window expires", () => {
    const key = "client-2";
    const start = 1_000_000;
    const windowMs = 10 * 60 * 1000;

    for (let i = 0; i < 5; i++) {
      isRateLimited(key, start);
    }
    expect(isRateLimited(key, start + 100)).toBe(true);

    // After window expires, request should be allowed again
    expect(isRateLimited(key, start + windowMs + 1)).toBe(false);
  });

  it("clears entries via resetRateLimit", () => {
    const key = "client-3";
    for (let i = 0; i < 6; i++) {
      isRateLimited(key);
    }
    expect(isRateLimited(key)).toBe(true);

    resetRateLimit();
    expect(isRateLimited(key)).toBe(false);
  });

  it("evicts expired entries when map grows large", () => {
    const now = 2_000_000;
    // Pre-populate with expired entries
    for (let i = 0; i < 5001; i++) {
      isRateLimited(`old-key-${i}`, now - 20 * 60 * 1000);
    }
    // Calling for a new key triggers eviction loop
    expect(isRateLimited("fresh-key", now)).toBe(false);
  });
});
