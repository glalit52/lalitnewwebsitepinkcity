"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { initialInquiryState, type FieldErrors, type InquiryState } from "@/lib/inquiry/types";

type Action = (prev: InquiryState, formData: FormData) => Promise<InquiryState>;

type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function messageFor(el: Control): string {
  const label = el.dataset.label ?? "This field";
  const v = el.validity;
  if (v.valueMissing) return `${label} is required.`;
  if (v.typeMismatch && el.type === "email") return "Enter a valid email address.";
  if (v.tooShort) return `Tell me a little more (at least ${(el as HTMLInputElement).minLength} characters).`;
  if (v.tooLong) return `${label} is too long.`;
  return el.validationMessage;
}

/**
 * Wraps a Server Action with useActionState and adds instant, accessible
 * client-side validation (same rules as the server schema, expressed as
 * native constraints). The server remains the source of truth.
 */
export function useInquiryForm(action: Action) {
  const [state, formAction, pending] = useActionState(action, initialInquiryState);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [lastState, setLastState] = useState(state);
  const formRef = useRef<HTMLFormElement>(null);

  // A new server response replaces any client-side errors.
  if (state !== lastState) {
    setLastState(state);
    setClientErrors({});
  }

  const errors: FieldErrors = { ...(state.status === "error" ? state.fieldErrors : undefined), ...clientErrors };

  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const next: FieldErrors = {};
    for (const el of Array.from(form.elements) as Control[]) {
      if (!("validity" in el) || !el.name || el.closest('[aria-hidden="true"]')) continue;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        // Treat whitespace-only answers as empty, like the server does.
        if (el.required && el.value.trim() === "") {
          next[el.name] = `${el.dataset.label ?? "This field"} is required.`;
          continue;
        }
      }
      if (!el.checkValidity()) next[el.name] = messageFor(el);
    }
    setClientErrors(next);
    if (Object.keys(next).length) {
      e.preventDefault();
      const first = Object.keys(next)[0];
      requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${CSS.escape(first)}"]`)?.focus());
    }
  }

  /** Clear a field's client error as soon as the visitor edits it. */
  function onFieldInput(e: FormEvent<HTMLFormElement>) {
    const name = (e.target as Control).name;
    if (name && clientErrors[name]) {
      setClientErrors(({ [name]: _removed, ...rest }) => {
        void _removed;
        return rest;
      });
    }
  }

  const values = state.status === "error" ? (state.values ?? {}) : {};

  return { state, formAction, pending, errors, values, formRef, onSubmit, onFieldInput };
}
