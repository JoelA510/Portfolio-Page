import type { Domain } from "../data/domains";
import { ApproachSection } from "./ApproachSection";
import { ContactSection } from "./ContactSection";
import { ExperienceRow } from "./ExperienceRow";
import { HeroHeader } from "./HeroHeader";

type Props = {
  domain: Domain;
};

/** Hero + selected work + approach + contact, driven entirely by domain data. */
export function DomainSection({ domain }: Props) {
  return (
    <>
      <HeroHeader
        status={domain.heroStatus}
        title={domain.heroTitle}
        lede={domain.heroLede}
        certifications={domain.certifications}
      />

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

        <ApproachSection traits={domain.traits} />
        <ContactSection headline={domain.contactHeadline} />
      </main>
    </>
  );
}
