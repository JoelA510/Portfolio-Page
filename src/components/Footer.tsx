import { PORTFOLIO } from "../data/portfolio";

/**
 * Locked footer: © → GitHub (tooltip), when the content was last revised,
 * availability → LinkedIn (tooltip).
 */
export function Footer() {
  const year = new Date().getFullYear();

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
          © {year} {PORTFOLIO.name}
        </a>
        <span className="f-clock">Content last updated {PORTFOLIO.contentUpdated}</span>
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
