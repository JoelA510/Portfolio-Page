import { RefObject, useEffect } from "react";

export function useMouseParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  factor = 0.08,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf: number | null = null;
    const s = { x: 0, y: 0, tx: 0, ty: 0 };

    const tick = () => {
      s.x += (s.tx - s.x) * factor;
      s.y += (s.ty - s.y) * factor;
      el.style.setProperty("--px", s.x.toFixed(4));
      el.style.setProperty("--py", s.y.toFixed(4));
      if (
        Math.abs(s.tx - s.x) > 0.001 ||
        Math.abs(s.ty - s.y) > 0.001
      ) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      s.tx = (e.clientX - r.left) / r.width - 0.5;
      s.ty = (e.clientY - r.top) / r.height - 0.5;
      if (!el.classList.contains("has-parallax")) el.classList.add("has-parallax");
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      s.tx = 0;
      s.ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, factor]);
}
