import { Reveal } from "./motion";
import { images, type ImageName } from "@/lib/images";

/**
 * Every image on the site goes through here.
 *
 * Static export disables Next's <Image>, so responsive images are done by hand:
 * a WebP srcset plus real intrinsic width/height, which lets the browser reserve
 * layout space and avoids the content jump that unsized images cause.
 *
 * `sizes` tells the browser how wide the image will actually be rendered, so it
 * can pick the smallest sufficient variant — without it, browsers assume 100vw
 * and over-download.
 */
export function Img({
  name,
  alt,
  sizes = "100vw",
  className = "",
  priority = false,
}: {
  name: ImageName;
  alt: string;
  sizes?: string;
  className?: string;
  /** Set on the hero/above-the-fold image so it is fetched eagerly. */
  priority?: boolean;
}) {
  const img = images[name];
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}

/** Full-bleed cinematic image band with a single statement. */
export function Band({
  name,
  quote,
  sub,
  className = "",
}: {
  name: ImageName;
  quote: React.ReactNode;
  sub?: string;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden border-y border-line ${className}`}>
      <div className="absolute inset-0" aria-hidden>
        <Img
          name={name}
          alt=""
          sizes="100vw"
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
  name,
  alt,
  label,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  imgClassName = "",
}: {
  name: ImageName;
  alt: string;
  label?: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure
      className={`relative overflow-hidden rounded-3xl glass ${className}`}
    >
      <Img
        name={name}
        alt={alt}
        sizes={sizes}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      {label && (
        <figcaption className="glass-chip absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          {label}
        </figcaption>
      )}
    </figure>
  );
}
