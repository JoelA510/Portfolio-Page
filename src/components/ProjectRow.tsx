import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/portfolio";

type Props = {
  project: Project;
  index: number;
};

// Some of these are personal/hobby deployments that cold-start; give the
// iframe a generous window before treating it as unreachable.
const LOAD_TIMEOUT_MS = 9000;

const IFRAME_SANDBOX =
  "allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-storage-access-by-user-activation";
const IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share";

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
  const [frameTimedOut, setFrameTimedOut] = useState(false);
  // While false, pointer/wheel events pass through the iframe so the page
  // keeps scrolling normally; the user opts in by clicking the tap overlay.
  const [interactive, setInteractive] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  // Bumping this re-arms the watchdog — used to retry after a timeout
  // without waiting for the still-mounted iframe to load on its own.
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!previewRequested || frameLoaded) return;
    timeoutRef.current = window.setTimeout(() => {
      setFrameTimedOut(true);
    }, LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timeoutRef.current);
  }, [previewRequested, frameLoaded, retryKey]);

  useEffect(() => {
    if (!interactive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInteractive(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [interactive]);

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
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live site ↗
            </a>
          )}
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            Source ↗
          </a>
          {project.previewUrl && (
            <button
              type="button"
              className="p-toggle"
              aria-expanded={previewOpen}
              aria-controls={`pv-${project.id}`}
              onClick={() => {
                const opening = !previewOpen;
                // Re-opening after a stalled load is a natural "try again":
                // give it a fresh watchdog window instead of showing the
                // same stale error forever.
                if (opening && frameTimedOut) {
                  setFrameTimedOut(false);
                  setRetryKey((k) => k + 1);
                }
                setPreviewOpen(opening);
                setPreviewRequested(true);
              }}
            >
              {previewOpen ? "Hide preview" : "View preview"}
            </button>
          )}
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
        {project.previewUrl && (
        <div className="p-panel" id={`pv-${project.id}`} hidden={!previewOpen}>
          <div className={`p-frame${frameLoaded ? " is-loaded" : ""}`}>
            {!frameLoaded && !frameTimedOut && (
              <div className="p-frame-load" aria-hidden="true">
                <span className="spin" />
                Loading live app
              </div>
            )}
            {frameTimedOut && !frameLoaded && (
              <div className="p-frame-err">
                <p>
                  This preview is taking longer than expected to load; the host
                  may be blocking framing, or the app is cold-starting.
                </p>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Open live site ↗
                  </a>
                )}
              </div>
            )}
            {previewRequested && (
              <iframe
                src={project.previewUrl}
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox={IFRAME_SANDBOX}
                allow={IFRAME_ALLOW}
                title={`${project.title} live preview`}
                style={{ pointerEvents: interactive ? "auto" : "none" }}
                onLoad={() => {
                  window.clearTimeout(timeoutRef.current);
                  setFrameLoaded(true);
                  setFrameTimedOut(false);
                }}
              />
            )}
            {frameLoaded && !interactive && (
              <button
                type="button"
                className="p-frame-tap"
                onClick={() => setInteractive(true)}
                aria-label={`Interact with the ${project.title} preview`}
              >
                <span className="p-frame-tap-label">
                  Click to interact · scroll passes through
                </span>
              </button>
            )}
            {frameLoaded && interactive && (
              <button
                type="button"
                className="p-frame-release"
                onClick={() => setInteractive(false)}
                aria-label="Release interaction with the preview"
              >
                <kbd>Esc</kbd> release
              </button>
            )}
          </div>
          <p className="p-frame-note">
            Live embed of the deployed app. If the host blocks framing, use the
            Live site link above.
          </p>
        </div>
        )}
        <div className="p-panel" id={`ar-${project.id}`} hidden={!archOpen}>
          <pre className="p-arch">{project.architecture}</pre>
        </div>
      </div>
    </article>
  );
}
