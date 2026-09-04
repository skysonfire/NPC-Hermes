import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Required by `output: export` — these routes must be emitted at build time.
export const dynamic = "force-static";

/**
 * AI CRAWLERS ARE NAMED EXPLICITLY, ON PURPOSE.
 *
 * A bare `User-agent: *` technically permits all of these, so this is not a
 * functional change — it is a legibility one, and it matters for two reasons.
 *
 * 1. Our own GEO/AEO audit runbook grades a prospect's robots.txt on whether
 *    these agents are explicitly addressed. We sell that audit. This file is
 *    the first thing a technically literate prospect will check, and shipping
 *    an implicit allow on the site that sells AI visibility is a bad look.
 *
 * 2. `Google-Extended` and `Applebot-Extended` are opt-OUT controls for AI
 *    training and grounding, entirely separate from search indexing. Silence
 *    is treated as permission today, but stating it removes the ambiguity and
 *    survives a future default flip.
 *
 * These are the agents that actually matter for being cited in generated
 * answers. Anything not listed still falls through to the wildcard.
 */
const AI_AGENTS = [
  "GPTBot", // OpenAI — training corpus
  "OAI-SearchBot", // OpenAI — ChatGPT search grounding
  "ChatGPT-User", // OpenAI — live user-initiated fetches
  "PerplexityBot", // Perplexity — index
  "Perplexity-User", // Perplexity — live user-initiated fetches
  "Google-Extended", // Google — Gemini grounding + AI Overviews
  "Claude-Web", // Anthropic — legacy crawler name
  "ClaudeBot", // Anthropic — current crawler
  "anthropic-ai", // Anthropic — legacy training agent
  "Applebot-Extended", // Apple — AI training control
  "Amazonbot", // Amazon
  "Bingbot", // Microsoft — Copilot grounding rides Bing's index
  "CCBot", // Common Crawl — feeds many open corpora
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The lead endpoint is not content; keep it out of crawl budget.
        disallow: ["/api/"],
      },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
