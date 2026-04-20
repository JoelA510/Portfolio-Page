import { Fragment, useEffect, useRef, useState } from "react";
import { PORTFOLIO, PROJECTS } from "../data/portfolio";

type Action = {
  id: string;
  label: string;
  sub: string;
  group: string;
  run: () => void;
};

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  onJump: (id: string) => void;
  onToggleTheme: () => void;
  onOpenTerm: () => void;
};

export function CommandPalette({
  open,
  setOpen,
  onJump,
  onToggleTheme,
  onOpenTerm,
}: Props) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const actions: Action[] = [
    ...PROJECTS.map((p) => ({
      id: `jump-${p.id}`,
      label: p.title,
      sub: p.tagline,
      group: "Projects",
      run: () => onJump(p.id),
    })),
    {
      id: "top",
      label: "Top",
      sub: "Return to hero",
      group: "Navigate",
      run: () =>
        document.getElementById("top")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "manifesto",
      label: "Manifesto",
      sub: "The practice",
      group: "Navigate",
      run: () =>
        document
          .getElementById("manifesto")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "contact",
      label: "Contact",
      sub: "Get in touch",
      group: "Navigate",
      run: () =>
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "theme",
      label: "Toggle theme",
      sub: "Dark / light",
      group: "Actions",
      run: onToggleTheme,
    },
    {
      id: "term",
      label: "Open terminal",
      sub: "Press ~ anywhere",
      group: "Actions",
      run: onOpenTerm,
    },
    {
      id: "email",
      label: "Email Joel",
      sub: PORTFOLIO.email,
      group: "Contact",
      run: () => {
        window.location.href = `mailto:${PORTFOLIO.email}`;
      },
    },
    {
      id: "github",
      label: "Open GitHub",
      sub: "JoelA510",
      group: "Contact",
      run: () => window.open(PORTFOLIO.github, "_blank", "noopener"),
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      sub: "joel-abraham-cv",
      group: "Contact",
      run: () => window.open(PORTFOLIO.linkedin, "_blank", "noopener"),
    },
  ];

  const filtered = q.trim()
    ? actions.filter((a) =>
        (a.label + " " + a.sub).toLowerCase().includes(q.toLowerCase()),
      )
    : actions;

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const a = filtered[idx];
      if (a) {
        a.run();
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  if (!open) return null;

  let lastGroup: string | null = null;
  return (
    <div className="best-palette-bg" onClick={() => setOpen(false)}>
      <div className="best-palette" onClick={(e) => e.stopPropagation()}>
        <div className="best-palette-top">
          <span className="best-palette-caret">›</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setIdx(0);
            }}
            onKeyDown={onKey}
            placeholder="Search · jump · run…"
          />
          <span className="best-palette-kbd">esc</span>
        </div>
        <div className="best-palette-list">
          {filtered.length === 0 && (
            <div className="best-palette-empty">No matches</div>
          )}
          {filtered.map((a, i) => {
            const showGroup = a.group !== lastGroup;
            lastGroup = a.group;
            return (
              <Fragment key={a.id}>
                {showGroup && (
                  <div className="best-palette-group">{a.group}</div>
                )}
                <button
                  className={`best-palette-item ${i === idx ? "is-active" : ""}`}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => {
                    a.run();
                    setOpen(false);
                  }}
                  type="button"
                >
                  <span className="best-palette-label">{a.label}</span>
                  <span className="best-palette-sub">{a.sub}</span>
                </button>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
