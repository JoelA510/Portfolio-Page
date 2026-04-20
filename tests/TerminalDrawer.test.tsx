import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { TerminalDrawer } from "../src/components/TerminalDrawer";

describe("TerminalDrawer", () => {
  it("toggles the `is-open` class based on the open prop", () => {
    const { container, rerender } = render(
      <TerminalDrawer open={false} setOpen={() => {}} />,
    );
    const drawer = container.querySelector(".best-term-drawer");
    expect(drawer).not.toBeNull();
    expect(drawer).not.toHaveClass("is-open");
    rerender(<TerminalDrawer open={true} setOpen={() => {}} />);
    expect(container.querySelector(".best-term-drawer")).toHaveClass("is-open");
  });

  it("echoes `help` output when command is run", async () => {
    const user = userEvent.setup();
    render(<TerminalDrawer open={true} setOpen={() => {}} />);
    const input = screen.getByLabelText("Terminal input");
    await user.click(input);
    await user.keyboard("help{Enter}");
    // First line of the help output — asserts the command dispatched.
    expect(await screen.findByText("commands:")).toBeInTheDocument();
  });
});
