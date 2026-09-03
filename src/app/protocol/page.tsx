import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Section, Button, Eyebrow, Divider } from "@/components/ui";
import { Reveal, Tilt, Magnetic } from "@/components/motion";
import { Band } from "@/components/media";

export const metadata: Metadata = {
  title: "The Protocol",
  description:
    "The four moves that take a business from background character to protagonist: Read, Cast, Stage, Open. A repeatable system, fixed price, live in days.",
  alternates: { canonical: "/protocol" },
  openGraph: {
    title: "The Protocol",
    description:
      "The four moves that take a business from background character to protagonist: Read, Cast, Stage, Open. A repeatable system, fixed price, live in days.",
    url: "/protocol",
  },
};


const steps = [
  {
    n: "01",
    title: "Read",
    body: "We dig into your story, your market, and the gap between what you actually do and how you're currently seen. This is where most brands are quietly becoming NPCs — and where we find the difference.",
    get: ["A positioning brief", "A competitor read", "Your story spine"],
  },
  {
    n: "02",
    title: "Cast",
    body: "We decide who you are in this story — the protagonist — and what makes the audience root for you. One clear promise, one defensible point of view, no mush.",
    get: ["A voice you own", "A promise you can stand behind", "A differentiator with teeth"],
  },
  {
    n: "03",
    title: "Stage",
    body: "We design the stage. Custom layout, type, color, and motion — built around your story, never dropped onto a theme. If it could be anyone's site, it's not done.",
    get: ["A design system", "Page-by-page structure", "A living prototype"],
  },
  {
    n: "04",
    title: "Open",
    body: "We build, ship, and hand over the keys. Fixed price, days not weeks, and a site that's genuinely yours to grow. No hourly roulette, no scope drift.",
    get: ["A live site", "Clean, portable code", "Docs + handover"],
  },
];

const principles = [
  {
    title: "Story before pixels",
    body: "Design serves the story, not the other way around. A beautiful NPC is still a background character.",
  },
  {
    title: "One of one",
    body: "If the output could belong to anyone, we start over. Distinctiveness is the job.",
  },
  {
    title: "Fixed price, real speed",
    body: "You get a number and a date. No meters running, no surprises at the invoice.",
  },
  {
    title: "Yours to keep",
    body: "Clean code, no lock-in, full ownership. The site grows with you, not with our platform.",
  },
];

export default function Protocol() {
  return (
    <>
      <PageHero
        eyebrow="The Protocol"
        title={
          <>
            From background to <span className="text-gold text-glow-gold">protagonist</span>, in four moves.
          </>
        }
        lede="This is the system behind every build. It's repeatable, it's opinionated, and it's tuned to one goal: making you the main character of your own market."
      />

      <Section>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} y={34} delay={i * 0.05}>
              <Tilt max={2}>
                <div className="group grid gap-8 rounded-3xl glass p-7 transition-colors duration-300 hover:border-gold/30 sm:grid-cols-[auto_1fr] sm:p-9">
                  <div className="flex items-center sm:block">
                    <span className="font-display text-5xl font-bold text-line-2 transition-colors duration-300 group-hover:text-gold sm:text-6xl">
                      {s.n}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-snow">{s.title}</h2>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fog">{s.body}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog-2">
                        You walk away with
                      </span>
                      <span className="h-px w-6 bg-line-2" />
                      {s.get.map((g) => (
                        <span
                          key={g}
                          className="inline-flex items-center rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium text-gold"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Cinematic band ─────────────────────────────── */}
      <Band
        name="arch"
        quote={
          <>
            If it could be anyone's site, <span className="text-gold text-glow-gold">it's not done</span>.
          </>
        }
        sub="The bar every build has to clear"
      />

      <Section id="principles">
        <Reveal>
          <div className="mb-14 flex items-center gap-3">
            <Eyebrow tone="gold">The ground rules</Eyebrow>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07} y={30}>
              <div className="h-full rounded-2xl glass p-7 transition-colors duration-300 hover:border-gold/30">
                <h3 className="font-display text-lg font-semibold text-snow">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{p.body}</p>
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
              Ready to see it on your story?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-fog">
              Tell me what you do. I'll run the first two moves on the spot and show you the shape of
              your main-character site.
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
