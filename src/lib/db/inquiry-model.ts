import "server-only";
import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * One document per form submission ("Invite me to speak" and "Request a
 * call"). Kind-specific fields are optional; validation happens in zod first.
 */
const inquirySchema = new Schema(
  {
    kind: { type: String, enum: ["speaking", "call"], required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254, index: true },

    // Speaking invitation
    event: { type: String, trim: true, maxlength: 200 },
    when: { type: String, trim: true, maxlength: 160 },
    message: { type: String, trim: true, maxlength: 4000 },

    // Call request
    service: { type: String, enum: ["mini", "standard", "deep-dive"] },
    topic: { type: String, trim: true, maxlength: 2000 },

    status: { type: String, enum: ["new", "contacted", "closed"], default: "new", index: true },
    delivery: {
      status: { type: String, enum: ["pending", "sent", "failed", "skipped"], default: "pending" },
      mode: { type: String },
      at: { type: Date },
    },
    meta: {
      source: { type: String, enum: ["form", "api"], default: "form" },
      /** SHA-256 of the client IP — enough to spot abuse without storing the IP. */
      ipHash: { type: String },
      userAgent: { type: String, maxlength: 400 },
    },
  },
  { timestamps: true, collection: "inquiries" },
);

inquirySchema.index({ createdAt: -1 });

export type InquiryDoc = InferSchemaType<typeof inquirySchema>;

// Reuse the compiled model across hot reloads.
export const Inquiry: Model<InquiryDoc> =
  (mongoose.models.Inquiry as Model<InquiryDoc> | undefined) ?? mongoose.model<InquiryDoc>("Inquiry", inquirySchema);
