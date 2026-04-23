import { useEffect, useState } from "react";

type Stage = { id: number; label: string; sub: string };

const STAGES: Stage[] = [
  { id: 0, label: "architect", sub: "schemas \u00B7 APIs \u00B7 tests" },
  { id: 1, label: "agents", sub: "claude \u00B7 antigravity \u00B7 copilot" },
  { id: 2, label: "verify", sub: "playwright \u00B7 bdd \u00B7 e2e" },
  { id: 3, label: "ship", sub: "prod \u00B7 audit \u00B7 iterate" },
];

export function LivePipelineGlyph() {
  const [autoPhase, setAutoPhase] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (hover !== null) return;
    const id = setInterval(() => setAutoPhase((p) => (p + 1) % 4), 1600);
    return () => clearInterval(id);
  }, [hover]);

  // Mouse users get hover via onMouseEnter/Leave. Touch + pen users get tap-
  // to-pin via onPointerDown: tapping a stage pins it, tapping the same stage
  // again unpins. Ignoring pointerType === "mouse" here keeps desktop behavior
  // identical — a mouse click won't fight the hover state.
  const togglePin = (i: number) => setHover((cur) => (cur === i ? null : i));
  const handlePointerDown = (i: number) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    togglePin(i);
  };

  const phase = hover !== null ? hover : autoPhase;

  const cx = 110;
  const cy = 80;
  const r = 56;
  const angleAt = (i: number) => -Math.PI / 2 + (i * Math.PI) / 2;
  const pt = (i: number) => ({
    x: cx + Math.cos(angleAt(i)) * r,
    y: cy + Math.sin(angleAt(i)) * r,
  });

  const circumference = 2 * Math.PI * r;
  const arcLen = circumference * 0.22;
  const phaseOffset = -(phase * (circumference / 4)) + arcLen / 2;

  return (
    <div className="best-loop">
      <svg viewBox="0 0 220 160" className="best-loop-svg" aria-hidden="true">
        <defs>
          <linearGradient id="loopStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.55"
        />

        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="url(#loopStroke)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${arcLen} ${circumference - arcLen}`}
            strokeDashoffset={phaseOffset}
            style={{ transition: "stroke-dashoffset .6s cubic-bezier(.4,0,.2,1)" }}
          />
        </g>

        {STAGES.map((s, i) => {
          const p = pt(i);
          const active = i === phase;
          return (
            <g
              key={s.id}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onPointerDown={handlePointerDown(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              tabIndex={0}
              role="button"
              aria-label={s.label}
              aria-pressed={i === phase}
              style={{ cursor: "pointer", outline: "none" }}
            >
              <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
              <circle
                cx={p.x}
                cy={p.y}
                r={active ? 14 : 0}
                fill="url(#nodeGlow)"
                style={{ transition: "r .3s" }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={active ? 8 : 4.5}
                fill={active ? "var(--accent-soft)" : "var(--card)"}
                stroke={active ? "var(--accent)" : "var(--line)"}
                strokeWidth={active ? 1.5 : 1}
                style={{ transition: "all .3s cubic-bezier(.4,0,.2,1)" }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={active ? 3 : 2}
                fill={active ? "var(--accent)" : "var(--muted)"}
                style={{ transition: "all .3s" }}
              />
            </g>
          );
        })}
      </svg>

      <div className="best-loop-labels">
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`best-loop-label ${i === phase ? "is-active" : ""}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onPointerDown={handlePointerDown(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            aria-pressed={i === phase}
          >
            <span className="best-loop-label-name">{s.label}</span>
            <span className="best-loop-label-sub">{s.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
