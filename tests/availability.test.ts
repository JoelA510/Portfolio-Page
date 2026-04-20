import { describe, it, expect } from "vitest";
import { currentAvailability } from "../src/data/availability";

// Northern-hemisphere convention. Picked one date per month to lock the
// season boundaries; December gets two dates so we cover the year-rollover.
const cases: Array<[string, Date, string]> = [
  ["mid-January  → Winter (current year)", new Date(2026, 0, 15), "Available · Winter 2026"],
  ["mid-February → Winter (current year)", new Date(2026, 1, 15), "Available · Winter 2026"],
  ["start of March → Spring", new Date(2026, 2, 1), "Available · Spring 2026"],
  ["mid-April   → Spring", new Date(2026, 3, 15), "Available · Spring 2026"],
  ["end of May  → Spring", new Date(2026, 4, 31), "Available · Spring 2026"],
  ["start of June → Summer", new Date(2026, 5, 1), "Available · Summer 2026"],
  ["mid-July   → Summer", new Date(2026, 6, 15), "Available · Summer 2026"],
  ["end of August → Summer", new Date(2026, 7, 31), "Available · Summer 2026"],
  ["start of September → Fall", new Date(2026, 8, 1), "Available · Fall 2026"],
  ["mid-October → Fall", new Date(2026, 9, 15), "Available · Fall 2026"],
  ["end of November → Fall", new Date(2026, 10, 30), "Available · Fall 2026"],
  ["mid-December → next year's Winter", new Date(2026, 11, 15), "Available · Winter 2027"],
  ["Dec 31 → next year's Winter", new Date(2026, 11, 31), "Available · Winter 2027"],
];

describe("currentAvailability", () => {
  for (const [name, date, expected] of cases) {
    it(name, () => {
      expect(currentAvailability(date)).toBe(expected);
    });
  }

  it("works with no argument (uses current date)", () => {
    expect(currentAvailability()).toMatch(
      /^Available · (Spring|Summer|Fall|Winter) \d{4}$/,
    );
  });
});
