import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CommandPalette } from "../src/components/CommandPalette";

const baseProps = {
  onJump: vi.fn(),
  onToggleTheme: vi.fn(),
  onOpenTerm: vi.fn(),
};

describe("CommandPalette", () => {
  it("does not render anything when closed", () => {
    const { container } = render(
      <CommandPalette open={false} setOpen={() => {}} {...baseProps} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders actions when open and filters on input", async () => {
    const user = userEvent.setup();
    render(
      <CommandPalette open={true} setOpen={() => {}} {...baseProps} />,
    );
    // Default: "Top" navigation action is present.
    expect(screen.getByText(/^Top$/)).toBeInTheDocument();
    // Typing "squad" filters to SquadLogic project.
    const input = screen.getByRole("textbox");
    await user.type(input, "squad");
    expect(screen.getByText(/SquadLogic/i)).toBeInTheDocument();
  });
});
