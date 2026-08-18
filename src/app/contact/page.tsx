import { Button, Eyebrow } from "@/components/ui";
import { Reveal, Magnetic } from "@/components/motion";

const contact = {
  email: "hello@npcprotocol.studio",
  handle: "@npcprotocol",
  hours: "Mon–Fri · 9:00–18:00",
  response: "Replies within 1 business day",
};

export default function Contact() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-[420px] bg-grid bg-grid-fade opacity-50" />
          <div
            data-parallax="0.2"
            className="absolute right-[-100px] top-[-140px] h-[420px] w-[420px] rounded-full blur-[130px]"
            style={{ background: "radial-gradient(circle, var(--color-gold), transparent 70%)", opacity: 0.18 }}
          />
          <div
            data-parallax="0.3"
            className="absolute bottom-[-160px] left-[-100px] h-[420px] w-[420px] rounded-full blur-[130px]"
            style={{ background: "radial-gradient(circle, var(--color-npc), transparent 70%)", opacity: 0.2 }}
          />
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
          {/* left: intro + form */}
          <Reveal y={26}>
            <div className="mb-8">
              <Eyebrow tone="gold">Start your story</Eyebrow>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-snow sm:text-5xl">
                Tell me what you do.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
                Two minutes. I'll tell you why nobody remembers it yet — and what the
                main-character version of your site looks like.
              </p>
            </div>

            <form className="space-y-4" action="mailto:hello@npcprotocol.studio" method="post" encType="text/plain">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-fog-2">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-line bg-panel px-4 py-3 text-sm text-snow outline-none transition-colors placeholder:text-fog-2 focus:border-gold/60"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-fog-2">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-line bg-panel px-4 py-3 text-sm text-snow outline-none transition-colors placeholder:text-fog-2 focus:border-gold/60"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-fog-2">
                  What do you do?
                </span>
                <input
                  type="text"
                  name="what"
                  required
                  placeholder="e.g. I design brand systems for fintech startups"
                  className="w-full rounded-xl border border-line bg-panel px-4 py-3 text-sm text-snow outline-none transition-colors placeholder:text-fog-2 focus:border-gold/60"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-fog-2">
                  What's holding you back?
                </span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="The part you can't seem to fix…"
                  className="w-full resize-none rounded-xl border border-line bg-panel px-4 py-3 text-sm text-snow outline-none transition-colors placeholder:text-fog-2 focus:border-gold/60"
                />
              </label>
              <div className="flex items-center justify-between gap-4">
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink shadow-lg shadow-gold/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft"
                  >
                    Send it <span aria-hidden>→</span>
                  </button>
                </Magnetic>
                <span className="font-mono text-[10px] uppercase tracking-widest text-fog-2">
                  No spam, no sequences
                </span>
              </div>
            </form>
          </Reveal>

          {/* right: direct lines */}
          <Reveal y={26} delay={0.12}>
            <div className="space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center justify-between rounded-2xl border border-line bg-panel px-6 py-5 transition-colors duration-300 hover:border-gold/40"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-fog-2">Email</span>
                  <p className="mt-1 text-sm font-medium text-snow group-hover:text-gold">{contact.email}</p>
                </div>
                <span aria-hidden className="text-fog-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold">
                  →
                </span>
              </a>

              <a
                href="https://x.com/npcprotocol"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-line bg-panel px-6 py-5 transition-colors duration-300 hover:border-npc/40"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-fog-2">Handle</span>
                  <p className="mt-1 text-sm font-medium text-snow group-hover:text-npc">{contact.handle}</p>
                </div>
                <span aria-hidden className="text-fog-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-npc">
                  →
                </span>
              </a>

              <div className="rounded-2xl border border-line bg-panel px-6 py-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-fog-2">Hours</span>
                <p className="mt-1 text-sm font-medium text-snow">{contact.hours}</p>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-gold/5 px-6 py-5">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                    {contact.response}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fog">
                  First call is a working session, not a sales pitch. You leave with the shape of
                  your main-character site either way.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── reassurance strip ─────────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto grid w-full max-w-6xl gap-px overflow-hidden px-5 py-10 sm:px-8 md:grid-cols-3">
          {["Fixed price before we start", "Days, not weeks, to launch", "You keep the code and the keys"].map(
            (t, i) => (
              <Reveal key={t} delay={i * 0.07} y={20}>
                <p className="flex items-center gap-3 text-sm text-fog">
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  {t}
                </p>
              </Reveal>
            )
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          data-parallax="0.25"
          className="pointer-events-none absolute left-1/2 top-[-100px] -z-10 h-[360px] w-[640px] -translate-x-1/2 rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, var(--color-gold), transparent 70%)", opacity: 0.2 }}
        />
        <div className="mx-auto w-full max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Reveal className="mx-auto max-w-xl" y={24}>
            <h2 className="font-display text-2xl font-bold leading-tight text-snow sm:text-3xl">
              Not sure where to start? Start with the Protocol.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-fog sm:text-base">
              See the four moves before you commit to anything.
            </p>
            <div className="mt-8 flex justify-center">
              <Magnetic strength={0.22}>
                <Button href="/protocol" variant="ghost">
                  Read the Protocol <span aria-hidden>→</span>
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
