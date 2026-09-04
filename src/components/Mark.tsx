"use client";

import { useId } from "react";

/**
 * THE MARK — a fibre-optic waypoint marker.
 *
 * The thing that hovers above the main character's head. Everything about it is
 * derived from that one idea: it points down, it floats, and it is made of
 * light converging to a single point.
 *
 * GEOMETRY (fixed — do not eyeball these)
 *   opening   90.8° at the tip
 *   box       233.5 x 115, so 2.03:1
 *   band      30 units perpendicular, constant along both arms
 * The wide opening is load-bearing. Narrow it and the silhouette stops reading
 * as a floating indicator and starts reading as the letter V.
 *
 * THREE TIERS, NOT ONE DRAWING
 * A logo has to survive its smallest use, and 140 hairlines do not survive
 * 16px — they merge into an orange smudge. So the tier is chosen from `size`:
 *
 *   >= 44px   full     halo + glass body + fibre bundle + weave + rim + core
 *   >= 22px   mid      halo + SOLID neon fill + bloom + rim + core line
 *   <  22px   solid    one filled shape, nothing to lose
 *
 * The mid tier used to carry the same translucent glass body as the full tier.
 * That body only reads as glass when there are fibres behind it to refract; at
 * 34px in the nav, with the fibres dropped, it just read as a hollow outline.
 * Mid now fills solid and keeps the rim and bloom on top — the same lit object,
 * simply too small to show its internals.
 *
 * IDS
 * Gradients need document-unique ids because several marks share a page (nav
 * and footer at minimum). `useId` is SSR-stable, so the server and client agree
 * and hydration stays quiet — a render-time counter would not.
 *
 * MOTION
 * The bob lives in globals.css as `.mark-bob`, applied here to the <svg> root.
 * It is transform-only, so it composites on the GPU and never touches layout,
 * and it is disabled wholesale under prefers-reduced-motion. Amplitude and
 * period are per-instance because a mark in fixed navigation, on screen on
 * every page permanently, needs far less travel than one in a footer.
 */

const VB_X = 0;
const VB_Y = 41;
const VB_W = 260;
const VB_H = 143;

/** The silhouette. Every tier draws this same path. */
const D =
  "M13.26 55 L130 170 L246.74 55 L203.94 55 L130 127.86 L56.06 55 Z";

const CX = 130;
const TIPY = 170;
const TOPY = 55;
const OUTX = 13.26;
const INX = 56.06;

type Fibre = { d: string; w: string; o: string; c: string };

/**
 * The primary bundle: fans from the convergence point across the whole far
 * boundary of each arm — along the top edge first, then part-way down the outer
 * edge. Ending them all on the top edge leaves the lower arm bare and the mark
 * reads as a sunburst instead of a filled bundle.
 */
