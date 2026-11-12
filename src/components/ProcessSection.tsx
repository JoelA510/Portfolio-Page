import type { ProcessRule, ProcessStep } from "../data/portfolio";

type Props = {
  steps: ProcessStep[];
  rules: ProcessRule[];
};

const OWNER_LABEL: Record<ProcessStep["owner"], string> = {
  me: "Mine to decide",
  agent: "Agent",
  automated: "Automated",
};

/**
 * "How a change ships" — the Software tab's approach section. States plainly
 * that agents write most of the code, shows the loop that work goes through,
 * and links each rule to the file where it is written.
 */
export function ProcessSection({ steps, rules }: Props) {
  return (
    <section className="section wrap" id="approach" aria-labelledby="approach-h">
      <div className="section-head">
        <h2 id="approach-h">How a change ships</h2>
        <span className="label">AI-led, and structured</span>
      </div>

      <p className="proc-lede">
        Agents write most of the code in these projects. My part is deciding what gets built,
        writing the rules it is built under, and refusing to trust a check until I have seen it
        fail. I am not claiming unaided coding. The plan, the constraints, the gates, and the
        review are mine to own.
      </p>

      <ol className="proc-steps">
        {steps.map((step, i) => (
          <li key={step.title} className={`proc-step is-${step.owner}`}>
            <span className="proc-num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <span className="proc-owner">{OWNER_LABEL[step.owner]}</span>
          </li>
        ))}
      </ol>
      <p className="proc-loop">
        A failed gate or review sends the change back to the build step. A check is not trusted
        until it has been shown failing on a planted defect.
      </p>

      <h3 className="proc-sub">What separates this from prompting until it looks right</h3>
      <ul className="proc-rules">
        {rules.map((r) => (
          <li key={r.rule}>
            <span className="proc-instead">{r.instead}</span>
            <span className="proc-rule">{r.rule}</span>
            <a className="proc-source" href={r.source.href} target="_blank" rel="noreferrer">
              {r.source.label} ↗
            </a>
          </li>
        ))}
      </ul>

      <p className="proc-limits">
        The limits, stated plainly: no external security review has been conducted on any of
        these projects.
      </p>
    </section>
  );
}
