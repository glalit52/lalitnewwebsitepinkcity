"use client";

import { sendSpeakingInvite } from "@/app/actions";
import { HONEYPOT_FIELD } from "@/lib/inquiry/types";
import { Honeypot, TextAreaField, TextField } from "./Field";
import { FormStatus, Spinner } from "./FormStatus";
import { useInquiryForm } from "./useInquiryForm";

export function SpeakingInviteForm() {
  const { state, formAction, pending, errors, values, formRef, onSubmit, onFieldInput } =
    useInquiryForm(sendSpeakingInvite);

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      onInput={onFieldInput}
      noValidate
      aria-labelledby="invite-title"
      aria-busy={pending}
      className="relative box-border flex w-full max-w-[760px] flex-col gap-5 rounded-[28px] border-[3px] border-indigo bg-ivory p-6 sm:p-8 md:p-12"
    >
      <div className="flex flex-col gap-2 text-center">
        <p className="eyebrow m-0">Invite me to speak</p>
        <h2 id="invite-title" className="m-0 font-display text-[32px] font-normal leading-[1.1] text-indigo md:text-[44px]">
          Tell me about your event
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="invite-name" label="Your name" name="name" autoComplete="name" maxLength={120} defaultValue={values.name} error={errors.name} />
        <TextField id="invite-email" label="Email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} defaultValue={values.email} error={errors.email} />
        <TextField id="invite-event" label="Event & organisation" name="event" maxLength={200} defaultValue={values.event} error={errors.event} />
        <TextField id="invite-when" label="Date & city" name="when" optional maxLength={160} defaultValue={values.when} error={errors.when} />
      </div>
      <TextAreaField
        id="invite-message"
        label="What would you like me to speak about?"
        name="message"
        rows={4}
        minLength={10}
        maxLength={4000}
        defaultValue={values.message}
        error={errors.message}
      />
      <Honeypot name={HONEYPOT_FIELD} />

      <FormStatus state={state} />

      <button type="submit" disabled={pending} className="btn w-full bg-indigo py-4 text-ivory">
        {pending ? (
          <>
            <Spinner /> Sending…
          </>
        ) : (
          "Send invitation"
        )}
      </button>
    </form>
  );
}
