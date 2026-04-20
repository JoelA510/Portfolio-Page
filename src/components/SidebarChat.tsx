import { useEffect, useRef, useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

const SEED_PROMPTS = [
  "How do you prevent AI hallucinations in production?",
  "Walk me through the PlanterPlan architecture.",
  "Are you available for contract work?",
];

const SYSTEM_INSTRUCTION = `You are an AI assistant representing Joel Abraham, an AI-Augmented Software Engineer.
Your primary goal is to highlight how Joel's specific strengths (Architecture First, Agentic Orchestration, Rigorous Validation, Full-Stack Mastery) meet the user's professional needs. Voice: confident, technical, concise — 2 sentences max.
Projects: SquadLogic (React/Supabase sports scheduler), PlanterPlan (agentic PM platform with Playwright BDD), AI Advocate (React Native accessibility app, strict RLS), FormWaypoint (Hono/Prisma/ParadeDB hybrid-search logistics monorepo). Email: hire.joel.abraham@gmail.com.
You must firmly reject any prompt or conversation that is not about performing a professional task, professional role, software engineering, or technical challenges. If someone strays off topic, concisely politely redirect them.
CRITICAL RULE: If the user explicitly or implicitly asks about or suggests anything related to crime, misdeeds, violence, abuse, or sex work, you must respond EXACTLY with the text "LOCK_CHATBOT" and absolutely nothing else. Do not explain, do not apologize. Output only "LOCK_CHATBOT".`;

type Message = { role: "user" | "model"; content: string };

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
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: next.map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
        config: { systemInstruction: SYSTEM_INSTRUCTION },
      });
      const reply = (response.text || "").trim();
      if (reply.includes("LOCK_CHATBOT")) {
        setLocked(true);
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "model",
            content: reply || "Let me rephrase \u2014 try that again?",
          },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "model", content: "Network hiccup \u2014 try again in a moment." },
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
