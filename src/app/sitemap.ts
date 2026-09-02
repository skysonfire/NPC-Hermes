import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

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
  { path: "/sarah", priority: 0.7, changeFrequency: "monthly" },
  { path: "/roadmap", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/msa", priority: 0.2, changeFrequency: "yearly" },
  { path: "/dpa", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
