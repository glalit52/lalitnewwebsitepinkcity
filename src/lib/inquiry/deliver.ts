import "server-only";
import { person } from "@/content/site";
import type { InquiryKind } from "./schema";

export type DeliveryResult =
  | { ok: true; mode: "email" | "webhook" | "dev-log" }
  | { ok: false; reason: "not-configured" | "failed" };

export type Deliver = (kind: InquiryKind, payload: Record<string, unknown>) => Promise<DeliveryResult>;

export const DEFAULT_INBOX_EMAIL = "lalit@sensegrass.com";
export const DEFAULT_FROM_EMAIL = "Lalit Gautam Website <onboarding@resend.dev>";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatInquiryEmail(kind: InquiryKind, payload: Record<string, unknown>, recipient: string) {
  const isSpeaking = kind === "speaking";
  const name = String(payload.name ?? "Anonymous");
  const email = String(payload.email ?? "");
  const subject = isSpeaking
    ? `[Speaking Invitation] ${name} — ${payload.event ?? "New Event"}`
    : `[1:1 Call Request] ${name} (${String(payload.service ?? "Session").toUpperCase()})`;

  const rows: Array<[string, string]> = [
    ["Type", isSpeaking ? "Speaking Invitation" : "1:1 Mentorship / Call Request"],
    ["Name", name],
    ["Email", email],
    ...(isSpeaking
      ? ([
          ["Event & Organisation", String(payload.event ?? "Not specified")],
          ["Date & City", String(payload.when || "Not specified")],
        ] as Array<[string, string]>)
      : ([
          ["Requested Service", String(payload.service ?? "Standard")],
        ] as Array<[string, string]>)),
    ["Submitted At", new Date().toLocaleString("en-US", { timeZone: "UTC", dateStyle: "full", timeStyle: "long" })],
  ];

  const messageContent = String(isSpeaking ? payload.message ?? "" : payload.topic ?? "");
  const detailsText = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const plainText = `
New inquiry received on lalitgautam.com:

${detailsText}

${isSpeaking ? "Description & Topic:" : "Discussion Topic:"}
${messageContent}

---
To reply directly, simply hit "Reply" in your email client (sends to ${email}).
`.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFF6EA; margin: 0; padding: 32px 16px; color: #2A1D24;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 2px solid #E7A08C; overflow: hidden; box-shadow: 0 8px 24px rgba(34, 48, 107, 0.08);">
    <div style="background-color: #22306B; padding: 26px 32px; border-bottom: 4px solid #F2B33D;">
      <h1 style="margin: 0; font-size: 22px; color: #FFF6EA; font-weight: 600; letter-spacing: -0.01em;">
        ${isSpeaking ? "🎤 New Speaking Invitation" : "📞 New 1:1 Call Request"}
      </h1>
      <p style="margin: 6px 0 0; color: #E7A08C; font-size: 14px;">
        Direct notification from lalitgautam.com
      </p>
    </div>
    
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        ${rows
          .map(
            ([label, val]) => `
          <tr>
            <td style="padding: 10px 0; color: #8E3B2C; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; width: 160px; vertical-align: top;">
              ${escapeHtml(label)}
            </td>
            <td style="padding: 10px 0; color: #2A1D24; font-size: 15px; font-weight: 500;">
              ${
                label === "Email"
                  ? `<a href="mailto:${escapeHtml(val)}" style="color: #22306B; text-decoration: underline; font-weight: 600;">${escapeHtml(val)}</a>`
                  : escapeHtml(val)
              }
            </td>
          </tr>`
          )
          .join("")}
      </table>

      <div style="background-color: #FCE7DD; border-left: 4px solid #C2604C; padding: 18px 22px; border-radius: 0 14px 14px 0; margin-bottom: 28px;">
        <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #8E3B2C;">
          ${isSpeaking ? "Description & Topic" : "What they want to discuss"}
        </p>
        <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #2A1D24; white-space: pre-wrap;">${escapeHtml(messageContent)}</p>
      </div>

      <div style="text-align: center; padding-top: 10px; margin-bottom: 8px;">
        <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent("Re: " + subject)}" style="display: inline-block; background-color: #22306B; color: #FFF6EA; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 999px; box-shadow: 0 4px 12px rgba(34, 48, 107, 0.2);">
          Reply directly to ${escapeHtml(name)}
        </a>
      </div>
    </div>

    <div style="background-color: #FFF6EA; padding: 18px 32px; text-align: center; border-top: 1px solid #F3C8B9; font-size: 13px; color: #4A3540;">
      Routing to <strong>${escapeHtml(recipient)}</strong> · <a href="https://lalitgautam.com" style="color: #22306B; text-decoration: none; font-weight: 600;">lalitgautam.com</a>
    </div>
  </div>
