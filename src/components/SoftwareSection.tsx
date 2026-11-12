import { PROCESS_RULES, PROCESS_STEPS, PROJECTS } from "../data/portfolio";
import { ContactSection } from "./ContactSection";
import { HeroHeader } from "./HeroHeader";
import { ProcessSection } from "./ProcessSection";
import { ProjectRow } from "./ProjectRow";

/**
 * The software tab: projects built by directing AI agents, and the process
 * they are built under. The framing is deliberate: it claims the judgment and
 * the accountability, not unaided coding.
 */
export function SoftwareSection() {
  return (
    <>
      <HeroHeader
        status="Open to full-time roles and project work"
        title="Software built by directing AI agents, under rules I write."
        lede="Agents write most of the code in these projects. I decide what gets built and define the constraints up front: architecture, schemas, and test suites. The agents move quickly; the judgment and the accountability are mine."
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

        <ProcessSection steps={PROCESS_STEPS} rules={PROCESS_RULES} />
        <ContactSection headline="Looking for someone who ships with AI, carefully?" />
      </main>
    </>
  );
}
