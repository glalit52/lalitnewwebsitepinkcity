import "server-only";
import mongoose from "mongoose";

/**
 * One shared Mongoose connection per server instance. On serverless hosts
 * (Vercel) a module can be re-evaluated per request in dev, so the promise is
 * cached on `globalThis` to avoid opening a new pool every time.
 */
const globalCache = globalThis as typeof globalThis & {
  __mongoose?: { promise: Promise<typeof mongoose> | null };
};
const cache = (globalCache.__mongoose ??= { promise: null });

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI?.trim());
}

/** Connects (once) and returns mongoose, or `null` when MONGODB_URI is not set. */
export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) return null;

  cache.promise ??= mongoose
    .connect(uri, {
      dbName: process.env.MONGODB_DB?.trim() || undefined,
      bufferCommands: false,
      serverSelectionTimeoutMS: 8_000,
      maxPoolSize: 5,
    })
    .catch((err) => {
      // Let the next request retry instead of caching the failure.
      cache.promise = null;
      throw err;
    });

  return cache.promise;
}
