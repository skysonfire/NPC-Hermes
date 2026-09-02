import type { Metadata } from "next";
import { site, entity, entityLine } from "@/lib/site";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How NPC Protocol collects, uses, and protects your personal data — in plain terms. US, UK, and UAE.",
};

const clauses = [
  {
    t: "Who we are",
    b: `NPC Protocol is a design and AI-services studio. This policy covers this website and the services we run for you. Reach us at ${site.email}. This site and these services are operated by ${entityLine()}.`,
  },
  {
    t: "What we collect",
    b: "Three things, and nothing we won't name. (1) What you give us — name, email, phone, business details, and whatever you type into a form or message. (2) Voice and call data — calls through our AI front-desk are transcribed, and we delete the raw audio rather than keep it. (3) AI lead qualification — for prospects, AI may score a lead on fit, budget, and timeline and pass the qualified ones into a CRM. We also keep basic server logs (address, time, page). We do not run tracking cookies or profiling analytics, and we never sell your data.",
  },
  {
    t: "How we use it",
    b: "To deliver what you asked for — build your site, run your front-desk, qualify your leads, or report on visibility — to answer you, and to keep the site and services secure. We don't use it for unrelated marketing to you without telling you first, and we don't sell it.",
  },
  {
    t: "The AI front-desk",
    b: "Our assistant is automated, not a person, and it says so to every caller. It tells each caller that it is an automated assistant and that the call is being recorded. Calls are transcribed for the task at hand — answering, booking, hand-off — and we delete the raw audio rather than retain it. Where the front-desk serves your customers, you are the controller of their data and we act as your processor under our Data Processing Addendum.",
  },
  {
    t: "AI qualification & automated decisions",
    b: "When we qualify a lead, AI assesses it on a small set of factors — fit, stated budget, and timeline — and flags the strong ones. That is automated decision-making. It does not produce a legal or similarly significant effect on you on its own; a human reviews anything that matters before any action is taken. Want to know how a decision about you was made, or want a human to look at it? Email us and we will.",
  },
  {
    t: "Lawful bases",
    b: "We process your data on a small number of clear bases: performance of the contract between us (delivering the service); our legitimate interests (running a secure, working service and protecting against abuse); consent, where the law needs it; and legal obligation. We name the basis for each use in our agreements, and we don't lean on 'legitimate interests' where consent is the honest answer.",
  },
  {
    t: "Who it goes to",
    b: "A small set of processors run the machinery: a third-party AI voice platform, a telephony service for phone numbers, a language-model provider for text, and our hosting. Each acts on our behalf under a Data Processing Addendum with the safeguards the law requires — they can't use your data for their own purposes, and we don't resell it.",
  },
  {
    t: "Your rights",
    b: `You can ask what we hold about you, ask us to correct it, ask us to delete it, ask how a decision was made, and opt out of certain uses. In the UK these rights come from UK GDPR, and you also have the right to complain to the Information Commissioner's Office (ICO). For US residents, the applicable state privacy law applies — including California. To exercise any of these, email ${site.email} and a human reads it.`,
  },
  {
    t: "International transfers",
    b: "We're based in the UAE and serve the US and UK. The UAE is not a jurisdiction the UK treats as adequate, so for UK data we move it under a UK International Data Transfer Agreement (or the UK Addendum to the EU Standard Contractual Clauses). That is the actual safeguard in place, not a promise.",
  },
  {
    t: "Retention",
    b: "Raw call audio: deleted after transcription, not retained. Call transcripts and lead records: kept for the length of your engagement, then deleted or anonymised within 30 days. Server logs: 30 days. If the law requires us to keep something longer, we do — and only for that reason.",
  },
  {
    t: "Security",
    b: "We use reasonable technical and organisational measures to protect your data. No system is 100% secure and we don't promise otherwise — but we work to keep it safe and to tell you quickly if something goes wrong.",
  },
  {
    t: "Cookies & your off switch",
    b: "We don't use tracking cookies or non-essential analytics, so there's nothing to 'consent' to by default. If we ever add optional, non-essential tracking, you'll get a real choice — and clearing cookies in your browser turns off anything we do store. That's your off switch, and it works.",
  },
  {
    t: "Sensitive information",
    b: "Forms, emails, and calls can sometimes carry sensitive information — health, finances, or details about someone else. If that happens, we treat it as confidential, use it only for the service you asked for, and we'll delete it on request. We don't build profiles around it.",
  },
  {
    t: "Children",
    b: "Our services are for businesses and the customers of those businesses. We do not knowingly collect personal data from children under 13. If a child has sent us data, tell us and we will delete it.",
  },
  {
    t: "Changes",
    b: "If this policy changes in a way that matters, we update this page and refresh the date at the top. It's short, so keep reading.",
  },
];

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title={
          <>
            Privacy, in <span className="text-gold text-glow-gold">plain terms</span>.
          </>
        }
        lede="We collect the minimum, we say what it is for, and you can opt out of any of it. Here is the whole thing — no fine-print maze."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2">
              Last updated · August 2026
            </p>
            <Link
              href="/terms"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2 transition-colors hover:text-gold"
            >
              Terms →
            </Link>
          </div>

          <div className="mt-10 space-y-4">
            {clauses.map((c, i) => (
              <Reveal key={c.t} y={18}>
                <div className="grid gap-4 rounded-2xl glass p-6 transition-colors duration-300 hover:border-gold/30 sm:grid-cols-[auto_1fr] sm:p-7">
                  <span className="font-mono text-sm font-semibold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-snow">{c.t}</h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-fog">{c.b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-npc/25 bg-npc/5 p-6 sm:p-7">
            <h2 className="font-display text-lg font-semibold text-snow">The full paperwork</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-fog">
              This page is the short version. The detailed agreements — our Master Services
              Agreement, the Data Processing Addendum, and the AI Voice Services Schedule — sit
              alongside it.
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
