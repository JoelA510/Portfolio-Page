import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "../src/App";
import { PROJECTS } from "../src/data/portfolio";

describe("App", () => {
  it("renders the hero headline and status", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /working with AI as a disciplined collaborator/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Open to full-time roles and project work/i),
    ).toBeInTheDocument();
  });

  it("renders every project as a case-study row", () => {
    render(<App />);
    for (const project of PROJECTS) {
      expect(
        screen.getByRole("heading", { level: 3, name: project.title }),
      ).toBeInTheDocument();
    }
  });

  it("renders the three commitments and the contact email", () => {
    render(<App />);
    expect(screen.getByText("Architecture first")).toBeInTheDocument();
    expect(screen.getByText("Directed, not delegated")).toBeInTheDocument();
    expect(screen.getByText("Verified before shipped")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "hire.joel.abraham@gmail.com" }),
    ).toBeInTheDocument();
  });

  it("toggles the theme attribute on the document root", async () => {
    const user = userEvent.setup();
    render(<App />);
    const initial = document.documentElement.getAttribute("data-theme");
    await user.click(screen.getByRole("button", { name: /toggle theme/i }));
    const flipped = document.documentElement.getAttribute("data-theme");
    expect(flipped).not.toBe(initial);
    expect(["dark", "light"]).toContain(flipped);
  });
});
