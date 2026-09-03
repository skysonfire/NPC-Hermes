import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Section, Button, Eyebrow, Divider } from "@/components/ui";
import { Reveal, CountUp, Magnetic } from "@/components/motion";
import { Figure } from "@/components/media";

export const metadata: Metadata = {
  title: "Sarah's story",
  description:
    "A representative engagement, start to finish: what was broken, what we changed, and what it did to her enquiries. Figures anonymised and rounded.",
  alternates: { canonical: "/sarah" },
  openGraph: {
    title: "Sarah's story",
    description:
      "A representative engagement, start to finish: what was broken, what we changed, and what it did to her enquiries. Figures anonymised and rounded.",
    url: "/sarah",
  },
};


const before = [
  "A template site that could belong to anyone in her field",
  "Copy that listed services but never said who she was",
  "Great work, zero personality",
  "Prospects who couldn't tell her from the other three",
];

const read = [
  "She wasn't 'another designer' — she was the one who made complicated things feel obvious",
  "Her real clients didn't hire her for the logo. They hired her for the thinking",
  "The site was selling deliverables. She was actually selling judgment",
];

const stage = [
  "A design system built around clarity, not decoration",
  "A voice that sounds like her, not like a template",
  "One point of view, repeated everywhere, until it's hers",
];

export default function Sarah() {
  return (
    <>
      <PageHero
        eyebrow="A worked example"
        eyebrowTone="npc"
        title={
          <>
            Sarah was an <span className="text-npc text-glow-npc">NPC</span>. Then she ran the Protocol.
          </>
        }
        lede="Sarah had everything that mattered — great work, real clients, a sharp point of view. And a website that made her look like everyone else. This is what changed."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* before */}
          <Reveal y={30}>
            <div className="h-full rounded-3xl border border-npc/25 bg-panel p-8">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-npc" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-npc">The before</span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-snow">A great product, invisible packaging.</h2>
              <ul className="mt-6 space-y-4">
                {before.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-fog">
                    <span className="mt-2 h-px w-4 shrink-0 bg-npc/50" />
                    <span className="text-[15px]">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* the read */}
          <Reveal y={30} delay={0.12}>
            <div className="h-full rounded-3xl border border-gold/30 bg-panel p-8">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">The read</span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-snow">The story she was underplaying.</h2>
              <ul className="mt-6 space-y-4">
                {read.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-snow">
                    <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
                    <span className="text-[15px] font-medium">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-14 max-w-3xl" y={30}>
          <blockquote className="rounded-3xl glass px-8 py-10 text-center">
            <p className="font-display text-xl font-medium leading-relaxed text-snow sm:text-2xl">
              "I wasn't trying to look like a design agency. I was trying to look like the person who
              actually solves the problem. The site finally does."
            </p>
            <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
              — Sarah
            </footer>
          </blockquote>
        </Reveal>

        <Reveal className="mt-14" y={34}>
          <Figure
            name="sarah-desk"
            alt="Sarah's design desk — sketches, type samples and a screen glowing at dusk"
            label="Sarah's desk"
            className="h-64 sm:h-80"
          />
        </Reveal>
      </Section>

      <Divider className="mx-auto max-w-6xl" />

      <Section id="stage">
        <Reveal>
          <div className="mb-12">
            <Eyebrow tone="gold">The stage</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-snow sm:text-4xl">
              A site built around her point of view — not a theme.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {stage.map((t, i) => (
            <Reveal key={t} delay={i * 0.08} y={30}>
              <div className="h-full rounded-2xl glass p-7 transition-colors duration-300 hover:border-gold/30">
                <span className="font-display text-3xl font-bold text-gold">0{i + 1}</span>
                <p className="mt-4 text-[15px] leading-relaxed text-fog">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider className="mx-auto max-w-6xl" />

      <Section id="numbers">
        <Reveal>
          <div className="mb-12">
            <Eyebrow tone="npc">The numbers</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-snow sm:text-4xl">
              What changed when she became the main character.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          <Reveal delay={0.05} y={30}>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-gold/25 bg-panel px-5 py-10 text-center">
              <span className="font-display text-4xl font-bold text-gold text-glow-gold sm:text-5xl">
                <CountUp to={3.2} decimals={1} suffix="×" duration={1.8} />
              </span>
              <span className="mt-3 max-w-[12rem] text-sm leading-relaxed text-fog">
                more qualified inbound in the first month
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.15} y={30}>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-gold/25 bg-panel px-5 py-10 text-center">
              <span className="font-display text-4xl font-bold text-gold text-glow-gold sm:text-5xl">
                <CountUp to={2} suffix=" wks" duration={1.8} />
              </span>
              <span className="mt-3 max-w-[12rem] text-sm leading-relaxed text-fog">
                from kickoff to a live site
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.25} y={30}>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-gold/25 bg-panel px-5 py-10 text-center">
              <span className="font-display text-4xl font-bold text-gold text-glow-gold sm:text-5xl">
                <CountUp to={1} suffix=" of 1" duration={1.8} />
              </span>
              <span className="mt-3 max-w-[12rem] text-sm leading-relaxed text-fog">
                the only site in her niche that sounds like her
              </span>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-6">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-fog-2">
            Representative engagement — figures anonymized &amp; rounded. Real results vary by market
            and timing.
          </p>
        </Reveal>
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
              Your story isn't Sarah's. But it's probably buried the same way.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-fog">
              Let's find the version of your site that sounds like you — not like a template.
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
