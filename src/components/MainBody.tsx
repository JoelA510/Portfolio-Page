import { useEffect, useRef, useState } from "react";
import { PORTFOLIO, PROJECTS } from "../data/portfolio";
import { currentAvailability } from "../data/availability";
import { clamp01, useInViewProgress } from "../hooks/useInViewProgress";
import { useMouseParallax } from "../hooks/useMouseParallax";
import { ProjectCard } from "./ProjectCard";

function LiveTicker() {
  const items = [
    { label: "now", value: currentAvailability() },
    { label: "based", value: "UTC−8 · remote" },
    { label: "stack", value: "TypeScript · React · Supabase · Postgres" },
    { label: "agents", value: "Antigravity · Claude Code · Copilot" },
    { label: "validation", value: "Playwright BDD · Zod · RLS" },
    { label: "search", value: "ParadeDB · BM25 + vector" },
    { label: "projects", value: PROJECTS.map((p) => p.title).join(" · ") },
  ];
  return (
    <div className="best-ticker">
      <div className="best-ticker-track">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="best-ticker-item">
            <span className="best-ticker-dot" />
            <span className="best-ticker-label">{it.label}</span>
            <span className="best-ticker-value">{it.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroHeadline() {
  const ref = useRef<HTMLElement>(null);
  useMouseParallax(ref, 0.1);
  return (
    <header ref={ref} className="best-hero" id="top">
      <div className="best-hero-kicker">
        <span className="best-hero-kicker-dot" />
        <span>
          Selected work · {PROJECTS.length} projects · 2024–2026
        </span>
      </div>
      <h2 className="best-hero-title">
        <span className="best-hero-line">Production software,</span>
        <span className="best-hero-line">architected with AI as</span>
        <span className="best-hero-line">
          the <span className="best-hero-mono">execution_layer</span>.
        </span>
      </h2>
      <p className="best-hero-lede">
        I build production software by directing AI agents through rigorous
        constraints — architecture, schemas, and test suites I define up front.
        The agents ship the code; the design discipline is mine.
      </p>
      <div className="best-hero-actions">
        <a
          href="#proj-squadlogic"
          className="best-btn-primary"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("proj-squadlogic")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          See the work <span>↓</span>
        </a>
        <a
          href="#contact"
          className="best-btn-ghost"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Hire me
        </a>
      </div>
    </header>
  );
}

const MONO_SET = new Set([
  "agents",
  "agent",
  "ai",
  "schemas",
  "tests",
  "execution_layer",
  "playwright",
  "bdd",
  "rls",
  "test_suite",
  "constraints",
]);

function MorphWord({ word, progress }: { word: string; progress: number }) {
  const key = word.replace(/[^a-z0-9_]/gi, "").toLowerCase();
  const isMono = MONO_SET.has(key);
  return (
    <span
      className={`best-morph ${isMono ? "is-mono" : ""}`}
      style={{ ["--wp" as string]: progress.toFixed(3) } as React.CSSProperties}
    >
      <span className="best-morph-ink">{word}</span>
    </span>
  );
}

function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const prog = useInViewProgress(ref, { start: 0.15, end: 0.7 });
  const lines = [
    { text: "AI is a fast collaborator,", s: 0, e: 0.14 },
    { text: "not a finished engineer.", s: 0.12, e: 0.28 },
    { text: "So I bring the judgment:", s: 0.26, e: 0.4 },
    { text: "clear architecture, honest", s: 0.38, e: 0.54 },
    { text: "schemas, a test_suite", s: 0.52, e: 0.66 },
    { text: "that actually catches things.", s: 0.64, e: 0.8 },
    { text: "The agents move quickly;", s: 0.78, e: 0.9 },
    { text: "the care is mine.", s: 0.88, e: 1 },
  ];
  return (
    <section ref={ref} id="manifesto" className="best-manifesto">
      <div className="best-manifesto-kicker">◦ manifesto</div>
      <div className="best-manifesto-body">
        {lines.map((l, i) => {
          const words = l.text.split(/(\s+)/);
          const content = words.filter((w) => !/^\s+$/.test(w));
          const span = l.e - l.s;
          let wi = 0;
          return (
            <div key={i} className="best-manifesto-line">
              {words.map((w, j) => {
                if (/^\s+$/.test(w)) return <span key={j}>{w}</span>;
                const ls = l.s + span * (wi / content.length);
                const le = l.s + span * ((wi + 1) / content.length);
                const wp = clamp01((prog - ls) / (le - ls));
                wi++;
                return <MorphWord key={j} word={w} progress={wp} />;
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Traits() {
  return (
    <section className="best-traits" aria-label="Engineering principles">
      {PORTFOLIO.traits.map((t) => (
        <article key={t.title} className="best-trait">
          <div className="best-trait-glyph">{t.glyph}</div>
          <h3 className="best-trait-title">{t.title}</h3>
          <p className="best-trait-desc">{t.description}</p>
        </article>
      ))}
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="best-contact">
      <div className="best-contact-kicker">◦ contact</div>
      <h3 className="best-contact-title">
        Let's <em>build</em> something
      </h3>
      <p className="best-contact-sub">
        Architecture reviews, agentic builds, rescues. Remote, UTC−8, &lt;24h
        weekdays.
      </p>
      <a href={`mailto:${PORTFOLIO.email}`} className="best-contact-email">
        {PORTFOLIO.email}
      </a>
      <div className="best-contact-row">
        <a
          href={`mailto:${PORTFOLIO.email}?subject=Project%20inquiry&body=Hi%20Joel%2C`}
          className="best-btn-primary"
        >
          Draft an email <span>→</span>
        </a>
        <a
          href={PORTFOLIO.github}
          target="_blank"
          rel="noreferrer"
          className="best-btn-ghost"
        >
          GitHub
        </a>
        <a
          href={PORTFOLIO.linkedin}
          target="_blank"
          rel="noreferrer"
          className="best-btn-ghost"
        >
          LinkedIn
        </a>
      </div>
      <div className="best-contact-hint">
        Tip: press <kbd>~</kbd> anywhere for the terminal, or <kbd>⌘K</kbd> for
        the command palette.
      </div>
    </section>
  );
}

function Footer() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const stamp = now.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <footer className="best-footer">
      <div className="best-footer-l">
        <a
          href={PORTFOLIO.github}
          target="_blank"
          rel="noreferrer"
          className="best-footer-copy has-tip"
          data-tip="GitHub"
          aria-label="GitHub profile"
        >
          © {now.getFullYear()} {PORTFOLIO.name}
        </a>
      </div>
      <div className="best-footer-c">
        <span className="best-footer-ts">Current as of {stamp}</span>
      </div>
      <a
        href={PORTFOLIO.linkedin}
        target="_blank"
        rel="noreferrer"
        className="best-footer-avail has-tip"
        data-tip="LinkedIn"
        aria-label="LinkedIn profile"
      >
        <span className="best-footer-dot" />
        Available for Technical Partnerships
      </a>
    </footer>
  );
}

type Props = {
  expanded: string | null;
  setExpanded: (id: string | null) => void;
};

export function MainBody({ expanded, setExpanded }: Props) {
  return (
    <main className="best-main" id="main-scroll">
      <LiveTicker />
      <div className="best-main-inner">
        <HeroHeadline />
        <Manifesto />
        <Traits />
        <div className="best-work">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              expanded={expanded === p.id}
              setExpanded={setExpanded}
            />
          ))}
        </div>
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
