/**
 * Capture reference screenshots at several viewports and scroll positions.
 *
 * Usage: node scripts/shots.mjs [baseUrl] [outDir]
 * Handy for eyeballing a visual change without clicking through the site, and
 * for attaching before/after images to a review.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = process.argv[3] || "screenshots";

const SHOTS = [
  { name: "desktop-hero", path: "/", w: 1440, h: 900, y: 0 },
  { name: "desktop-cards", path: "/", w: 1440, h: 900, y: 2100 },
  { name: "desktop-protocol", path: "/protocol", w: 1440, h: 900, y: 700 },
  { name: "mobile-hero", path: "/", w: 390, h: 844, y: 0 },
  { name: "mobile-cards", path: "/", w: 390, h: 844, y: 1800 },
  { name: "mobile-contact", path: "/contact", w: 390, h: 844, y: 0 },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: false });

for (const s of SHOTS) {
  const ctx = await browser.newContext({
    viewport: { width: s.w, height: s.h },
    isMobile: s.w < 768,
    hasTouch: s.w < 768,
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(BASE.replace(/\/$/, "") + s.path, { waitUntil: "networkidle" });
  if (s.y) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), s.y);
  }
  // Let reveals and split-line tweens finish before capturing.
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${OUT}/${s.name}.png` });
  await ctx.close();
  console.log(`${OUT}/${s.name}.png`);
}

await browser.close();
