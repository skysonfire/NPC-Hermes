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
    "A custom site, an AI receptionist that answers every call, and a lead system that sends qualified enquiries to your CRM. Fixed price, live in days.",

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

  /**
   * The individual who contracts while `registered` is false.
   *
   * A trading name is not a legal person. Until the company exists, the party
   * to every contract is a human being, and the contract has to say so — "NPC
   * Protocol" alone leaves the counterparty undefined and, in practice, means
   * personal liability without personal identification. Fill this in, or
   * register the company. Leaving both empty is the one option that is
   * actually dangerous.
   */
  principalName: "",

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
/**
 * The Provider as a NAMED PARTY to an agreement.
 *
 * Deliberately different from entityLine(). On a marketing page, degrading to
 * the trading name is correct — it says less rather than something untrue. In
 * a contract that same degradation is the failure: "NPC Protocol" reads like a
 * finished answer while identifying nobody, so the counterparty cannot tell
 * who they are contracting with and the drafter cannot tell that anything is
 * missing.
 *
 * So this returns a legally accurate description in every state, and an
 * unmistakable marker when it cannot.
 */
export function contractingParty(): string {
  if (entity.registered && entity.legalName) {
    const bits: string[] = [entity.legalName];
    if (entity.licenceNumber) bits.push(`licence no. ${entity.licenceNumber}`);
    bits.push(`registered in ${entity.jurisdiction}`);
    if (entity.address) bits.push(entity.address);
    return bits.join(", ");
  }
  if (entity.principalName) {
    // Accurate for a sole trader: the human is the party, the brand is a name.
    return `${entity.principalName}, trading as ${entity.tradingName}`;
  }
  return `[NO CONTRACTING ENTITY SET — see src/lib/site.ts. This agreement cannot be executed until a legal party is named.]`;
}

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
