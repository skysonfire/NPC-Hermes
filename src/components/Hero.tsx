"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "./ui";
import { Magnetic, prefersReducedMotion } from "./motion";
import CrowdField from "./CrowdField";
import LiquidGlass from "./LiquidGlass";

/**
 * THE HERO — the transformation, performed rather than described.
 *
 * The old hero put the entire brand thesis behind a toggle: the visitor had to
 * click "MAIN CHARACTER" to see the promise, and the largest words above the
 * fold were an insult with no payoff attached. Most visitors never clicked, so
 * for most visitors the site said "you're a background character" and stopped.
 *
 * Here the swap runs itself, once, in the first ~2.5s: the headline decodes
 * from "a background" to "the main", the crowd field dims and one node ignites,
 * and the stat readout climbs. The toggle stays — as a replay and a toy, not as
 * a prerequisite.
 *
 * WHAT THE SERVER RENDERS
 * The resolved state. The h1 in the HTML reads "You're the main character." so
 * crawlers, no-JS visitors, reduced-motion visitors and screen readers all get
 * the promise, never the insult. The animation *rewinds* to the NPC state in a
 * layout effect (before paint, so there is no flash) and plays forward. If the
 * JS never runs, the page is simply already at the destination.
 */

type Mode = "npc" | "mc";

const copy: Record<
  Mode,
  {
    state: string;
    unit: string;
    word: string;
    lede: string;
    stats: [number, number, number];
  }
> = {
  npc: {
    state: "Default state",
    unit: "UNIT-042",
    word: "a background",
    lede: "A site that looks like everyone else's. A phone that rings out after six. Enquiries that sit until somebody gets round to them. That's the default — and it costs you jobs every week.",
    stats: [22, 14, 18],
  },
  mc: {
    state: "State unlocked",
    unit: "PLAYER ONE",
    word: "the main",
    lede: "A custom site nobody else has. An AI receptionist that picks up every call. A lead system that qualifies each enquiry and drops the good ones straight into your CRM.",
    stats: [96, 92, 95],
  },
};

const STAT_LABELS = ["Agency", "Story", "Memorability"] as const;

/** React's layout effect, minus the SSR warning. */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Decode one word into another.
 *
 * Character i locks in once progress passes its slot, so the word resolves
 * left-to-right out of noise. Length is interpolated too, so "a background"
 * (12) contracting to "the main" (8) shortens smoothly instead of snapping.
 * Spaces never scramble — the word boundary is what keeps it readable as text
 * rather than as a bar of static.
 *
 * Returns a cancel function that lands on the final string, so an interrupted
 * decode can never strand a half-scrambled headline on screen.
 */
function decode(el: HTMLElement, from: string, to: string, dur = 720) {
  const maxLen = Math.max(from.length, to.length);
  const t0 = performance.now();
  let raf = 0;

  const step = () => {
    const p = Math.min(1, (performance.now() - t0) / dur);
    const len = Math.round(from.length + (to.length - from.length) * p);
    let out = "";
    for (let i = 0; i < len; i++) {
      const target = to[i];
      if (target === " " || from[i] === " ") {
        out += " ";
      } else if (target !== undefined && p >= ((i + 1) / maxLen) * 0.72) {
        out += target;
      } else {
        out += CHARS[(Math.random() * CHARS.length) | 0];
      }
    }
    el.textContent = out;
    if (p < 1) raf = requestAnimationFrame(step);
    else el.textContent = to;
  };
  raf = requestAnimationFrame(step);

  return () => {
    cancelAnimationFrame(raf);
    el.textContent = to;
  };
}

