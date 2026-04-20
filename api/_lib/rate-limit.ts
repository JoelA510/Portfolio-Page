import { Firestore, FieldValue } from "@google-cloud/firestore";
import crypto from "node:crypto";

export interface RateLimiter {
  allow(key: string): Promise<boolean>;
}

const hashKey = (key: string): string =>
  crypto.createHash("sha256").update(key).digest("hex").slice(0, 32);

export class InMemoryLimiter implements RateLimiter {
  private store = new Map<string, { count: number; resetAt: number }>();

  constructor(
    private limit: number,
    private windowMs: number,
  ) {}

  async allow(key: string): Promise<boolean> {
    const now = Date.now();
    const entry = this.store.get(key);
    if (!entry || entry.resetAt < now) {
      this.store.set(key, { count: 1, resetAt: now + this.windowMs });
      return true;
    }
    if (entry.count >= this.limit) return false;
    entry.count++;
    return true;
  }
}

export class FirestoreLimiter implements RateLimiter {
  constructor(
    private db: Firestore,
    private collection: string,
    private limit: number,
    private windowMs: number,
  ) {}

  async allow(key: string): Promise<boolean> {
    const ref = this.db.collection(this.collection).doc(hashKey(key));
    const now = Date.now();

    try {
      return await this.db.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        const data = snap.exists
          ? (snap.data() as { count: number; resetAt: number })
          : null;

        if (!data || data.resetAt < now) {
          tx.set(ref, { count: 1, resetAt: now + this.windowMs });
          return true;
        }
        if (data.count >= this.limit) return false;
        tx.update(ref, { count: FieldValue.increment(1) });
        return true;
      });
    } catch (err) {
      // Fail-open: a Firestore outage shouldn't take down the chat.
      console.error("[rate-limit] Firestore error, allowing request:", err);
      return true;
    }
  }
}

export function createRateLimiter(
  limit: number,
  windowMs: number,
  firestore: Firestore | null,
): RateLimiter {
  return firestore
    ? new FirestoreLimiter(firestore, "rate_limits", limit, windowMs)
    : new InMemoryLimiter(limit, windowMs);
}
