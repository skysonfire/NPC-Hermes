import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "AI Voice Services Schedule",
  description:
    "The terms specific to the NPC Protocol AI front-desk — disclosure, recording, consent, human escalation, emergencies, restricted sectors, and permitted territories.",
};

type Clause = { t: string; b: string; strong?: boolean };

const clauses: Clause[] = [
  {
    t: "1. What this schedule covers",
    b: "This AI Voice Services Schedule applies to the NPC Protocol AI front-desk — the automated assistant that answers calls, confirms bookings, and hands off to a human or a queue. It supplements the Master Services Agreement and the Data Processing Addendum. Where the three conflict, the order is: this Schedule, then the DPA, then the MSA.",
  },
  {
    t: "2. Inbound-only",
    strong: true,
    b: "The service is inbound-only: it answers calls that come in; it does not dial out. Outbound calling, including any form of dialling or automated outbound contact, is out of scope unless the parties agree a separate written addendum that sets out the consent, marketing, and do-not-call rules for that specific use. Nothing in this schedule authorises outbound calls.",
  },
  {
    t: "3. AI disclosure to the caller",
    b: "The assistant identifies itself as an automated, not a human, assistant at the start of every call. This disclosure is a fixed part of the service and cannot be switched off. The assistant will not misrepresent itself as a person or as a professional (doctor, lawyer, advisor).",
  },
  {
    t: "4. Call recording",
    b: "Calls are recorded. The caller is told that the call is being recorded before the call proceeds. The raw audio is transcribed and then deleted — it is not retained by default. Transcripts are kept only for the period and purpose in the Privacy Policy and DPA, and are treated as confidential.",
  },
  {
    t: "5. Consent and lawful basis",
    b: "Client, as the caller of record, is responsible for obtaining any consent required for recording and transcription in its jurisdiction and for its customers, and for complying with every applicable call-recording, privacy, and telecommunications rule. Provider supplies the disclosure and the mechanism. Where a jurisdiction requires consent or a disclosure that has not been met — or is one Provider does not serve — Client will not use the service there until it has confirmed it is lawful for it to do so.",
  },
  {
    t: "6. Permitted and restricted territories",
    b: "The service may be used in the territories listed in the Order Form. Provider does not operate the front-desk in a jurisdiction where the required recording consent or disclosure cannot be met, or where the use is prohibited, unless Client confirms in writing that it is lawful there and takes responsibility for that confirmation. If a territory is restricted, the service is disabled there by configuration.",
  },
  {
    t: "7. Human escalation",
    b: "A caller can request a human, and the service routes the call to a human or a queue where that is configured for the engagement. If no human is available, the assistant says so plainly and offers the agreed fallback (callback, booking, or leaving a message). The assistant does not keep a caller in an infinite loop.",
  },
  {
    t: "8. Emergencies and safety",
    b: "The front-desk is not a substitute for emergency services. If a call indicates a medical, safety, or other emergency, the assistant gives the agreed emergency guidance (including directing the caller to the local emergency number) and, where configured, escalates immediately. This schedule does not authorise the assistant to give medical, legal, or financial advice.",
  },
  {
    t: "9. Restricted sectors and use",
    b: "The service is not to be used to provide regulated professional advice (legal, medical, financial) where an automated assistant could be taken as such, or for any unlawful purpose. Client warrants that its use case is lawful and suitable for an automated assistant, and is responsible for configuring the assistant’s scope, guardrails, and responses for its own business.",
  },
  {
    t: "10. AI accuracy and limits",
    b: "The assistant is AI and can be wrong. Provider does not guarantee accuracy, completeness, or that the assistant will always understand a caller. Client should configure guardrails, review key interactions, and treat the assistant’s outputs as subject to human review where they matter. Provider works to reduce errors and to make failures safe (a wrong booking is recoverable; a missed emergency is not).",
  },
  {
    t: "11. Do-not-call and opt-outs",
    b: "Client is responsible for honoring do-not-call and opt-out requests for its own customers. If Client provides a suppression list, Provider will honor it within the service. Nothing here overrides the legal obligations that sit with the caller of record.",
  },
  {
    t: "12. Data protection",
    b: "The Data Processing Addendum and the Privacy Policy apply to all personal data the front-desk handles. Client is the controller of its customers’ data; Provider is the processor. Transcription, storage, retention, and deletion follow the DPA, and the AI scoring of leads is the automated decision-making described in the Privacy Policy.",
  },
  {
    t: "13. Acceptance of responsibility",
    b: "By using the front-desk, Client accepts that it is the caller of record and owns the legal relationship with its customers, including consent, recording, and telecommunications compliance on its side. Provider provides the system, the disclosures, and the safeguards in this schedule; the responsibility for the customer relationship is Client’s. This division is the single clause that keeps the service workable for a small team.",
  },
];

export default function VoiceServices() {
  return (
    <>
      <PageHero
        eyebrow="Contract"
        title={
          <>
            The <span className="text-gold text-glow-gold">AI Voice</span> Services Schedule.
          </>
        }
        lede="The terms that make the front-desk safe to run — disclosure, recording, consent, human escalation, emergencies, and the territories where it can operate. The specific contract for the AI voice service."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2">
              Version 1.0 · August 2026
            </p>
            <Link
              href="/dpa"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2 transition-colors hover:text-gold"
            >
              DPA →
            </Link>
          </div>

          <div className="mb-10 rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:p-7">
            <Eyebrow tone="gold">Why this exists</Eyebrow>
            <p className="mt-3 text-[15px] leading-relaxed text-fog">
              A website privacy policy is not the right place to carry the rules for an AI that
              answers the phone. This schedule is: it fixes inbound-only operation, the AI and
              recording disclosures, consent and territory limits, human escalation, and emergency
              handling. Square brackets and per-client specifics (territories, fallbacks) are set in
              the Order Form. Have your own counsel review it before signature.
            </p>
          </div>

          <div className="space-y-4">
            {clauses.map((c) => (
              <Reveal key={c.t} y={18}>
                <div
                  className={
                    c.strong
                      ? "rounded-2xl border border-gold/40 bg-gold/5 p-6 sm:p-7"
                      : "rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-gold/30 sm:p-7"
                  }
                >
                  <h2 className="font-display text-lg font-semibold text-snow">{c.t}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-fog">{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-npc/25 bg-npc/5 p-6 sm:p-7">
            <h2 className="font-display text-lg font-semibold text-snow">Related documents</h2>
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
                href="/terms"
                className="font-mono text-xs uppercase tracking-[0.25em] text-npc transition-colors hover:text-gold"
              >
                Website Terms <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