/** One stat row. Owns its own tween so a mode flip animates from wherever it is. */
function Stat({ value, label, gold }: { value: number; label: string; gold: boolean }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const shown = useRef(value);

  useEffect(() => {
    const num = numRef.current;
    const bar = barRef.current;
    if (!num || !bar) return;

    if (prefersReducedMotion()) {
      shown.current = value;
      num.textContent = String(value);
      bar.style.width = `${value}%`;
      return;
    }

    const obj = { v: shown.current };
    const tween = gsap.to(obj, {
      v: value,
      duration: 0.9,
      ease: "power3.out",
      onUpdate() {
        shown.current = obj.v;
        num.textContent = String(Math.round(obj.v));
        bar.style.width = `${obj.v}%`;
      },
    });
    return () => {
      tween.kill();
      // Never leave a bar mid-tween on unmount.
      shown.current = value;
      num.textContent = String(value);
      bar.style.width = `${value}%`;
    };
  }, [value]);

  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-fog-2">
          {label}
        </span>
        <span
          ref={numRef}
          className={`tabular font-mono text-xs font-medium transition-colors duration-500 ${
            gold ? "text-gold" : "text-npc"
          }`}
        >
          {value}
        </span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-line/70">
        <div
          ref={barRef}
          style={{ width: `${value}%` }}
          className={`h-full rounded-full transition-colors duration-500 ${
            gold ? "bg-gold" : "bg-npc"
          }`}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const [mode, setMode] = useState<Mode>("mc"); // server + no-JS state: resolved
  const rootRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const focalRef = useRef<HTMLDivElement>(null);
  const autoplaying = useRef(false);

  const c = copy[mode];
  const isGold = mode === "mc";

  // ---- entrance + the one-shot transformation -----------------------------
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const word = wordRef.current;
    if (!root || !word) return;
    if (prefersReducedMotion()) return; // already at the resolved state

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-hero]"));
      // Hidden here, in a LAYOUT effect, so the browser never paints the
      // resolved copy before the rewind. A plain useEffect flashes.
      gsap.set(items, { autoAlpha: 0, y: 22 });
      word.textContent = copy.npc.word;

      const tl = gsap.timeline({
        defaults: { duration: 0.42, ease: "power3.out" },
        delay: 0.05,
      });
      tl.to(items, { autoAlpha: 1, y: 0, stagger: 0.07 });
    }, root);

    // Rewind to the NPC state without animating the stats up from zero first.
    autoplaying.current = true;
    setMode("npc");

    const t = window.setTimeout(() => {
      if (!autoplaying.current) return; // the visitor already took control
      autoplaying.current = false;
      setMode("mc");
    }, 1750);

    // WATCHDOG — the same guarantee motion.tsx makes for [data-reveal].
    // The entrance hides the hero's own copy, so anything that stalls GSAP's
    // ticker before the timeline completes leaves the fold blank: a tab
    // backgrounded during load, a throttled renderer, a main thread blocked
    // long enough for lagSmoothing to crawl. Content visibility must never
    // depend on an animation finishing, so after the deadline everything is
    // shown unconditionally whether the timeline got there or not.
    const watchdog = window.setTimeout(() => {
      gsap.set(root.querySelectorAll("[data-hero]"), {
        autoAlpha: 1,
        y: 0,
        clearProps: "visibility",
      });
    }, 2500);

    return () => {
      window.clearTimeout(t);
      window.clearTimeout(watchdog);
      ctx.revert();
    };
    // Deliberately once, on mount.
  }, []);

  // ---- the headline decode, on every mode change ---------------------------
  //
  // The cancel function is captured in THIS effect's closure rather than a
  // shared ref. That matters: with a shared ref, the cleanup for the outgoing
  // mode could fire against whatever the ref happened to hold and land the
  // headline on the wrong word — the observed symptom was the word settling
  // exactly one state behind the colour and the copy. Closure capture means a
  // cleanup can only ever land on its own target, so the next decode always
  // starts from a settled, correct string.
  useEffect(() => {
    const word = wordRef.current;
    if (!word) return;
    const to = copy[mode].word;

    if (prefersReducedMotion()) {
      word.textContent = to;
      return;
    }
    if (word.textContent === to) return;

    const cancel = decode(word, word.textContent || "", to);
    return cancel;
  }, [mode]);

  const take = (m: Mode) => {
    autoplaying.current = false; // a click cancels the autoplay, never fights it
    setMode(m);
  };

  return (
    <section
      ref={rootRef}
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden"
    >
      {/* ── background stack ────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.10] [mask-image:linear-gradient(to_bottom,black_20%,transparent_92%)]"
          style={{
            backgroundImage:
              "image-set(url(/images/hero-bg-640.webp) 640w, url(/images/hero-bg-1024.webp) 1024w, url(/images/hero-bg-1600.webp) 1600w)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-[640px] bg-grid bg-grid-fade opacity-50" />

        {/* Warm bloom behind the focal node. A CSS layer, not a canvas fill:
            it is composited on the GPU and costs nothing per frame. */}
        <div
          className="absolute right-[8%] top-[22%] h-[560px] w-[560px] -translate-y-1/4 rounded-full blur-[140px] transition-opacity duration-[1200ms] max-lg:right-1/2 max-lg:top-[58%] max-lg:h-[380px] max-lg:w-[380px] max-lg:translate-x-1/2"
          style={{
            background: "radial-gradient(circle, var(--color-gold), transparent 66%)",
            opacity: isGold ? 0.3 : 0.05,
          }}
        />
        <div
          className="absolute -left-40 top-40 h-[520px] w-[520px] rounded-full blur-[130px] transition-opacity duration-[1200ms]"
          style={{
            background: "radial-gradient(circle, var(--color-npc), transparent 68%)",
            opacity: isGold ? 0.07 : 0.26,
          }}
        />
      </div>

      {/* The crowd. Sits above the bloom, below every pixel of copy. */}
      <div className="pointer-events-auto absolute inset-0 -z-10">
        <CrowdField mode={mode} focalRef={focalRef} />
        <div className="hero-vignette pointer-events-none absolute inset-0" />
      </div>

      {/* ── copy ────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none relative flex flex-1 items-center">
        <div className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
          <div className="pointer-events-auto max-w-[44rem]">
            <div
              data-hero
              className={`glass-liquid glass-liquid--pill mb-7 inline-flex items-center gap-2.5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] transition-colors duration-700 ${
                isGold ? "text-gold" : "text-npc"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-700 ${
                  isGold ? "bg-gold" : "bg-npc"
                }`}
                style={{
                  boxShadow: `0 0 10px 1px ${
                    isGold ? "var(--color-gold)" : "var(--color-npc)"
                  }`,
                }}
              />
              {c.state}
              <span className="text-fog-2">·</span>
              <span className="text-fog-2">{c.unit}</span>
            </div>

            <h1
              data-hero
              className="font-display text-[clamp(2.5rem,7.2vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.03em] text-snow"
            >
              <span className="block">You&rsquo;re</span>
              <span
                ref={wordRef}
                className={`swap-word block transition-colors duration-700 ${
                  isGold ? "text-gold text-glow-gold" : "text-npc text-glow-npc"
                }`}
              >
                {copy.mc.word}
              </span>
              <span className="block">character.</span>
            </h1>

            <p
              data-hero
              className="mt-7 max-w-xl font-display text-base font-semibold leading-snug text-snow sm:text-lg"
            >
              We build your site, put an AI receptionist on your phone, and send you
              leads that arrive already qualified. Fixed price, live in days.
            </p>

            {/* Both ledes live in the DOM and cross-fade. Swapping the text of a
                single <p> is a hard cut mid-transition, and re-keying the node
                to animate it would drop the entrance tween's inline styles and
                make this one paragraph appear before the rest of the stack.
                Stacking them costs one absolutely-positioned node and keeps the
                CTA row from jumping when the copy changes length. */}
            <div
              data-hero
              className="relative mt-4 max-w-xl sm:min-h-[5.25rem]"
            >
              {(["npc", "mc"] as const).map((m) => (
                <p
                  key={m}
                  aria-hidden={m !== mode}
                  className={`text-[15px] leading-relaxed text-fog transition-opacity duration-500 sm:text-base ${
                    m === mode ? "relative opacity-100" : "absolute inset-0 opacity-0"
                  }`}
                >
                  {copy[m].lede}
                </p>
              ))}
            </div>

            <div data-hero className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.22}>
                <Button href="/contact" variant="gold">
                  Start your story
                  <span aria-hidden>→</span>
                </Button>
              </Magnetic>
              <Button href="/protocol" variant="ghost">
                See the Protocol
              </Button>
            </div>

            <div data-hero className="mt-6 flex flex-wrap gap-x-7 gap-y-1.5">
              {[
                ["Fixed price", "no hourly roulette"],
                ["Live in days", "not weeks"],
                ["Every call answered", "day or night"],
              ].map(([big, small]) => (
                <div key={big} className="flex items-baseline gap-2">
                  <span className="font-display text-[13px] font-semibold text-snow">
                    {big}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-fog-2">
                    {small}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Focal anchor for the crowd field's one ignited node. Empty by
              design — it exists only so the canvas has real layout to follow.
              On wide screens it sits in the open right-hand half; on narrow
              screens, where the copy spans the full width and there is no empty
              quadrant, it becomes a band below the copy so the node never lands
              on top of the text. */}
          <div
            ref={focalRef}
            aria-hidden="true"
            className="pointer-events-none mx-auto mt-7 h-16 w-16 lg:absolute lg:right-[14%] lg:top-1/2 lg:mt-0 lg:h-40 lg:w-40 lg:-translate-y-1/2"
          />
        </div>
      </div>

      {/* ── the readout: liquid-glass HUD pinned to the fold ─────────────── */}
      <div data-hero className="relative z-10 px-5 pb-7 sm:px-8 sm:pb-9">
        <LiquidGlass className="mx-auto flex w-full max-w-6xl flex-col gap-5 rounded-2xl p-4 sm:p-5 lg:flex-row lg:items-center lg:gap-8">
          <div className="grid flex-1 grid-cols-3 gap-4 sm:gap-7">
            {STAT_LABELS.map((label, i) => (
              <Stat key={label} label={label} value={c.stats[i]} gold={isGold} />
            ))}
          </div>

          <div className="hidden h-10 w-px shrink-0 bg-line lg:block" />

          <div
            role="group"
            aria-label="Character state"
            className="flex shrink-0 items-center gap-1 self-start rounded-full border border-line/80 bg-ink/40 p-1 lg:self-auto"
          >
            {(
              [
                ["npc", "NPC"],
                ["mc", "Main character"],
              ] as const
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                onClick={() => take(m)}
                aria-pressed={mode === m}
                className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 ${
                  mode === m
                    ? m === "mc"
                      ? "bg-gold text-ink"
                      : "bg-npc text-ink"
                    : "text-fog hover:text-snow"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </LiquidGlass>
      </div>
    </section>
  );
}
