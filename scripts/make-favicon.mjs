/**
 * Generates src/app/favicon.ico from the brand mark.
 *
 * WHY THIS EXISTS
 * The repo shipped Next.js's stock favicon — Vercel's triangle — as the browser
 * tab icon on a live site. This replaces it, and being a script rather than a
 * one-off export means the icon can be regenerated whenever the mark moves.
 *
 * Deterministic and re-runnable: `node scripts/make-favicon.mjs`.
 *
 * KEEP IN SYNC with src/components/Mark.tsx and scripts/make-og.mjs — all three
 * carry the same path data because none of them can import the others.
 *
 * SOLID AT EVERY SIZE — this is the point of having a solid cut at all.
 * The glass treatment is subtractive: its translucent body and bloom only read
 * as light because there is a dark page behind them. A favicon has no page
 * behind it, just transparency, and it sits on a tab strip that may be light or
 * dark. Rendered there the glass version goes pale and chalky. The filled
 * silhouette is opaque, reads on either ground, and survives 16px.
 *
 * SQUARE FRAMING
 * The mark is 2.03:1. Squashing it to fit a square icon would be a different
 * logo, so it is centred in a square viewBox with the width filling ~93% and
 * the vertical remainder left as breathing room.
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const D = "M13.26 55 L130 170 L246.74 55 L203.94 55 L130 127.86 L56.06 55 Z";

/** Square box centred on the mark's own bounding box (centre 130, 112.5). */
const VIEWBOX = "5 -12 250 250";

const solid = (px) => `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="${VIEWBOX}">
  <defs>
    <linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff9a42"/><stop offset="100%" stop-color="#ff7211"/>
    </linearGradient>
  </defs>
  <path d="${D}" fill="url(#s)"/>
</svg>`;

/** Kept for reference: the glass cut, correct ONLY over a known dark ground. */
const rimmed = (px) => `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="${VIEWBOX}">
  <defs>
    <clipPath id="c"><path d="${D}"/></clipPath>
    <linearGradient id="r" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffab5e"/>
      <stop offset="42%" stop-color="#ff7a1a"/>
      <stop offset="100%" stop-color="#ffa348"/>
    </linearGradient>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff7a1a" stop-opacity=".08"/>
      <stop offset="100%" stop-color="#ffa54f" stop-opacity=".26"/>
    </linearGradient>
    <radialGradient id="h" cx="50%" cy="86%" r="38%">
      <stop offset="0%" stop-color="#ffe9cf" stop-opacity=".8"/>
      <stop offset="24%" stop-color="#ffa855" stop-opacity=".45"/>
      <stop offset="100%" stop-color="#ff7a1a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <path d="${D}" fill="url(#b)"/>
  <g clip-path="url(#c)"><ellipse cx="130" cy="156" rx="30" ry="26" fill="url(#h)"/></g>
  <path d="${D}" fill="none" stroke="url(#r)" stroke-width="7" stroke-linejoin="round"/>
  <path d="${D}" fill="none" stroke="#ffcb96" stroke-width="1.6" stroke-linejoin="round" opacity=".65"/>
</svg>`;

/**
 * Packs PNG buffers into an ICO container.
 *
 * ICO entries may carry a PNG payload rather than a BMP, which every browser in
 * use supports and which avoids hand-rolling DIB headers and AND masks. A
 * dimension byte of 0 means 256 — the field is one byte wide.
 */
function packIco(images) {
  const HEADER = 6;
  const ENTRY = 16;
  const header = Buffer.alloc(HEADER);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = HEADER + ENTRY * images.length;
  const entries = [];
  for (const { size, buf } of images) {
    const e = Buffer.alloc(ENTRY);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette size
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += buf.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.buf)]);
}

const SIZES = [16, 32, 48, 64, 128, 256];

const images = [];
for (const size of SIZES) {
  const svg = solid(size);
  const buf = await sharp(Buffer.from(svg), { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  images.push({ size, buf });
}

const ico = packIco(images);
await writeFile("src/app/favicon.ico", ico);
console.log(
  `wrote src/app/favicon.ico (${SIZES.join(", ")}) — ${ico.length} bytes`
);

// A transparent PNG alongside it, for anywhere an .ico is the wrong answer.
await sharp(Buffer.from(solid(512)), { density: 384 })
  .resize(512, 512)
  .png({ compressionLevel: 9 })
  .toFile("public/icon-512.png");
console.log("wrote public/icon-512.png (512x512)");
