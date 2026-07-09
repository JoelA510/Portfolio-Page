import type { Domain } from "../data/domains";
import { PORTFOLIO } from "../data/portfolio";
import { ExperienceRow } from "./ExperienceRow";

type Props = {
  domain: Domain;
};

/** Hero + selected work + approach + contact, driven entirely by domain data. */
export function DomainSection({ domain }: Props) {
  return (
    <>
      <header className="hero wrap" id="top">
        <p className="hero-status">
          <span className="dot" aria-hidden="true" />
          {domain.heroStatus}
        </p>
        <h1>{domain.heroTitle}</h1>
        <p className="hero-lede">{domain.heroLede}</p>
        {domain.certifications && domain.certifications.length > 0 && (
          <p className="hero-certs">
            <span className="label">Certifications </span>
            {domain.certifications.join(" · ")}
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

      <main>
        <section className="section wrap" id="work" aria-labelledby="work-h" tabIndex={-1}>
          <div className="section-head">
            <h2 id="work-h">{domain.workHeading}</h2>
            <span className="label">{domain.workLabel}</span>
          </div>
          {domain.entries.map((entry, i) => (
            <ExperienceRow key={entry.id} entry={entry} index={i} />
          ))}
        </section>

        <section className="section wrap" id="approach" aria-labelledby="approach-h">
          <div className="section-head">
            <h2 id="approach-h">How I work</h2>
            <span className="label">Three commitments</span>
          </div>
          <ol className="approach-list">
            {domain.traits.map((trait, i) => (
              <li key={trait.title}>
                <span className="a-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="a-body">
                  <h3>{trait.title}</h3>
                  <p>{trait.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="contact wrap" id="contact" aria-labelledby="contact-h">
          <span className="label">Contact</span>
          <h2 className="contact-head" id="contact-h">
            {domain.contactHeadline}
          </h2>
          <a className="contact-email" href={`mailto:${PORTFOLIO.email}`}>
            {PORTFOLIO.email}
          </a>
          <div className="contact-notes">
            <span>Remote · UTC−8</span>
            <span>Replies within 24h on weekdays</span>
            <span>Full-time · contract · rescues</span>
          </div>
          <div className="contact-links">
            <a className="btn btn-quiet" href={PORTFOLIO.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn btn-quiet" href={PORTFOLIO.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
