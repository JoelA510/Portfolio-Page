type Trait = { title: string; description: string };

type Props = {
  traits: Trait[];
};

/** "How I work" — three commitments, shared across every tab. */
export function ApproachSection({ traits }: Props) {
  return (
    <section className="section wrap" id="approach" aria-labelledby="approach-h">
      <div className="section-head">
        <h2 id="approach-h">How I work</h2>
        <span className="label">Three commitments</span>
      </div>
      <ol className="approach-list">
        {traits.map((trait, i) => (
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
  );
}
