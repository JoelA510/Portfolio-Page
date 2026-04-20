import { RefObject, useEffect, useState } from "react";

type Options = { start?: number; end?: number };

export function useInViewProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { start = 0, end = 1 }: Options = {},
): number {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf: number | null = null;
    const calc = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const scrolled = vh - r.top;
      const raw = Math.max(0, Math.min(1, scrolled / total));
      const mapped = Math.max(0, Math.min(1, (raw - start) / (end - start)));
      setP(mapped);
      raf = null;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    const scope: HTMLElement | Window =
      (ref.current?.closest(".best-main") as HTMLElement | null) || window;
    scope.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    calc();
    return () => {
      scope.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, start, end]);

  return p;
}

export const clamp01 = (v: number, a = 0, b = 1) =>
  Math.max(a, Math.min(b, v));