function primaryFibres(side: 1 | -1): Fibre[] {
  const n = 35;
  const out: Fibre[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    let ex: number;
    let ey: number;
    if (t < 0.6) {
      const u = t / 0.6;
      ex = INX + (OUTX - INX) * u;
      ey = TOPY;
    } else {
      const v = ((t - 0.6) / 0.4) * 0.55;
      ex = OUTX + (CX - OUTX) * v;
      ey = TOPY + (TIPY - TOPY) * v;
    }
    if (side > 0) ex = 2 * CX - ex;
    const mx = (CX + ex) / 2 + -side * (3 + 11 * (1 - t));
    const my = (163 + ey) / 2 + 7;
    out.push({
      d: `M${CX} 163 Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
      w: (0.28 + 0.34 * (1 - t)).toFixed(2),
      o: (0.14 + 0.42 * (1 - t * 0.7)).toFixed(2),
      // Accent strand every seventh. Kept orange — a cream accent washes the
      // neon out of the bundle when you step back from it.
      c: i % 7 === 0 ? "#ffc48a" : "#ff8f3c",
    });
  }
  return out;
}

/**
 * A second, sparser fan launched from higher up the spine at a shallower angle.
 * Where the two bundles cross you get the woven moiré that reads as depth; a
 * single fan reads as a flat starburst no matter how many strands it has.
 */
function weaveFibres(side: 1 | -1): Fibre[] {
  const n = 35;
  const out: Fibre[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    let ex = INX + (OUTX - INX) * t;
    const ey = TOPY;
    if (side > 0) ex = 2 * CX - ex;
    const sx = CX + side * (6 + 30 * t);
    const sy = 148 - 34 * t;
    const mx = (sx + ex) / 2 + -side * (14 * (1 - t));
    const my = (sy + ey) / 2 + 3;
    out.push({
      d: `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey}`,
      w: "0.24",
      o: (0.08 + 0.14 * (1 - t)).toFixed(2),
      c: "#ff7f2e",
    });
  }
  return out;
}

// Computed once at module load, not per render. Deterministic, so server and
// client produce byte-identical markup.
const PRIMARY = [...primaryFibres(-1), ...primaryFibres(1)];
const WEAVE = [...weaveFibres(-1), ...weaveFibres(1)];

export function Mark({
  size = 34,
  bob = true,
  bobY = 2,
  bobDur = 4,
  className = "",
}: {
  /** Rendered WIDTH in px. Height follows the 260:143 viewBox. */
  size?: number;
  bob?: boolean;
  /** Travel in px, each direction from rest — total movement is twice this. */
  bobY?: number;
  /** Seconds per full cycle. */
  bobDur?: number;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const rim = `${uid}-rim`;
  const body = `${uid}-body`;
  const hot = `${uid}-hot`;
  const solid = `${uid}-solid`;
  const halo = `${uid}-halo`;
  const core = `${uid}-core`;
  const clip = `${uid}-clip`;

  const tier = size >= 44 ? "full" : size >= 22 ? "mid" : "solid";
  const height = Math.round(size * (VB_H / VB_W));

  return (
    <svg
      width={size}
      height={height}
      viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
      fill="none"
      aria-hidden="true"
      className={`${bob ? "mark-bob" : ""} ${className}`.trim()}
      style={
        bob
          ? ({
              "--bob-y": `${bobY}px`,
              "--bob-dur": `${bobDur}s`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <defs>
        <clipPath id={clip}>
          <path d={D} />
        </clipPath>
        <linearGradient id={rim} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffab5e" />
          <stop offset="42%" stopColor="#ff7a1a" />
          <stop offset="100%" stopColor="#ffa348" />
        </linearGradient>
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7a1a" stopOpacity="0.05" />
          <stop offset="70%" stopColor="#ff8c2a" stopOpacity="0.11" />
          <stop offset="100%" stopColor="#ffa54f" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id={hot} cx="50%" cy="86%" r="38%">
          <stop offset="0%" stopColor="#ffe9cf" stopOpacity="0.8" />
          <stop offset="24%" stopColor="#ffa855" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={solid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff9a42" />
          <stop offset="100%" stopColor="#ff7211" />
        </linearGradient>
        {tier !== "solid" && (
          <>
            <filter id={halo} x="-45%" y="-45%" width="190%" height="190%">
              <feGaussianBlur stdDeviation="4.2" />
            </filter>
            <filter id={core} x="-45%" y="-45%" width="190%" height="190%">
              <feGaussianBlur stdDeviation="1.3" />
            </filter>
          </>
        )}
      </defs>

      {tier === "solid" ? (
        <path d={D} fill={`url(#${solid})`} />
      ) : (
        <>
          <g filter={`url(#${halo})`} opacity={tier === "full" ? 0.42 : 0.6}>
            <path d={D} fill="none" stroke="#ff7212" strokeWidth={tier === "full" ? 4.5 : 6} />
          </g>
          <path d={D} fill={tier === "full" ? `url(#${body})` : `url(#${solid})`} />

          {tier === "full" && (
            <>
              <g clipPath={`url(#${clip})`}>
                {WEAVE.map((f, i) => (
                  <path
                    key={`w${i}`}
                    d={f.d}
                    fill="none"
                    stroke={f.c}
                    strokeWidth={f.w}
                    opacity={f.o}
                  />
                ))}
              </g>
              <g clipPath={`url(#${clip})`}>
                {PRIMARY.map((f, i) => (
                  <path
                    key={`p${i}`}
                    d={f.d}
                    fill="none"
                    stroke={f.c}
                    strokeWidth={f.w}
                    opacity={f.o}
                  />
                ))}
              </g>
            </>
          )}

          {/* Clipped to the silhouette. Unclipped, the bloom spills past the
              point and reads as a puddle the mark is standing in — which
              defeats the whole idea of something that floats. */}
          <g clipPath={`url(#${clip})`}>
            <ellipse cx="130" cy="156" rx="30" ry="26" fill={`url(#${hot})`} />
          </g>

          <path
            d={D}
            fill="none"
            stroke={`url(#${rim})`}
            strokeWidth={tier === "full" ? 2.8 : 6}
            strokeLinejoin="round"
          />
          <path
            d={D}
            fill="none"
            stroke="#ffcb96"
            strokeWidth={tier === "full" ? 0.8 : 1.3}
            strokeLinejoin="round"
            opacity={tier === "full" ? 0.7 : 0.65}
          />

          {tier === "full" && (
            <g clipPath={`url(#${clip})`}>
              <g filter={`url(#${core})`}>
                <circle cx="130" cy="163" r="3.2" fill="#fff1dc" opacity="0.85" />
              </g>
            </g>
          )}
        </>
      )}
    </svg>
  );
}
