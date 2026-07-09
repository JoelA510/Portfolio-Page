import { PORTFOLIO } from "../data/portfolio";

type Props = {
  headline: string;
};

/** Contact section — identical across every tab except the headline. */
export function ContactSection({ headline }: Props) {
  return (
    <section className="contact wrap" id="contact" aria-labelledby="contact-h">
      <span className="label">Contact</span>
      <h2 className="contact-head" id="contact-h">
        {headline}
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
  );
}
