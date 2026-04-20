import { Fragment, useEffect, useRef, useState } from "react";
import type { Project } from "../data/portfolio";
import { PROJECTS } from "../data/portfolio";
import { useMouseParallax } from "../hooks/useMouseParallax";

type Node = { id: string; label: string; x: number; y: number; kind: string };
type Topo = { nodes: Node[]; edges: [string, string][] };

const TOPOS: Record<string, Topo> = {
  squadlogic: {
    nodes: [
      { id: "user", label: "Coach", x: 50, y: 50, kind: "in" },
      { id: "fe", label: "React 18", x: 180, y: 50, kind: "fe" },
      { id: "alg", label: "Roster Engine", x: 180, y: 140, kind: "core" },
      { id: "sb", label: "Supabase", x: 180, y: 230, kind: "db" },
      { id: "rls", label: "RLS", x: 330, y: 230, kind: "policy" },
    ],
    edges: [["user", "fe"], ["fe", "alg"], ["alg", "sb"], ["sb", "rls"]],
  },
  planterplan: {
    nodes: [
      { id: "agent", label: "Agents", x: 50, y: 50, kind: "ai" },
      { id: "rules", label: ".agent/rules", x: 50, y: 160, kind: "policy" },
      { id: "gen", label: "Codegen", x: 200, y: 110, kind: "core" },
      { id: "bdd", label: "Playwright BDD", x: 340, y: 50, kind: "test" },
      { id: "fail", label: "Remediation", x: 340, y: 160, kind: "loop" },
      { id: "audit", label: "Audit", x: 200, y: 230, kind: "out" },
    ],
    edges: [
      ["agent", "gen"],
      ["rules", "gen"],
      ["gen", "bdd"],
      ["bdd", "fail"],
      ["fail", "gen"],
      ["bdd", "audit"],
    ],
  },
  "ai-advocate": {
    nodes: [
      { id: "rn", label: "React Native", x: 50, y: 50, kind: "fe" },
      { id: "api", label: "Supabase", x: 200, y: 50, kind: "core" },
      { id: "edge", label: "Edge Fns", x: 340, y: 120, kind: "core" },
      { id: "pg", label: "Postgres", x: 200, y: 190, kind: "db" },
      { id: "rls", label: "RLS", x: 50, y: 190, kind: "policy" },
      { id: "ai", label: "AI Services", x: 340, y: 230, kind: "ai" },
    ],
    edges: [
      ["rn", "api"],
      ["api", "edge"],
      ["api", "pg"],
      ["pg", "rls"],
      ["edge", "ai"],
    ],
  },
  formwaypoint: {
    nodes: [
      { id: "data", label: "Logistics", x: 50, y: 50, kind: "in" },
      { id: "hono", label: "Hono API", x: 200, y: 50, kind: "core" },
      { id: "zod", label: "Zod", x: 340, y: 100, kind: "policy" },
      { id: "prisma", label: "Prisma", x: 200, y: 140, kind: "core" },
      { id: "bm25", label: "BM25", x: 340, y: 195, kind: "db" },
      { id: "vec", label: "Vector", x: 340, y: 245, kind: "db" },
      { id: "parade", label: "ParadeDB", x: 200, y: 230, kind: "db" },
    ],
    edges: [
      ["data", "hono"],
      ["hono", "zod"],
      ["hono", "prisma"],
      ["prisma", "parade"],
      ["parade", "bm25"],
      ["parade", "vec"],
    ],
  },
};

const KIND_COLOR: Record<string, string> = {
  in: "var(--muted)",
  fe: "var(--accent-ink)",
  core: "var(--accent)",
  db: "var(--good)",
  policy: "var(--warn)",
  ai: "var(--accent-2)",
  test: "var(--info)",
  loop: "var(--err)",
  out: "var(--muted)",
};

