/**
 * Static audit of the built site (dist/).
 *
 * Deterministic checks only — things that are true or false by inspection, no
 * browser and no judgment required. Catches the class of bug that ships quietly:
 * a footer link to a page that doesn't exist, an image with no alt text, a page
 * that forgot its meta description.
 *
 * Usage: node scripts/audit-build.mjs [distDir]
 * Exit 0 = clean, 1 = problems found.
 */
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const DIST = process.argv[2] || "dist";

/** Every .html file in the build, recursively. */
async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (entry.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const files = await htmlFiles(DIST);
const problems = [];
const titles = new Map();

/** Does this internal href resolve to something in the build? */
async function resolves(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (clean === "" || clean === "/") return true;
  const rel = clean.replace(/^\//, "").replace(/\/$/, "");
  for (const candidate of [
    path.join(DIST, rel),
    path.join(DIST, `${rel}.html`),
    path.join(DIST, rel, "index.html"),
  ]) {
    try {
      await stat(candidate);
      return true;
    } catch {}
  }
  return false;
}

for (const file of files) {
  const html = await readFile(file, "utf8");
  const page = "/" + path.relative(DIST, file).replace(/\\/g, "/");

  // --- title / description -------------------------------------------------
  // Next's generated error pages carry two <title> tags and legitimately reuse
  // the site default, so they are exempt from duplicate-title comparison.
  const isErrorPage = /^\/(404|_not-found)\.html$/.test(page);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  if (!title) problems.push([page, "no <title>"]);
  else {
    if (!isErrorPage) {
      if (titles.has(title)) problems.push([page, `duplicate title, same as ${titles.get(title)}`]);
      else titles.set(title, page);
    }
    if (title.length > 65) problems.push([page, `title ${title.length} chars (>65 truncates in search results)`]);
  }

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) problems.push([page, "no meta description"]);
  else if (desc.length > 160) problems.push([page, `meta description ${desc.length} chars (>160 truncates)`]);

  // --- headings ------------------------------------------------------------
  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s === 0) problems.push([page, "no <h1>"]);
  if (h1s > 1) problems.push([page, `${h1s} <h1> elements (should be 1)`]);

  // --- images --------------------------------------------------------------
  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\balt=/.test(tag)) {
      problems.push([page, `<img> with no alt: ${tag.slice(0, 90)}`]);
    }
    if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag)) {
      // Background/decorative images set via CSS are exempt; this is for <img>.
      problems.push([page, `<img> without width/height (layout shift): ${tag.slice(0, 70)}`]);
    }
  }

  // --- links ---------------------------------------------------------------
  for (const tag of html.match(/<a\b[^>]*>/g) ?? []) {
    const href = tag.match(/href="([^"]*)"/)?.[1];
    if (!href) continue;

    if (href.startsWith("http")) {
      // Cross-origin target=_blank without rel=noopener is a tabnabbing vector.
      if (/target="_blank"/.test(tag) && !/rel="[^"]*noopener/.test(tag) && !/rel="[^"]*noreferrer/.test(tag)) {
        problems.push([page, `external target=_blank without rel=noopener: ${href}`]);
      }
      continue;
    }
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) continue;

    if (!(await resolves(href))) {
      problems.push([page, `broken internal link -> ${href}`]);
    }
  }
}

// --- report ---------------------------------------------------------------
if (problems.length === 0) {
  console.log(`clean — ${files.length} pages audited, no problems found`);
  process.exit(0);
}

const byPage = new Map();
for (const [page, msg] of problems) {
  if (!byPage.has(page)) byPage.set(page, []);
  byPage.get(page).push(msg);
}

for (const [page, msgs] of byPage) {
  console.log(`\n${page}`);
  for (const m of msgs) console.log(`  - ${m}`);
}
console.log(`\n${problems.length} problem(s) across ${byPage.size} of ${files.length} pages`);
process.exit(1);
