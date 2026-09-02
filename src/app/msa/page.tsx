import type { Metadata } from "next";
import { site, entity, entityLine } from "@/lib/site";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Master Services Agreement",
  description:
    "The commercial agreement behind every NPC Protocol engagement — fees, delivery, IP, liability, and the fine print that protects both sides.",
};

type Clause = { t: string; b: string; strong?: boolean };

const clauses: Clause[] = [
  {
    t: "1. The parties and the services",
    b: `This Master Services Agreement (“MSA”) is between ${entityLine()} (“Provider”) and the client named in the applicable Order Form (“Client”). Provider will deliver the design, build, AI voice, and AI-visibility services described in each Order Form. Each Order Form is part of this MSA and, where it differs, the Order Form controls for that engagement.`,
  },
  {
    t: "2. Order Forms and statements of work",
    b: "Each engagement runs on its own Order Form setting out the services, deliverables, fees, timeline, and any service-specific terms. An Order Form can be a signed document, an accepted proposal, or a written order accepted by Provider. If this MSA and an Order Form conflict, the Order Form wins for that engagement; if the Order Form and this MSA are silent on something, this MSA applies.",
  },
  {
    t: "3. Fees and payment",
    b: "Provider charges the fees set out in each Order Form. Fixed-fee builds are invoiced as agreed; recurring services are billed monthly in advance. Invoices are due within fourteen (14) days of the invoice date. Amounts are exclusive of tax; applicable taxes are added where required. Provider may adjust pricing for future recurring periods on thirty (30) days’ written notice. If an invoice is overdue, Provider may suspend the service after a reasonable notice period and may charge applicable late fees where the law allows.",
  },
  {
    t: "4. Delivery and acceptance",
    b: "Provider delivers the services to the standard and specification in the Order Form. When a deliverable is handed over, Client has ten (10) business days to accept it or raise defects in writing, describing what does not meet the agreed specification. If Client does not respond within that window, the deliverable is deemed accepted. Defects that materially fail the agreed specification will be corrected by Provider at no additional charge.",
  },
  {
    t: "5. Revisions and changes",
    b: "Each Order Form states the included revisions or scope. Work beyond that scope — new features, new pages, changed requirements — is treated as a change and may be quoted and billed separately. Provider is not obliged to start out-of-scope work until the change is agreed and, where it changes the fee or timeline, until the revised fee is accepted.",
  },
  {
    t: "6. Client responsibilities",
    b: "Client will provide the information, content, access, and approvals needed for the service in a timely way, and will ensure it has the right to use the content and branding it supplies. Delays caused by Client’s late or missing input extend the timeline accordingly. Client is responsible for the lawfulness of its content and its use of the service, including with its own customers.",
  },
  {
    t: "7. Intellectual property",
    b: "On full payment of the fees, Client owns the finished, human-directed deliverables Provider hands over for Client’s business. Provider retains its pre-existing materials, tools, templates, and know-how, and keeps a licence to use them. Some deliverables use AI, and pure AI-generated material may not be protected by copyright in some jurisdictions, so ownership is described rather than overclaimed. Provider may use the work in its portfolio and marketing unless Client opts out in writing. Nothing here transfers Provider’s underlying tools or source templates.",
  },
  {
    t: "8. Confidentiality",
    b: "Each party will keep the other’s confidential information — business plans, pricing, customer data, technical details, and anything marked or reasonably understood to be confidential — confidential, use it only to perform this MSA, and protect it with reasonable care. This obligation survives termination for three (3) years, except for trade secrets, which are protected for as long as they remain trade secrets under applicable law.",
  },
  {
    t: "9. Warranties and disclaimer",
    b: "Provider warrants that it will perform the services with reasonable skill and care. Services are provided “as is” to the extent the law allows. AI can be wrong, so Provider does not promise uninterrupted or error-free output, and does not guarantee any specific ranking, placement, or business result. Except as stated, all other warranties are disclaimed to the maximum extent permitted by law.",
  },
  {
    t: "10. Limitation of liability",
    b: "To the extent the law allows, neither party is liable for indirect, incidental, special, or consequential losses, or for loss of profits, data, or goodwill. Each party’s total liability arising out of or connected with this MSA is capped at the fees Client paid or owed to Provider in the twelve (12) months before the event giving rise to the claim. The cap does not apply to a party’s breach of confidentiality, Provider’s IP-infringement indemnity, a party’s gross negligence or willful misconduct, or liability that cannot be limited under applicable law.",
  },
  {
    t: "11. Indemnification",
    b: "Client will defend and hold Provider harmless from third-party claims arising from Client’s content, Client’s use of the service with its customers, or Client’s violation of law — including call-recording and consent matters on Client’s side. Provider will defend Client against third-party claims that the finished deliverables infringe a copyright or trademark, and will stand behind its performance of the service to the extent it is warranted.",
  },
  {
    t: "12. Term and termination",
    b: "Each Order Form runs for its stated term. Either party may end a recurring service on thirty (30) days’ written notice. Either party may terminate immediately for a material breach that is not cured within fourteen (14) days of notice. On termination, Client pays for work properly completed through the termination date, Provider hands over deliverables paid for, and each party returns or deletes the other’s confidential information and personal data, except where retention is required by law.",
  },
  {
    t: "13. Suspension",
    b: "Provider may suspend a service if it has a reasonable, good-faith concern about unlawful use, a payment failure, or a risk to the security or reputation of the service. Provider will give notice where it reasonably can and a chance to resolve the issue. Suspension is not a termination and does not reduce Client’s obligation to pay for work already performed.",
  },
  {
    t: "14. Data protection",
    b: "Where Provider processes personal data on Client’s behalf, the Data Processing Addendum applies and incorporates the UK GDPR and, where relevant, US state privacy obligations. For the AI voice front-desk, the AI Voice Services Schedule applies. Where Client is the controller of its customers’ data and Provider is the processor, the DPA sets the processor obligations, subprocessors, security, breach handling, and deletion.",
  },
  {
    t: "15. Force majeure",
    b: "Neither party is liable for a delay or failure caused by something outside its reasonable control — power or internet failure, a third-party provider outage, a legal or governmental order, a natural event, or the like — provided it uses reasonable efforts to resume and to tell the other party. A party in breach before the force-majeure event remains liable for that earlier breach.",
  },
  {
    t: "16. General",
    b: `The parties are independent contractors; nothing here creates a partnership, agency, or employment. Neither party may assign this MSA without the other’s consent, except to a successor in a merger or sale of substantially all assets. If any provision is unenforceable, the rest stands and the parties replace it with the closest enforceable term. This MSA, its Order Forms, the DPA, the AI Voice Services Schedule, and the privacy and terms pages are the whole agreement on their subject matter and replace earlier ones. Changes must be in writing. Notices go to the email addresses in the Order Form or ${site.email}. This MSA is governed by the laws of ${entity.country}, with disputes subject to ${entity.courts}, unless an Order Form sets a different law or forum. This MSA is a commercial draft for the parties to adopt and have reviewed by their own counsel before signature.`,
  },
];

