import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Blog content layer.
 *
 * Posts are markdown files on disk, read at BUILD time only. The site is
 * `output: "export"` — there is no server at runtime — so everything here runs
 * during `next build` and the result is baked into static HTML. That is also
 * why this module must never be imported from a "use client" component: it
 * touches node:fs.
 *
 * Markdown rather than MDX on purpose. MDX buys you React inside posts, at the
 * cost of a compile step, a runtime, and posts that can break the build. A
 * business blog needs headings, lists, links and the occasional table. Plain
 * markdown gives us that with two small dependencies and no way for a post to
 * take the site down.
 *
 * DRAFTS
 * A post with `draft: true` is excluded from the index, the sitemap and
 * generateStaticParams, so it is never built or linked. It is not "hidden" —
 * it genuinely does not exist in the output.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-09-04". */
  date: string;
  /** ISO date of the last meaningful edit. Falls back to `date`. */
  updated?: string;
  tags: string[];
  /** Reading time in minutes, computed — never authored. */
  readingMinutes: number;
  draft: boolean;
};

export type Post = PostMeta & { html: string };

function readDir(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

/** ~220 wpm is the usual estimate for non-technical prose; round up, min 1. */
function readingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function parse(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);

  // Fail loudly at build time rather than shipping a post with a blank title
  // or an unparseable date into the sitemap.
  const title = String(data.title ?? "").trim();
  const description = String(data.description ?? "").trim();
  const date = String(data.date ?? "").trim();
  if (!title) throw new Error(`content/blog/${file}: missing "title"`);
  if (!description) throw new Error(`content/blog/${file}: missing "description"`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`content/blog/${file}: "date" must be YYYY-MM-DD, got "${date}"`);
  }

  return {
    slug,
    title,
    description,
    date,
    updated: data.updated ? String(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: readingMinutes(content),
    draft: data.draft === true,
    html: marked.parse(content, { async: false }) as string,
  };
}

/** Published posts, newest first. Drafts are excluded everywhere. */
export function getPosts(): Post[] {
  return readDir()
    .map(parse)
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

/** Every tag in use, most-used first — for the index filter row. */
export function getTags(): string[] {
  const counts = new Map<string, number>();
  for (const p of getPosts()) {
    for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
