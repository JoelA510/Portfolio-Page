import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem("best-theme");
      if (stored === "dark" || stored === "light") return stored;
      // Align with the pre-mount script in index.html: fall back to the
      // OS preference, not a hardcoded default. Keeps first-render state
      // consistent with what was painted on the first frame.
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
      }
    } catch {
      /* no-op */
    }
    return "dark";
  });

  useEffect(() => {
    try {
      localStorage.setItem("best-theme", theme);
    } catch {
      /* no-op */
    }
    document.documentElement.setAttribute("data-theme", theme);

    // index.html keeps two prefers-color-scheme-scoped theme-color metas so
    // mobile browser chrome is correct via pure CSS with no JS at all. Once
    // the user has an explicit override, both tags' content is set to the
    // same color — whichever one the OS is currently matching then shows
    // the right value regardless of which query "wins". Read --paper live
    // (rather than hardcoding it again here) so this can't drift from the
    // token that actually painted the page.
    const paper = getComputedStyle(document.documentElement)
      .getPropertyValue("--paper")
      .trim();
    if (paper) {
      document
        .querySelectorAll('meta[name="theme-color"]')
        .forEach((meta) => meta.setAttribute("content", paper));
    }
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  return [theme, toggle];
}
