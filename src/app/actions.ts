"use server";

import { headers } from "next/headers";
import { clientKeyFrom } from "@/lib/inquiry/client-key";
import { deliverInquiry } from "@/lib/inquiry/deliver";
import { processInquiry } from "@/lib/inquiry/process";
import { mongoStore } from "@/lib/inquiry/store";
import type { InquiryState } from "@/lib/inquiry/types";

async function deps() {
  const h = await headers();
  return {
    deliver: deliverInquiry,
    store: mongoStore,
    clientKey: clientKeyFrom(h),
    meta: { source: "form" as const, userAgent: h.get("user-agent") ?? undefined },
  };
}

export async function sendSpeakingInvite(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  return processInquiry("speaking", formData, await deps());
}

export async function requestCall(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  return processInquiry("call", formData, await deps());
}
