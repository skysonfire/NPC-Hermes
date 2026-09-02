/**
 * Generates the OpenGraph card (public/og.png, 1200x630) and the apple touch
 * icon (public/apple-touch-icon.png, 180x180) from an on-brand HTML template.
 *
 * Deterministic and re-runnable: `node scripts/make-og.mjs`. Colours are copied
 * from the tokens in globals.css — update both together if the palette moves.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const INK = "#0a0a13";
const PANEL = "#14131f";
const LINE = "#2a2840";
const SNOW = "#ededf6";
const FOG = "#928fae";
const GOLD = "#ff8a5c";
const NPC = "#56b6ff";

const mark = (size, stroke, core) => `
<svg width="${size}" height="${size}" viewBox="0 0 26 26" fill="none">
  <rect x="6.5" y="6.5" width="13" height="13" rx="2" transform="rotate(45 13 13)"
        stroke="${stroke}" stroke-width="1.6"/>
  <circle cx="13" cy="13" r="3" fill="${core}"/>
</svg>`;

const shell = (body, w, h) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${w}px;height:${h}px;background:${INK};color:${SNOW};
       font-family:'Unbounded',system-ui,sans-serif;overflow:hidden;position:relative}
  .grid{position:absolute;inset:0;
    background-image:
      linear-gradient(to right, ${LINE}99 1px, transparent 1px),
      linear-gradient(to bottom, ${LINE}99 1px, transparent 1px);
    background-size:48px 48px;
    -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 0%, #000 35%, transparent 100%);}
  .glowA{position:absolute;width:620px;height:620px;border-radius:50%;filter:blur(150px);
    background:radial-gradient(circle, ${GOLD}, transparent 70%);opacity:.22;right:-160px;top:-220px}
  .glowB{position:absolute;width:560px;height:560px;border-radius:50%;filter:blur(150px);
    background:radial-gradient(circle, ${NPC}, transparent 70%);opacity:.20;left:-180px;bottom:-240px}
</style></head><body>${body}</body></html>`;

const ogBody = `
<div class="grid"></div><div class="glowA"></div><div class="glowB"></div>
<div style="position:relative;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:58px 72px 62px">

  <div style="display:flex;align-items:center;gap:16px">
    ${mark(38, GOLD, NPC)}
    <span style="font-size:26px;font-weight:700;letter-spacing:.16em">NPC PROTOCOL</span>
  </div>

  <div style="margin:auto 0">
    <div style="font-family:'JetBrains Mono',monospace;font-size:16px;letter-spacing:.34em;
                text-transform:uppercase;color:${NPC};display:flex;align-items:center;gap:12px;margin-bottom:22px">
      <span style="width:8px;height:8px;border-radius:50%;background:${NPC};display:inline-block"></span>
      Default state
    </div>
    <div style="font-size:70px;font-weight:700;line-height:1.06;letter-spacing:-.03em;max-width:1000px">
      Stop being a<br><span style="color:${NPC}">background character.</span>
    </div>
    <div style="font-size:23px;line-height:1.5;color:${FOG};margin-top:26px;max-width:860px;
                font-family:system-ui,sans-serif">
      Fixed-price websites with an AI voice front desk — live in days,
      wired to turn visitors into qualified leads.
    </div>
  </div>

  <div style="display:flex;gap:14px;font-family:'JetBrains Mono',monospace;font-size:15px">
    ${["FIXED PRICE", "DAYS, NOT WEEKS", "NO TEMPLATES"]
      .map(
        (t) =>
          `<span style="border:1px solid ${LINE};background:${PANEL}cc;border-radius:999px;
            padding:11px 22px;color:${FOG};letter-spacing:.12em">${t}</span>`
      )
      .join("")}
  </div>
</div>`;

const iconBody = `
<div style="width:180px;height:180px;background:${INK};display:flex;align-items:center;justify-content:center">
  ${mark(112, GOLD, NPC)}
</div>`;

await mkdir("public", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

for (const [file, body, w, h] of [
  ["public/og.png", ogBody, 1200, 630],
  ["public/apple-touch-icon.png", iconBody, 180, 180],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.setContent(shell(body, w, h), { waitUntil: "networkidle" });
  // Let webfonts settle so the card never renders in a fallback face.
  await page.waitForTimeout(600);
  await page.screenshot({ path: file, type: "png" });
  await page.close();
  console.log(`wrote ${file} (${w}x${h})`);
}

await browser.close();
