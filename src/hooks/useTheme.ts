import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem("best-theme");
      if (stored === "dark" || stored === "light") return stored;
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
