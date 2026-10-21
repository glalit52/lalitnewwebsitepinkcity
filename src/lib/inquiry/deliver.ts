import "server-only";
import type { InquiryKind } from "./schema";

export type DeliveryResult =
  | { ok: true; mode: "webhook" | "dev-log" }
  | { ok: false; reason: "not-configured" | "failed" };

export type Deliver = (kind: InquiryKind, payload: Record<string, unknown>) => Promise<DeliveryResult>;

/**
 * Integration boundary for form submissions.
 *
 * Production: set INQUIRY_WEBHOOK_URL (Zapier, Make, Slack workflow, a CRM, or
 * your own endpoint). Each submission is POSTed as JSON; INQUIRY_WEBHOOK_SECRET,
 * if set, is sent as a Bearer token.
 *
 * Development without a webhook: submissions are logged to the server console
 * and the UI says so. In production without a webhook, the form reports that
 * it is unavailable instead of pretending to succeed.
 */
export const deliverInquiry: Deliver = async (kind, payload) => {
  const url = process.env.INQUIRY_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[inquiry:${kind}] (no INQUIRY_WEBHOOK_URL — dev log only)`, payload);
      return { ok: true, mode: "dev-log" };
    }
    console.error(`[inquiry:${kind}] INQUIRY_WEBHOOK_URL is not configured; submission not delivered.`);
    return { ok: false, reason: "not-configured" };
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "LalitGautamSite/1.0 (+https://lalitgautam.com)",
    };
    if (process.env.INQUIRY_WEBHOOK_SECRET) headers.Authorization = `Bearer ${process.env.INQUIRY_WEBHOOK_SECRET}`;
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), ...payload }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[inquiry:${kind}] webhook responded ${res.status}`);
      return { ok: false, reason: "failed" };
    }
    return { ok: true, mode: "webhook" };
  } catch (err) {
    console.error(`[inquiry:${kind}] webhook request failed`, err);
    return { ok: false, reason: "failed" };
  }
};
