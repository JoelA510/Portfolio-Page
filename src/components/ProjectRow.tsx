import { useState } from "react";
import type { Project } from "../data/portfolio";

type Props = {
  project: Project;
  index: number;
};

/**
 * One hairline-ruled case-study row: mono meta column (stack, AI tooling)
 * beside the plain-English body, with quiet text toggles for a lazy-loaded
 * live preview and an ASCII architecture diagram.
 */
export function ProjectRow({ project, index }: Props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [archOpen, setArchOpen] = useState(false);
  // The iframe mounts on first open and stays mounted while hidden, so
  // re-opening the panel doesn't reload the embedded app.
  const [previewRequested, setPreviewRequested] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);

  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="project" id={project.id}>
      <div className="p-meta">
        <span className="p-index">{num}</span>
        <dl>
          <div>
            <dt>Stack</dt>
            <dd>{project.tech.map((t) => t.name).join(" · ")}</dd>
          </div>
          <div>
            <dt>AI tooling</dt>
            <dd>{project.aiStack.map((t) => t.name).join(" · ")}</dd>
          </div>
        </dl>
      </div>
      <div className="p-body">
        <h3>{project.title}</h3>
        <p className="p-tag">{project.tagline}</p>
        <p className="p-desc">{project.description}</p>
        <p className="p-process">
          <strong>Process:</strong> {project.remediation}
        </p>
        <div className="p-actions">
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Live site ↗
          </a>
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            Source ↗
          </a>
          <button
            type="button"
            className="p-toggle"
            aria-expanded={previewOpen}
            aria-controls={`pv-${project.id}`}
            onClick={() => {
              setPreviewOpen((o) => !o);
              setPreviewRequested(true);
            }}
          >
            {previewOpen ? "Hide preview" : "View preview"}
          </button>
          <button
            type="button"
            className="p-toggle"
            aria-expanded={archOpen}
            aria-controls={`ar-${project.id}`}
            onClick={() => setArchOpen((o) => !o)}
          >
            Architecture
          </button>
        </div>
        <div className="p-panel" id={`pv-${project.id}`} hidden={!previewOpen}>
          <div className={`p-frame${frameLoaded ? " is-loaded" : ""}`}>
            {!frameLoaded && (
              <div className="p-frame-load" aria-hidden="true">
                <span className="spin" />
                Loading live app
              </div>
            )}
            {previewRequested && (
              <iframe
                src={project.previewUrl}
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin"
                title={`${project.title} live preview`}
                onLoad={() => setFrameLoaded(true)}
              />
            )}
          </div>
          <p className="p-frame-note">
            Live embed of the deployed app. If the host blocks framing, use the
            Live site link above.
          </p>
        </div>
        <div className="p-panel" id={`ar-${project.id}`} hidden={!archOpen}>
          <pre className="p-arch">{project.architecture}</pre>
        </div>
      </div>
    </article>
  );
}
