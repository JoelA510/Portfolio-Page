import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SidebarChat } from "../src/components/SidebarChat";

describe("SidebarChat", () => {
  it("renders seed prompts when the conversation is empty", () => {
    render(<SidebarChat />);
    expect(
      screen.getByText(/How do you prevent AI hallucinations in production\?/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Walk me through the PlanterPlan architecture\./),
    ).toBeInTheDocument();
  });

  it("exposes an accessible input for typing a question", () => {
    render(<SidebarChat />);
    expect(screen.getByLabelText("Ask a question")).toBeInTheDocument();
  });
});
