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

describe("getSocialLinks", () => {
  it("includes default email contact link", async () => {
    const { getSocialLinks } = await import("./links");
    const links = getSocialLinks();
    const emailLink = links.find((l) => l.name === "Email");
    expect(emailLink).toBeDefined();
    expect(emailLink?.url).toBe("mailto:lalit@sensegrass.com");
  });
});
