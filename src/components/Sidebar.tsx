import { PORTFOLIO, PROJECTS } from "../data/portfolio";
import type { Theme } from "../hooks/useTheme";
import { LivePipelineGlyph } from "./LivePipelineGlyph";
import { SidebarChat } from "./SidebarChat";

type Props = {
  theme: Theme;
  toggleTheme: () => void;
  onJump: (id: string) => void;
  onOpenPalette: () => void;
  onOpenTerm: () => void;
};

export function Sidebar({
  theme,
  toggleTheme,
  onJump,
  onOpenPalette,
  onOpenTerm,
}: Props) {
  return (
    <aside className="best-sidebar">
      <div className="best-sidebar-scroll">
        <div className="best-id">
          <div className="best-status">
            <span className="best-status-dot" />
            <span>Available · Spring 2026</span>
          </div>
          <h1 className="best-name">
            {PORTFOLIO.name.split("").map((ch, i) => (
              <span key={i} className="best-name-ch">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1>
          <div className="best-role">
            <span className="best-role-mono">role_</span>
            <span className="best-role-serif">AI-augmented software engineer</span>
          </div>
        </div>

        <div className="best-loop-wrap">
          <div className="best-section-label">◦ the practice</div>
          <LivePipelineGlyph />
        </div>

        <div className="best-chat-wrap">
          <SidebarChat />
        </div>

        <div className="best-nav">
          <div className="best-section-label">◦ projects</div>
          {PROJECTS.map((p, i) => (
            <a
              key={p.id}
              href={`#proj-${p.id}`}
              onClick={(e) => {
                e.preventDefault();
                onJump(p.id);
              }}
              className="best-nav-item"
            >
              <span className="best-nav-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="best-nav-title">{p.title}</span>
              <span className="best-nav-arrow">→</span>
            </a>
          ))}
        </div>

        <div className="best-socials">
          <a href={PORTFOLIO.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span className="best-socials-sep">·</span>
          <a href={PORTFOLIO.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span className="best-socials-sep">·</span>
          <a href={`mailto:${PORTFOLIO.email}`}>Email</a>
        </div>
      </div>

      <div className="best-sidebar-foot">
        <button
          onClick={onOpenPalette}
          className="best-foot-btn has-tip best-foot-l"
          data-tip="Command palette"
          aria-label="Command palette"
          type="button"
        >
          <span>⌘K</span>
        </button>
        <button
          onClick={onOpenTerm}
          className="best-foot-btn has-tip best-foot-c"
          data-tip="Terminal"
          aria-label="Terminal"
          type="button"
        >
          <span>~</span>
        </button>
        <button
          onClick={toggleTheme}
          className="best-foot-btn has-tip best-foot-r"
          data-tip={theme === "dark" ? "Light mode" : "Dark mode"}
          aria-label="Toggle theme"
          type="button"
        >
          <span>{theme === "dark" ? "☀" : "☾"}</span>
        </button>
      </div>
    </aside>
  );
}
