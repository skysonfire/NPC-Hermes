/**
 * Order Form generator.
 *
 *   node contracts/make-order-form.mjs contracts/clients/holmes.json
 *
 * Reads a client JSON, fills the template, writes a dated Markdown and a
 * print-ready HTML into contracts/out/. The HTML is what you upload to the
 * e-signature tool.
 *
 * WHY GENERATE RATHER THAN EDIT A COPY
 * Hand-editing a contract per client is where the money leaks. Someone
 * duplicates last month's file, misses a fee, and the client signs a document
 * that says something nobody intended. Worse, nobody knows afterwards which
 * version was signed.
 *
 * So: one template, a per-client data file, and a version stamp in the footer
 * of every generated document. When a dispute lands in year two, "which
 * version did they sign" has an answer.
 *
 * FAILS LOUDLY ON MISSING FIELDS. A contract with an unreplaced {{PLACEHOLDER}}
 * in it is worse than no contract — it is evidence that nobody read it.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_VERSION = "1.0.0";

const configPath = process.argv[2];
if (!configPath) {
  console.error("usage: node contracts/make-order-form.mjs <client.json>");
  process.exit(1);
}

const cfg = JSON.parse(readFileSync(configPath, "utf8"));

/**
 * The Provider comes from src/lib/site.ts — the same entity block the MSA
 * renders — parsed rather than imported because this is a plain script and
 * site.ts is TypeScript. If the entity is not registered and no principal is
 * named, there is no party to contract as and generation stops.
 */
const siteTs = readFileSync(join(HERE, "..", "src", "lib", "site.ts"), "utf8");
/**
 * Pull a quoted value out of the `entity` block in site.ts.
 *
 * Plain string scanning rather than a regex: the first version built the
 * pattern inside a template literal, where JS collapses \s to a literal "s",
 * so it silently matched nothing and the generator refused every run for the
 * wrong reason. Scoped to the entity block so a usage elsewhere in the file
 * cannot be read as the definition.
 */
const entityBlock = (() => {
  const i = siteTs.indexOf("export const entity");
  return i < 0 ? siteTs : siteTs.slice(i);
})();
const QUOTE = String.fromCharCode(34);
const field = (name) => {
  const i = entityBlock.indexOf(name + ":");
  if (i < 0) return "";
  const a = entityBlock.indexOf(QUOTE, i);
  const b = entityBlock.indexOf(QUOTE, a + 1);
  return a < 0 || b < 0 ? "" : entityBlock.slice(a + 1, b);
};
const registered = entityBlock.includes("registered: true");
const provider = {
  legalName: registered ? field("legalName") : (field("principalName") ? `${field("principalName")}, trading as ${field("tradingName")}` : ""),
  address: registered ? field("address") : field("jurisdiction"),
  signatory: field("principalName"),
  title: registered ? "Director" : "Proprietor",
};
if (!provider.legalName || !provider.signatory) {
  console.error("REFUSING TO GENERATE — no contracting party.\n");
  console.error("  src/lib/site.ts has no registered entity and no principalName.");
  console.error("  An Order Form cannot name a Provider that does not exist.");
  console.error("  Register the company, or set entity.principalName.");
  process.exit(1);
}
const template = readFileSync(join(HERE, "ORDER-FORM-TEMPLATE.md"), "utf8");

/* ── money + dates, formatted once, consistently ─────────────────────────── */
const gbp = (n) =>
  typeof n === "number"
    ? new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0 }).format(n)
    : String(n);

const today = new Date();
const dateLong = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(today);

/* ── section toggles ─────────────────────────────────────────────────────── */
// A section that is not sold is struck through rather than deleted, so the
// client can see what exists and what they chose not to take. That is a
// quieter upsell than a follow-up email, and it removes any argument later
// about whether something was offered.
const included = (on) => (on ? "**INCLUDED**" : "*Not included in this Order Form.*");

const s = cfg.services || {};
const audit = s.audit?.include ?? false;
const build = s.build?.include ?? false;
const callback = s.callback?.include ?? false;
const retainer = s.retainer?.include ?? false;

const yearOne =
  (audit ? s.audit.fee : 0) +
  (build ? s.build.fee : 0) +
  (callback ? s.callback.fee * 12 : 0) +
  (retainer ? s.retainer.fee * 12 : 0);

