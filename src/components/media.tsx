import { Reveal } from "./motion";

/** Full-bleed cinematic image band with a single statement. */
export function Band({
  src,
  alt,
  quote,
  sub,
  className = "",
}: {
  src: string;
  alt: string;
  quote: React.ReactNode;
  sub?: string;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden border-y border-line ${className}`}>
      <div className="absolute inset-0" aria-hidden>
        <img
          src={src}
          alt=""
          loading="lazy"
          className="h-full w-full scale-105 object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/72 to-ink" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal y={22}>
          <p className="font-display text-2xl font-bold leading-snug tracking-tight text-snow sm:text-4xl">
            {quote}
          </p>
          {sub && (
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
              {sub}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Framed image with a corner label chip. */
export function Figure({
  src,
  alt,
  label,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure
      className={`relative overflow-hidden rounded-3xl border border-line bg-panel ${className}`}
    >
      <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${imgClassName}`} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      {label && (
        <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-line bg-ink/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-fog backdrop-blur">
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          {label}
        </figcaption>
      )}
    </figure>
  );
}
