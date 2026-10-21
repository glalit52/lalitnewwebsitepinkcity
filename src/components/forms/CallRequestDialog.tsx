"use client";

import { useId, useRef, useState } from "react";
import { requestCall } from "@/app/actions";
import type { CallService } from "@/content/site";
import { HONEYPOT_FIELD } from "@/lib/inquiry/types";
import { Honeypot, TextAreaField, TextField } from "./Field";
import { FormStatus, Spinner } from "./FormStatus";
import { useInquiryForm } from "./useInquiryForm";

type ServiceOption = Pick<CallService, "id" | "name" | "tag">;

function CallRequestForm({
  services,
  initialService,
  idPrefix,
  titleId,
}: {
  services: ServiceOption[];
  initialService: string;
  idPrefix: string;
  titleId: string;
}) {
  const { state, formAction, pending, errors, values, formRef, onSubmit, onFieldInput } = useInquiryForm(requestCall);
  const id = (s: string) => `${idPrefix}-${s}`;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      onInput={onFieldInput}
      noValidate
      aria-labelledby={titleId}
      aria-busy={pending}
      className="relative flex flex-col gap-4"
    >
      <label htmlFor={id("service")} className="flex flex-col gap-1.5 text-[15px] font-semibold tracking-[0.04em]">
        Call type
        <select
          id={id("service")}
          name="service"
          data-label="Call type"
          required
          defaultValue={values.service ?? initialService}
          aria-invalid={errors.service ? true : undefined}
          aria-describedby={errors.service ? `${id("service")}-error` : undefined}
          className="w-full rounded-xl border-2 border-pink bg-ivory px-4 py-3.5 font-sans text-[17px] font-normal tracking-normal text-ink focus:border-indigo"
        >
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.tag.toLowerCase()}
            </option>
          ))}
        </select>
        {errors.service ? (
          <span id={`${id("service")}-error`} className="text-[14px] font-medium text-maroon">
            {errors.service}
          </span>
        ) : null}
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id={id("name")} label="Your name" name="name" autoComplete="name" maxLength={120} defaultValue={values.name} error={errors.name} />
        <TextField id={id("email")} label="Email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} defaultValue={values.email} error={errors.email} />
      </div>
      <TextAreaField
        id={id("topic")}
        label="What would you like to discuss?"
        name="topic"
        rows={4}
        minLength={10}
        maxLength={2000}
        hint="A line or two of context helps me prepare."
        defaultValue={values.topic}
        error={errors.topic}
      />
      <Honeypot name={HONEYPOT_FIELD} />
      <FormStatus state={state} />
      <button type="submit" disabled={pending} className="btn w-full bg-indigo py-4 text-ivory">
        {pending ? (
          <>
            <Spinner /> Sending…
          </>
        ) : (
          "Request this call"
        )}
      </button>
    </form>
  );
}

type Props = {
  services: ServiceOption[];
  service: ServiceOption;
  className?: string;
};

/**
 * Used when no Topmate booking link is configured: opens an accessible modal
 * (native <dialog>: focus trap, Escape to close, focus returns to the trigger)
 * with a short request form.
 */
export function RequestCallButton({ services, service, className = "" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [session, setSession] = useState(0);
  const uid = useId();
  const titleId = `${uid}-title`;

  function open() {
    setSession((n) => n + 1); // fresh form each time it opens
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" className={className}>
        Request this call
      </button>
      <dialog
        ref={dialogRef}
        data-surface="light"
        aria-labelledby={titleId}
        onClick={(e) => {
          // Clicking the backdrop (the dialog element itself) closes it.
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
        className="m-auto w-[calc(100%-32px)] max-w-[620px] rounded-[28px] border-[3px] border-indigo bg-ivory p-0 text-left text-ink backdrop:bg-indigo-deep/60 backdrop:backdrop-blur-[2px]"
      >
        <div className="flex max-h-[calc(100dvh-48px)] flex-col gap-5 overflow-y-auto p-6 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="eyebrow m-0">Request a call</p>
              <h2 id={titleId} className="m-0 font-display text-[30px] font-normal leading-[1.1] text-indigo md:text-[36px]">
                {service.name}
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => dialogRef.current?.close()}
              className="flex size-11 flex-none items-center justify-center rounded-full border-2 border-pink text-indigo transition-colors hover:bg-blush"
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <p className="m-0 text-[16px] text-ink-muted">
            Share a little context and I’ll reply by email to find a time that works.
          </p>
          {session > 0 ? (
            <CallRequestForm
              key={session}
              services={services}
              initialService={service.id}
              idPrefix={`${uid}-f${session}`}
              titleId={titleId}
            />
          ) : null}
        </div>
      </dialog>
    </>
  );
}