const ref = cfg.orderRef || `NPC-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${(cfg.client?.tradingName || "client").replace(/\W+/g, "").slice(0, 8).toUpperCase()}`;

const values = {
  ORDER_REF: ref,
  DATE: dateLong,
  SITE_URL: cfg.siteUrl || "https://npcprotocol.com",

  // Read from src/lib/site.ts, never from the client JSON. A per-client
  // provider field let a smoke test print a fictitious London company into a
  // signable contract, and no string check can distinguish a plausible fake
  // from a real registered entity. One source of truth, shared with the MSA.
  PROVIDER_LEGAL_NAME: provider.legalName,
  PROVIDER_ADDRESS: provider.address,
  PROVIDER_SIGNATORY: provider.signatory,
  PROVIDER_TITLE: provider.title,

  CLIENT_LEGAL_NAME: cfg.client?.legalName,
  CLIENT_COMPANY_NO: cfg.client?.companyNumber,
  CLIENT_ADDRESS: cfg.client?.address,
  CLIENT_TRADING_NAME: cfg.client?.tradingName,
  CLIENT_CONTACT_NAME: cfg.client?.contactName,
  CLIENT_CONTACT_EMAIL: cfg.client?.contactEmail,
  CLIENT_CONTACT_PHONE: cfg.client?.contactPhone,

  INCLUDE_AUDIT: included(audit),
  INCLUDE_BUILD: included(build),
  INCLUDE_CALLBACK: included(callback),
  INCLUDE_RETAINER: included(retainer),

  AUDIT_FEE: audit ? gbp(s.audit.fee) : "—",
  AUDIT_DAYS: audit ? s.audit.days : "—",
  COMPETITOR_COUNT: audit ? s.audit.competitors : "—",

  BUILD_FEE: build ? gbp(s.build.fee) : "—",
  BUILD_DEPOSIT: build ? gbp(s.build.deposit) : "—",
  BUILD_DAYS: build ? s.build.days : "—",
  PAGE_COUNT: build ? s.build.pages?.length : "—",
  PAGE_LIST: build ? s.build.pages?.join(", ") : "—",
  CONTACT_ROUTE: build ? s.build.contactRoute : "—",
  HOSTING: build ? s.build.hosting : "—",
  REVISION_ROUNDS: build ? s.build.revisionRounds : "—",
  COPY_SCOPE: build ? s.build.copyScope : "—",
  BOOKING_SCOPE: build ? s.build.bookingScope : "—",

  CALLBACK_FEE: callback ? gbp(s.callback.fee) : "—",
  MESSAGE_ALLOWANCE: callback ? s.callback.allowance : "—",
  OVERAGE_RATE: callback ? s.callback.overage : "—",
  QUIET_HOURS: callback ? s.callback.quietHours : "—",

  RETAINER_FEE: retainer ? gbp(s.retainer.fee) : "—",
  HOURS_OR_SCOPE: retainer ? s.retainer.scope : "—",
  MENTION_SCOPE: retainer ? s.retainer.mentions : "—",

  YEAR_ONE_TOTAL: gbp(yearOne),
  PAYMENT_DAYS: cfg.terms?.paymentDays ?? 14,
  INITIAL_TERM: cfg.terms?.initialTerm ?? "3 months",
  NOTICE_PERIOD: cfg.terms?.noticePeriod ?? "30 days'",
  START_DATE: cfg.terms?.startDate,
  MATERIALS_DAYS: cfg.terms?.materialsDays ?? 5,
  ADDITIONAL_ASSUMPTIONS: (cfg.assumptions || []).join("\n- ") || "None.",
};

/* ── fill, then refuse to emit anything with a hole in it ────────────────── */
let out = template;
for (const [k, v] of Object.entries(values)) {
  out = out.replaceAll(`{{${k}}}`, v == null ? "" : String(v));
}

const holes = [...out.matchAll(/\{\{([A-Z_]+)\}\}/g)].map((m) => m[1]);
/**
 * A field is "unfilled" if it is empty OR still carries a placeholder phrase.
 *
 * The first version of this guard tested only for empty strings, so
 * "FILL THIS IN" — a perfectly non-empty string — passed straight through and
 * was printed into a client-facing contract as the Provider's legal name. The
 * guard existed precisely to stop that, and did not.
 */
const SENTINELS = /^\s*(fill this in|tbd|todo|xxx+|tba|placeholder|\?+)/i;
const isUnfilled = (v) =>
  v === undefined || v === null || String(v).trim() === "" || SENTINELS.test(String(v));
