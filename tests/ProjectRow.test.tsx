import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ProjectRow } from "../src/components/ProjectRow";
import { PROJECTS } from "../src/data/portfolio";

const project = PROJECTS[0];

describe("ProjectRow", () => {
  it("keeps both panels hidden until toggled", () => {
    render(<ProjectRow project={project} index={0} />);
    expect(document.getElementById(`pv-${project.id}`)).toHaveAttribute("hidden");
    expect(document.getElementById(`ar-${project.id}`)).toHaveAttribute("hidden");
    // The live-app iframe must not mount before the user asks for it.
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("lazy-mounts the preview iframe on first open and keeps it on hide", async () => {
    const user = userEvent.setup();
    render(<ProjectRow project={project} index={0} />);

    const toggle = screen.getByRole("button", { name: "View preview" });
    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveTextContent("Hide preview");
    const frame = document.querySelector("iframe");
    expect(frame).not.toBeNull();
    expect(frame).toHaveAttribute("src", project.previewUrl);
    // Grants popups a way out of the sandbox (OAuth/external-link flows) and
    // storage access on user gesture — narrower sandboxes broke these.
    expect(frame).toHaveAttribute(
      "sandbox",
      expect.stringContaining("allow-popups-to-escape-sandbox"),
    );
    expect(frame).toHaveAttribute(
      "sandbox",
      expect.stringContaining("allow-storage-access-by-user-activation"),
    );
    // Without this, embedded apps can't use clipboard-write, fullscreen,
    // autoplay, etc. — features the deployed projects actually rely on.
    expect(frame).toHaveAttribute(
      "allow",
      expect.stringContaining("clipboard-write"),
    );

    // Hiding keeps the iframe mounted so re-opening doesn't reload the app.
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById(`pv-${project.id}`)).toHaveAttribute("hidden");
    expect(document.querySelector("iframe")).not.toBeNull();
  });

  it("toggles the architecture diagram", async () => {
    const user = userEvent.setup();
    render(<ProjectRow project={project} index={0} />);

    const toggle = screen.getByRole("button", { name: "Architecture" });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      document.getElementById(`ar-${project.id}`),
    ).not.toHaveAttribute("hidden");
    expect(screen.getByText(/SUPABASE BACKEND/)).toBeInTheDocument();
  });

  it("shows a fallback with a live-site link if the preview never loads", async () => {
    vi.useFakeTimers();
    try {
      render(<ProjectRow project={project} index={0} />);

      // happy-dom's iframe page loading is disabled in test config (see
      // vite.config.ts), so onLoad genuinely never fires here — the same
      // observable state as a host that blocks framing or never responds.
      fireEvent.click(screen.getByRole("button", { name: "View preview" }));
      expect(screen.getByText(/Loading live app/i)).toBeInTheDocument();

      await act(async () => {
        await vi.advanceTimersByTimeAsync(9000);
      });

      expect(screen.queryByText(/Loading live app/i)).not.toBeInTheDocument();
      expect(
        screen.getByText(/taking longer than expected to load/i),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Open live site/i }),
      ).toHaveAttribute("href", project.liveUrl);
    } finally {
      vi.useRealTimers();
    }
  });

  it("re-arms the watchdog and clears the error when reopened after a timeout", async () => {
    vi.useFakeTimers();
    try {
      render(<ProjectRow project={project} index={0} />);

      fireEvent.click(screen.getByRole("button", { name: "View preview" }));
      await act(async () => {
        await vi.advanceTimersByTimeAsync(9000);
      });
      expect(
        screen.getByText(/taking longer than expected to load/i),
      ).toBeInTheDocument();

      // Close the panel, then reopen it — this is the "try again" gesture.
      fireEvent.click(screen.getByRole("button", { name: "Hide preview" }));
      fireEvent.click(screen.getByRole("button", { name: "View preview" }));

      expect(
        screen.queryByText(/taking longer than expected to load/i),
      ).not.toBeInTheDocument();
      expect(screen.getByText(/Loading live app/i)).toBeInTheDocument();

      // The watchdog must have been re-armed with a fresh window, not left
      // permanently disarmed after firing once.
      await act(async () => {
        await vi.advanceTimersByTimeAsync(9000);
      });
      expect(
        screen.getByText(/taking longer than expected to load/i),
      ).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("passes pointer/wheel events through until the user opts into interacting, and Escape releases", async () => {
    const user = userEvent.setup();
    render(<ProjectRow project={project} index={0} />);

    await user.click(screen.getByRole("button", { name: "View preview" }));
    const frame = document.querySelector("iframe") as HTMLIFrameElement;

    // Simulate a successful load without relying on happy-dom's disabled
    // iframe navigation (see vite.config.ts) — dispatch the same 'load'
    // event the browser would fire, which is all the component listens for.
    fireEvent.load(frame);

    expect(document.querySelector(".p-frame")).toHaveClass("is-loaded");
    expect(frame.style.pointerEvents).toBe("none");

    const tap = screen.getByRole("button", {
      name: `Interact with the ${project.title} preview`,
    });
    await user.click(tap);
    expect(frame.style.pointerEvents).toBe("auto");
    expect(
      screen.getByRole("button", { name: "Release interaction with the preview" }),
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(frame.style.pointerEvents).toBe("none");
    expect(
      screen.getByRole("button", {
        name: `Interact with the ${project.title} preview`,
      }),
    ).toBeInTheDocument();
  });
});
