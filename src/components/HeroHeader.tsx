import { PORTFOLIO } from "../data/portfolio";

type Props = {
  status: string;
  title: string;
  lede: string;
  certifications?: string[];
};

/** Hero header — status pill, headline, lede, optional certs, and the standard links. Shared across every tab. */
export function HeroHeader({ status, title, lede, certifications }: Props) {
  return (
    <header className="hero wrap" id="top">
      <p className="hero-status">
        <span className="dot" aria-hidden="true" />
        {status}
      </p>
      <h1>{title}</h1>
      <p className="hero-lede">{lede}</p>
      {certifications && certifications.length > 0 && (
        <p className="hero-certs">
          <span className="label">Certifications </span>
          {certifications.join(" · ")}
        </p>
      )}
      <div className="hero-links">
        <a className="btn btn-primary" href={`mailto:${PORTFOLIO.email}`}>
          Get in touch
        </a>
        <a className="btn btn-quiet" href={PORTFOLIO.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="btn btn-quiet" href={PORTFOLIO.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </header>
  );
}
