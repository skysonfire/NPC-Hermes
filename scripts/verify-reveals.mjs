/**
 * Reveal-layer verification.
 *
 * Guards the bug that made the whole site invisible on mobile: [data-reveal]
 * elements are hidden by CSS once `html.motion-on` is set, and something must
 * add `.is-revealed` or the content is never seen.
 *
 * This drives a REAL, visible browser (an offscreen/hidden page suppresses
 * IntersectionObserver callbacks, so a hidden harness cannot test this).
 *
 * It scrolls each page top-to-bottom at several viewports and asserts that
 * every reveal ends up revealed. The watchdog inside MotionProvider is a
 * backstop, not the mechanism under test, so we also assert that reveals fire
 * *progressively* — i.e. before the watchdog deadline could have run.
 *
 * Usage:  node scripts/verify-reveals.mjs [baseUrl]
 * Exit code 0 = pass, 1 = fail. Safe for CI / unattended runs.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://localhost:3000";

const ROUTES = [
  "/",
  "/protocol",
  "/sarah",
  "/roadmap",
  "/contact",
  "/privacy",
  "/terms",
];

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812, isMobile: true, hasTouch: true },
  { name: "tablet", width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: "desktop", width: 1440, height: 900, isMobile: false, hasTouch: false },
];

/** Scroll the page in steps, sampling reveal progress as we go. */
async function walkPage(page) {
  return page.evaluate(async () => {
    const sel = "[data-reveal]";
    const count = () => ({
      total: document.querySelectorAll(sel).length,
      revealed: document.querySelectorAll(`${sel}.is-revealed`).length,
    });
    const start = performance.now();
    const marks = [];
    const h = document.body.scrollHeight;
    const step = Math.max(200, Math.round(window.innerHeight * 0.6));
    for (let y = 0; y <= h; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 60)));
      marks.push({ y, t: Math.round(performance.now() - start), ...count() });
    }
    window.scrollTo({ top: h, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 500));
    const final = count();
    // Anything still hidden, named so a failure is actionable.
    const stragglers = [...document.querySelectorAll(`${sel}:not(.is-revealed)`)]
      .slice(0, 5)
      .map((el) => (el.textContent || "").trim().slice(0, 70));
    // Headings are split into masked lines by SplitReveal. That is a second,
    // independent way text can end up invisible, so assert every heading is
    // actually readable: present in the DOM, non-empty, and painted.
    const headings = [...document.querySelectorAll("h1, h2, h3")];
    const invisibleHeadings = headings
      .filter((h) => {
        const text = (h.textContent || "").trim();
        if (!text) return false; // genuinely empty heading, not our concern
        const cs = getComputedStyle(h);
        if (cs.display === "none" || cs.visibility === "hidden") return true;
        if (parseFloat(cs.opacity) === 0) return true;
        // A split heading whose lines are all still masked reads as blank.
        const lines = h.querySelectorAll(".split-line");
        if (lines.length) {
          const anyVisible = [...lines].some(
            (l) => parseFloat(getComputedStyle(l).opacity) > 0.01
          );
          if (!anyVisible) return true;
        }
        return h.getBoundingClientRect().height === 0;
      })
      .map((h) => (h.textContent || "").trim().slice(0, 60));

    return {
      final,
      stragglers,
      elapsedMs: Math.round(performance.now() - start),
      marks,
      motionOn: document.documentElement.classList.contains("motion-on"),
      headingCount: headings.length,
      invisibleHeadings,
    };
  });
}

const browser = await chromium.launch({ channel: "chrome", headless: false });
let failures = 0;
const rows = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    const url = BASE.replace(/\/$/, "") + route;
    // domcontentloaded, not networkidle: Next continuously prefetches route
    // payloads, so the network never goes idle and the wait times out.
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(700);
    const r = await walkPage(page);

    const ok = r.final.total === 0 || r.final.revealed === r.final.total;

    // Did reveals happen progressively, or only in one lump at the end?
    // The watchdog fires at 4000ms; anything revealed before that is the observer.
    const revealedEarly = r.marks.some((m) => m.t < 3000 && m.revealed > 0);
    const progressive = r.final.total === 0 || revealedEarly;

    const headingsOk = r.invisibleHeadings.length === 0;

    if (!ok || !progressive || !headingsOk) failures++;
    rows.push({
      viewport: vp.name,
      route,
      total: r.final.total,
      revealed: r.final.revealed,
      motionOn: r.motionOn,
      observerFired: progressive,
      headings: r.headingCount,
      invisibleHeadings: r.invisibleHeadings,
      status: ok && progressive && headingsOk ? "PASS" : "FAIL",
      stragglers: r.stragglers,
    });
  }
  await ctx.close();
}

await browser.close();

let out = "";
for (const r of rows) {
  const headingsVisible = r.headings - r.invisibleHeadings.length;
  out +=
    `${r.status.padEnd(4)} ${r.viewport.padEnd(7)} ${r.route.padEnd(11)}` +
    ` reveals ${String(r.revealed + "/" + r.total).padEnd(7)}` +
    ` headings ${String(headingsVisible + "/" + r.headings).padEnd(6)}` +
    ` observer=${r.observerFired}\n`;
  if (r.status === "FAIL") {
    for (const s of r.stragglers) out += `       still hidden: ${s}\n`;
    for (const h of r.invisibleHeadings) out += `       INVISIBLE HEADING: ${h}\n`;
  }
}
out += failures === 0
  ? `\nALL PASS — ${rows.length} page/viewport combinations, every reveal shown.\n`
  : `\n${failures} FAILURE(S) of ${rows.length} combinations.\n`;

process.stdout.write(out);
process.exit(failures === 0 ? 0 : 1);
