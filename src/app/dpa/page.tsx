import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Data Processing Addendum",
  description:
    "The Article 28-compliant addendum governing how NPC Protocol processes personal data as a processor for its clients — subprocessors, security, breach, rights, and deletion.",
};

type Clause = { t: string; b: string; strong?: boolean };

const clauses: Clause[] = [
  {
    t: "1. Scope and roles",
    b: "This Data Processing Addendum (“DPA”) applies whenever NPC Protocol (“Provider”) processes personal data on a client’s (“Client”) behalf in connection with the services. For this purpose Client is the controller (or, where Client is itself a processor, the party upstream) and Provider is the processor. This DPA supplements the Master Services Agreement and its Order Forms; where a conflict arises, the order of precedence is: this DPA, then the Order Form, then the MSA, then the website privacy and terms pages.",
  },
  {
    t: "2. Subject matter, duration, and purpose",
    b: "The subject matter is the personal data needed to deliver the services: websites, lead capture and qualification, the AI voice front-desk, and AI-visibility work. The duration of processing is the term of the relevant Order Form plus any lawful retention period. The nature and purpose of processing is to provide and operate those services on Client’s behalf. Provider does not process personal data for its own purposes.",
  },
  {
    t: "3. Categories of data subjects and data",
    b: "Data subjects include Client’s customers, callers, leads, and website visitors. Categories of personal data include contact details (name, email, phone), communication content (form text, emails, chat), voice call data (transcripts; raw audio only transiently, deleted after transcription), and interaction data (how a visitor or caller engages with the service). Where a form, email, call, or transcript contains special-category data (health, finances, or details about another person), Provider treats it as confidential, uses it only for the service, and deletes it on request.",
  },
  {
    t: "4. Provider’s obligations (UK GDPR Article 28(3))",
    strong: true,
    b: "Provider will: process personal data only on documented instructions from Client, including with regard to transfers (this DPA and the MSA are those instructions); ensure persons authorised to process the data are bound by confidentiality; implement the technical and organisational measures in Annex B; and comply with the subprocessor, security, rights, audit, and deletion conditions in this DPA. Provider will not process the data in a way that is incompatible with the purpose of the service.",
  },
  {
    t: "5. Subprocessors",
    b: "Client gives Provider a general written authorisation to engage the subprocessors listed in Annex A, and to replace or add subprocessors, provided Provider remains fully responsible for each subprocessor’s performance of its obligations. Provider will give Client reasonable notice (at least thirty (30) days) before adding or replacing a subprocessor, and Client may object on reasonable data-protection grounds. Provider will flow down the same data-protection obligations to each subprocessor by contract.",
  },
  {
    t: "6. Data subject rights",
    b: "Provider will assist Client with requests to exercise data subject rights (access, rectification, erasure, restriction, portability, objection) and with Client’s obligations under the applicable law. If Provider receives a data subject request directly, it will forward it to Client without undue delay and will not respond to the data subject except as instructed by Client or required by law.",
  },
  {
    t: "7. Security of processing (Article 28(3)(c))",
    b: "Provider will implement and maintain the technical and organisational measures in Annex B, including encryption in transit and at rest, access controls and least privilege, multi-factor authentication for administrative access, logging and monitoring, and a process to detect and respond to security events. Provider will review and update these measures as technology and the risk change.",
  },
  {
    t: "8. Personal data breach",
    b: "Provider will notify Client of a confirmed or reasonably suspected personal data breach without undue delay, and in any event within forty-eight (48) hours of becoming aware of it, with the information needed for Client to meet its own notification duties. Provider will cooperate with Client’s investigation and any regulator or affected-person notifications, and will take steps to mitigate the effects.",
  },
  {
    t: "9. International transfers",
    b: "Where personal data is transferred to a country the relevant authority does not recognise as adequate — including transfers to or from the United Arab Emirates — the parties will put in place the appropriate transfer safeguard: for UK data, a UK International Data Transfer Agreement or the UK Addendum to the EU Standard Contractual Clauses; for EU/EEA data, the applicable SCCs. Provider will execute and provide the transfer document on request, and will complete a transfer risk assessment where required.",
  },
  {
    t: "10. Audit and compliance",
    b: "Client may audit Provider’s compliance with this DPA. Provider will make available reasonable evidence of compliance — such as relevant attestations, certifications, or a security summary — in place of on-site access where that is proportionate and sufficient, and will provide on-site or detailed inspection where reasonable and requested. Audits happen during business hours, with reasonable notice, and without unduly disrupting Provider’s operations.",
  },
  {
    t: "11. Deletion and return",
    b: "At the end of the service, Provider will, at Client’s choice, delete or return the personal data, and will delete existing copies, except where Provider is required to retain some data under applicable law — in which case Provider will isolate and protect that data and delete it when the retention reason ends.",
  },
  {
    t: "12. Liability",
    b: "Each party is liable to the other for breach of this DPA, subject to the limitation of liability in the MSA. A party is not liable for a breach caused by the other party’s failure to meet its own obligations here.",
  },
  {
    t: "Annex A — Subprocessors (general authorisation)",
    b: "The following categories of subprocessors are authorised for the service. Provider does not publish vendor names on public pages; the exact subprocessors and their locations are provided to Client in the Order Form or on request. (1) A third-party AI voice platform — call handling and speech-to-text — [region]. (2) A telephony service — phone numbers and call routing — [region]. (3) A language-model provider — text generation and lead scoring — [region]. (4) A hosting provider — site and service hosting — [region]. Each is bound to equivalent data-protection obligations by contract.",
  },
  {
    t: "Annex B — Technical and organisational measures",
    b: "Encryption of data in transit (TLS) and at rest; role-based access control and least privilege; multi-factor authentication for administrative and remote access; segregation of environments; logging and monitoring with alerting; a documented process to detect, contain, and report security events; secure disposal of hardware and media; and personnel bound by confidentiality. These measures are reviewed as the risk and the technology change.",
  },
];

