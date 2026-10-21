"use server";

import { headers } from "next/headers";
import { deliverInquiry } from "@/lib/inquiry/deliver";
import { processInquiry } from "@/lib/inquiry/process";
import type { InquiryState } from "@/lib/inquiry/types";

async function clientKey(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    h.get("cf-connecting-ip")?.trim() ||
    h.get("x-real-ip")?.trim() ||
    h.get("x-client-ip")?.trim() ||
    "unknown"
  );
}

export async function sendSpeakingInvite(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  return processInquiry("speaking", formData, { deliver: deliverInquiry, clientKey: await clientKey() });
}

export async function requestCall(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  return processInquiry("call", formData, { deliver: deliverInquiry, clientKey: await clientKey() });
}
