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
    get: ["A positioning brief", "A competitor read", "Your story spine"],
  },
  {
    n: "02",
    title: "Cast",
    body: "We position you as the protagonist. The one person the audience has been waiting for.",
    get: ["A voice you own", "A promise you can stand behind", "A differentiator with teeth"],
  },
  {
    n: "03",
    title: "Stage",
    body: "We design a stage worthy of that story. Custom, opinionated, unmistakably yours.",
    get: ["A design system", "Page-by-page structure", "A living prototype"],
  },
  {
    n: "04",
    title: "Open",
    body: "We ship in days, not weeks. Fixed price. No hourly roulette, no scope drift.",
    get: ["A live site", "Clean, portable code", "Docs + handover"],
  },
];

/* ── Selected work — swap these entries for real client builds before production ── */
const work = [
  {
    name: "NPC Protocol",
    client: "Brand site + lead engine — the one you're on",
    url: "npcprotocol.com",
    tags: ["Next.js", "GSAP", "Tailwind"],
    outcome: "Live · 2 weeks",
    initial: "N",
    accent: "gold" as const,
    state: "live" as const,
  },
  {
    name: "Easton Electrical",
    client: "Local trades — services, areas, booking",
    url: "eastonelectrical.example",
    tags: ["Astro", "Static", "SEO"],
    outcome: "Live · 1 week",
    initial: "E",
    accent: "npc" as const,
    state: "live" as const,
  },
  {
    name: "Next project",
    client: "Slot open",
    url: "",
    tags: [],
    outcome: "Slot open",
    initial: "→",
    accent: "gold" as const,
    state: "open" as const,
  },
];

const engine = [
  { role: "Web", who: "Capture", tone: "gold" as const },
  { role: "Lead", who: "Intake", tone: "npc" as const },
  { role: "Qualify", who: "AI scoring", tone: "npc" as const },
  { role: "CRM", who: "Handoff", tone: "gold" as const },
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
                  <div className="font-display text-5xl font-bold leading-none text-line-2 transition-colors duration-300 group-hover:text-gold">
                    {s.n}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-snow">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fog">{s.body}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {s.get.map((g) => (
                      <span
                        key={g}
                        className="inline-flex items-center rounded-full border border-gold/30 bg-gold/5 px-2.5 py-1 text-[11px] font-medium text-gold"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider className="mx-auto max-w-6xl" />

      {/* ── Selected work ──────────────────────────────── */}
      <Section id="work">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Proof, not promises."
            lede="Two builds already live — and one slot that's waiting for you. Real case studies land here as we ship."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {work.map((w, i) => (
            <Reveal key={w.name} delay={i * 0.08} y={34} className="h-full">
              {w.state === "open" ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-line-2 bg-panel/40 p-8 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog-2">
                    Slot 03
                  </span>
                  <div className="my-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-panel">
                    <span className="font-display text-3xl font-bold text-fog-2">→</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-snow">Next project</h3>
                  <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-fog">
                    This slot is open. Your story goes here.
                  </p>
                  <div className="mt-6">
                    <Button href="/contact" variant="ghost">
                      Claim the slot <span aria-hidden>→</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors duration-300 hover:border-gold/40">
                  {/* browser chrome */}
                  <div className="flex items-center gap-1.5 border-b border-line bg-ink/70 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                    <span
                      className={`ml-3 truncate rounded-full border px-3 py-0.5 font-mono text-[10px] tracking-wide ${
                        w.accent === "gold"
                          ? "border-gold/30 text-gold-soft"
                          : "border-npc/30 text-npc-soft"
                      }`}
                    >
                      {w.url}
                    </span>
                  </div>

                  {/* mock viewport */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <div
                      className="absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[70px]"
                      style={{
                        background: w.accent === "gold" ? "var(--color-gold)" : "var(--color-npc)",
                        opacity: 0.28,
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-fog-2">
                        {w.client}
                      </span>
                      <span
                        className={`font-display text-6xl font-bold leading-none ${
                          w.accent === "gold" ? "text-gold" : "text-npc"
                        }`}
                      >
                        {w.initial}
                      </span>
                      <div className="mt-4 w-3/4 space-y-2">
                        <div className="h-1.5 w-full rounded-full bg-snow/25" />
                        <div className="h-1.5 w-2/3 rounded-full bg-snow/15" />
                      </div>
                    </div>
                  </div>

                  {/* meta */}
                  <div className="flex flex-1 flex-col justify-between border-t border-line p-5">
                    <h3 className="font-display text-lg font-semibold text-snow">{w.name}</h3>
                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      {w.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fog"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gold">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        {w.outcome}
                      </span>
                    </div>
                  </div>
                </div>
              )}
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
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-fog-2 sm:text-left">
              Representative engagement — figures anonymized &amp; rounded
            </p>
          </div>
        </div>
      </Section>

      <Divider className="mx-auto max-w-6xl" />

      {/* ── Integrated AI — the engine ─────────────────── */}
      <Section id="roadmap">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Integrated AI"
              eyebrowTone="npc"
              title={
                <>
                  Not just a site. A <span className="text-gold text-glow-gold">full lead engine</span>.
                </>
              }
              lede="The website is the front of the system: it captures your leads, AI qualifies them, and the good ones land in your CRM already sorted. One engine — web to pipeline."
            />
            <div className="mt-8 shrink-0">
              <Button href="/roadmap" variant="ghost">
                See how the engine runs <span aria-hidden>→</span>
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
                  <span className="text-sm font-semibold text-snow">{e.role}</span>
                  <Tag tone={e.tone}>{e.who}</Tag>
                </div>
              ))}
            </div>
            <p className="mt-3 px-5 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-fog-2">
              Web → Lead → Qualification → CRM
            </p>
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
              Tell me what you do — and let's build the main-character version together. I bring the
              system, you bring the story.
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
