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

/** Touch-primary device: no hover, coarse pointer. Smooth scroll is a liability here. */
function isTouchPrimary() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none), (pointer: coarse)").matches
  );
}

const MotionCtx = createContext(false);

/**
 * Global motion layer.
 *
 * ARCHITECTURE — the rule that matters:
 *   Content visibility NEVER depends on the smooth-scroll library.
 *
 * Reveals are driven by IntersectionObserver, which is scroll-agnostic: it
 * fires whether the page is scrolled by Lenis, by native touch momentum, by
 * a screen reader, by find-in-page, or by an anchor jump. The previous
 * implementation drove reveals off ScrollTrigger, which was updated only from
 * `lenis.on("scroll")` — so on touch devices, where Lenis does not drive the
 * scroll, the events never arrived and every [data-reveal] on the page stayed
 * at opacity:0 forever. The entire site below the hero was invisible on mobile.
 *
 * Three independent guarantees that content is shown:
 *   1. `motion-on` is set only after IntersectionObserver is confirmed usable,
 *      so no-JS, old-browser and failed-init users get plain visible content.
 *   2. The observer reveals anything that intersects, once.
 *   3. A watchdog reveals everything unconditionally after REVEAL_DEADLINE_MS,
 *      so a stranded element self-heals instead of hiding content permanently.
 *
 * Lenis is a progressive enhancement for pointer devices only. On touch we use
 * native scrolling, which is smoother, cheaper, and doesn't fight the browser.
 */

/** Hard ceiling: after this, every reveal is shown no matter what. */
const REVEAL_DEADLINE_MS = 4000;

export function MotionProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = prefersReducedMotion();

    // ---- Reveal layer (always on, except reduced-motion) -------------------
    // Runs independently of Lenis/GSAP so a failure there cannot hide content.
    let io: IntersectionObserver | null = null;
    let watchdog = 0;

    const revealAll = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)")
        .forEach((el) => el.classList.add("is-revealed"));
    };

    if (!reduced && typeof IntersectionObserver !== "undefined") {
      // Only now is it safe to let CSS hide reveals.
      document.documentElement.classList.add("motion-on");

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.classList.add("is-revealed");
            io?.unobserve(el);
          });
        },
        // Slight negative bottom margin so items reveal just before they're
        // fully in view; generous top margin so upward scroll never strands.
        { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
      );

      // Dedupe must live with the observer, NOT on the element. A flag stored
      // in the DOM survives this effect being torn down and re-run (React's
      // dev double-mount, or any remount), which would make the second pass
      // skip every element while the first observer is already disconnected —
      // leaving nothing observed and the whole page hidden.
      const observed = new WeakSet<HTMLElement>();

      const observeAll = () => {
        document
          .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)")
          .forEach((el) => {
            if (observed.has(el)) return;
            observed.add(el);
            const y = el.getAttribute("data-reveal-y");
            if (y !== null) el.style.setProperty("--reveal-y", `${y}px`);
            const d = el.getAttribute("data-reveal-delay");
            if (d) el.style.setProperty("--reveal-delay", `${d}s`);
            io!.observe(el);
          });
      };
      observeAll();

      // Client-side navigation swaps the tree; pick up new nodes.
      const mo = new MutationObserver(observeAll);
      mo.observe(document.body, { childList: true, subtree: true });

      // Guarantee #3 — nothing stays hidden past the deadline.
      watchdog = window.setTimeout(revealAll, REVEAL_DEADLINE_MS);

      // ---- Smooth scroll + parallax: pointer devices only ------------------
      let cleanupScroll = () => {};
      if (!isTouchPrimary()) {
        ensureGsap();
        const lenis = new Lenis({ lerp: 0.09, duration: 1.15 });
        lenisRef.current = lenis;
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        const parallaxed = new WeakSet<HTMLElement>();
        const setupParallax = () => {
          document
            .querySelectorAll<HTMLElement>("[data-parallax]")
            .forEach((el) => {
              if (parallaxed.has(el)) return;
              parallaxed.add(el);
              const speed = parseFloat(el.getAttribute("data-parallax") || "0.15");
              const trigger =
                (el.closest("section") as HTMLElement) || el.parentElement;
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
        setupParallax();
        const pmo = new MutationObserver(setupParallax);
        pmo.observe(document.body, { childList: true, subtree: true });

        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);

        cleanupScroll = () => {
          pmo.disconnect();
          window.removeEventListener("load", onLoad);
          lenis.destroy();
          lenisRef.current = null;
          gsap.ticker.remove(tick);
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      }

      return () => {
        mo.disconnect();
        io?.disconnect();
        window.clearTimeout(watchdog);
        cleanupScroll();
        document.documentElement.classList.remove("motion-on");
      };
    }

    // Reduced motion or no IntersectionObserver: content is plainly visible.
    return () => {
      window.clearTimeout(watchdog);
    };
  }, []);

  useEffect(() => {
    // Every navigation lands at the top of the page.
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
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

/**
 * Animated number that counts up when scrolled into view.
 * Uses IntersectionObserver for the same reason reveals do: it must not depend
 * on the scroll library. SSR / no-JS / reduced-motion render the final value.
 */
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
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    ensureGsap();

    let tween: gsap.core.Tween | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const obj = { v: 0 };
        tween = gsap.to(obj, {
          v: to,
          duration,
          ease: "power2.out",
          onUpdate() {
            el.textContent = prefix + obj.v.toFixed(decimals) + suffix;
          },
          onComplete() {
            el.textContent = prefix + to.toFixed(decimals) + suffix;
          },
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      tween?.kill();
      // Leave the final value on screen — never a half-counted number.
      el.textContent = prefix + to.toFixed(decimals) + suffix;
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
