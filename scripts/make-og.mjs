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

/**
 * The brand mark — a fibre-optic waypoint marker.
 *
 * KEEP IN SYNC with src/components/Mark.tsx. This file cannot import the React
 * component (it renders standalone HTML through Playwright), so the path data
 * is duplicated here on purpose. If the geometry moves in one place it must
 * move in both, or the OG card and the site will show different logos.
 *
 * `size` is the rendered WIDTH; height follows the 260:143 viewBox.
 * The `_stroke`/`_core` params are kept so existing call sites don't change.
 */
const MARK_D = "M13.26 55 L130 170 L246.74 55 L203.94 55 L130 127.86 L56.06 55 Z";

const mark = (size, _stroke, _core) => {
  const h = Math.round(size * (143 / 260));
  const u = `m${size}`;
  // Full tier above 44px, otherwise the simplified rim-only cut.
  const full = size >= 44;
  return `
<svg width="${size}" height="${h}" viewBox="0 41 260 143" fill="none">
  <defs>
    <clipPath id="c${u}"><path d="${MARK_D}"/></clipPath>
    <linearGradient id="r${u}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffab5e"/>
      <stop offset="42%" stop-color="#ff7a1a"/>
      <stop offset="100%" stop-color="#ffa348"/>
    </linearGradient>
    <linearGradient id="b${u}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff7a1a" stop-opacity=".05"/>
      <stop offset="70%" stop-color="#ff8c2a" stop-opacity=".11"/>
      <stop offset="100%" stop-color="#ffa54f" stop-opacity=".2"/>
    </linearGradient>
    <radialGradient id="h${u}" cx="50%" cy="86%" r="38%">
      <stop offset="0%" stop-color="#ffe9cf" stop-opacity=".8"/>
      <stop offset="24%" stop-color="#ffa855" stop-opacity=".45"/>
      <stop offset="100%" stop-color="#ff7a1a" stop-opacity="0"/>
    </radialGradient>
    <filter id="g${u}" x="-45%" y="-45%" width="190%" height="190%">
      <feGaussianBlur stdDeviation="4.2"/>
    </filter>
  </defs>
  <g filter="url(#g${u})" opacity=".42">
    <path d="${MARK_D}" fill="none" stroke="#ff7212" stroke-width="4.5"/>
  </g>
  <path d="${MARK_D}" fill="url(#b${u})"/>
  ${full ? fibres(u) : ""}
  <g clip-path="url(#c${u})"><ellipse cx="130" cy="156" rx="30" ry="26" fill="url(#h${u})"/></g>
  <path d="${MARK_D}" fill="none" stroke="url(#r${u})" stroke-width="${full ? 2.8 : 6}" stroke-linejoin="round"/>
  <path d="${MARK_D}" fill="none" stroke="#ffcb96" stroke-width="${full ? 0.8 : 1.3}" stroke-linejoin="round" opacity="${full ? 0.7 : 0.65}"/>
</svg>`;
};

/** The fibre bundle. Same generator as the React component, same constants. */
function fibres(u) {
  const CX = 130, TIPY = 170, TOPY = 55, OUTX = 13.26, INX = 56.06;
  let out = "";
  for (const side of [-1, 1]) {
    for (let i = 0; i < 35; i++) {
      const t = i / 34;
      let ex, ey;
      if (t < 0.6) { const uu = t / 0.6; ex = INX + (OUTX - INX) * uu; ey = TOPY; }
      else { const v = ((t - 0.6) / 0.4) * 0.55; ex = OUTX + (CX - OUTX) * v; ey = TOPY + (TIPY - TOPY) * v; }
      if (side > 0) ex = 2 * CX - ex;
      const mx = (CX + ex) / 2 + -side * (3 + 11 * (1 - t));
      const my = (163 + ey) / 2 + 7;
      out += `<path d="M${CX} 163 Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="${i % 7 === 0 ? "#ffc48a" : "#ff8f3c"}" stroke-width="${(0.28 + 0.34 * (1 - t)).toFixed(2)}" opacity="${(0.14 + 0.42 * (1 - t * 0.7)).toFixed(2)}"/>`;
    }
  }
  return `<g clip-path="url(#c${u})">${out}</g>`;
}

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
                text-transform:uppercase;color:${GOLD};display:flex;align-items:center;gap:12px;margin-bottom:22px">
      <span style="width:8px;height:8px;border-radius:50%;background:${GOLD};display:inline-block"></span>
      Site · Voice · Retainer
    </div>
    <div style="font-size:70px;font-weight:700;line-height:1.06;letter-spacing:-.03em;max-width:1000px">
      You&rsquo;re<br><span style="color:${GOLD}">the main character.</span>
    </div>
    <div style="font-size:23px;line-height:1.5;color:${FOG};margin-top:26px;max-width:860px;
                font-family:system-ui,sans-serif">
      A custom site, an AI receptionist that answers every call, and leads
      that arrive already qualified. Fixed price, live in days.
    </div>
  </div>

  <div style="display:flex;gap:14px;font-family:'JetBrains Mono',monospace;font-size:15px">
    ${["FIXED PRICE", "LIVE IN DAYS", "EVERY CALL ANSWERED"]
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
