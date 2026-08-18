"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "./ui";
import { Magnetic, prefersReducedMotion } from "./motion";

type Mode = "npc" | "mc";

const copy: Record<
  Mode,
  {
    tag: string;
    kicker: string;
    headBase: string;
    headAccent: string;
    lede: string;
    stats: { label: string; value: number }[];
  }
> = {
  npc: {
    tag: "UNIT-042 · BACKGROUND",
    kicker: "DEFAULT STATE",
    headBase: "You're a",
    headAccent: "background character.",
    lede: "Generic. On-loop. Interchangeable. A presence that says everything and gets remembered for nothing. That's the NPC default — and it's quietly costing you every single day.",
    stats: [
      { label: "Agency", value: 22 },
      { label: "Story", value: 14 },
      { label: "Memorability", value: 18 },
    ],
  },
  mc: {
    tag: "PLAYER ONE · PROTAGONIST",
    kicker: "STATE UNLOCKED",
    headBase: "Be the",
    headAccent: "main character.",
    lede: "Your story. Your design. A presence people actually remember and come back for. NPC Protocol takes you from background to protagonist — built with modern AI, never a template.",
    stats: [
      { label: "Agency", value: 96 },
      { label: "Story", value: 92 },
      { label: "Memorability", value: 95 },
    ],
  },
};

function Glyph({ mode }: { mode: Mode }) {
  if (mode === "npc") {
    return (
      <svg width="116" height="116" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <rect
          x="32"
          y="32"
          width="56"
          height="56"
          rx="10"
          transform="rotate(45 60 60)"
          stroke="var(--color-npc)"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeDasharray="5 8"
        />
        <circle cx="60" cy="60" r="9" fill="none" stroke="var(--color-npc)" strokeOpacity="0.4" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg width="116" height="116" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <rect
        x="32"
        y="32"
        width="56"
        height="56"
        rx="10"
        transform="rotate(45 60 60)"
        stroke="var(--color-gold)"
        strokeWidth="3"
        fill="var(--color-gold)"
        fillOpacity="0.08"
      />
      <circle cx="60" cy="60" r="12" fill="var(--color-gold)" className="animate-pulse" />
    </svg>
  );
}

export default function Hero() {
  const [mode, setMode] = useState<Mode>("npc");
  const c = copy[mode];
  const isGold = mode === "mc";
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      /* staged entrance — 4x faster (was duration .85 / delay .1 / stagger .09) */
      const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-hero]"));
      gsap.set(items, { autoAlpha: 0, y: 26 });
      const tl = gsap.timeline({ defaults: { duration: 0.2125, ease: "power3.out" }, delay: 0.025 });
      items.forEach((it) => tl.to(it, { autoAlpha: 1, y: 0 }, "+=0.0225"));

      /* ambient drift on the light orbs */
      gsap.to("[data-orb-a]", { x: 46, y: 34, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to("[data-orb-b]", { x: -54, y: 44, duration: 12, ease: "sine.inOut", yoyo: true, repeat: -1 });

      /* slow glyph float */
      gsap.to("[data-glyph]", { y: -10, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.16] [mask-image:linear-gradient(to_bottom,black_20%,transparent_95%)]" style={{ backgroundImage: "url(/images/hero-bg.jpg)" }} />
        <div className="absolute inset-x-0 top-0 h-[620px] bg-grid bg-grid-fade opacity-60" />
        <div
          data-orb-a
          className="absolute -top-44 right-[-120px] h-[520px] w-[520px] rounded-full blur-[130px] transition-opacity duration-700"
          style={{ background: "radial-gradient(circle, var(--color-gold), transparent 68%)", opacity: isGold ? 0.4 : 0.08 }}
        />
        <div
          data-orb-b
          className="absolute top-48 -left-44 h-[520px] w-[520px] rounded-full blur-[130px] transition-opacity duration-700"
          style={{ background: "radial-gradient(circle, var(--color-npc), transparent 68%)", opacity: isGold ? 0.08 : 0.34 }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pb-24 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:pb-32">
        {/* left: copy */}
        <div>
          <div
            data-hero
            className={`mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] transition-colors duration-500 ${
              isGold ? "border-gold/40 text-gold" : "border-npc/40 text-npc"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isGold ? "bg-gold" : "bg-npc"}`} />
            {c.kicker}
          </div>

          <h1 data-hero className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-snow sm:text-6xl">
            {c.headBase}{" "}
            <span
              className={`transition-colors duration-500 ${isGold ? "text-gold text-glow-gold" : "text-npc text-glow-npc"}`}
            >
              {c.headAccent}
            </span>
          </h1>

          <p data-hero className="mt-6 max-w-xl font-display text-lg font-semibold leading-snug text-snow sm:text-xl">
            Fixed-price, story-driven websites — live in days, and wired to turn visitors into
            qualified leads.
          </p>

          <p data-hero className="mt-4 max-w-xl text-base leading-relaxed text-fog sm:text-lg">{c.lede}</p>

          <div data-hero className="mt-9 flex flex-wrap items-center gap-3">
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

          <div data-hero className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {[
              ["Fixed price", "no hourly roulette"],
              ["Days, not weeks", "to launch"],
              ["Story-driven", "not templated"],
            ].map(([big, small]) => (
              <div key={big} className="flex items-baseline gap-2">
                <span className="font-display text-sm font-semibold text-snow">{big}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-fog-2">{small}</span>
              </div>
            ))}
          </div>
        </div>

        {/* right: character card + toggle */}
        <div data-hero className="relative">
          <div
            className={`relative rounded-3xl border p-6 transition-colors duration-500 ${
              isGold ? "border-gold/30 bg-panel" : "border-npc/30 bg-panel"
            }`}
          >
            <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-40 blur-2xl transition-colors duration-500" style={{ background: isGold ? "var(--color-gold)" : "var(--color-npc)" }} />

            {/* card header */}
            <div className="flex items-center justify-between">
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-500 ${isGold ? "text-gold" : "text-npc"}`}
              >
                {c.tag}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-fog-2">
                {isGold ? "● active" : "○ looping"}
              </span>
            </div>

            {/* glyph */}
            <div className="my-8 flex justify-center">
              <div data-glyph className={`flex h-[150px] w-[150px] items-center justify-center rounded-2xl border ${isGold ? "border-gold/20 bg-gold/5" : "border-npc/20 bg-npc/5"}`}>
                <Glyph mode={mode} />
              </div>
            </div>

            {/* stat bars */}
            <div className="space-y-4">
              {c.stats.map((s) => (
                <div key={s.label}>
                  <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                    <span className="text-fog">{s.label}</span>
                    <span className={isGold ? "text-gold" : "text-npc"}>{s.value}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-panel-2">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${isGold ? "bg-gold" : "bg-npc"}`}
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* toggle */}
          <div className="mt-5 flex justify-center">
            <div className="inline-flex rounded-full border border-line bg-panel p-1">
              <button
                type="button"
                onClick={() => setMode("npc")}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  mode === "npc" ? "bg-npc text-ink" : "text-fog hover:text-snow"
                }`}
              >
                NPC
              </button>
              <button
                type="button"
                onClick={() => setMode("mc")}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  mode === "mc" ? "bg-gold text-ink" : "text-fog hover:text-snow"
                }`}
              >
                Main character
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
