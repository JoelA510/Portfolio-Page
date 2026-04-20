import { useEffect, useRef, useState } from "react";
import { PORTFOLIO, PROJECTS } from "../data/portfolio";

type Line = { kind: "in" | "out" | "err"; text: string };

const BANNER: string[] = [
  "joel.portfolio.console v1.0.0",
  "type `help` for commands, `hire joel` to talk.",
];

type CmdResult = string | string[] | "__clear__" | "__close__";

const CMDS: Record<string, () => Promise<CmdResult> | CmdResult> = {
  help: () => [
    "commands:",
    "  help              this list",
    "  hire joel         open email draft",
    "  email             copy email to clipboard",
    "  projects          list selected work",
    "  stack             primary stack",
    "  availability      current status",
    "  github / linkedin open profiles",
    "  clear             clear terminal",
    "  close             hide drawer",
  ],
  "hire joel": () => {
    window.location.href = `mailto:${PORTFOLIO.email}?subject=Project%20inquiry&body=Hi%20Joel%2C`;
    return ["✓ opening email draft to " + PORTFOLIO.email];
  },
  email: async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO.email);
      return ["✓ copied — " + PORTFOLIO.email];
    } catch {
      return ["email: " + PORTFOLIO.email];
    }
  },
  projects: () =>
    PROJECTS.map(
      (p, i) =>
        `  ${String(i + 1).padStart(2, "0")}  ${p.title.padEnd(14)} · ${p.tagline}`,
    ),
  stack: () => [
    "stack:",
    "  languages    · TypeScript · Python",
    "  frontend     · React · React Native · Vite · Expo",
    "  backend      · Hono · Supabase · Prisma · Postgres",
    "  search       · ParadeDB (BM25 + vector)",
    "  testing      · Playwright BDD · Vitest",
    "  agents       · Antigravity · Claude Code · Copilot",
  ],
  availability: () => [
    "◉ available · spring 2026",
    "  timezone    · UTC-8 (PST)",
    "  response    · < 24h weekdays",
  ],
  github: () => {
    window.open(PORTFOLIO.github, "_blank", "noopener");
    return ["↗ " + PORTFOLIO.github];
  },
  linkedin: () => {
    window.open(PORTFOLIO.linkedin, "_blank", "noopener");
    return ["↗ " + PORTFOLIO.linkedin];
  },
  clear: () => "__clear__",
  close: () => "__close__",
};

type Props = { open: boolean; setOpen: (v: boolean) => void };

export function TerminalDrawer({ open, setOpen }: Props) {
  const [history, setHistory] = useState<Line[]>(
    BANNER.map((t) => ({ kind: "out", text: t })),
  );
  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history, open]);

  const run = async (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setPast((p) => [...p, raw]);
    setHistIdx(-1);
    const prompt: Line = { kind: "in", text: raw };
    const match = Object.keys(CMDS)
      .sort((a, b) => b.length - a.length)
      .find((k) => cmd === k || cmd.startsWith(k + " "));
    if (!match) {
      setHistory((h) => [
        ...h,
        prompt,
        { kind: "err", text: `unknown: ${cmd.split(" ")[0]} — try \`help\`` },
      ]);
      return;
    }
    const r = await CMDS[match]();
    if (r === "__clear__") {
      setHistory([]);
      return;
    }
    if (r === "__close__") {
      setOpen(false);
      return;
    }
    const lines = Array.isArray(r) ? r : [String(r)];
    setHistory((h) => [
      ...h,
      prompt,
      ...lines.map((t) => ({ kind: "out" as const, text: t })),
    ]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (past.length === 0) return;
      const ni = histIdx < 0 ? past.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(ni);
      setInput(past[ni]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < 0) return;
      const ni = histIdx + 1;
      if (ni >= past.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(ni);
        setInput(past[ni]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = Object.keys(CMDS).filter((k) =>
        k.startsWith(input.toLowerCase()),
      );
      if (m.length === 1) setInput(m[0]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className={`best-term-drawer ${open ? "is-open" : ""}`}>
      <div className="best-term-chrome">
        <span className="best-term-dot" style={{ background: "#ff5f57" }} />
        <span className="best-term-dot" style={{ background: "#febc2e" }} />
        <span className="best-term-dot" style={{ background: "#28c840" }} />
        <span className="best-term-title">joel@portfolio — zsh</span>
        <div className="best-term-spacer" />
        <button
          onClick={() => setOpen(false)}
          className="best-term-close"
          aria-label="Close"
          type="button"
        >
          ×
        </button>
      </div>
      <div
        ref={bodyRef}
        className="best-term-body"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((l, i) => (
          <div key={i} className={`best-term-line is-${l.kind}`}>
            {l.kind === "in" && (
              <span className="best-term-prompt">joel@portfolio ~ %</span>
            )}
            <span>{l.text}</span>
          </div>
        ))}
        <div className="best-term-line is-input">
          <span className="best-term-prompt">joel@portfolio ~ %</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
          />
          <span className="best-term-caret" />
        </div>
      </div>
      <div className="best-term-hints">
        <span>try:</span>
        {["hire joel", "projects", "stack", "availability"].map((s) => (
          <button
            key={s}
            onClick={() => void run(s)}
            className="best-term-hint"
            type="button"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
