// Season-based availability label so the LiveTicker + sidebar pill don't
// silently age. Northern-hemisphere convention: Mar–May Spring, Jun–Aug
// Summer, Sep–Nov Fall, Dec–Feb Winter (December rolls into next year's
// Winter for human readability).
const SEASONS = ["Winter", "Spring", "Summer", "Fall"] as const;

export function currentAvailability(now = new Date()): string {
  const m = now.getMonth(); // 0-11
  let season: (typeof SEASONS)[number];
  let year = now.getFullYear();
  if (m >= 2 && m <= 4) season = "Spring";
  else if (m >= 5 && m <= 7) season = "Summer";
  else if (m >= 8 && m <= 10) season = "Fall";
  else {
    season = "Winter";
    if (m === 11) year += 1;
  }
  return `Available · ${season} ${year}`;
}
