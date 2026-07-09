import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
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
});
