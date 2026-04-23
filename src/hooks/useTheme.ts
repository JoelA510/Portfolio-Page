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
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  return [theme, toggle];
}
