import Link from "next/link";

/* Brand mark — a diamond node (protocol) with a core. Gold frame, cyan core. */
export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect
        x="6.5"
        y="6.5"
        width="13"
        height="13"
        rx="2"
        transform="rotate(45 13 13)"
        stroke="var(--color-gold)"
        strokeWidth="1.6"
      />
      <circle cx="13" cy="13" r="3" fill="var(--color-npc)" />
    </svg>
  );
}

type Variant = "gold" | "npc" | "ghost";

export function Button({
  href,
  children,
  variant = "gold",
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300";
  const variants: Record<Variant, string> = {
    gold: "bg-gold text-ink shadow-lg shadow-gold/50 hover:bg-gold-soft hover:-translate-y-0.5",
    npc: "bg-npc text-ink shadow-lg shadow-npc/50 hover:bg-npc-soft hover:-translate-y-0.5",
    ghost: "border border-line text-snow hover:border-line-2 hover:bg-panel",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "gold",
}: {
  children: React.ReactNode;
  tone?: "gold" | "npc";
}) {
  const text = tone === "gold" ? "text-gold" : "text-npc";
  const dot = tone === "gold" ? "bg-gold" : "bg-npc";
  return (
    <span className={`inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.35em] ${text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowTone = "gold",
  title,
  lede,
  align = "left",
}: {
  eyebrow?: string;
  eyebrowTone?: "gold" | "npc";
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="mb-5">
          <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-snow sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {lede && <p className="mt-5 text-base leading-relaxed text-fog sm:text-lg">{lede}</p>}
    </div>
  );
}

export function Tag({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gold" | "npc";
}) {
  const tones = {
    neutral: "border-line text-fog",
    gold: "border-gold/40 text-gold",
    npc: "border-npc/40 text-npc",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full duotone opacity-40 ${className}`} />;
}
