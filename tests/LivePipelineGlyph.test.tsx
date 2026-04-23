import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { LivePipelineGlyph } from "../src/components/LivePipelineGlyph";

// The accessible name of each label <button> is "name + sub" (e.g.
// "architect schemas · APIs · tests"). Match by prefix on the stage name.
// We exercise the <button> rather than the SVG <g role="button"> because
// happy-dom's a11y tree doesn't expose synthetic role="button" SVG nodes.
const buttonFor = (label: string) =>
  screen.getByRole("button", { name: new RegExp(`^${label}\\b`, "i") });

describe("LivePipelineGlyph aria-pressed", () => {
  it("does not announce a stage as pressed during auto-rotation", () => {
    render(<LivePipelineGlyph />);
    for (const label of ["architect", "agents", "verify", "ship"]) {
      expect(buttonFor(label)).toHaveAttribute("aria-pressed", "false");
    }
  });

  it("does not flip aria-pressed when a stage is merely focused", async () => {
    const user = userEvent.setup();
    render(<LivePipelineGlyph />);
    const architect = buttonFor("architect");
    await user.tab();
    // Focus may have landed on the SVG <g> first; tab again until the
    // button is focused. The behavior we care about is the same either
    // way: focus alone must not flip aria-pressed.
    while (document.activeElement !== architect) {
      await user.tab();
    }
    expect(architect).toHaveAttribute("aria-pressed", "false");
  });

  it("flips aria-pressed only after Enter while focused", async () => {
    const user = userEvent.setup();
    render(<LivePipelineGlyph />);
    const architect = buttonFor("architect");
    architect.focus();
    expect(architect).toHaveAttribute("aria-pressed", "false");
    await user.keyboard("{Enter}");
    expect(architect).toHaveAttribute("aria-pressed", "true");
    // Pressing Enter again toggles back off.
    await user.keyboard("{Enter}");
    expect(architect).toHaveAttribute("aria-pressed", "false");
  });

  it("Space also toggles the pinned state", async () => {
    const user = userEvent.setup();
    render(<LivePipelineGlyph />);
    const agents = buttonFor("agents");
    agents.focus();
    await user.keyboard(" ");
    expect(agents).toHaveAttribute("aria-pressed", "true");
  });
});
