import { z } from "zod";
import type { Deliver } from "./deliver";
import { isRateLimited } from "./rate-limit";
import { inquirySchemas, type InquiryKind } from "./schema";
import { HONEYPOT_FIELD, type FieldErrors, type InquiryState } from "./types";

export type { InquiryState };

const SUCCESS: Record<InquiryKind, string> = {
  speaking: "Thank you — your invitation is on its way. I’ll reply by email.",
  call: "Thank you — your request is in. I’ll reply by email with a time.",
};

function formValues(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of formData.entries()) {
    if (typeof v === "string" && !k.startsWith("$ACTION")) out[k] = v;
  }
  return out;
}

/**
 * Validates and delivers a form submission. Pure apart from `deliver`, so it
 * is unit-tested directly; the Server Actions in `app/actions.ts` wrap it.
 */
export async function processInquiry(
  kind: InquiryKind,
  formData: FormData,
  deps: { deliver: Deliver; clientKey: string },
): Promise<InquiryState> {
  const values = formValues(formData);

  // Bots that fill the honeypot get a normal-looking response and nothing is sent.
  if (values[HONEYPOT_FIELD]) return { status: "success", message: SUCCESS[kind] };

  const { [HONEYPOT_FIELD]: _ignored, ...fields } = values;
  void _ignored;
  const parsed = inquirySchemas[kind].safeParse(fields);
  if (!parsed.success) {
    const fieldErrors: FieldErrors = {};
    for (const issue of (parsed.error as z.ZodError).issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values: fields };
  }

  if (isRateLimited(`${kind}:${deps.clientKey}`)) {
    return {
      status: "error",
      message: "Too many submissions from your connection. Please try again in a few minutes.",
      values: fields,
    };
  }

  const result = await deps.deliver(kind, parsed.data);
  if (!result.ok) {
    return {
      status: "error",
      message:
        result.reason === "not-configured"
          ? "Online requests aren’t available at the moment. Please try again later."
          : "Something went wrong sending your message. Please try again.",
      values: fields,
    };
  }

  return {
    status: "success",
    message:
      result.mode === "dev-log"
        ? `${SUCCESS[kind]} (Development mode: logged to the server console — set INQUIRY_WEBHOOK_URL to deliver it.)`
        : SUCCESS[kind],
  };
}
