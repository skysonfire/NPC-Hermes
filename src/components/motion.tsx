"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

let gsapReady = false;
function ensureGsap() {
  if (!gsapReady) {
    gsap.registerPlugin(ScrollTrigger);
    gsapReady = true;
  }
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const MotionCtx = createContext(false);

/**
 * Global motion layer: Lenis smooth scroll + GSAP ScrollTrigger.
 *
 * - Respects prefers-reduced-motion (no lenis, no hidden states, no tweens).
 * - Content is visible by default; `html.motion-on` + [data-reveal] hide it
 *   only after JS is alive, then ScrollTrigger animates it in. No-JS users
 *   and reduced-motion users always see the full page.
 * - A MutationObserver picks up [data-reveal]/[data-parallax] nodes added by
 *   client-side navigation, so all 5 pages animate consistently.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsap();
    document.documentElement.classList.add("motion-on");
    // Don't let the browser restore the previous page's scroll position.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({ lerp: 0.09, duration: 1.15 });
    lenisRef.current = lenis;
    lenis.on("scroll", () => ScrollTrigger.update());
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const done = new WeakSet<HTMLElement>();
    const pending = new Set<HTMLElement>(); // reveals not yet shown

    const showReveal = (el: HTMLElement) => {
      pending.delete(el);
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
      gsap.killTweensOf(el);
      gsap.set(el, { autoAlpha: 1, y: 0 });
    };

    const setup = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (done.has(el)) return;
        done.add(el);
        const yAttr = el.getAttribute("data-reveal-y");
        const dist = yAttr === "0" || yAttr === "none" ? 0 : yAttr ? parseInt(yAttr, 10) || 28 : 28;
        const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
        pending.add(el);
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: dist },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
              onEnter: () => pending.delete(el),
              onEnterBack: () => pending.delete(el),
            },
          }
        );
      });
      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        if (done.has(el)) return;
        done.add(el);
        const speed = parseFloat(el.getAttribute("data-parallax") || "0.15");
        const trigger = (el.closest("section") as HTMLElement) || el.parentElement;
        if (!trigger) return;
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    };
    setup(document.body);

    const mo = new MutationObserver(() => setup(document.body));
    mo.observe(document.body, { childList: true, subtree: true });

    /* Failsafe: content must NEVER stay invisible. If a reveal near the viewport
       hasn't fired (rAF throttling, print, a11y mode, capture tooling), force it. */
    const failsafe = () => {
      const limit = window.innerHeight * 1.3;
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < limit) showReveal(el);
      });
    };
    const failsafeTimer = window.setInterval(failsafe, 700);
    const failsafeStop = window.setTimeout(() => window.clearInterval(failsafeTimer), 20000);
    window.addEventListener("load", () => ScrollTrigger.refresh());

    return () => {
      mo.disconnect();
      window.clearInterval(failsafeTimer);
      window.clearTimeout(failsafeStop);
      lenis.destroy();
      gsap.ticker.remove(tick);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.documentElement.classList.remove("motion-on");
    };
  }, []);

  useEffect(() => {
    // Every navigation (nav links, logo, footer) lands at the TOP of the page.
    // Use Lenis's own scroll with `immediate` so it doesn't fight smooth scroll.
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return <MotionCtx.Provider value={true}>{children}</MotionCtx.Provider>;
}

export function useMotion() {
  return useContext(MotionCtx);
}

/** Scroll-reveal wrapper. `y` = travel distance in px (0 = fade only), `delay` in seconds. */
export function Reveal({
  children,
  className = "",
  y = 28,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  as?: "div" | "section" | "figure" | "li" | "span";
}) {
  return (
    <Tag
      data-reveal
      data-reveal-y={y}
      data-reveal-delay={delay || undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Animated number that counts up when scrolled into view. SSR/no-JS shows the final value. */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  duration = 1.6,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    ensureGsap();
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: to,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate() {
        el.textContent = prefix + obj.v.toFixed(decimals) + suffix;
      },
      onComplete() {
        el.textContent = prefix + to.toFixed(decimals) + suffix;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, decimals, prefix, suffix, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {to.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Subtle 3D tilt on hover (pointer devices only). */
export function Tilt({
  children,
  className = "",
  max = 4,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    ensureGsap();
    const xTo = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
    el.style.perspective = "900px";
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      yTo(px * max * 2);
      xTo(-py * max * 2);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      gsap.set(el, { rotationX: 0, rotationY: 0 });
    };
  }, [max]);
  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/** Magnetic pull toward the cursor with elastic return. */
export function Magnetic({
  children,
  className = "",
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    ensureGsap();
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength]);
  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}

/** Infinite horizontal ticker. Pure CSS animation, pauses on hover. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex w-max shrink-0 items-center gap-10 pr-10"
    >
      {items.map((t) => (
        <span key={t + (hidden ? "b" : "a")} className="flex items-center gap-10">
          <span className="whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.3em] text-fog">
            {t}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/70" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`relative overflow-hidden border-y border-line bg-panel/50 py-4 ${className}`}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