</body>
</html>
`.trim();

  return { subject, plainText, html, replyTo: email };
}

/**
 * Delivers inquiry submissions.
 *
 * Priority:
 * 1. RESEND_API_KEY: Sends direct branded email to lalit@sensegrass.com with reply_to set to visitor's email.
 * 2. INQUIRY_WEBHOOK_URL: POSTs full submission JSON to external webhook (Zapier, Make, Slack, CRM).
 * 3. Development fallback: Logs nicely to console.
 * 4. Production fallback without config: Reports honest "not-configured" error.
 */
export const deliverInquiry: Deliver = async (kind, payload) => {
  const recipient = process.env.INQUIRY_INBOX_EMAIL || person.email || DEFAULT_INBOX_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL?.trim();

  // If neither Resend nor Webhook is configured
  if (!resendApiKey && !webhookUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[inquiry:${kind}] (no RESEND_API_KEY or INQUIRY_WEBHOOK_URL — dev log only; target: ${recipient})`, payload);
      return { ok: true, mode: "dev-log" };
    }
    console.error(`[inquiry:${kind}] Neither RESEND_API_KEY nor INQUIRY_WEBHOOK_URL is configured; submission for ${recipient} not delivered.`);
    return { ok: false, reason: "not-configured" };
  }

  let deliveredViaEmail = false;

  // 1. Send direct email via Resend if RESEND_API_KEY is provided
  if (resendApiKey) {
    try {
      const emailContent = formatInquiryEmail(kind, payload, recipient);
      const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
          "User-Agent": "LalitGautamSite/1.0 (+https://lalitgautam.com)",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipient],
          reply_to: emailContent.replyTo || undefined,
          subject: emailContent.subject,
          text: emailContent.plainText,
          html: emailContent.html,
        }),
        signal: AbortSignal.timeout(10_000),
        cache: "no-store",
      });

      if (!res.ok) {
        const errorBody = await res.text().catch(() => "");
        console.error(`[inquiry:${kind}] Resend API error (${res.status}): ${errorBody}`);
        // If webhook is not configured, this is a failure
        if (!webhookUrl) return { ok: false, reason: "failed" };
      } else {
        deliveredViaEmail = true;
      }
    } catch (err) {
      console.error(`[inquiry:${kind}] Failed to dispatch email via Resend:`, err);
      if (!webhookUrl) return { ok: false, reason: "failed" };
    }
  }

  // 2. Dispatch to Webhook if INQUIRY_WEBHOOK_URL is provided
  if (webhookUrl) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": "LalitGautamSite/1.0 (+https://lalitgautam.com)",
      };
      if (process.env.INQUIRY_WEBHOOK_SECRET) {
        headers.Authorization = `Bearer ${process.env.INQUIRY_WEBHOOK_SECRET}`;
      }

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          kind,
          recipient,
          submittedAt: new Date().toISOString(),
          ...payload,
        }),
        signal: AbortSignal.timeout(10_000),
        cache: "no-store",
      });

      if (!res.ok) {
        console.error(`[inquiry:${kind}] Webhook responded with status ${res.status}`);
        if (!deliveredViaEmail) return { ok: false, reason: "failed" };
      } else {
        return { ok: true, mode: "webhook" };
      }
    } catch (err) {
      console.error(`[inquiry:${kind}] Webhook request failed:`, err);
      if (!deliveredViaEmail) return { ok: false, reason: "failed" };
    }
  }

  if (deliveredViaEmail) {
    return { ok: true, mode: "email" };
  }

  return { ok: false, reason: "failed" };
};
