import { clientKeyFrom } from "@/lib/inquiry/client-key";
import { deliverInquiry } from "@/lib/inquiry/deliver";
import { processInquiry } from "@/lib/inquiry/process";
import { inquirySchemas, type InquiryKind } from "@/lib/inquiry/schema";
import { mongoStore } from "@/lib/inquiry/store";
import type { InquiryErrorCode } from "@/lib/inquiry/types";

const STATUS: Record<InquiryErrorCode, number> = {
  invalid: 400,
  "rate-limited": 429,
  unavailable: 503,
  failed: 502,
};

/** Accepts JSON or form-encoded bodies; returns the same FormData shape the Server Actions use. */
async function readBody(request: Request): Promise<FormData | null> {
  const type = request.headers.get("content-type") ?? "";
  try {
    if (type.includes("application/json")) {
      const json: unknown = await request.json();
      if (!json || typeof json !== "object" || Array.isArray(json)) return null;
      const fd = new FormData();
      for (const [k, v] of Object.entries(json)) if (typeof v === "string") fd.set(k, v);
      return fd;
    }
    return await request.formData();
  } catch {
    return null;
  }
}

/**
 * POST /api/inquiries/speaking — "Invite me to speak"
 * POST /api/inquiries/call     — "Request a call"
 *
 * Same pipeline as the on-site forms: validate → rate-limit → save to MongoDB
 * → email Lalit. 201 on success, 400 with fieldErrors when invalid.
 */
export async function POST(request: Request, ctx: RouteContext<"/api/inquiries/[kind]">) {
  const { kind } = await ctx.params;
  if (!(kind in inquirySchemas)) {
    return Response.json({ status: "error", message: "Unknown inquiry type." }, { status: 404 });
  }

  const formData = await readBody(request);
  if (!formData) {
    return Response.json({ status: "error", code: "invalid", message: "Send a JSON or form body." }, { status: 400 });
  }

  const state = await processInquiry(kind as InquiryKind, formData, {
    deliver: deliverInquiry,
    store: mongoStore,
    clientKey: clientKeyFrom(request.headers),
    meta: { source: "api", userAgent: request.headers.get("user-agent") ?? undefined },
  });

  if (state.status === "success") {
    return Response.json({ status: "success", id: state.id, message: state.message }, { status: 201 });
  }
  if (state.status === "error") {
    const { values: _values, ...body } = state;
    void _values;
    return Response.json(body, { status: STATUS[state.code ?? "failed"] });
  }
  return Response.json({ status: "error", message: "Unexpected state." }, { status: 500 });
}
