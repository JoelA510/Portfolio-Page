import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

// Keep in sync with --paper in src/index.css.
const PAPER_BY_THEME: Record<Theme, string> = {
  light: "#FAF9F6",
  dark: "#161613",
};

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

    // index.html's single (non-media-scoped) theme-color meta needs to track
    // the explicit theme, not just the OS preference — otherwise mobile
    // browser chrome disagrees with the page once the user toggles. The
    // pre-mount script sets its initial value; this keeps it live.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", PAPER_BY_THEME[theme]);
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  return [theme, toggle];
}
