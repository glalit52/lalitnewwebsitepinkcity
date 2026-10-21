// Shared by the server (process.ts) and client form hooks — keep this file free
// of server-only imports so it doesn't pull validation code into the browser.

export type FieldErrors = Partial<Record<string, string>>;

export type InquiryState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: FieldErrors; values?: Record<string, string> };

export const initialInquiryState: InquiryState = { status: "idle" };

/** Name of the hidden honeypot field; humans never fill it. */
export const HONEYPOT_FIELD = "website";
