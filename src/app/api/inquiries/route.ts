import { timingSafeEqual } from "node:crypto";
import { Inquiry } from "@/lib/db/inquiry-model";
import { connectToDatabase } from "@/lib/db/mongoose";

function authorized(request: Request): boolean {
  const token = process.env.INQUIRY_ADMIN_TOKEN?.trim();
  const given = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  if (!token || !given) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * GET /api/inquiries?kind=speaking|call&status=new&limit=50&before=<ISO date>
 *
 * Lists saved submissions, newest first. Private: requires
 * `Authorization: Bearer <INQUIRY_ADMIN_TOKEN>`.
 */
export async function GET(request: Request) {
  if (!authorized(request)) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }
  const db = await connectToDatabase().catch(() => null);
  if (!db) return Response.json({ message: "Database is not configured or unreachable." }, { status: 503 });

  const params = new URL(request.url).searchParams;
  const filter: Record<string, unknown> = {};
  const kind = params.get("kind");
  if (kind === "speaking" || kind === "call") filter.kind = kind;
  const status = params.get("status");
  if (status === "new" || status === "contacted" || status === "closed") filter.status = status;
  const before = params.get("before");
  if (before && !Number.isNaN(Date.parse(before))) filter.createdAt = { $lt: new Date(before) };
  const limit = Math.min(Math.max(Number(params.get("limit")) || 50, 1), 200);

  const items = await Inquiry.find(filter).sort({ createdAt: -1 }).limit(limit).select("-meta.ipHash").lean();
  return Response.json({ items, count: items.length }, { headers: { "Cache-Control": "no-store" } });
}
