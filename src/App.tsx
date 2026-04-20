import { useCallback, useEffect, useState } from "react";
import { CommandPalette } from "./components/CommandPalette";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { MainBody } from "./components/MainBody";
import { Sidebar } from "./components/Sidebar";
import { TerminalDrawer } from "./components/TerminalDrawer";
import { PROJECTS } from "./data/portfolio";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [termOpen, setTermOpen] = useState(false);

  const jumpTo = useCallback((id: string) => {
    const el = document.getElementById(`proj-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setExpanded(id);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const active = document.activeElement;
      const inInput =
        !!active &&
        (active.tagName === "INPUT" || active.tagName === "TEXTAREA");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === "~" && !inInput) {
        e.preventDefault();
        setTermOpen((o) => !o);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
        setTermOpen(false);
      } else if (!inInput && !e.metaKey && !e.ctrlKey) {
        if (e.key === "j") {
          const i = PROJECTS.findIndex((p) => p.id === expanded);
          const next =
            PROJECTS[Math.min(PROJECTS.length - 1, i + 1)] || PROJECTS[0];
          jumpTo(next.id);
        } else if (e.key === "k") {
          const i = PROJECTS.findIndex((p) => p.id === expanded);
          const prev =
            PROJECTS[Math.max(0, i - 1)] || PROJECTS[PROJECTS.length - 1];
          jumpTo(prev.id);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, jumpTo]);

  return (
    <ErrorBoundary>
      <Sidebar
        theme={theme}
        toggleTheme={toggleTheme}
        onJump={jumpTo}
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenTerm={() => setTermOpen(true)}
      />
      <MainBody expanded={expanded} setExpanded={setExpanded} />
      <CommandPalette
        open={paletteOpen}
        setOpen={setPaletteOpen}
        onJump={jumpTo}
        onToggleTheme={toggleTheme}
        onOpenTerm={() => {
          setPaletteOpen(false);
          setTermOpen(true);
        }}
      />
      <TerminalDrawer open={termOpen} setOpen={setTermOpen} />
    </ErrorBoundary>
  );
}
