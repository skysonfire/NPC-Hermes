import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getPosts } from "@/lib/blog";

// Required by `output: export` — these routes must be emitted at build time.
export const dynamic = "force-static";

/**
 * Routes are listed explicitly rather than globbed: a sitemap is a promise to
 * crawlers, and silently shipping a half-finished page into it is worse than
 * omitting it. Add a route here when it is ready to be indexed.
 */
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/protocol", priority: 0.9, changeFrequency: "monthly" },
  { path: "/voice-services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/ai-visibility", priority: 0.9, changeFrequency: "monthly" },
  { path: "/sarah", priority: 0.7, changeFrequency: "monthly" },
  { path: "/roadmap", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/msa", priority: 0.2, changeFrequency: "yearly" },
  { path: "/dpa", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  /**
   * Posts carry their OWN lastModified, not the build time. Stamping every
   * post with "now" on each deploy tells crawlers the whole archive changed
   * every time we ship a CSS tweak, which is how a sitemap stops being
   * believed. Drafts are excluded upstream by getPosts().
   */
  const posts = getPosts().map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(`${p.updated ?? p.date}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts];
}
