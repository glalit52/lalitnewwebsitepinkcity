import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type Common = {
  id: string;
  label: string;
  name: string;
  error?: string;
  hint?: string;
  optional?: boolean;
};

const labelCls = "flex flex-col gap-1.5 text-[15px] font-semibold tracking-[0.04em] text-ink";
const controlCls =
  "w-full rounded-xl border-2 bg-ivory px-4 py-3.5 font-sans text-[17px] font-normal tracking-normal text-ink placeholder:text-ink-muted/70 transition-colors focus:border-indigo focus-visible:outline-offset-2 aria-[invalid=true]:border-maroon";

function Message({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error)
    return (
      <span id={`${id}-error`} className="flex items-center gap-1.5 text-[14px] font-medium tracking-normal text-maroon">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5v5.5M12 16.5h.01" />
        </svg>
        {error}
      </span>
    );
  if (hint)
    return (
      <span id={`${id}-hint`} className="text-[14px] font-normal tracking-normal text-ink-muted">
        {hint}
      </span>
    );
  return null;
}

function describedBy(id: string, error?: string, hint?: string) {
  const ids = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

function LabelText({ label, optional }: { label: string; optional?: boolean }) {
  return (
    <span>
      {label}
      {optional ? <span className="font-normal text-ink-muted"> (optional)</span> : null}
    </span>
  );
}

export function TextField({
  id,
  label,
  name,
  error,
  hint,
  optional,
  ...rest
}: Common & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name">) {
  return (
    <label htmlFor={id} className={labelCls}>
      <LabelText label={label} optional={optional} />
      <input
        id={id}
        name={name}
        data-label={label}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${controlCls} ${error ? "border-maroon" : "border-pink"}`}
        {...rest}
      />
      <Message id={id} error={error} hint={hint} />
    </label>
  );
}

export function TextAreaField({
  id,
  label,
  name,
  error,
  hint,
  optional,
  ...rest
}: Common & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "name">) {
  return (
    <label htmlFor={id} className={labelCls}>
      <LabelText label={label} optional={optional} />
      <textarea
        id={id}
        name={name}
        data-label={label}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${controlCls} min-h-32 resize-y ${error ? "border-maroon" : "border-pink"}`}
        {...rest}
      />
      <Message id={id} error={error} hint={hint} />
    </label>
  );
}

/** Off-screen field that only bots fill in. */
export function Honeypot({ name }: { name: string }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name={name} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