function ArchGraph({ projectId, active }: { projectId: string; active: boolean }) {
  const topo = TOPOS[projectId];
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    if (!active || !topo) return;
    const id = setInterval(
      () => setPulse((p) => (p + 1) % topo.edges.length),
      1000,
    );
    return () => clearInterval(id);
  }, [active, topo]);
  if (!topo) return null;
  return (
    <svg
      className="best-graph"
      viewBox="0 0 400 280"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={`g-${projectId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g opacity="0.12">
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 32}
            x2="400"
            y2={i * 32}
            stroke="currentColor"
            strokeWidth="0.4"
          />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 32}
            y1="0"
            x2={i * 32}
            y2="280"
            stroke="currentColor"
            strokeWidth="0.4"
          />
        ))}
      </g>
      {topo.edges.map(([a, b], i) => {
        const na = topo.nodes.find((n) => n.id === a)!;
        const nb = topo.nodes.find((n) => n.id === b)!;
        const isActive = pulse === i && active;
        return (
          <g key={i}>
            <line
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="currentColor"
              strokeWidth={isActive ? 1.6 : 0.8}
              strokeOpacity={isActive ? 1 : 0.32}
              strokeDasharray={isActive ? "0" : "3 3"}
              style={{ transition: "all .4s" }}
            />
            {isActive && (
              <circle r="3" fill="currentColor">
                <animateMotion
                  dur="1s"
                  repeatCount="1"
                  path={`M${na.x},${na.y} L${nb.x},${nb.y}`}
                />
              </circle>
            )}
          </g>
        );
      })}
      {topo.nodes.map((n) => (
        <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
          <circle
            r="20"
            fill={`url(#g-${projectId})`}
            style={{ color: KIND_COLOR[n.kind] }}
          />
          <circle
            r="5.5"
            fill={KIND_COLOR[n.kind]}
            stroke="var(--card)"
            strokeWidth="1.5"
          />
          <circle r="2.5" fill={KIND_COLOR[n.kind]} />
          <text
            x="12"
            y="4"
            fontSize="9"
            fill="var(--ink)"
            fontFamily="var(--mono)"
            letterSpacing="0.3"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

type PreviewState = "idle" | "loading" | "ready" | "error";

function Preview({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  useMouseParallax(ref, 0.04);
  const [state, setState] = useState<PreviewState>("idle");
  const timerRef = useRef<number | null>(null);

  const wake = () => {
    setState("loading");
    timerRef.current = window.setTimeout(() => setState("error"), 9000);
  };
  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <div ref={ref} className="best-preview">
      <div className="best-preview-bar">
        <span className="best-preview-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="best-preview-url">
          {project.previewUrl.replace(/^https?:\/\//, "")}
        </span>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="best-preview-out"
        >
          ↗
        </a>
      </div>
      <div className="best-preview-body">
        {state === "idle" && (
          <button className="best-preview-wake" onClick={wake} type="button">
            <span className="best-preview-wake-dot" /> Wake instance
          </button>
        )}
        {state === "loading" && (
          <>
            <iframe
              src={project.previewUrl}
              title={project.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin"
              onLoad={() => {
                if (timerRef.current) window.clearTimeout(timerRef.current);
                setState("ready");
              }}
            />
            <div className="best-preview-spin">
              <div />
              <span>negotiating peer connection</span>
            </div>
          </>
        )}
        {state === "ready" && (
          <iframe
            src={project.previewUrl}
            title={project.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin"
          />
        )}
        {state === "error" && (
          <div className="best-preview-err">
            <div className="best-preview-err-badge">⚠</div>
            <div className="best-preview-err-title">Framing restricted</div>
            <div className="best-preview-err-body">
              This destination blocks embedding. Open it in a new tab.
            </div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="best-btn-primary best-btn-sm"
            >
              Open live ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

type Props = {
  project: Project;
  index: number;
  expanded: boolean;
  setExpanded: (id: string | null) => void;
};

export function ProjectCard({ project, index, expanded, setExpanded }: Props) {
  const [view, setView] = useState<"preview" | "arch">("preview");
  return (
    <article
      id={`proj-${project.id}`}
      className={`best-card ${expanded ? "is-open" : ""}`}
    >
      <button
        className="best-card-head"
        onClick={() => setExpanded(expanded ? null : project.id)}
        aria-expanded={expanded}
        type="button"
      >
        <div className="best-card-num">
          <span className="best-card-num-big">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="best-card-num-total">
            / {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>
        <div className="best-card-meta">
          <div className="best-card-tag">{project.tagline}</div>
          <h3 className="best-card-title">{project.title}</h3>
          <p className="best-card-desc">{project.description}</p>
        </div>
        <div className="best-card-chev" aria-hidden>
          <span>{expanded ? "collapse" : "expand"}</span>
          <span className="best-card-chev-arrow">{expanded ? "↑" : "↓"}</span>
        </div>
      </button>

      <div className="best-card-canvas" data-view={view}>
        <div className="best-card-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={view === "preview"}
            onClick={() => setView("preview")}
            className={`best-card-tab ${view === "preview" ? "is-active" : ""}`}
            type="button"
          >
            Live preview
          </button>
          <button
            role="tab"
            aria-selected={view === "arch"}
            onClick={() => setView("arch")}
            className={`best-card-tab ${view === "arch" ? "is-active" : ""}`}
            type="button"
          >
            Architecture
          </button>
          <div className="best-card-tabs-spacer" />
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="best-card-tab-link"
          >
            <span>⟨/⟩</span> Source
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="best-card-tab-link"
          >
            <span>↗</span> Live
          </a>
        </div>
        <div className="best-card-stage">
          {view === "preview" ? (
            <Preview project={project} />
          ) : (
            <div className="best-card-arch" style={{ color: "var(--accent)" }}>
              <ArchGraph projectId={project.id} active />
            </div>
          )}
        </div>
      </div>

      {expanded && (
        <div className="best-card-more">
          <div className="best-stack">
            <div className="best-stack-label">Core stack</div>
            <div className="best-chips">
              {project.tech.map((t) => (
                <span key={t.name} title={t.description} className="best-chip">
                  {t.name}
                </span>
              ))}
            </div>
          </div>
          <div className="best-stack">
            <div className="best-stack-label">Agents &amp; validation</div>
            <div className="best-chips">
              {project.aiStack.map((t) => (
                <span
                  key={t.name}
                  title={t.description}
                  className="best-chip is-accent"
                >
                  {t.name}
                </span>
              ))}
            </div>
          </div>
          <div className="best-stack">
            <div className="best-stack-label">Audit &amp; remediation loop</div>
            <div className="best-loop-steps">
              {project.remediation.split(/ ?➔ ?/).map((step, i, arr) => (
                <Fragment key={i}>
                  <span className="best-loop-step">
                    {step.replace(/^\d+\.\s*/, "")}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="best-loop-step-sep">→</span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
