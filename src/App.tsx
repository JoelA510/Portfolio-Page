import { useEffect, useRef, useState } from "react";
import { DomainSection } from "./components/DomainSection";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
import { HomeSection } from "./components/HomeSection";
import { SoftwareSection } from "./components/SoftwareSection";
import { TabBar } from "./components/TabBar";
import { getDomain } from "./data/domains";
import { PORTFOLIO } from "./data/portfolio";
import { useActiveTab } from "./hooks/useActiveTab";
import { useTheme } from "./hooks/useTheme";

const NAV_SECTIONS = ["work", "approach", "contact"] as const;

/**
 * Highlight the nav link for the section currently in view. Re-runs on tab
 * change: switching tabs unmounts the old #work/#approach/#contact nodes and
 * mounts fresh ones, so the observer must re-query and re-observe them.
 */
function useScrollSpy(activeTab: string): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = NAV_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    // Track every section's intersection state (not just the entries in the
    // latest callback batch) so we can tell "nothing is in view" — e.g. when
    // the user has scrolled back up above #work — apart from "no change".
    const intersecting = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        const current = NAV_SECTIONS.find((id) => intersecting.has(id));
        setActive(current ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [activeTab]);

  return active;
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [activeTab, setActiveTab] = useActiveTab();
  const activeSection = useScrollSpy(activeTab);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);

  const navLink = (id: (typeof NAV_SECTIONS)[number], label: string) => (
    <a
      href={`#${id}`}
      className={activeSection === id ? "is-active" : undefined}
      aria-current={activeSection === id ? "location" : undefined}
    >
      {label}
    </a>
  );

  const domain = getDomain(activeTab);

  return (
    <ErrorBoundary>
      <a className="skip-link" href="#work">
        Skip to content
      </a>

      <nav className="nav" aria-label="Main">
        <div className="wrap nav-in">
          <a className="nav-name" href="#top">
            {PORTFOLIO.name}
          </a>
          <div className="nav-links">
            {navLink("work", "Work")}
            {navLink("approach", "Approach")}
            {navLink("contact", "Contact")}
            <button
              type="button"
              className="theme-btn tip"
              data-tip={theme === "dark" ? "Light mode" : "Dark mode"}
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
            <a className="nav-cta" href={`mailto:${PORTFOLIO.email}`}>
              Email me
            </a>
          </div>
        </div>
      </nav>

      <TabBar active={activeTab} onChange={setActiveTab} position="top" />

      {activeTab === "home" && <HomeSection onNavigate={setActiveTab} />}
      {activeTab === "software" && <SoftwareSection />}
      {domain && <DomainSection domain={domain} />}

      <TabBar active={activeTab} onChange={setActiveTab} position="bottom" />

      <Footer />
    </ErrorBoundary>
  );
}
