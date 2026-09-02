import Link from "next/link";
import { Mark } from "./ui";

const columns = [
  {
    title: "Site",
    links: [
      { href: "/", label: "Home" },
      { href: "/protocol", label: "The Protocol" },
      { href: "/sarah", label: "Sarah" },
      { href: "/roadmap", label: "The Engine" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Principles",
    links: [
      { href: "/protocol", label: "Story first" },
      { href: "/protocol", label: "Design over template" },
      { href: "/roadmap", label: "The engine, end to end" },
      { href: "/sarah", label: "Main-character outcomes" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/msa", label: "Master Services Agreement" },
      { href: "/dpa", label: "Data Processing Addendum" },
      { href: "/voice-services", label: "AI Voice Services" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line bg-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px duotone opacity-50" />
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Mark />
              <span className="font-display text-[13px] font-bold tracking-[0.22em] text-snow">
                NPC PROTOCOL
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-fog">
              The system that turns background characters into main ones. Your story, your design,
              built with modern AI — not a template.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog-2">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-fog transition-colors hover:text-gold">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="font-mono text-[11px] leading-relaxed tracking-wide text-fog-2">
            Our AI assistant is automated, and calls are recorded. AI-generated content may be inaccurate.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs tracking-wide text-fog-2">
            © {year} NPC PROTOCOL — ALL LOOPS BROKEN.
          </p>
          <p className="font-mono text-xs tracking-wide text-fog-2">
            YOU ARE THE MAIN CHARACTER NOW.
          </p>
        </div>
      </div>
    </footer>
  );
}
