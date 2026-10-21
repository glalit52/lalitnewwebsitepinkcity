import type { InquiryState } from "@/lib/inquiry/types";

/** Live region announcing the result of a submission. */
export function FormStatus({ state }: { state: InquiryState }) {
  return (
    <div aria-live="polite" role="status" className="empty:hidden">
      {state.status === "success" ? (
        <p className="m-0 flex items-start gap-3 rounded-2xl border-2 border-teal bg-[#E3F0EC] px-4 py-3.5 text-[16px] font-medium text-teal">
          <svg aria-hidden="true" className="mt-0.5 flex-none" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
          {state.message}
        </p>
      ) : state.status === "error" ? (
        <p className="m-0 rounded-2xl border-2 border-maroon bg-blush px-4 py-3.5 text-[16px] font-medium text-maroon">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

export function Spinner() {
  return (
    <svg aria-hidden="true" className="size-5 motion-safe:animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
