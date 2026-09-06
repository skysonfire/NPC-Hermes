import type { Metadata } from "next";
import { Section, SectionHeading, Button, Eyebrow, Tag, Divider } from "@/components/ui";
import { Reveal, Magnetic } from "@/components/motion";
import { Faq, type FaqItem } from "@/components/Faq";
import { site, siteUrl } from "@/lib/site";

/**
 * /ai-visibility — the sales page for the AEO/GEO audit.
 *
 * This is the highest-ticket product in the stack and until now there was
 * nowhere on the site to buy it. /voice-services reads like a sales page from
 * the nav but is actually the service contract, so the entire AI-visibility
 * offer was invisible to anyone who did not already know it existed.
 *
 * WHAT IS DELIBERATELY ABSENT
 *  - No third-party vendor names. Hard rule: "third-party" only in public copy.
 *  - No margins, COGS, or the internal add-on ladder.
 *  - No borrowed conversion statistics. The internal deck cites several, but an
 *    unverifiable number in a headline is the same trust problem as the 3.2x on
 *    /sarah. The mechanism sells this without them.
 *  - No price. The site quotes nothing anywhere yet and that is a pending
 *    decision, not something to settle in a page template. When it is settled,
 *    the CTA block below is where it goes.
 *
 * The page argues from method rather than from claims, because the method IS
 * the differentiator: N=3 runs across five engines, fresh sessions, screenshot
 * evidence, and an explicit refusal to guarantee a citation.
 */

const title = "AI search visibility";
const description =
  "Find out whether ChatGPT, Gemini, Perplexity and Google AI Overviews recommend your business, or a competitor. A fixed-scope audit across five engines.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ai-visibility" },
  openGraph: {
    type: "website",
    title: `${title} · ${site.name}`,
    description,
    url: `${siteUrl}/ai-visibility`,
  },
};

/* The four diagnostic buckets, straight from the audit runbook. */
const buckets = [
  {
    n: "01",
    title: "Citation share",
    body: "We ask the engines who the best in your trade and town is, and record who they name. Then we do it again, and again, because these systems are non-deterministic and one answer proves nothing.",
    get: ["Your position", "Named competitors", "The exact sentence"],
  },
  {
    n: "02",
    title: "Technical access",
    body: "Whether the AI crawlers can reach you at all. Blocked agents in robots.txt, missing structured data, a Bing index you are absent from — any one of these quietly removes you from the answer.",
    get: ["Crawler access", "Schema coverage", "Index presence"],
  },
  {
    n: "03",
    title: "Entity clarity",
    body: "Whether a model can say anything specific about you. Name, address and phone that disagree across directories lower a model's confidence until it hedges instead of recommending.",
    get: ["NAP consistency", "Entity signals", "Category clarity"],
  },
  {
    n: "04",
    title: "Mentions",
    body: "What sources other than you say about you. A business that exists only on its own domain gives an engine one source with an obvious motive — so it hedges rather than names you.",
    get: ["Source coverage", "Gap list", "Priority placements"],
  },
];

const faqs: FaqItem[] = [
  {
    q: "What exactly do I get?",
    a: "One report. Where you appear across five engines against named competitors, the technical reasons you do or do not get cited, a prioritised fix list, and a 60 to 90 day roadmap. Every finding is backed by a timestamped screenshot and the raw log line, because engines change and an undated claim about them is worthless.",
  },
  {
    q: "Which engines do you check?",
    a: "ChatGPT, Gemini, Perplexity, Copilot and Google AI Overviews. Each prompt is run three times in a fresh session per engine, and we report the majority answer. These systems are non-deterministic — a single run tells you nothing, and anyone showing you one screenshot is showing you noise.",
  },
  {
    q: "Is this just SEO with a new name?",
    a: "No. SEO competes for a rank — a position in a list of links. This competes for a citation — being named inside the answer, where there is no second page and usually no more than three or four names. The technical work overlaps in places. The target does not.",
  },
  {
    q: "Do you guarantee I will get recommended?",
    a: "No, and nobody honestly can. We guarantee process and data: the prompts we said we would run, run the number of times we said, with the evidence attached. Anyone promising you a placement in a system they do not control is selling you something they cannot deliver.",
  },
  {
    q: "How long does it take?",
    a: "The audit is a fixed scope with a fixed timebox — a few days, not a retainer in disguise. Fixing what it finds is a longer job, and some of it, particularly third-party mentions, takes months rather than weeks. The report says which is which so you can decide what you want to do yourself.",
  },
  {
    q: "What if the audit says I am doing fine?",
    a: "Then you paid for a diagnostic that came back clean, and you know your position against named competitors with dated evidence. That is a real answer. The audit is priced to stand on its own — it is not a loss-leader that only pays off if you buy a retainer afterwards.",
  },
  {
    q: "Do you need access to my website?",
    a: "No. Everything in the audit is observable from outside — the same view a crawler or an answer engine has. If you decide to act on the fix list we will need access at that point, but not to run the diagnostic.",
  },
];

