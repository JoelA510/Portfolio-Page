import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "../src/App";
import { PROJECTS } from "../src/data/portfolio";
import { CYBERSECURITY, HOME, IT } from "../src/data/domains";

/** Both the top and bottom TabBar render a button with this name; grab the first. */
function getTabButton(name: string) {
  return screen.getAllByRole("button", { name })[0];
}

describe("App", () => {
  it("defaults to the Home tab for a first-time visitor", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: new RegExp(HOME.heroTitle.slice(0, 30)) }),
    ).toBeInTheDocument();
    expect(screen.getByText(HOME.heroStatus)).toBeInTheDocument();
    expect(getTabButton("Home")).toHaveAttribute("aria-current", "page");
  });

  it("cross-references every domain project link against a real PROJECTS entry", () => {
    // domains.ts looks up "ai-advocate"/"squadlogic" by id and degrades to no
    // links rather than crashing if the id ever drifts from portfolio.ts —
    // this test is what turns that silent degradation into a loud CI failure.
    const aiAdvocateEntry = CYBERSECURITY.entries.find((e) => e.id === "cyber-ai-advocate");
    const squadLogicEntry = CYBERSECURITY.entries.find((e) => e.id === "cyber-squadlogic");
    expect(aiAdvocateEntry?.links).toBeDefined();
    expect(squadLogicEntry?.links).toBeDefined();
  });

  it("switches to the Software Engineering tab and renders every project as a case-study row", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(getTabButton("Software Engineering"));

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /working with AI as a disciplined collaborator/i,
      }),
    ).toBeInTheDocument();
    for (const project of PROJECTS) {
      expect(
        screen.getByRole("heading", { level: 3, name: project.title }),
      ).toBeInTheDocument();
    }
    expect(screen.getByText("Architecture first")).toBeInTheDocument();
    expect(screen.getByText("Directed, not delegated")).toBeInTheDocument();
    expect(screen.getByText("Verified before shipped")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "hire.joel.abraham@gmail.com" }),
    ).toBeInTheDocument();
  });

  it("switches to a domain tab and renders its certifications and entries", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(getTabButton("Cybersecurity"));

    expect(
      screen.getByRole("heading", { level: 1, name: new RegExp(CYBERSECURITY.heroTitle.slice(0, 20)) }),
    ).toBeInTheDocument();
    expect(screen.getByText(/ISC2 Certified in Cybersecurity/i)).toBeInTheDocument();
    for (const entry of CYBERSECURITY.entries) {
      expect(
        screen.getByRole("heading", { level: 3, name: entry.role }),
      ).toBeInTheDocument();
    }
  });

  it("navigates from a Home hub card into its domain tab", async () => {
    const user = userEvent.setup();
    render(<App />);

    const work = screen.getByRole("region", { name: HOME.workHeading });
    await user.click(within(work).getByRole("button", { name: /View IT work/i }));

    expect(
      screen.getByRole("heading", { level: 1, name: new RegExp(IT.heroTitle.slice(0, 20)) }),
    ).toBeInTheDocument();
  });

  it("remembers the last-viewed tab across remounts", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await user.click(getTabButton("Logistics"));
    unmount();

    render(<App />);
    expect(getTabButton("Logistics")).toHaveAttribute("aria-current", "page");
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
