import Hero from "@/components/Hero";
import { Section, SectionHeading, Button, Eyebrow, Divider, Tag } from "@/components/ui";
import { Reveal, CountUp, Marquee, Tilt, Magnetic } from "@/components/motion";
import { Band, Figure } from "@/components/media";

const npcTraits = [
  "A template wearing a coat of paint",
  "Copy that says a lot and means nothing",
  "Forgotten the moment it loads",
  "One of a thousand",
];

const mcTraits = [
  "A design with a point of view",
  "A story worth following",
  "People who come back",
  "One of one",
];

const steps = [
  {
    n: "01",
    title: "Read",
    body: "We find the story you've been underplaying — what you actually stand for, who you're for, and why you win.",
  },
  {
    n: "02",
    title: "Cast",
    body: "We position you as the protagonist. The one person the audience has been waiting for.",
  },
  {
    n: "03",
    title: "Stage",
    body: "We design a stage worthy of that story. Custom, opinionated, unmistakably yours.",
  },
  {
    n: "04",
    title: "Open",
    body: "We ship in days, not weeks. Fixed price. No hourly roulette, no scope drift.",
  },
];

const engine = [
  { role: "Story & strategy", who: "The human lead", tone: "gold" as const },
  { role: "Design system", who: "Co-pilot", tone: "gold" as const },
  { role: "Build & motion", who: "Engine room", tone: "npc" as const },
  { role: "Review & ship", who: "The human lead", tone: "gold" as const },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ── Ticker ───────────────────────────────────────── */}
      <Marquee
        items={[
          "Fixed price",
          "Days, not weeks",
          "Story-driven",
          "One of one",
          "No templates",
          "You're the protagonist",
        ]}
      />

      {/* ── The difference ─────────────────────────────── */}
      <Section id="difference">
        <Reveal>
          <SectionHeading
            eyebrow="The problem"
            eyebrowTone="npc"
            title={
              <>
                The world is full of <span className="text-npc text-glow-npc">NPCs</span>.
              </>
            }
            lede="Same layout. Same copy. Same trust badges. Scroll past one and you've scrolled past a thousand. Being one of them isn't a design problem — it's a story problem."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {/* NPC column */}
          <Reveal delay={0.05} className="h-full">
            <div className="h-full rounded-3xl border border-npc/25 bg-panel p-7">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-npc" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-npc">
                  What you've been handed
                </span>
              </div>
              <ul className="mt-6 space-y-4">
                {npcTraits.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-fog">
                    <span className="mt-2 h-px w-4 shrink-0 bg-npc/50" />
                    <span className="text-[15px]">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Main character column */}
          <Reveal delay={0.15} className="h-full">
            <div className="relative h-full rounded-3xl border border-gold/30 bg-panel p-7">
              <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gold opacity-5 blur-2xl" />
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                  What you're meant to be
                </span>
              </div>
              <ul className="mt-6 space-y-4">
                {mcTraits.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-snow">
                    <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
                    <span className="text-[15px] font-medium">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Cinematic band ─────────────────────────────── */}
      <Band
        src="/images/studio.jpg"
        alt=""
        quote={
          <>
            Scroll past one and you've scrolled past{" "}
            <span className="text-npc text-glow-npc">a thousand</span>.
          </>
        }
        sub="Be the one they can't scroll past"
      />

      {/* ── The Protocol ───────────────────────────────── */}
      <Section id="protocol">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="The method"
              title="Four moves from background to protagonist."
              lede="A repeatable system, not a mood board. Every engagement runs the same four moves — tuned to your story."
            />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <Button href="/protocol" variant="ghost">
              Walk the full Protocol <span aria-hidden>→</span>
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} y={34}>
              <Tilt className="h-full">
                <div className="group h-full rounded-2xl border border-line bg-panel p-6 transition-all duration-300 hover:border-gold/40">
                  <div className="font-display text-4xl font-bold text-line-2 transition-colors duration-300 group-hover:text-gold">
                    {s.n}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-snow">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{s.body}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider className="mx-auto max-w-6xl" />

      {/* ── Sarah teaser ───────────────────────────────── */}
      <Section id="sarah">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="A worked example"
              eyebrowTone="npc"
              title={
                <>
                  Meet Sarah. She was an <span className="text-npc">NPC</span>.
                </>
              }
              lede="A great product buried under a generic site. Same skills, same work — nobody could tell she was the best in her field. Here's what changed when she ran the Protocol."
            />
            <div className="mt-8">
              <Button href="/sarah" variant="npc">
                Read Sarah's story <span aria-hidden>→</span>
              </Button>
            </div>
          </Reveal>

          <div>
            <Reveal y={30}>
              <Figure
                src="/images/sarah.jpg"
                alt="A designer's desk at dusk — the kind of workspace Sarah's new site finally reflects"
                label="The after · Sarah"
                className="mb-4 h-52 sm:h-64"
              />
            </Reveal>
            <div className="grid grid-cols-3 gap-4">
              <Reveal delay={0.05}>
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-panel px-4 py-8 text-center">
                  <span className="font-display text-3xl font-bold text-gold text-glow-gold sm:text-4xl">
                    <CountUp to={3.2} decimals={1} suffix="×" />
                  </span>
                  <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-fog-2">
                    more inbound
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-panel px-4 py-8 text-center">
                  <span className="font-display text-3xl font-bold text-gold text-glow-gold sm:text-4xl">
                    <CountUp to={2} suffix=" wks" />
                  </span>
                  <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-fog-2">
                    to launch
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-panel px-4 py-8 text-center">
                  <span className="font-display text-3xl font-bold text-gold text-glow-gold sm:text-4xl">
                    <CountUp to={1} suffix=" of 1" />
                  </span>
                  <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-fog-2">
                    the point
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <Divider className="mx-auto max-w-6xl" />

      {/* ── AI Roadmap teaser ──────────────────────────── */}
      <Section id="roadmap">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading
              eyebrow="The engine"
              eyebrowTone="npc"
              title="AI on your side of the table."
              lede="We use modern AI to move fast — draft, iterate, build — but you stay the protagonist. AI is the crew, not the captain. Here's exactly how it fits."
            />
            <div className="mt-8 shrink-0">
              <Button href="/roadmap" variant="ghost">
                See the AI roadmap <span aria-hidden>→</span>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12} y={34}>
            <div className="rounded-3xl border border-line bg-panel p-2">
              {engine.map((e) => (
                <div
                  key={e.role}
                  className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4 transition-colors duration-300 hover:bg-panel-2"
                >
                  <span className="text-sm font-medium text-snow">{e.role}</span>
                  <Tag tone={e.tone}>{e.who}</Tag>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Closing CTA ────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-line">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-[420px] bg-grid bg-grid-fade opacity-40" />
          <div
            data-parallax="0.25"
            className="absolute left-1/2 top-[-120px] h-[420px] w-[680px] -translate-x-1/2 rounded-full blur-[130px]"
            style={{ background: "radial-gradient(circle, var(--color-gold), transparent 70%)", opacity: 0.25 }}
          />
        </div>
        <Section className="py-28 text-center sm:py-36">
          <Reveal className="mx-auto max-w-2xl">
            <div className="mb-6 flex justify-center">
              <Eyebrow tone="gold">Your move</Eyebrow>
            </div>
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-snow sm:text-5xl">
              Ready to stop being a <span className="text-npc text-glow-npc">background character</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
              Tell me what you do. I'll tell you why nobody remembers it — and what the main-character
              version looks like.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Magnetic strength={0.25}>
                <Button href="/contact" variant="gold">
                  Start your story <span aria-hidden>→</span>
                </Button>
              </Magnetic>
              <Button href="/protocol" variant="ghost">
                See the Protocol
              </Button>
            </div>
          </Reveal>
        </Section>
      </section>
    </>
  );
}
