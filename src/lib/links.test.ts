import { describe, expect, it } from "vitest";
import { safeExternalUrl } from "./links";

describe("safeExternalUrl", () => {
  it("accepts http(s) URLs", () => {
    expect(safeExternalUrl("https://topmate.io/someone")).toBe("https://topmate.io/someone");
  });
  it("rejects empty, malformed and non-http values", () => {
    expect(safeExternalUrl(undefined)).toBeNull();
    expect(safeExternalUrl("")).toBeNull();
    expect(safeExternalUrl("[LINKEDIN URL]")).toBeNull();
    expect(safeExternalUrl("javascript:alert(1)")).toBeNull();
  });
});
