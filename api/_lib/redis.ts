import { Redis } from "@upstash/redis";

// Vercel Marketplace's Upstash Redis integration auto-injects these.
// Using the Upstash-prefixed names (not legacy KV_*) since that's what
// Vercel sets today and what Redis.fromEnv() looks for.
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

let client: Redis | null = null;

export function getRedis(): Redis | null {
  if (!url || !token) return null;
  if (!client) client = new Redis({ url, token });
  return client;
}

let warned = false;
export function logStoreMode() {
  if (warned) return;
  warned = true;
  if (url && token) {
    console.log("[api] Upstash Redis enabled for rate-limit + lock state");
  } else {
    console.warn(
      "[api] UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set — " +
        "using in-memory stores. Fine for dev or low-traffic single-instance; " +
        "add the Vercel Marketplace Upstash Redis integration for durable state.",
    );
  }
}