export default function Dpa() {
  return (
    <>
      <PageHero
        eyebrow="Contract"
        title={
          <>
            The <span className="text-gold text-glow-gold">Data Processing</span> Addendum.
          </>
        }
        lede="The Article 28-compliant terms for when NPC Protocol processes your customers’ data as a processor — subprocessors, security, breach, rights, and deletion. Built to sit under the MSA."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2">
              Version 1.0 · August 2026
            </p>
            <Link
              href="/msa"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2 transition-colors hover:text-gold"
            >
              MSA →
            </Link>
          </div>

          <div className="mb-10 rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:p-7">
            <Eyebrow tone="gold">Why this exists</Eyebrow>
            <p className="mt-3 text-[15px] leading-relaxed text-fog">
              When the front-desk or lead engine handles your customers’ data, you are the controller
              and NPC Protocol is your processor. This DPA is the contract that makes that
              relationship legally sound under UK GDPR (and US state law where it applies). Square
              brackets are the few specifics to confirm per client. Have your own counsel review it
              before signature.
            </p>
          </div>

          <div className="space-y-4">
            {clauses.map((c) => (
              <Reveal key={c.t} y={18}>
                <div
                  className={
                    c.strong
                      ? "rounded-2xl border border-gold/40 bg-gold/5 p-6 sm:p-7"
                      : "rounded-2xl glass p-6 transition-colors duration-300 hover:border-gold/30 sm:p-7"
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
                href="/voice-services"
                className="font-mono text-xs uppercase tracking-[0.25em] text-npc transition-colors hover:text-gold"
              >
                AI Voice Services Schedule <span aria-hidden>→</span>
              </Link>
              <Link
                href="/privacy"
                className="font-mono text-xs uppercase tracking-[0.25em] text-npc transition-colors hover:text-gold"
              >
                Privacy Policy <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
