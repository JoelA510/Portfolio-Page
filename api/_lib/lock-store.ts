import type { Redis } from "@upstash/redis";
import crypto from "node:crypto";

export interface LockStore {
  isLocked(key: string): Promise<boolean>;
  lock(key: string): Promise<void>;
}

const hashKey = (key: string): string =>
  crypto.createHash("sha256").update(key).digest("hex").slice(0, 32);

const LOCK_TTL_SEC = 24 * 60 * 60;

class InMemoryLockStore implements LockStore {
  private store = new Map<string, number>();

  async isLocked(key: string): Promise<boolean> {
    const until = this.store.get(key);
    if (!until) return false;
    if (until < Date.now()) {
      this.store.delete(key);
      return false;
    }
    return true;
  }

  async lock(key: string): Promise<void> {
    this.store.set(key, Date.now() + LOCK_TTL_SEC * 1000);
  }
}

class UpstashLockStore implements LockStore {
  constructor(private redis: Redis) {}

  private k(key: string) {
    return `chat:lock:${hashKey(key)}`;
  }

  async isLocked(key: string): Promise<boolean> {
    try {
      return (await this.redis.exists(this.k(key))) === 1;
    } catch (err) {
      // Fail-open on reads: a Redis outage shouldn't block legitimate users.
      console.error(
        "[lock-store] Upstash read error, assuming not locked:",
        err,
      );
      return false;
    }
  }

  async lock(key: string): Promise<void> {
    try {
      await this.redis.set(this.k(key), 1, { ex: LOCK_TTL_SEC });
    } catch (err) {
      // Log loudly — silently losing a lock signal is worse than failing noisily.
      console.error(
        "[lock-store] Upstash write error, lock NOT persisted:",
        err,
      );
    }
  }
}

export function createLockStore(redis: Redis | null): LockStore {
  return redis ? new UpstashLockStore(redis) : new InMemoryLockStore();
}
