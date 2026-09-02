import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Required by `output: export` — these routes must be emitted at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The lead endpoint is not content; keep it out of crawl budget.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
