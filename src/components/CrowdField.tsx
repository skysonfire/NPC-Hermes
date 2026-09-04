"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./motion";

/**
 * THE CROWD — the hero's background-character field.
 *
 * A drifting field of identical diamond nodes (the brand mark, repeated until
 * it stops meaning anything) plus exactly one node that can ignite. That single
 * image carries the whole pitch: everyone here looks the same, and one of them
 * doesn't have to.
 *
 * WHY CANVAS, NOT DOM
 * 88 independently drifting nodes as DOM elements is 88 composited layers and a
 * style recalc every frame. On canvas it is one element and one paint — the
 * entire field costs less than the two blurred orbs it replaces.
 *
 * LEGIBILITY
 * Nodes are attenuated by `ramp()` — near zero underneath the copy column, full
 * strength in the empty half where the focal node lives. The text never
 * competes with the field for contrast; the field simply isn't there under the
 * words.
 *
 * COST CONTROL (all four matter on a mid-range Android)
 *   1. devicePixelRatio capped at 2 — a 3x phone would otherwise paint 2.25x
 *      the pixels for no visible gain.
 *   2. rAF stops completely when the tab is hidden or the hero scrolls out of
 *      view. A hero animation running behind the footer is pure battery drain.
 *   3. Node count drops to roughly a third on narrow screens.
 *   4. shadowBlur — the most expensive canvas operation there is — is used on
 *      exactly one node, never on the crowd.
 *
 * Reduced motion paints one static frame in the resolved state and never starts
 * a loop.
 */

export type CrowdMode = "npc" | "mc";

const DESKTOP_NODES = 88;
const MOBILE_NODES = 32;
const NARROW = 900;

