import { z } from "zod";
import { callServices } from "@/content/site";

const text = (label: string, max: number) =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

const optionalText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .max(max, `${label} must be ${max} characters or fewer.`)
    .optional()
    .transform((v) => (v ? v : undefined));

const email = z
  .string({ error: "Email is required." })
  .trim()
  .min(1, "Email is required.")
  .max(254, "Email is too long.")
  .pipe(z.email("Enter a valid email address."));

export const speakingInviteSchema = z.object({
  name: text("Your name", 120),
  email,
  event: text("Event & organisation", 200),
  when: optionalText("Date & city", 160),
  message: text("A short description", 4000).refine((v) => v.length >= 10, {
    message: "Tell me a little more (at least 10 characters).",
  }),
});

const serviceIds = callServices.map((s) => s.id) as [string, ...string[]];

export const callRequestSchema = z.object({
  service: z.enum(serviceIds, { error: "Choose a call type." }),
  name: text("Your name", 120),
  email,
  topic: text("What you’d like to discuss", 2000).refine((v) => v.length >= 10, {
    message: "Tell me a little more (at least 10 characters).",
  }),
});

export type SpeakingInvite = z.infer<typeof speakingInviteSchema>;
export type CallRequest = z.infer<typeof callRequestSchema>;

export const inquirySchemas = {
  speaking: speakingInviteSchema,
  call: callRequestSchema,
} as const;

export type InquiryKind = keyof typeof inquirySchemas;
