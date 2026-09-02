/**
 * Single source of truth for site-wide identity, URLs and legal entity details.
 *
 * Everything that changes when the domain moves, the mailbox changes, or the
 * legal entity is finalised lives HERE and nowhere else. Pages import from this
 * file; no page hard-codes a domain or an email address.
 *
 * Domain switch (workers.dev -> npcprotocol.com) is one line: set
 * NEXT_PUBLIC_SITE_URL in the build environment, or edit `fallbackUrl` below.
 */

const fallbackUrl = "https://npcprotocol.com";

/** Canonical origin, no trailing slash. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl
).replace(/\/$/, "");

export const site = {
  name: "NPC Protocol",
  url: siteUrl,

  tagline: "Stop Being a Background Character",

  description:
    "Fixed-price, story-driven websites with an AI voice front desk — live in days, and wired to turn visitors into qualified leads.",

  /** Used for OpenGraph/Twitter cards. 1200x630. */
  ogImage: `${siteUrl}/og.png`,

  email: "hello@npcprotocol.com",
  handle: "@npcprotocol",

  hours: "Mon–Fri · 9:00–18:00",
  response: "Replies within 1 business day",
} as const;

/**
 * Legal entity.
 *
 * IMPORTANT: fields left empty render as nothing — never as a bracketed
 * "[insert ...]" instruction. Publishing an instruction to yourself on a live
 * legal page is worse than omitting the detail, and inventing a licence number
 * would be worse still. Fill these in and the legal pages pick them up
 * automatically; until then the pages read as complete prose without them.
 */
export const entity = {
  /**
   * Set to true ONLY once the company is actually registered. While false,
   * nothing on the site claims incorporation, a registered office, or a
   * jurisdiction of registration -- claiming registration you do not yet hold
   * is a false statement on a legal page, and a live one.
   */
  registered: false,

  /** Trading name, always safe to show. */
  tradingName: "NPC Protocol",

  /** Full registered legal name, e.g. "NPC Protocol FZ-LLC". */
  legalName: "",

  /** Trade licence / commercial registration number. */
  licenceNumber: "",

  /** Registered address, one line. */
  address: "",

  /** Free zone / emirate the entity is registered in. Used only when registered. */
  jurisdiction: "Meydan Free Zone, Dubai, United Arab Emirates",

  /** Country whose law governs. A contract may choose this independently of
   *  where the operator is registered, so it is safe to state while unregistered. */
  country: "United Arab Emirates",

  /** Courts named in dispute clauses. */
  courts: "the courts of Dubai, United Arab Emirates",
} as const;

/** True when the entity block is complete enough for the legal pages to be relied on. */
export const entityComplete = Boolean(
  entity.registered && entity.legalName && entity.licenceNumber && entity.address
);

/**
 * One-line entity descriptor used across legal pages.
 * Degrades gracefully as details are filled in.
 */
export function entityLine(): string {
  // Until the company exists, say only the name. No "registered in", no
  // jurisdiction, no address -- none of it is true yet.
  if (!entity.registered) return entity.tradingName;

  const parts: string[] = [entity.legalName || entity.tradingName];
  if (entity.licenceNumber) parts.push(`licence no. ${entity.licenceNumber}`);
  parts.push(`registered in ${entity.jurisdiction}`);
  if (entity.address) parts.push(entity.address);
  return parts.join(", ");
}
