import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { getPost, getPosts, formatDate } from "@/lib/blog";
import { site, siteUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

/** Only published posts get built. A draft has no route at all. */
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getPosts();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const next = posts[idx + 1]; // older

  return (
    <>
      {/* BlogPosting + BreadcrumbList. This is the schema that actually earns
          citations in generated answers: it tells an engine what the page
          claims, who stands behind it, and when it was last true. `author` is
          the organisation rather than an invented person — we do not fabricate
          a byline for a company of one. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "@id": `${siteUrl}/blog/${post.slug}#post`,
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                dateModified: post.updated ?? post.date,
                inLanguage: "en",
                url: `${siteUrl}/blog/${post.slug}`,
                mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
                isPartOf: { "@id": `${siteUrl}/blog#blog` },
                author: { "@id": `${siteUrl}/#organization` },
                publisher: { "@id": `${siteUrl}/#organization` },
                keywords: post.tags.join(", "),
                wordCount: undefined,
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
                  { "@type": "ListItem", position: 2, name: "Field notes", item: `${siteUrl}/blog` },
                  { "@type": "ListItem", position: 3, name: post.title },
                ],
              },
            ],
          }),
        }}
      />

      <article className="relative mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <Link
            href="/blog"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog-2 transition-colors hover:text-gold"
          >
            <span aria-hidden>←</span> Field notes
          </Link>

          <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.06] tracking-tight text-snow">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-fog-2">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
            {post.updated && post.updated !== post.date && (
              <>
                <span aria-hidden>·</span>
                <span>Updated {formatDate(post.updated)}</span>
              </>
            )}
          </div>

          <p className="mt-6 border-l-2 border-gold/40 pl-5 text-lg leading-relaxed text-snow">
            {post.description}
          </p>
        </Reveal>

        {/* Content is authored by us, in this repo, and rendered at build time.
            There is no user-supplied markdown anywhere in this path. */}
        <Reveal delay={0.08}>
          <div
            className="prose-npc mt-12"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 rounded-2xl glass p-7 sm:p-9">
            <h2 className="font-display text-xl font-semibold text-snow sm:text-2xl">
              Want this handled for you?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-fog">
              {site.name} builds the site, answers the phone, and qualifies the
              leads — one vendor, fixed price on the build.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/contact" variant="gold">
                Start your story <span aria-hidden>→</span>
              </Button>
              {next && (
                <Button href={`/blog/${next.slug}`} variant="ghost">
                  Read next
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </article>
    </>
  );
}
