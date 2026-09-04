import { Reveal } from "./motion";

/**
 * FAQ block — visible answers plus FAQPage structured data from one source.
 *
 * WHY IT MATTERS MORE THAN IT LOOKS
 * Answer engines are, structurally, question-to-answer matchers. A page that is
 * literally formatted as questions and answers is the lowest-friction thing you
 * can hand them, and FAQPage is the schema our own GEO/AEO audit grades a
 * prospect on. Shipping the site that sells AI visibility without it was a hole.
 *
 * ONE SOURCE, TWO OUTPUTS
 * The visible copy and the JSON-LD are generated from the same `items` array.
 * Structured data that disagrees with what a human sees on the page is a
 * manual-action risk with Google, and hand-maintaining two copies is how that
 * drift happens.
 *
 * NO JAVASCRIPT
 * Native <details>/<summary>: keyboard operable, screen-reader announced, and
 * findable by in-page search when collapsed in modern browsers. An accordion
 * built out of divs and onClick would need all three rebuilt by hand.
 */

export type FaqItem = { q: string; a: string };

export function Faq({
  items,
  id = "faq",
}: {
  items: FaqItem[];
  id?: string;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: { "@type": "Answer", text: it.a },
            })),
          }),
        }}
      />

      <div id={id} className="mt-14 divide-y divide-line border-y border-line">
        {items.map((it, i) => (
          <Reveal key={it.q} delay={Math.min(i, 5) * 0.05} y={18}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-base font-semibold leading-snug text-snow transition-colors group-hover:text-gold sm:text-lg">
                  {it.q}
                </h3>
                {/* Rotates to an X when open. aria-hidden because <summary>
                    already announces its own expanded state. */}
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-fog-2 transition-transform duration-300 group-open:rotate-45"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1.5v13M1.5 8h13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-fog">
                {it.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </>
  );
}
