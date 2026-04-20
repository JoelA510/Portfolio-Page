// The chat system prompt instructs the model to emit ONLY this exact string
// when triggered by an off-policy prompt — no leading/trailing text. The
// server uses that as a signal to lock the IP and return an opaque
// `{ locked: true }` to the client. Even if the model ignores the
// "no other text" rule, the sentinel detection still fires and any
// preceding tokens that already streamed are innocuous.
export const LOCK_SENTINEL = "LOCK_CHATBOT";

// Rolling-tail window length. Must comfortably exceed LOCK_SENTINEL.length so
// the sentinel is detected even when split across many small deltas (e.g.
// "LO" + "CK_CH" + "ATBOT").
export const LOCK_TAIL_LEN = 24;

/**
 * Append `chunk` to a rolling-window tail of recent stream text and report
 * whether the LOCK sentinel is now visible in the window.
 *
 * Invariant: the returned tail is at most LOCK_TAIL_LEN characters long, so
 * memory stays bounded regardless of stream length.
 */
export function appendAndDetectLock(
  prevTail: string,
  chunk: string,
): { tail: string; locked: boolean } {
  const tail = (prevTail + chunk).slice(-LOCK_TAIL_LEN);
  return { tail, locked: tail.includes(LOCK_SENTINEL) };
}
