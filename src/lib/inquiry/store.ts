import "server-only";
import { createHash } from "node:crypto";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Inquiry } from "@/lib/db/inquiry-model";
import type { DeliveryResult } from "./deliver";
import type { InquiryKind } from "./schema";

export type StoreMeta = { source: "form" | "api"; clientKey: string; userAgent?: string };

export type StoreResult = { ok: true; id: string } | { ok: false; reason: "not-configured" | "failed" };

/** Persists a submission and later records how its email notification went. */
export type Store = {
  save: (kind: InquiryKind, payload: Record<string, unknown>, meta: StoreMeta) => Promise<StoreResult>;
  markDelivery: (id: string, result: DeliveryResult) => Promise<void>;
};

function hashIp(ip: string): string | undefined {
  if (!ip || ip === "unknown") return undefined;
  const salt = process.env.INQUIRY_IP_SALT ?? "lalitnewwebsitepinkcity.vercel.app";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export const mongoStore: Store = {
  async save(kind, payload, meta) {
    try {
      const db = await connectToDatabase();
      if (!db) return { ok: false, reason: "not-configured" };
      const doc = await Inquiry.create({
        kind,
        ...payload,
        meta: { source: meta.source, ipHash: hashIp(meta.clientKey), userAgent: meta.userAgent?.slice(0, 400) },
      });
      return { ok: true, id: String(doc._id) };
    } catch (err) {
      console.error(`[inquiry:${kind}] Failed to save to MongoDB:`, err);
      return { ok: false, reason: "failed" };
    }
  },

  async markDelivery(id, result) {
    try {
      await Inquiry.updateOne(
        { _id: id },
        {
          $set: {
            "delivery.status": result.ok ? (result.mode === "dev-log" ? "skipped" : "sent") : "failed",
            "delivery.mode": result.ok ? result.mode : result.reason,
            "delivery.at": new Date(),
          },
        },
      );
    } catch (err) {
      console.error(`[inquiry] Failed to record delivery status for ${id}:`, err);
    }
  },
};
