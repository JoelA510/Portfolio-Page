import { useEffect, useRef, useState } from "react";

const SEED_PROMPTS = [
  "How do you prevent AI hallucinations in production?",
  "Walk me through the PlanterPlan architecture.",
  "Are you available for contract work?",
];

type Message = { role: "user" | "model"; content: string };

type ChatResponse =
  | { text: string }
  | { locked: true }
  | { error: string };

export function SidebarChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async (text?: string) => {
    const t = (text ?? input).trim();
    if (!t || loading || locked) return;
    setInput("");
    const next: Message[] = [...messages, { role: "user", content: t }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: next.map((m) => ({
            role: m.role,
            parts: [{ text: m.content }],
          })),
        }),
      });
      const data = (await res.json()) as ChatResponse;
      if ("locked" in data && data.locked) {
        setLocked(true);
      } else if ("error" in data) {
        setMessages((m) => [
          ...m,
          { role: "model", content: data.error },
        ]);
      } else if ("text" in data) {
        // Belt-and-suspenders: server also filters this, but keep the client
        // check so a misconfigured server path can't slip through.
        if (data.text.includes("LOCK_CHATBOT")) {
          setLocked(true);
        } else {
          setMessages((m) => [
            ...m,
            {
              role: "model",
              content: data.text || "Let me rephrase — try that again?",
            },
          ]);
        }
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "model", content: "Network hiccup — try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="best-chat">
      <div className="best-chat-head">
        <span className="best-chat-pulse" />
        <span>ask.agent</span>
        <span className="best-chat-model">gemini</span>
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
              {loading && (
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
              disabled={loading}
              aria-label="Ask a question"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
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
