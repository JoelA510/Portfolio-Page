import { useEffect, useState } from "react";
import { PORTFOLIO } from "../data/portfolio";

function formatNow(now: Date): string {
  return now.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Locked footer: © → GitHub (tooltip), live clock centered,
 * availability → LinkedIn (tooltip).
 */
export function Footer() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let id: number | undefined;
    const start = () => {
      setNow(new Date());
      id = window.setInterval(() => setNow(new Date()), 1000);
    };
    const stop = () => window.clearInterval(id);

    // Don't tick a clock nobody's looking at — pause while the tab is
    // hidden/backgrounded and refresh immediately on return.
    if (!document.hidden) start();
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <a
          className="f-left tip"
          data-tip="GitHub"
          href={PORTFOLIO.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          © {now.getFullYear()} {PORTFOLIO.name}
        </a>
        <span className="f-clock">Current as of {formatNow(now)}</span>
        <a
          className="f-right tip"
          data-tip="LinkedIn"
          href={PORTFOLIO.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
        >
          <span className="dot" aria-hidden="true" />
          <span className="f-avail-text">Available for Technical Partnerships</span>
        </a>
      </div>
    </footer>
  );
}