export default function Msa() {
  return (
    <>
      <PageHero
        eyebrow="Contract"
        title={
          <>
            The <span className="text-gold text-glow-gold">Master Services</span> Agreement.
          </>
        }
        lede="The commercial agreement behind every engagement — fees, delivery, ownership, and the terms that protect both of us. Plain language, real teeth."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2">
              Version 1.0 · August 2026
            </p>
            <div className="flex gap-4">
              <Link
                href="/dpa"
                className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2 transition-colors hover:text-gold"
              >
                DPA →
              </Link>
              <Link
                href="/voice-services"
                className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2 transition-colors hover:text-gold"
              >
                AI Voice →
              </Link>
            </div>
          </div>

          <div className="mb-10 rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:p-7">
            <Eyebrow tone="gold">How to use this</Eyebrow>
            <p className="mt-3 text-[15px] leading-relaxed text-fog">
              This MSA is the standing agreement behind every engagement. Each project then gets its
              own Order Form naming the specific services, fees, and timeline — that Order Form is
              part of this agreement, and where the two differ, the Order Form wins for that project.
              Nothing here is signed until you have had your own counsel review it.
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
                href="/privacy"
                className="font-mono text-xs uppercase tracking-[0.25em] text-npc transition-colors hover:text-gold"
              >
                Privacy Policy <span aria-hidden>→</span>
              </Link>
              <Link
                href="/terms"
                className="font-mono text-xs uppercase tracking-[0.25em] text-npc transition-colors hover:text-gold"
              >
                Website Terms <span aria-hidden>→</span>
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
