import type { Metadata } from "next";
import { site, entity, entityLine } from "@/lib/site";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "What you get, who is responsible for what, and the few things that protect both sides — without the fog.",
};

type Clause = {
  t: string;
  b: string;
  script?: string; // optional call-script panel
  strong?: boolean; // render as an emphasized clause
};

const clauses: Clause[] = [
  {
    t: "Accepting these terms",
    b: "By using this site or engaging our services, you agree to these terms. Any paid engagement is also governed by its own Master Services Agreement, which controls where it differs from this page.",
  },
  {
    t: "What we do",
    b: "We design and build websites, and we run AI voice front-desks and AI-visibility (AEO/GEO) services for businesses. We are a vendor; we are not a law firm, and nothing here is legal advice.",
  },
  {
    t: "The AI voice front-desk",
    b: "Our front-desk is an automated AI assistant, not a person. It answers calls and, where you configure it, confirms bookings. It is not a substitute for professional advice, and like any AI it can be wrong. It is inbound-only — it answers calls rather than dialing out — and it tells every caller that it is an automated assistant and that the call is being recorded.",
    script: "This is an automated assistant. This call is being recorded.",
  },
  {
    t: "You are the caller of record",
    strong: true,
    b: "When our front-desk serves your customers, you are the caller of record. You are responsible for obtaining any consent you need, honoring do-not-call and opt-out requests, and complying with every call-recording, privacy, and telecommunications law that applies to your customers and your location. We provide the system and the disclosures; the legal relationship with your customers is yours. Where a jurisdiction requires extra consent or disclosure — or is one we do not serve — you will not use the service there unless you have confirmed it is lawful for you to do so.",
  },
  {
    t: "Your responsibilities",
    b: "You will provide accurate information, have a lawful purpose for using the service, and use only content and branding that you have the rights to use.",
  },
  {
    t: "AI content and ownership",
    b: "You own your content, your brand, and the finished, human-directed deliverables we hand over for your business. Some of what we produce uses AI, and pure AI-generated material may not be protected by copyright in some jurisdictions — so we describe deliverables rather than overclaim ownership of the raw AI parts. You keep your code and your keys. We retain our tools, templates, and know-how.",
  },
  {
    t: "No guaranteed outcomes",
    b: "Our AI-visibility work is designed to improve how you appear in AI and search results, but we do not guarantee specific rankings, placements, or results. Any numbers in a proposal are projections, not promises.",
  },
  {
    t: "Subscriptions and cancellation",
    b: `Recurring services (such as the monthly front-desk) renew automatically. We tell you the price, the billing cycle, and how to cancel before you start. You can cancel as easily as you signed up — by email to ${site.email} — effective at the end of the current billing period, and you keep access until then.`,
  },
  {
    t: "Fees and payment",
    b: "Fixed prices for builds; per the agreement for recurring services. Taxes apply where required. Payment deadlines, failed payments, and refunds are set out in the Master Services Agreement.",
  },
  {
    t: "Intellectual property",
    b: "You own your content and brand, and you own the finished deliverables we hand over (see the AI-content note). We retain our tools, templates, and know-how.",
  },
  {
    t: "Data protection",
    b: "How we handle your data is in the Privacy Policy. For paid work involving your customers' data, we act as your processor under the Data Processing Addendum, and the AI Voice Services Schedule covers the front-desk specifically.",
  },
  {
    t: "Warranties and disclaimer",
    b: "Services are provided “as is” to the extent the law allows. AI can make mistakes, so we do not promise uninterrupted or error-free output. To the maximum extent permitted by law, we disclaim all other warranties.",
  },
  {
    t: "Limitation of liability",
    b: "To the extent the law allows, neither party is liable for indirect, incidental, or consequential losses. Our total liability for any claim is capped at the amount you paid us for the service in the twelve months before the claim.",
  },
  {
    t: "Indemnification",
    b: "You agree to defend and hold us harmless from claims arising from your content, your use of the service with your customers, or your violation of law — including call-recording and consent matters on your side. We will defend you against third-party claims that our deliverables infringe a copyright or trademark, and we stand behind our performance of the service to the extent it is warranted.",
  },
  {
    t: "Suspension and termination",
    b: "Either party can end a recurring service on the notice set out in the agreement, subject to the cancellation terms above. We may suspend a service if we have a reasonable, good-faith concern about unlawful use, and we'll tell you and give you a chance to fix it where we reasonably can.",
  },
  {
    t: "Force majeure",
    b: "Neither of us is liable for a delay or failure caused by something outside our reasonable control — power, internet, a provider outage, a legal order, or the like — provided we use reasonable efforts to recover and tell you.",
  },
  {
    t: "Governing law and disputes",
    b: `This site is operated by ${entityLine()}. These website terms are governed by the laws of ${entity.country}, with disputes subject to ${entity.courts}. Each paid engagement is governed by its own Master Services Agreement, which sets its own governing law and dispute process.`,
  },
  {
    t: "Changes and contact",
    b: `We may update these terms; the date at the top reflects the current version. Questions: ${site.email}.`,
  },
];

export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title={
          <>
            The terms, without the <span className="text-gold text-glow-gold">fog</span>.
          </>
        }
        lede="What you get, who is responsible for what, and the few things that protect both of us. Read it once — no surprises."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2">
              Last updated · August 2026
            </p>
            <Link
              href="/privacy"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2 transition-colors hover:text-gold"
            >
              Privacy →
            </Link>
          </div>

          <div className="mt-10 space-y-4">
            {clauses.map((c, i) => (
              <Reveal key={c.t} y={18}>
                <div
                  className={
                    c.strong
                      ? "grid gap-4 rounded-2xl border border-gold/40 bg-gold/5 p-6 sm:grid-cols-[auto_1fr] sm:p-7"
                      : "grid gap-4 rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-gold/30 sm:grid-cols-[auto_1fr] sm:p-7"
                  }
                >
                  <span
                    className={
                      c.strong
                        ? "font-mono text-sm font-semibold text-gold"
                        : "font-mono text-sm font-semibold text-fog-2"
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-snow">{c.t}</h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-fog">{c.b}</p>
                    {c.script && (
                      <div className="mt-4 rounded-xl border border-line bg-ink px-5 py-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog-2">
                          What the assistant says
                        </span>
                        <p className="mt-2 text-[15px] italic leading-relaxed text-snow">
                          “{c.script}”
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-npc/25 bg-npc/5 p-6 sm:p-7">
            <h2 className="font-display text-lg font-semibold text-snow">Read this one first</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-fog">
              Clause 04 — you are the caller of record — is the one that does the most practical
              work for a small team: we build and run the system, and you own the relationship with
              your own customers. The formal legal weight lives in the Master Services Agreement and
              the Data Processing Addendum. If you read only one clause, read that one.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                href="/msa"
                className="font-mono text-xs uppercase tracking-[0.25em] text-npc transition-colors hover:text-gold"
              >
                Master Services Agreement <span aria-hidden>→</span>
              </Link>
              <Link
                href="/dpa"
                className="font-mono text-xs uppercase tracking-[0.25em] text-npc transition-colors hover:text-gold"
              >
                Data Processing Addendum <span aria-hidden>→</span>
              </Link>
              <Link
                href="/voice-services"
                className="font-mono text-xs uppercase tracking-[0.25em] text-npc transition-colors hover:text-gold"
              >
                AI Voice Services Schedule <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