const blanks = Object.entries(values).filter(([, v]) => isUnfilled(v)).map(([k]) => k);

if (holes.length || blanks.length) {
  console.error("REFUSING TO GENERATE — the contract would go out incomplete.\n");
  if (holes.length) console.error("  unreplaced placeholders:", [...new Set(holes)].join(", "));
  if (blanks.length) console.error("  empty or placeholder values:", blanks.join(", "));
  console.error("\nFill these in the client JSON and run again.");
  process.exit(1);
}

// Strip the internal warning banner — it is for us, not the client.
out = out.replace(/^# ORDER FORM\n\n\*\*This is a commercial draft[\s\S]*?---\n\n/, "# ORDER FORM\n\n");

const footer = `\n\n---\n\n<sub>Order Form ${ref} · template v${TEMPLATE_VERSION} · generated ${dateLong}</sub>\n`;
out += footer;

const outDir = join(HERE, "out");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const stem = `${ref}`;

writeFileSync(join(outDir, `${stem}.md`), out, "utf8");

/**
 * Pipe tables -> real HTML, before any other markdown handling so the paragraph
 * wrapper never sees a raw pipe block. The previous version had a no-op with
 * the comment "tables handled below" and nothing below handled them, so every
 * table in the signable HTML rendered as literal pipes. A contract is mostly
 * tables: parties, fees, terms.
 */
function mdTables(md) {
  const lines = md.split("\n");
  const out = [];
  const isRow = (l) => /^\s*\|.*\|\s*$/.test(l || "");
  const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  for (let i = 0; i < lines.length; i++) {
    if (isRow(lines[i]) && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] || "")) {
      const head = cells(lines[i]);
      i += 2;
      const body = [];
      while (i < lines.length && isRow(lines[i])) body.push(cells(lines[i++]));
      i--;
      out.push(
        "<table><thead><tr>" + head.map((h) => "<th>" + h + "</th>").join("") +
        "</tr></thead><tbody>" +
        body.map((r) => "<tr>" + r.map((c) => "<td>" + c + "</td>").join("") + "</tr>").join("") +
        "</tbody></table>"
      );
    } else out.push(lines[i]);
  }
  return out.join("\n");
}

/* Minimal print-ready HTML. Deliberately plain: a contract that looks like a
   marketing page invites the reader to skim it. */
const html = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8">
<title>Order Form ${ref}</title><style>
@page{margin:20mm}
body{font:11.5pt/1.55 Georgia,'Times New Roman',serif;color:#111;max-width:170mm;margin:0 auto;padding:12mm}
h1{font-size:19pt;margin:0 0 4pt}h2{font-size:13pt;margin:20pt 0 6pt;border-bottom:1px solid #ccc;padding-bottom:3pt}
h3{font-size:11.5pt;margin:14pt 0 4pt}
table{border-collapse:collapse;width:100%;margin:8pt 0;font-size:10.5pt}
th,td{border:1px solid #bbb;padding:5pt 7pt;text-align:left;vertical-align:top}
th{background:#f2f2f2}
code{background:#f4f4f4;padding:1pt 3pt}
sub{color:#666}
ul{margin:6pt 0 6pt 16pt}li{margin:2pt 0}
@media print{body{padding:0}}
</style></head><body>
${mdTables(out)
  .replace(/^# (.*)$/gm, "<h1>$1</h1>")
  .replace(/^## (.*)$/gm, "<h2>$1</h2>")
  .replace(/^### (.*)$/gm, "<h3>$1</h3>")
  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>")
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/^- (.*)$/gm, "<li>$1</li>")
  .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
  .replace(/^---$/gm, "<hr>")
  .split("\n\n").map((p) => (/^\s*<(h[123]|ul|hr|table|sub)/.test(p) ? p : `<p>${p}</p>`)).join("\n")}
</body></html>`;

writeFileSync(join(outDir, `${stem}.html`), html, "utf8");

console.log(`Order Form ${ref}`);
console.log(`  ${join("contracts", "out", stem)}.md`);
console.log(`  ${join("contracts", "out", stem)}.html   <- upload this for signature`);
console.log(`  year one: ${gbp(yearOne)}`);
console.log(`  services: ${[audit && "audit", build && "build", callback && "callback", retainer && "retainer"].filter(Boolean).join(", ")}`);
