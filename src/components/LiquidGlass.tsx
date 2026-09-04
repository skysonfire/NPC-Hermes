"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Liquid-glass surface: `.glass-liquid` plus the pointer tracking that makes it
 * liquid rather than a still photograph of glass.
 *
 * The CSS does all the rendering. This component's only job is writing --mx/--my
 * (pointer position in CSS px, relative to the element) and --liquid-glow so the
 * specular bloom and the rim highlight follow the cursor.
 *
 * Coalesced to one write per animation frame: a pointermove burst would
 * otherwise set custom properties several times between paints, which is work
 * the compositor throws away. Nothing here touches layout — the properties only
 * feed gradient positions — so a move repaints a single layer.
 *
 * Touch and reduced-motion devices never attach the listener and keep the
 * static rest lighting the CSS declares.
 */
export default function LiquidGlass({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "aside" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let px = 0;
    let py = 0;

    const flush = () => {
      raf = 0;
      el.style.setProperty("--mx", `${px}px`);
      el.style.setProperty("--my", `${py}px`);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(flush);
    };
    const onEnter = () => el.style.setProperty("--liquid-glow", "1");
    const onLeave = () => {
      el.style.setProperty("--liquid-glow", "0");
      // Park the highlight back at rest instead of freezing it mid-surface.
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <Tag ref={ref as never} className={`glass-liquid ${className}`}>
      {children}
    </Tag>
  );
}
