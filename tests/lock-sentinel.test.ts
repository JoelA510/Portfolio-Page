import { describe, it, expect } from "vitest";
import {
  appendAndDetectLock,
  LOCK_SENTINEL,
  LOCK_TAIL_LEN,
} from "../api/_lib/lock-sentinel";

describe("appendAndDetectLock", () => {
  it("detects the sentinel in a single chunk", () => {
    const r = appendAndDetectLock("", LOCK_SENTINEL);
    expect(r.locked).toBe(true);
  });

  it("detects the sentinel split across two chunks at the boundary", () => {
    const a = appendAndDetectLock("", "LOCK_");
    expect(a.locked).toBe(false);
    const b = appendAndDetectLock(a.tail, "CHATBOT");
    expect(b.locked).toBe(true);
  });

  it("detects the sentinel split into many tiny chunks (worst case)", () => {
    let tail = "";
    let lockedAt = -1;
    LOCK_SENTINEL.split("").forEach((ch, i) => {
      const r = appendAndDetectLock(tail, ch);
      tail = r.tail;
      if (r.locked && lockedAt === -1) lockedAt = i;
    });
    // Detection fires on the final character of the sentinel.
    expect(lockedAt).toBe(LOCK_SENTINEL.length - 1);
  });

  it("does not false-positive on innocuous text containing 'LOCK'", () => {
    const r = appendAndDetectLock(
      "",
      "Sure — I can talk about deadlock prevention strategies.",
    );
    expect(r.locked).toBe(false);
  });

  it("keeps the tail bounded at LOCK_TAIL_LEN regardless of stream length", () => {
    let tail = "";
    for (let i = 0; i < 50; i++) {
      tail = appendAndDetectLock(tail, "x".repeat(40)).tail;
      expect(tail.length).toBeLessThanOrEqual(LOCK_TAIL_LEN);
    }
  });

  it("does not detect the sentinel if older text scrolled past the window", () => {
    // Push enough non-sentinel text through to flush the window, then push
    // the first half of the sentinel only.
    let tail = "";
    tail = appendAndDetectLock(tail, "x".repeat(LOCK_TAIL_LEN * 2)).tail;
    const r = appendAndDetectLock(tail, "LOCK_");
    expect(r.locked).toBe(false);
  });
});
