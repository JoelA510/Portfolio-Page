import { useEffect, useRef, useState } from "react";

const SEED_PROMPTS = [
  "How do you prevent AI hallucinations in production?",
  "Walk me through the PlanterPlan architecture.",
  "Are you available for contract work?",
];

type Message = { role: "user" | "model"; content: string };

type JsonResponse =
  | { text: string }
  | { locked: true }
  | { error: string };

type StreamEvent =
  | { delta: string }
  | { locked: true }
  | { error: string }
  | { done: true };

export function SidebarChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  // `loading` = waiting for first byte (typing dots).
  // It flips off once the first delta arrives so the dots get replaced by
  // the streaming bubble. `streaming` keeps the input disabled during the
  // rest of the response so the user can't pile on mid-reply.
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [locked, setLocked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const appendModel = (content: string) =>
    setMessages((m) => [...m, { role: "model", content }]);

  const updateLastModel = (content: string) =>
    setMessages((m) => {
      const next = [...m];
      const last = next[next.length - 1];
      if (last && last.role === "model") {
        next[next.length - 1] = { ...last, content };
      }
      return next;
    });

  const send = async (text?: string) => {
    const t = (text ?? input).trim();
    if (!t || loading || streaming || locked) return;
    setInput("");
    const next: Message[] = [...messages, { role: "user", content: t }];
    setMessages(next);
    setLoading(true);
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({
            role: m.role === "model" ? "assistant" : "user",
            content: m.content,
          })),
        }),
      });

      const ct = res.headers.get("content-type") || "";
      // Non-streaming path: rate-limit, validation, locked-on-arrival, no key.
      if (ct.includes("application/json")) {
        const data = (await res.json()) as JsonResponse;
        if ("locked" in data && data.locked) {
          setLocked(true);
        } else if ("error" in data) {
          appendModel(data.error);
        } else if ("text" in data) {
          if (data.text.includes("LOCK_CHATBOT")) setLocked(true);
          else appendModel(data.text || "Let me rephrase — try that again?");
        }
        return;
      }

      if (!res.body) throw new Error("no response body");

      // Stream parse. The server sends one JSON object per SSE event.
      // SSE spec allows \n, \r, or \r\n between events / lines.
      const EVENT_SEPARATOR = /\r?\n\r?\n/;
      const LINE_SEPARATOR = /\r?\n/;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let pending = "";
      let acc = "";
      let placeholderAdded = false;

      streamLoop: while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        pending += decoder.decode(value, { stream: true });
        const events = pending.split(EVENT_SEPARATOR);
        pending = events.pop() ?? "";
        for (const event of events) {
          for (const line of event.split(LINE_SEPARATOR)) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (!payload) continue;
            let obj: StreamEvent;
            try {
              obj = JSON.parse(payload) as StreamEvent;
            } catch {
              continue;
            }
            if ("locked" in obj && obj.locked) {
              setLocked(true);
              if (placeholderAdded) {
                // Drop the partial bubble — its tokens were the prefix of the
                // sentinel and aren't worth showing.
                setMessages((m) => m.slice(0, -1));
              }
              break streamLoop;
            }
            if ("error" in obj) {
              if (placeholderAdded) updateLastModel(obj.error);
              else appendModel(obj.error);
              break streamLoop;
            }
            if ("done" in obj && obj.done) {
              break streamLoop;
            }
            if ("delta" in obj && typeof obj.delta === "string") {
              acc += obj.delta;
              // Belt-and-suspenders: the server also detects this, but if the
              // sentinel ever slipped through, freeze the UI.
              if (acc.includes("LOCK_CHATBOT")) {
                setLocked(true);
                if (placeholderAdded) setMessages((m) => m.slice(0, -1));
                break streamLoop;
              }
              if (!placeholderAdded) {
                placeholderAdded = true;
                setLoading(false);
                appendModel(acc);
              } else {
                updateLastModel(acc);
              }
            }
          }
        }
      }

      if (!placeholderAdded && !locked) {
        appendModel("Let me rephrase — try that again?");
      }
    } catch {
      appendModel("Network hiccup — try again in a moment.");
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  };

  const isEmpty = messages.length === 0;
  const lastIsModel = messages[messages.length - 1]?.role === "model";

  return (
    <div className="best-chat">
      <div className="best-chat-head">
        <span className="best-chat-pulse" />
        <span>ask.agent</span>
        <span className="best-chat-model">gemma</span>
      </div>
      {locked ? (
        <div
          style={{
            padding: "14px",
            fontSize: "12.5px",
            lineHeight: 1.5,
            color: "var(--ink-soft)",
          }}
        >
          <div style={{ color: "var(--err)", fontWeight: 600, marginBottom: 6 }}>
            Chat locked
          </div>
          Conversation closed due to off-topic content. Reload to start a fresh
          professional session.
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="best-btn-ghost best-btn-sm"
              style={{ padding: "6px 12px", fontSize: 11 }}
            >
              Reload
            </button>
          </div>
        </div>
      ) : (
        <>
          {!isEmpty && (
            <div ref={scrollRef} className="best-chat-body">
              {messages.map((m, i) => (
                <div key={i} className={`best-msg best-msg-${m.role}`}>
                  <div className="best-msg-text">{m.content}</div>
                </div>
              ))}
              {loading && !lastIsModel && (
                <div className="best-msg best-msg-model">
                  <div className="best-msg-text best-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>
          )}
          {isEmpty && (
            <div className="best-chat-seeds">
              {SEED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="best-seed"
                  type="button"
                >
                  {p}
                </button>
              ))}
            </div>
          )}
          <form
            className="best-chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <span className="best-chat-caret">›</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              disabled={loading || streaming}
              aria-label="Ask a question"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading || streaming}
              aria-label="Send"
            >
              ↵
            </button>
          </form>
        </>
      )}
    </div>
  );
}