/** Deterministic PRNG so the field's layout survives a resize unchanged. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return [255, 255, 255];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Node = {
  bx: number; // base x, normalized 0..1
  by: number; // base y, normalized 0..1
  amp: number; // drift amplitude, px
  spd: number; // drift speed
  ph: number; // phase offset
  size: number; // half-diagonal, px
  a: number; // eased alpha
  s: number; // eased scale
};

export default function CrowdField({
  mode,
  focalRef,
  className = "",
}: {
  mode: CrowdMode;
  /**
   * Element whose centre the focal node sits on. Anchoring to real layout
   * beats a normalized guess: at 390px there is no empty quadrant, so a
   * hard-coded fraction put the ignited node on top of the copy. The hero
   * places an empty anchor box where the node belongs at each breakpoint and
   * the field simply follows it.
   */
  focalRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<CrowdMode>(mode);
  const igniteRef = useRef(-1); // timestamp of the last npc -> mc flip

  // Keep the loop reading the current mode without re-running the effect.
  useEffect(() => {
    if (modeRef.current === "npc" && mode === "mc") {
      igniteRef.current = performance.now();
    }
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const NPC = hexToRgb(css.getPropertyValue("--color-npc") || "#56b6ff");
    const GOLD = hexToRgb(css.getPropertyValue("--color-gold") || "#ff8a5c");
    const DIM = hexToRgb(css.getPropertyValue("--color-fog-2") || "#6f6c92");

    let w = 0;
    let h = 0;
    let narrow = false;
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;

    // Pointer in CSS px, eased toward the real cursor so the spotlight has
    // weight instead of snapping.
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    // Crowd/hero state, eased every frame toward the current mode's targets.
    const st = { crowd: 1, hero: 0, warm: 0 };

    function build() {
      const rect = canvas!.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      narrow = w < NARROW;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      measureFocal();

      const count = narrow ? MOBILE_NODES : DESKTOP_NODES;
      if (nodes.length !== count) {
        const rnd = mulberry32(0x5eed);
        nodes = Array.from({ length: count }, () => ({
          bx: rnd(),
          by: rnd(),
          amp: 6 + rnd() * 18,
          spd: 0.00012 + rnd() * 0.00028,
          ph: rnd() * Math.PI * 2,
          size: 3 + rnd() * 4.5,
          a: 0,
          s: 1,
        }));
      }
    }

    /**
     * Focal point of the field — where the one node that matters lives.
     * Measured once per build() (resize) rather than per frame: the anchor does
     * not move relative to the canvas, and getBoundingClientRect in a rAF loop
     * forces layout every frame.
     */
    let focalPt = { x: 0, y: 0 };
    function measureFocal() {
      const anchor = focalRef?.current;
      if (anchor) {
        const a = anchor.getBoundingClientRect();
        const c = canvas!.getBoundingClientRect();
        if (a.width || a.height) {
          focalPt = {
            x: a.left - c.left + a.width / 2,
            y: a.top - c.top + a.height / 2,
          };
          return;
        }
      }
      // No anchor rendered (or zero-sized): keep the field sane rather than
      // parking the node at 0,0.
      focalPt = narrow
        ? { x: 0.5 * w, y: 0.78 * h }
        : { x: 0.75 * w, y: 0.44 * h };
    }
    function focal() {
      return focalPt;
    }

    /**
     * Attenuation by position: the field yields to the copy.
     * Wide layouts fade out on the left (the text column); narrow layouts fade
     * out up top, where the stacked copy sits.
     */
    function ramp(nx: number, ny: number) {
      if (narrow) {
        if (ny < 0.52) return 0.09;
        return 0.09 + 0.91 * Math.min(1, (ny - 0.52) / 0.2);
      }
      if (nx < 0.44) return 0.07;
      return 0.07 + 0.93 * Math.min(1, (nx - 0.44) / 0.14);
    }

    function diamond(x: number, y: number, r: number) {
      ctx!.beginPath();
      ctx!.moveTo(x, y - r);
      ctx!.lineTo(x + r, y);
      ctx!.lineTo(x, y + r);
      ctx!.lineTo(x - r, y);
      ctx!.closePath();
    }

    /**
     * The brand mark, as a canvas path. Coordinates are the SVG mark's own
     * geometry normalized against its half-width, so the canvas node and the
     * logo in the nav are provably the same shape — change one and these
     * constants are what you re-derive, not eyeball.
     *
     * `r` is half the marker's width.
     */
    function marker(x: number, y: number, r: number) {
      ctx!.beginPath();
      ctx!.moveTo(x - r, y - 0.4925 * r);
      ctx!.lineTo(x, y + 0.4925 * r);
      ctx!.lineTo(x + r, y - 0.4925 * r);
      ctx!.lineTo(x + 0.6334 * r, y - 0.4925 * r);
      ctx!.lineTo(x, y + 0.1316 * r);
      ctx!.lineTo(x - 0.6334 * r, y - 0.4925 * r);
      ctx!.closePath();
    }

    function frame(t: number) {
      const mc = modeRef.current === "mc";

      // Ease the mode targets. Same rate every frame; no timeline to desync.
      st.crowd = lerp(st.crowd, mc ? 0.46 : 1, 0.045);
      st.hero = lerp(st.hero, mc ? 1 : 0, 0.055);
      st.warm = lerp(st.warm, mc ? 1 : 0, 0.04);

      ptr.x = lerp(ptr.x, ptr.tx, 0.12);
      ptr.y = lerp(ptr.y, ptr.ty, 0.12);

      ctx!.clearRect(0, 0, w, h);

      const R = narrow ? 0 : 190; // spotlight radius; no pointer on touch
      const R2 = R * R;

      // ---- the crowd -------------------------------------------------------
      for (const n of nodes) {
        const x = n.bx * w + Math.sin(t * n.spd + n.ph) * n.amp;
        const y = n.by * h + Math.cos(t * n.spd * 0.8 + n.ph) * n.amp * 0.6;

        const base = ramp(n.bx, n.by) * (0.16 + 0.26 * (n.ph % 1));

        // Spotlight: the cursor lights the faces it passes over.
        let lit = 0;
        if (ptr.active && R2 > 0) {
          const dx = x - ptr.x;
          const dy = y - ptr.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const k = 1 - d2 / R2;
            lit = k * k;
          }
        }

        const targetA = base * st.crowd + lit * 0.5 * st.crowd;
        const targetS = 1 + lit * 0.85;
        n.a = lerp(n.a, targetA, 0.12);
        n.s = lerp(n.s, targetS, 0.14);

        if (n.a < 0.004) continue;

        // Lit nodes warm toward gold; the resolved state cools the rest to fog.
        const cool = st.warm;
        const r = lerp(lerp(NPC[0], DIM[0], cool), GOLD[0], lit);
        const g = lerp(lerp(NPC[1], DIM[1], cool), GOLD[1], lit);
        const b = lerp(lerp(NPC[2], DIM[2], cool), GOLD[2], lit);

        ctx!.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${n.a})`;
        diamond(x, y, n.size * n.s);
        ctx!.fill();
      }

      // ---- the one that isn't background ----------------------------------
      // Not one shape but two: the character stays an ordinary crowd diamond,
      // and the MARKER arrives above it. That is the entire pitch in one
      // image — you are not replaced by something better, you get marked. The
      // marker also bobs on its own phase, so it reads as hovering over the
      // node rather than being welded to it.
      if (st.hero > 0.002) {
        const f = focal();
        const hx = f.x;
        const hy = f.y + Math.sin(t * 0.0009) * 5;
        const size = (narrow ? 7 : 9) + st.hero * (narrow ? 8 : 12);
        const [r, g, b] = GOLD;

        // Ignition ring — fires once per flip, then expires.
        const since = t - igniteRef.current;
        if (igniteRef.current > 0 && since < 1100) {
          const p = since / 1100;
          const ease = 1 - Math.pow(1 - p, 3);
          ctx!.beginPath();
          ctx!.arc(hx, hy, 14 + ease * 150, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(${r},${g},${b},${(1 - p) * 0.5})`;
          ctx!.lineWidth = 1.5;
          ctx!.stroke();
        }

        // The character. Same diamond as the crowd, lit.
        ctx!.fillStyle = `rgba(${r},${g},${b},${0.9 * st.hero})`;
        diamond(hx, hy, size);
        ctx!.fill();

        // The marker, hovering above it. Drops in from higher up as it
        // ignites, so the arrival is part of the transformation rather than a
        // fade. Its own sine phase keeps it from moving in lockstep below.
        const mw = (narrow ? 19 : 31) * st.hero;
        const drop = (1 - st.hero) * 26;
        const my =
          hy - size - (narrow ? 22 : 31) + drop + Math.sin(t * 0.0013 + 1.1) * 3;

        // The only shadowBlur in the entire field.
        // Filled with the SAME vertical gradient as the SVG logo (#ff9a42 to
        // #ff7211) rather than a flat token colour, so the node in the hero and
        // the mark in the nav are visibly the same object rather than two
        // orange shapes that happen to share a silhouette.
        const top = my - 0.4925 * mw;
        const grad = ctx!.createLinearGradient(0, top, 0, my + 0.4925 * mw);
        grad.addColorStop(0, `rgba(255,154,66,${st.hero})`);
        grad.addColorStop(1, `rgba(255,114,17,${st.hero})`);

        ctx!.save();
        ctx!.shadowColor = `rgba(${r},${g},${b},${0.85 * st.hero})`;
        ctx!.shadowBlur = 30 * st.hero;
        ctx!.fillStyle = grad;
        marker(hx, my, mw);
        ctx!.fill();
        ctx!.restore();

        // Hot core line along the rim, matching the logo's inner stroke.
        ctx!.strokeStyle = `rgba(255,203,150,${0.7 * st.hero})`;
        ctx!.lineWidth = 1.4;
        marker(hx, my, mw);
        ctx!.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    build();

    // Reduced motion: one static frame in the resolved state, no loop ever.
    if (prefersReducedMotion()) {
      modeRef.current = "mc";
      st.crowd = 0.46;
      st.hero = 1;
      st.warm = 1;
      for (const n of nodes) {
        n.a = ramp(n.bx, n.by) * (0.16 + 0.26 * (n.ph % 1)) * st.crowd;
      }
      frame(0);
      cancelAnimationFrame(raf);
      running = false;
      return;
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      ptr.tx = e.clientX - rect.left;
      ptr.ty = e.clientY - rect.top;
      if (!ptr.active) {
        ptr.x = ptr.tx;
        ptr.y = ptr.ty;
        ptr.active = true;
      }
    };
    const onLeave = () => {
      ptr.active = false;
      ptr.tx = -9999;
      ptr.ty = -9999;
    };

    const host = canvas.parentElement ?? canvas;
    if (window.matchMedia("(hover: hover)").matches) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }

    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    // Off-screen or backgrounded: stop painting entirely.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
    // focalRef is a ref object: its identity never changes, so listing it does
    // not re-run the effect. The field is built once and follows the anchor
    // through measureFocal() on every resize.
  }, [focalRef]);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className={`h-full w-full ${className}`} />
  );
}
