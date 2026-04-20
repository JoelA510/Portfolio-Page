import { Ratelimit } from "@upstash/ratelimit";
import type { Redis } from "@upstash/redis";

export interface RateLimiter {
  allow(key: string): Promise<boolean>;
}

class InMemoryLimiter implements RateLimiter {
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

class UpstashLimiter implements RateLimiter {
  private rl: Ratelimit;

  constructor(redis: Redis, limit: number, windowSec: number) {
    this.rl = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
      prefix: "ratelimit:chat",
      analytics: false,
    });
  }

  async allow(key: string): Promise<boolean> {
    try {
      const { success } = await this.rl.limit(key);
      return success;
    } catch (err) {
      // Fail-open: a Redis outage shouldn't take down the chat.
      console.error("[rate-limit] Upstash error, allowing request:", err);
      return true;
    }
  }
}

export function createRateLimiter(
  limit: number,
  windowMs: number,
  redis: Redis | null,
): RateLimiter {
  return redis
    ? new UpstashLimiter(redis, limit, Math.round(windowMs / 1000))
    : new InMemoryLimiter(limit, windowMs);
}
