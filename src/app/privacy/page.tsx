import type { Metadata } from "next";
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
    b: "NPC Protocol is a design and AI-services company incorporated in the United Arab Emirates, serving clients primarily in the United States and the United Kingdom. This policy covers your use of this website and our services. You can reach us at hello@npcprotocol.studio.",
  },
  {
    t: "What we collect",
    b: "Three things, and not much else. (1) What you give us — name, email, phone, and business details from a contact or booking form. (2) Voice and call data — when a call goes through our AI front-desk, it is transcribed; we generally do not retain the raw audio. (3) Basic site data — cookies and lightweight analytics that keep the site working and show us what is useful. We do not sell your personal data.",
  },
  {
    t: "How we use it",
    b: "To deliver what you asked for — build your site, run your AI front-desk, or report on your visibility — to answer you, and to keep the site and services secure. We do not use your data for anything you would find surprising, and we do not sell it.",
  },
  {
    t: "Voice calls and the AI front-desk",
    b: "Our AI assistant is automated, not a person. It tells each caller that it is an automated assistant and that the call may be recorded. Calls are transcribed for the purpose at hand (answering, booking, hand-off) and we prefer to delete the raw audio rather than retain it. The client that engages us is the caller of record for its own customers and owns the relationship with them.",
  },
  {
    t: "Who it goes to",
    b: "A small set of trusted processors run the machinery for us: a third-party AI voice platform, a telephony service for phone numbers, a language-model provider for text, and our hosting. They process on our behalf under data-processing terms. They do not get to use your data for their own purposes, and we do not resell it.",
  },
  {
    t: "Your rights",
    b: "Depending on where you are — for example, California and other US states, or the United Kingdom — you can generally ask what we hold about you, ask us to correct it, ask us to delete it, or opt out of certain uses. To exercise any of these, email hello@npcprotocol.studio and we will act. In the UK these rights come from UK GDPR; for US residents they come from the applicable state privacy law.",
  },
  {
    t: "International transfers",
    b: "We are based in the UAE and serve clients in the US and UK. Where personal data moves across borders, we put the safeguards in place that the relevant rules require — for example, a UK International Data Transfer Agreement for UK data subjects.",
  },
  {
    t: "Children",
    b: "Our services are for businesses and the customers of those businesses. We do not knowingly collect personal data from children under 13. If you believe a child has sent us data, contact us and we will delete it.",
  },
  {
    t: "Retention",
    b: "We keep data only as long as we need to for the purpose, or as long as the law requires. Where it makes sense, we delete the raw audio of a call rather than keeping it, and we hold onto the minimum.",
  },
  {
    t: "Security",
    b: "We use reasonable technical and organizational measures to protect your data. No system is 100% secure, and we do not promise otherwise — but we work to keep your information safe and to tell you quickly if something does go wrong.",
  },
  {
    t: "Changes",
    b: "If this policy changes in a way that matters, we will update this page and refresh the date at the top of it. Keep reading — it is short.",
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
        lede="We collect the minimum, we say what it is for, and we give you the off switch. Here is the whole thing — no fine-print maze."
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
                <div className="grid gap-4 rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-gold/30 sm:grid-cols-[auto_1fr] sm:p-7">
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
            <h2 className="font-display text-lg font-semibold text-snow">Questions?</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-fog">
              One email and a human reads it. Ask us what we hold, what we do with it, or how to
              delete it — whichever you prefer.
            </p>
            <a
              href="mailto:hello@npcprotocol.studio"
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-npc transition-colors hover:text-gold"
            >
              hello@npcprotocol.studio <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
