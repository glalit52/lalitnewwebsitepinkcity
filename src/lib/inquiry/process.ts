import { z } from "zod";
import type { Deliver } from "./deliver";
import { isRateLimited } from "./rate-limit";
import { inquirySchemas, type InquiryKind } from "./schema";
import type { Store, StoreMeta, StoreResult } from "./store";
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

export type InquiryDeps = {
  deliver: Deliver;
  clientKey: string;
  /** Saves the submission (MongoDB); omitted in tests that only cover email. */
  store?: Store;
  meta?: Omit<StoreMeta, "clientKey">;
};

/**
 * Validates, saves and emails a form submission. Pure apart from `deliver`
 * and `store`, so it is unit-tested directly; the Server Actions in
 * `app/actions.ts` and the API routes in `app/api/inquiries` wrap it.
 *
 * The submission counts as received if it was saved OR emailed — a failed
 * email never loses a saved inquiry, and vice versa.
 */
export async function processInquiry(
  kind: InquiryKind,
  formData: FormData,
  deps: InquiryDeps,
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
    return { status: "error", code: "invalid", message: "Please fix the highlighted fields.", fieldErrors, values: fields };
  }

  if (isRateLimited(`${kind}:${deps.clientKey}`)) {
    return {
      status: "error",
      code: "rate-limited",
      message: "Too many submissions from your connection. Please try again in a few minutes.",
      values: fields,
    };
  }

  const saved: StoreResult = deps.store
    ? await deps.store.save(kind, parsed.data, { source: "form", ...deps.meta, clientKey: deps.clientKey })
    : { ok: false, reason: "not-configured" };

  const result = await deps.deliver(kind, parsed.data);
  if (saved.ok) await deps.store?.markDelivery(saved.id, result);

  if (!saved.ok && !result.ok) {
    const unavailable = saved.reason === "not-configured" && result.reason === "not-configured";
    return {
      status: "error",
      code: unavailable ? "unavailable" : "failed",
      message: unavailable
        ? "Online requests aren’t available at the moment. Please try again later."
        : "Something went wrong sending your message. Please try again.",
      values: fields,
    };
  }

  return {
    status: "success",
    id: saved.ok ? saved.id : undefined,
    message:
      !saved.ok && result.ok && result.mode === "dev-log"
        ? `${SUCCESS[kind]} (Development mode: logged to the server console — set MONGODB_URI and RESEND_API_KEY to save and email it.)`
        : SUCCESS[kind],
  };
}
