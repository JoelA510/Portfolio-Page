import { PORTFOLIO, PROJECTS } from "../data/portfolio";
import { ApproachSection } from "./ApproachSection";
import { ContactSection } from "./ContactSection";
import { ProjectRow } from "./ProjectRow";

/**
 * The original single-tab portfolio content — "software engineer, directing
 * AI agents" framing — preserved as its own tab rather than folded into the
 * new domain pages.
 */
export function SoftwareSection() {
  return (
    <>
      <header className="hero wrap" id="top">
        <p className="hero-status">
          <span className="dot" aria-hidden="true" />
          Open to full-time roles and project work
        </p>
        <h1>Software engineer, working with AI as a disciplined collaborator.</h1>
        <p className="hero-lede">
          I build production software by directing AI agents through constraints
          I define up front — architecture, schemas, and test suites. The agents
          move quickly; the judgment and the accountability are mine.
        </p>
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
            <h2 id="work-h">Selected work</h2>
            <span className="label">{PROJECTS.length} projects · all deployed</span>
          </div>
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </section>

        <ApproachSection traits={PORTFOLIO.traits} />
        <ContactSection headline="Looking for an engineer who ships with AI, carefully?" />
      </main>
    </>
  );
}
