import { getTabLabel, HOME, HUB_CARDS, type TabId } from "../data/domains";
import { ApproachSection } from "./ApproachSection";
import { ContactSection } from "./ContactSection";
import { HeroHeader } from "./HeroHeader";

type Props = {
  onNavigate: (id: TabId) => void;
};

/** Role-agnostic landing tab: one intro, then a row per domain that jumps the tab bar. */
export function HomeSection({ onNavigate }: Props) {
  return (
    <>
      <HeroHeader status={HOME.heroStatus} title={HOME.heroTitle} lede={HOME.heroLede} />

      <main>
        <section className="section wrap" id="work" aria-labelledby="work-h" tabIndex={-1}>
          <div className="section-head">
            <h2 id="work-h">{HOME.workHeading}</h2>
            <span className="label">{HOME.workLabel}</span>
          </div>
          {HUB_CARDS.map((card, i) => {
            const label = getTabLabel(card.tabId);
            return (
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
                  <h3>{label}</h3>
                  <p className="p-tag">{card.teaser}</p>
                  <p className="p-desc">{card.blurb}</p>
                  <div className="p-actions">
                    <button type="button" className="p-toggle" onClick={() => onNavigate(card.tabId)}>
                      View {label} work →
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <ApproachSection traits={HOME.traits} />
        <ContactSection headline={HOME.contactHeadline} />
      </main>
    </>
  );
}
