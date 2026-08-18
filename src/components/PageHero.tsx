import { Eyebrow } from "./ui";

export default function PageHero({
  eyebrow,
  eyebrowTone = "gold",
  title,
  lede,
}: {
  eyebrow: string;
  eyebrowTone?: "gold" | "npc";
  title: React.ReactNode;
  lede?: React.ReactNode;
}) {
  const color = eyebrowTone === "npc" ? "npc" : "gold";
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[360px] bg-grid bg-grid-fade opacity-50" />
        <div
          data-parallax="0.2"
          className="absolute left-1/2 top-[-140px] h-[380px] w-[640px] -translate-x-1/2 rounded-full blur-[130px]"
          style={{ background: `radial-gradient(circle, var(--color-${color}), transparent 70%)`, opacity: 0.2 }}
        />
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div data-reveal className="max-w-3xl">
          <div className="mb-6">
            <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-snow sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {lede && <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog sm:text-lg">{lede}</p>}
        </div>
      </div>
    </section>
  );
}
