import { act, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../src/App";
import { FakeIntersectionObserver } from "./intersectionObserverMock";

describe("scrollspy", () => {
  it("marks the current section's nav link active, tracks section changes, and clears when nothing is in view", () => {
    render(<App />);

    const observer = FakeIntersectionObserver.instances[0];
    expect(observer).toBeDefined();

    const work = document.getElementById("work")!;
    const approach = document.getElementById("approach")!;
    const workLink = screen.getByRole("link", { name: "Work" });
    const approachLink = screen.getByRole("link", { name: "Approach" });

    act(() => {
      observer.trigger([{ target: work, isIntersecting: true }]);
    });
    expect(workLink).toHaveClass("is-active");
    expect(workLink).toHaveAttribute("aria-current", "location");
    expect(approachLink).not.toHaveClass("is-active");
    expect(approachLink).not.toHaveAttribute("aria-current");

    // Scrolling from Work into Approach: both entries can arrive in the
    // same IntersectionObserver callback batch.
    act(() => {
      observer.trigger([
        { target: work, isIntersecting: false },
        { target: approach, isIntersecting: true },
      ]);
    });
    expect(workLink).not.toHaveClass("is-active");
    expect(approachLink).toHaveClass("is-active");

    // Scrolling back up above every section (e.g. to the hero) must clear
    // the highlight entirely rather than leaving the last-active link stuck
    // — this is the bug the earlier review round fixed.
    act(() => {
      observer.trigger([{ target: approach, isIntersecting: false }]);
    });
    expect(workLink).not.toHaveClass("is-active");
    expect(approachLink).not.toHaveClass("is-active");
    expect(workLink).not.toHaveAttribute("aria-current");
    expect(approachLink).not.toHaveAttribute("aria-current");
  });
});
