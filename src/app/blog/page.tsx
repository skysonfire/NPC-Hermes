import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, Tag } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { getPosts, formatDate } from "@/lib/blog";
import { site, siteUrl } from "@/lib/site";

const title = "Field notes";
const description =
  "Practical writing on getting found, getting called, and getting back to people — for local service businesses.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: `${title} · ${site.name}`,
    description,
    url: `${siteUrl}/blog`,
  },
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <>
      {/* A Blog listing tells answer engines this is an ongoing publication
          rather than a set of orphan pages, and gives each post an explicit
          parent. Only published posts appear — drafts are not built at all. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${siteUrl}/blog#blog`,
            name: `${title} — ${site.name}`,
            description,
            url: `${siteUrl}/blog`,
            publisher: { "@id": `${siteUrl}/#organization` },
            inLanguage: "en",
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              description: p.description,
              datePublished: p.date,
              dateModified: p.updated ?? p.date,
              url: `${siteUrl}/blog/${p.slug}`,
            })),
          }),
        }}
      />

      <Section>
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Field notes"
            title="How local businesses actually get found now."
            lede={description}
          />
        </Reveal>

        {posts.length === 0 ? (
          <Reveal>
            <p className="mt-14 text-fog">
              Nothing published yet. Drop a markdown file in{" "}
              <code className="font-mono text-[13px] text-gold">content/blog/</code> and it
              appears here.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} y={34} className="h-full">
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl glass p-7 transition-all duration-300 hover:border-gold/40"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog-2">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{p.readingMinutes} min read</span>
                  </div>

                  <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-snow transition-colors duration-300 group-hover:text-gold sm:text-2xl">
                    {p.title}
                  </h2>

                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fog">
                    {p.description}
                  </p>

                  {p.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  )}

                  <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                    Read <span aria-hidden>→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
