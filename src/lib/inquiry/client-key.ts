/** Best-effort client IP for rate limiting, from the usual proxy headers. */
export function clientKeyFrom(h: Headers): string {
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    h.get("cf-connecting-ip")?.trim() ||
    h.get("x-real-ip")?.trim() ||
    h.get("x-client-ip")?.trim() ||
    "unknown"
  );
}
