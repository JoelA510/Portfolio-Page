import { PORTFOLIO, PROJECTS } from "../data/portfolio";
import { ApproachSection } from "./ApproachSection";
import { ContactSection } from "./ContactSection";
import { HeroHeader } from "./HeroHeader";
import { ProjectRow } from "./ProjectRow";

/**
 * The original single-tab portfolio content — "software engineer, directing
 * AI agents" framing — preserved as its own tab rather than folded into the
 * new domain pages.
 */
export function SoftwareSection() {
  return (
    <>
      <HeroHeader
        status="Open to full-time roles and project work"
        title="Software engineer, working with AI as a disciplined collaborator."
        lede="I build production software by directing AI agents through constraints I define up front — architecture, schemas, and test suites. The agents move quickly; the judgment and the accountability are mine."
      />

      <main>
        <section className="section wrap" id="work" aria-labelledby="work-h" tabIndex={-1}>
          <div className="section-head">
            <h2 id="work-h">Selected work</h2>
            <span className="label">
              {PROJECTS.length} projects · {PROJECTS.filter((p) => p.liveUrl).length} deployed
            </span>
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
