import { HOME, HUB_CARDS, type TabId } from "../data/domains";
import { PORTFOLIO } from "../data/portfolio";

type Props = {
  onNavigate: (id: TabId) => void;
};

/** Role-agnostic landing tab: one intro, then a row per domain that jumps the tab bar. */
export function HomeSection({ onNavigate }: Props) {
  return (
    <>
      <header className="hero wrap" id="top">
        <p className="hero-status">
          <span className="dot" aria-hidden="true" />
          {HOME.heroStatus}
        </p>
        <h1>{HOME.heroTitle}</h1>
        <p className="hero-lede">{HOME.heroLede}</p>
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
            <h2 id="work-h">{HOME.workHeading}</h2>
            <span className="label">{HOME.workLabel}</span>
          </div>
          {HUB_CARDS.map((card, i) => (
            <article className="project" id={`hub-${card.tabId}`} key={card.tabId}>
              <div className="p-meta">
                <span className="p-index">{String(i + 1).padStart(2, "0")}</span>
                <dl>
                  <div>
                    <dt>Focus</dt>
                    <dd>{card.focus}</dd>
                  </div>
                </dl>
              </div>
              <div className="p-body">
                <h3>{card.name}</h3>
                <p className="p-tag">{card.teaser}</p>
                <p className="p-desc">{card.blurb}</p>
                <div className="p-actions">
                  <button
                    type="button"
                    className="p-toggle"
                    onClick={() => onNavigate(card.tabId as TabId)}
                  >
                    View {card.name} work →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="section wrap" id="approach" aria-labelledby="approach-h">
          <div className="section-head">
            <h2 id="approach-h">How I work</h2>
            <span className="label">Three commitments</span>
          </div>
          <ol className="approach-list">
            {HOME.traits.map((trait, i) => (
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
            {HOME.contactHeadline}
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