export default function AiVisibility() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${siteUrl}/ai-visibility#service`,
            name: "AI search visibility audit (AEO/GEO)",
            serviceType: "Answer engine optimisation audit",
            description,
            provider: { "@id": `${siteUrl}/#organization` },
            areaServed: "United Kingdom",
            url: `${siteUrl}/ai-visibility`,
          }),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <Section className="pt-20 sm:pt-24">
        <Reveal>
          <div className="mb-6">
            <Eyebrow tone="gold">AI search visibility</Eyebrow>
          </div>
          <h1 className="max-w-4xl font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-bold leading-[1.04] tracking-tight text-snow">
            Ask ChatGPT who the best in your trade is.
            <span className="block text-gold text-glow-gold">
              See whether it says your name.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-fog sm:text-lg">
            Customers have started asking an assistant instead of searching. It
            answers with three or four names and no second page. You are either in
            that answer or you do not exist for that customer — and most businesses
            have never checked which.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.22}>
              <Button href="/contact" variant="gold">
                Check my visibility <span aria-hidden>→</span>
              </Button>
            </Magnetic>
            <Button href="/blog/why-ai-doesnt-recommend-your-business" variant="ghost">
              Why this happens
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["ChatGPT", "Gemini", "Perplexity", "Copilot", "AI Overviews"].map((e) => (
              <Tag key={e} tone="gold">
                {e}
              </Tag>
            ))}
          </div>
        </Reveal>
      </Section>

      <Divider className="mx-auto max-w-6xl" />

      {/* ── The shift ────────────────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="What changed"
            title="The unit of competition stopped being a rank."
            lede="Search gave you a position in a list of ten links and a second page for everyone else. An answer engine names three or four businesses in a sentence. There is no page two, and nobody scrolls an answer."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal delay={0.05} className="h-full">
            <div className="h-full rounded-2xl border border-npc/25 bg-panel p-7">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-npc" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-npc">
                  Ranking
                </span>
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-fog">
                You compete for a slot on a page. Being fourth still gets you seen.
                Being on page two is survivable. The list is long and the user does
                the choosing.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="h-full">
            <div className="relative h-full rounded-2xl border border-gold/30 bg-panel p-7">
              <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gold opacity-5 blur-2xl" />
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                  Being cited
                </span>
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-snow">
                You compete to be named inside the answer. The model does the
                choosing, it names very few, and the customer usually never sees the
                alternatives it did not mention.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── What we check ────────────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="The audit"
            title="Four things decide whether you get named."
            lede="Fixed scope, fixed timebox, evidence attached to every claim. You get the findings whether or not you ever work with us again."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {buckets.map((b, i) => (
            <Reveal key={b.n} delay={i * 0.07} y={30} className="h-full">
              <div className="h-full rounded-2xl glass p-7 transition-all duration-300 hover:border-gold/40">
                <div className="font-display text-4xl font-bold leading-none text-line-2">
                  {b.n}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-snow">
                  {b.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fog">{b.body}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {b.get.map((g) => (
                    <span
                      key={g}
                      className="inline-flex items-center rounded-full border border-gold/30 bg-gold/5 px-2.5 py-1 text-[11px] font-medium text-gold"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Method / honesty ─────────────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Method"
              title="Three runs, five engines, every claim timestamped."
              lede="Answer engines are non-deterministic. Ask twice, get two answers. Any report built on a single screenshot is describing noise and calling it a finding."
            />
            <ul className="mt-8 space-y-4">
              {[
                "Fixed prompt set and fixed engine list, agreed before we start",
                "A fresh session per engine, so nothing bleeds between runs",
                "Three runs per prompt, and we report the majority",
                "A screenshot and a raw log line behind every claim",
                "Every capture timestamped, because engines change weekly",
              ].map((l) => (
                <li key={l} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
                  <span className="text-[15px] leading-relaxed text-fog">{l}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-panel p-7 sm:p-9">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2">
                What we will not do
              </span>
              <ul className="mt-7 space-y-5">
                {[
                  ["Guarantee a citation", "Nobody controls these systems. We guarantee the process and the data, never a placement."],
                  ["Buy mentions or reviews", "It is detectable, it poisons the well, and the platforms get better at spotting it every quarter."],
                  ["Sell you a retainer you do not need", "If the audit comes back clean, it says so. It is priced to stand on its own."],
                  ["Quote a traffic number", "AI referral volume is still small. What is worth buying is intent and trajectory, not a made-up figure."],
                ].map(([h, b]) => (
                  <li key={h}>
                    <div className="font-display text-[15px] font-semibold text-snow">
                      {h}
                    </div>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-fog">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <Section id="faq">
        <Reveal>
          <SectionHeading
            eyebrow="Straight answers"
            title="What people ask before booking one."
            lede="Including the ones with answers you might not want to hear."
          />
        </Reveal>
        <Faq items={faqs} id="ai-visibility-faq" />
      </Section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-line">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-[420px] bg-grid bg-grid-fade opacity-40" />
          <div
            data-parallax="0.25"
            className="absolute left-1/2 top-[-120px] h-[420px] w-[680px] -translate-x-1/2 rounded-full blur-[130px]"
            style={{
              background: "radial-gradient(circle, var(--color-gold), transparent 70%)",
              opacity: 0.25,
            }}
          />
        </div>
        <Section className="py-28 text-center sm:py-32">
          <Reveal className="mx-auto max-w-2xl">
            <div className="mb-6 flex justify-center">
              <Eyebrow tone="gold">Find out</Eyebrow>
            </div>
            {/* PRICE GOES HERE once it is decided. A fixed number belongs in this
                block, above the CTA — it is the lead product and being cheap
                enough to say yes is the whole point. */}
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-snow sm:text-5xl">
              Your competitor may already be
              <span className="text-gold text-glow-gold"> the answer</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
              It takes one conversation to scope, and a few days to find out. Tell us
              your trade and your town and we will tell you exactly where you stand.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Magnetic strength={0.25}>
                <Button href="/contact" variant="gold">
                  Check my visibility <span aria-hidden>→</span>
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
