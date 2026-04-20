import { Firestore } from "@google-cloud/firestore";
import crypto from "node:crypto";

export interface LockStore {
  isLocked(key: string): Promise<boolean>;
  lock(key: string): Promise<void>;
}

const hashKey = (key: string): string =>
  crypto.createHash("sha256").update(key).digest("hex").slice(0, 32);

const LOCK_DURATION_MS = 24 * 60 * 60 * 1000;

export class InMemoryLockStore implements LockStore {
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
    this.store.set(key, Date.now() + LOCK_DURATION_MS);
  }
}

export class FirestoreLockStore implements LockStore {
  constructor(
    private db: Firestore,
    private collection: string,
  ) {}

  async isLocked(key: string): Promise<boolean> {
    try {
      const snap = await this.db
        .collection(this.collection)
        .doc(hashKey(key))
        .get();
      if (!snap.exists) return false;
      const data = snap.data() as { until: number };
      return data.until > Date.now();
    } catch (err) {
      console.error(
        "[lock-store] Firestore read error, assuming not locked:",
        err,
      );
      return false;
    }
  }

  async lock(key: string): Promise<void> {
    try {
      await this.db
        .collection(this.collection)
        .doc(hashKey(key))
        .set({ until: Date.now() + LOCK_DURATION_MS });
    } catch (err) {
      // Fail-closed on writes: log loudly. Silently losing a lock signal is worse than
      // failing the request.
      console.error(
        "[lock-store] Firestore write error, lock NOT persisted:",
        err,
      );
    }
  }
}

export function createLockStore(firestore: Firestore | null): LockStore {
  return firestore
    ? new FirestoreLockStore(firestore, "chat_locks")
    : new InMemoryLockStore();
}
