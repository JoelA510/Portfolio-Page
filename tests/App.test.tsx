import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../src/App";

describe("App", () => {
  it("mounts and renders the availability status", () => {
    render(<App />);
    // PORTFOLIO.name is rendered character-by-character, so the test anchors
    // on the availability string which appears in the sidebar pill and the
    // live ticker. getAllByText handles both.
    expect(
      screen.getAllByText(/Available · Spring 2026/).length,
    ).toBeGreaterThan(0);
  });

  it("renders the hero headline mono accent", () => {
    render(<App />);
    expect(screen.getByText("execution_layer")).toBeInTheDocument();
  });
});
