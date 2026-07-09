import type { Entry } from "../data/domains";

type Props = {
  entry: Entry;
  index: number;
};

const KIND_LABEL: Record<Entry["kind"], string> = {
  job: "Employer",
  volunteer: "Organization",
  project: "Project",
};

/**
 * Job/project/volunteer case-study row for the domain-specific tabs. Shares
 * ProjectRow's grid and typography classes but has no live preview or
 * architecture panel — there's no deployed app to embed for most of these.
 */
export function ExperienceRow({ entry, index }: Props) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="project" id={entry.id}>
      <div className="p-meta">
        <span className="p-index">{num}</span>
        <dl>
          <div>
            <dt>{KIND_LABEL[entry.kind]}</dt>
            <dd>{entry.org}</dd>
          </div>
          <div>
            <dt>Period</dt>
            <dd>
              {entry.period}
              {entry.location ? ` · ${entry.location}` : ""}
            </dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>{entry.tags.join(" · ")}</dd>
          </div>
        </dl>
      </div>
      <div className="p-body">
        <h3>{entry.role}</h3>
        <p className="p-tag">{entry.tagline}</p>
        <ul className="p-bullets">
          {entry.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
        {entry.links && entry.links.length > 0 && (
          <div className="p-actions">
            {entry.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
