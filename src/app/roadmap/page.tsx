import PageHero from "@/components/PageHero";
import { Section, Button, Eyebrow, Divider, Tag } from "@/components/ui";
import { Reveal, Magnetic } from "@/components/motion";
import { Band } from "@/components/media";

const stack = [
  {
    name: "Story & strategy",
    role: "The human lead",
    detail: "Positioning, voice, and the point of view are decided by a person — not generated. AI drafts; you steer.",
    tone: "gold" as const,
  },
  {
    name: "Design system",
    role: "Co-pilot",
    detail: "Tokens, type, and color are reasoned out together. AI surfaces options and edge cases; the final call is yours.",
    tone: "gold" as const,
  },
  {
    name: "Build & motion",
    role: "Engine room",
    detail: "Components, layout, and interaction are built fast with AI in the loop — then reviewed line by line.",
    tone: "npc" as const,
  },
  {
    name: "Review & ship",
    role: "The human lead",
    detail: "Accessibility, performance, and copy get a real human pass before anything goes live. No autopilot ships.",
    tone: "gold" as const,
  },
];

const honest = [
  {
    title: "AI accelerates, it doesn't decide",
    body: "Speed comes from tooling. Taste, judgment, and accountability still come from a person. That split is the whole point.",
  },
  {
    title: "Nothing ships on autopilot",
    body: "Every line of copy, every interaction, every pixel gets a human review. AI drafts; a person signs off.",
  },
  {
    title: "You're never locked in",
    body: "The site is yours — clean, portable code with no platform dependency. The tools change; your asset stays.",
  },
];

const pipeline = [
  ["Understand", "What you do, who it's for, and what 'distinct' means for you."],
  ["Design", "A system built around that — not a theme with your logo on it."],
  ["Build", "AI-assisted, human-reviewed. Fast, but not reckless."],
  ["Ship", "Live, owned by you, ready to grow."],
];

export default function Roadmap() {
  return (
    <>
      <PageHero
        eyebrow="The AI Roadmap"
        eyebrowTone="npc"
        title={
          <>
            Where AI earns its keep — and where <span className="text-gold text-glow-gold">you</span> stay in control.
          </>
        }
        lede="AI is how I move fast without cutting corners. But the story, the taste, and the accountability are always human. Here's exactly where the two meet."
      />

      <Section>
        <Reveal>
          <div className="mb-12">
            <Eyebrow tone="npc">The division of labor</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-snow sm:text-4xl">
              Every step knows who's driving.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {stack.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.07} y={32}>
              <div
                className={`h-full rounded-3xl border bg-panel p-8 transition-colors duration-300 ${
                  s.tone === "gold" ? "border-gold/25 hover:border-gold/45" : "border-npc/25 hover:border-npc/45"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-xl font-bold text-snow">{s.name}</h3>
                  <Tag tone={s.tone}>{s.role}</Tag>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-fog">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Cinematic band ─────────────────────────────── */}
      <Band
        src="/images/engine.jpg"
        alt=""
        quote={
          <>
            AI accelerates. <span className="text-gold text-glow-gold">You decide.</span>
          </>
        }
        sub="The split behind every build"
      />

      <Section id="honest">
        <Reveal>
          <div className="mb-12">
            <Eyebrow tone="gold">The honest version</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-snow sm:text-4xl">
              Three things I won't let the hype get away from me.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {honest.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08} y={30}>
              <div className="h-full rounded-2xl border border-line bg-panel p-7 transition-colors duration-300 hover:border-gold/30">
                <span className="font-display text-3xl font-bold text-gold">◆</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-snow">{h.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{h.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider className="mx-auto max-w-6xl" />

      <Section id="pipeline">
        <Reveal>
          <div className="mb-12">
            <Eyebrow tone="npc">The pipeline</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-snow sm:text-4xl">
              Four beats, start to ship.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pipeline.map(([title, body], i) => (
            <Reveal key={title} delay={i * 0.07} y={30}>
              <div className="relative h-full rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-npc/40">
                <span className="font-display text-4xl font-bold text-line-2">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-snow">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fog">{body}</p>
                {i < pipeline.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 text-fog-2 lg:block"
                  >
                    →
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden border-t border-line">
        <div
          data-parallax="0.25"
          className="pointer-events-none absolute left-1/2 top-[-120px] -z-10 h-[380px] w-[680px] -translate-x-1/2 rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, var(--color-gold), transparent 70%)", opacity: 0.22 }}
        />
        <Section className="py-24 text-center">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-snow sm:text-4xl">
              Fast because of AI. Distinct because of you.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-fog">
              That's the whole deal. Let's put it to work on your story.
            </p>
            <div className="mt-9 flex justify-center">
              <Magnetic strength={0.25}>
                <Button href="/contact" variant="gold">
                  Start your story <span aria-hidden>→</span>
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </Section>
      </section>
    </>
  );
}
