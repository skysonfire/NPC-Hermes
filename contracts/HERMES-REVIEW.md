# ADVERSARIAL REVIEW — NPC Protocol Contract Set

Reviewed against the live source (MSA/DPA/Voice Schedule as rendered from
`src/app/*/page.tsx`, `src/lib/site.ts`) and the generated example
(`contracts/out/NPC-2026-09-HOLMES.{md,html}` + `contracts/clients/EXAMPLE.json`).
Purpose: find what is WRONG. Not legal advice; findings are the specific things
to point a solicitor at.

Legend: BLOCKER = do not send to a client. SHOULD FIX = fix before volume.
NICE TO HAVE = polish. `[?]` = legal point I am not asserting.

---

## RANKED SUMMARY

| # | Rank | Finding | Where |
|---|------|---------|-------|
| 1 | BLOCKER | Provider is not a legal person; MSA picks UAE law + Dubai courts for a UK client | MSA c1/c16, site.ts, OF §1 |
| 2 | BLOCKER | Generator emits literal "FILL THIS IN" into the client doc; the "refuses unfilled fields" guard is defeated | make-order-form.mjs, out/*HOLMES.md:15,197 |
| 3 | BLOCKER | The HTML signing document is malformed: all tables render as raw pipe text; lists are fragmented | out/*HOLMES.html:23-28,37-47,125-131,168-173 |
| 4 | SHOULD FIX | Acceptance period: OF says 5 working days, MSA says 10 business days — live override that shortens the Client's window | OF §4 vs MSA c4 |
| 5 | SHOULD FIX | OF footer incorporates the AI Voice Schedule "where section 2.3 applies" — but §2.3 is the SMS callback, not the AI voice front-desk | OF footer vs Voice c1 |
| 6 | SHOULD FIX | DPA subject-matter list omits the callback/SMS service the OF incorporates the DPA for | DPA c2 vs OF §2.3 |
| 7 | SHOULD FIX | Callback "response not marketing" (PECR) position is assumed, not supported by the drafting | OF §2.3 |
| 8 | SHOULD FIX | No insurance clause anywhere | MSA/DPA/OF (absent) |
| 9 | SHOULD FIX | No general subcontracting clause (only data subprocessors) | MSA (absent), DPA c5 |
| 10 | SHOULD FIX | No dispute escalation; MSA jumps straight to Dubai courts | MSA c16 |
| 11 | SHOULD FIX | "Year one total" reads as fixed but MSA c3 allows price increases on 30 days' notice | OF §3 vs MSA c3 |
| 12 | NICE TO HAVE | Callback termination mechanics (forwarded number, suppression list) unaddressed | OF §3 vs MSA c12 |
| 13 | NICE TO HAVE | Non-solicitation absent | (absent) |
| 14 | NICE TO HAVE | Publicity/reference right sits in MSA c7 (opt-out) but is invisible in the OF | MSA c7 |
| 15 | NICE TO HAVE | Generator hard-codes GBP; overage is free text; DATE is generation date | make-order-form.mjs |

Q2 (defined terms) and Q3 (controller allocation) are largely CLEAN — details below.

---

## Q1 — CONTRADICTIONS (live, because OF overrides MSA)

### 1.1 Acceptance period — 5 vs 10 days  [SHOULD FIX]
Same parameter, two values, OF wins.

- Order Form §4 (template L166; example L160):
  > "Deliverables are deemed accepted **5 working days** after delivery unless the Client notifies the Provider…"
- MSA clause 4 (msa/page.tsx L31):
  > "Client has **ten (10) business days** to accept it or raise defects in writing… If Client does not respond within that window, the deliverable is deemed accepted."

This is the override working as designed, but it is a live contradiction that
**halves the Client's defect-notice window** versus the MSA text the Client may
have read. A Client who signs believing it has 10 days is bound to 5. Either
harmonise, or make the override explicit in §4 ("notwithstanding clause 4 of the
MSA…").

### 1.2 Provider identity — two different names, neither a legal person  [BLOCKER]
- MSA clause 1 (msa/page.tsx L19), rendered with `entityLine()` →
  > "This Master Services Agreement ("MSA") is between **NPC Protocol** ("Provider") and the client…"
- Order Form §1 (out/*HOLMES.md L15):
  > "| **Provider** | **FILL THIS IN** — see NOTES-BEFORE-USE.md §1, FILL THIS IN |"

The MSA's Provider and the OF's Provider are different strings, and neither is a
registered legal person (`site.ts`: `registered:false, legalName:""`). See Q6.

### 1.3 Mis-incorporation of the AI Voice Schedule  [SHOULD FIX]
- Order Form footer (template L208-211; example L203-206):
  > "…and — **where section 2.3** or an AI voice service applies — the AI Voice Services Schedule (…/voice-services)."
- Voice Schedule clause 1 (voice-services/page.tsx L18):
  > "This AI Voice Services Schedule applies to the NPC Protocol **AI front-desk** — the automated assistant that answers calls…"
- Order Form §2.3 header (L97): "### 2.3 **Missed-Call Callback** — recurring"

Section 2.3 is an SMS-on-no-answer service, not the AI voice front-desk. The
footer therefore pulls the Voice Schedule (AI disclosure, call recording, human
escalation, inbound-only voice rules) into a contract for a service that has no
"assistant," no recorded voice call, and no human-escalation path. That is an
over-broad, mismatched incorporation a solicitor will flag. It should read "where
the **AI voice front-desk** applies," not "where section 2.3 applies."

### 1.4 DPA scope vs the service it is incorporated for  [SHOULD FIX]
- DPA clause 2 (dpa/page.tsx L22):
  > "The subject matter is the personal data needed to deliver the services: **websites, lead capture and qualification, the AI voice front-desk, and AI-visibility work.**"
- Order Form §2.3 (L118-120):
  > "The Provider acts as **processor under the Data Processing Addendum** … which is incorporated into this Order Form."

The OF makes the DPA the processor contract for the **missed-call callback /
outbound SMS** service, but the DPA's own subject-matter list never names that
service (no "missed-call," "callback," "SMS," or "outbound text"). The DPA is
service-agnostic in c1 ("whenever Provider processes personal data…"), so it
arguably still applies — but a counterparty solicitor will point at c2's list and
ask why the callback isn't in it. Add the callback service to DPA c2 (or to
Annex A), or confirm in writing that c1's general language covers it.

### 1.5 "Year one total" vs the MSA's price-increase right  [SHOULD FIX]
- Order Form §3 (L150): "> **Year one total** | **£10,000**"
- MSA clause 3 (msa/page.tsx L27):
  > "Provider may **adjust pricing for future recurring periods** on thirty (30) days' written notice."

The £10,000 figure assumes the recurring fees (callback £79/mo, retainer
£421/mo) hold for 12 months, but the incorporated MSA lets the Provider raise
them on 30 days' notice. A Client can reasonably read "Year one total" as a fixed
sum or a cap; it is neither. State that the figure is subject to MSA c3, or
delete the word "total."

Note: the items the OF *does* restate agree with the MSA (payment 14 days = MSA
c3; termination notice 30 days = MSA c12). No contradiction there.

---

## Q2 — DEFINED TERMS  [CLEAN, minor notes]

The OF's load-bearing terms are all defined upstream:
- **Provider / Client** — defined in MSA c1 ("Provider… the client named in the
  applicable Order Form ('Client')").
- **MSA** — defined in the OF header (L12-14: "…the Master Services Agreement
  between the parties (the 'MSA')…").
- **Order Form** — the document itself; MSA c1-2 define it.
- **data controller / processor** — not defined in the OF, but defined by the
  incorporated DPA (c1) and by UK GDPR; acceptable by incorporation.

No term is used and left genuinely undefined in a way that creates legal
ambiguity. Two *descriptive* terms are undefined but are not legal terms and do
not need to be: **"answer engines"** (OF §2.1) and **"intake"** (OF §2.1, "agreed
at intake"). NICE TO HAVE to footnote them.

One real Q2 issue is the **Provider name mismatch in 1.2** — the OF's
`{{PROVIDER_LEGAL_NAME}}` does not match the MSA's `entityLine()` output, so the
two documents define "Provider" differently. That is the term-level face of the
BLOCKER in 1.2/Q6.

---

## Q3 — THE DATA-CONTROLLER LINE  [ALLOCATION AGREES; real risk is elsewhere]

- Order Form §2.3 (L118-120):
  > "**The Client is the data controller** for the personal data of its callers. The Provider acts as **processor** under the Data Processing Addendum…"
- DPA clause 1 (dpa/page.tsx L18):
  > "…For this purpose **Client is the controller** (or, where Client is itself a processor, the party upstream) **and Provider is the processor**."

**They agree.** Client = controller, Provider = processor. The DPA does *not*
assume a different allocation, so the "serious defect" the question hypothesises
is not present on the controller/processor split. MSA c14 is consistent too
("Where Client is the controller of its customers' data and Provider is the
processor, the DPA sets the processor obligations…").

Two nuances to hand the solicitor rather than assert:
1. The DPA's parenthetical — "(or, where Client is itself a processor, the party
   upstream)" — contemplates the Client being a **processor** (e.g. a franchisee
   or agent acting for a principal). The OF's flat "Client is the data
   controller" does not address that case. `[?]` Low likelihood for a direct
   tradesman client, but the mismatch is real.
2. The **actual** legal risk in §2.3 is not the controller/processor split (which
   is sound) but the **PECR "is this marketing?" question**, which *neither* the
   DPA nor the MSA addresses at all. The DPA is a data-protection instrument; it
   says nothing about whether the SMS is a "commercial message" under PECR reg 22.
   That gap is Q5. The controller line is the least of §2.3's problems.

The "suppression cannot be reversed by the Client" line (OF §2.3) is a *strong*
opt-out and is defensible; NOTES-BEFORE-USE.md §4 already flags it. Not a new
finding.

---

## Q4 — MISSING CLAUSES (vs a UK B2B services Order Form)

Checked each item the task named:

| Clause | Status | Where |
|--------|--------|-------|
| Liability cap | PRESENT via MSA, not in OF | MSA c10 |
| Insurance | **ABSENT everywhere** | — |
| Subcontracting (general) | **ABSENT** (data subprocessors only) | DPA c5/Annex A |
| Non-solicitation | **ABSENT** | — |
| Publicity / use as reference | PRESENT via MSA (opt-out), invisible in OF | MSA c7 |
| Dispute escalation | **ABSENT** (straight to Dubai courts) | MSA c16 |
| Suspension for non-payment | PRESENT via MSA | MSA c13 |
| Data/site on termination | PRESENT generally (MSA c12, DPA c11); **callback mechanics absent** | OF §3 |

Detail on the real gaps:

- **Insurance — ABSENT [SHOULD FIX].** None of the MSA, DPA, or OF requires or
  discloses professional-indemnity / tech E&O / public-liability cover. A
  Provider selling builds + AI voice + telephony/SMS to UK SMBs should carry PI
  and E&O, and the contract should at least disclose it. Its total absence is a
  gap a client's broker will ask about.
- **Subcontracting — ABSENT [SHOULD FIX].** DPA c5 + Annex A cover **data**
  subprocessors (AI voice platform, telephony, LLM, hosting). But there is no
  general right to subcontract non-data work, and no flow-down of non-data
  obligations. Annex A *reveals* the Provider runs on third-party telephony/LLM
  infra, yet the MSA never grants the right to use it. Add a general
  subcontracting clause.
- **Dispute escalation — ABSENT [SHOULD FIX].** MSA c16 (L79) goes
  > "…disputes subject to **the courts of Dubai, United Arab Emirates**, unless an Order Form sets a different law or forum."
  No negotiation → mediation → arbitration ladder, and the default forum is
  Dubai. For a £10k UK dispute that is the worst of both worlds. See Q6.
- **Publicity — PRESENT but buried [NICE TO HAVE].** MSA c7 (L43):
  > "Provider may use the work in its portfolio and marketing **unless Client opts out in writing**."
  It is an opt-out the Client never sees in the Order Form. Not a defect, but a
  Client's counsel will want it surfaced (or the OF should state the Client has
  been told).
- **Liability cap / suspension — PRESENT via MSA [OK].** MSA c10 cap
  ("…capped at the fees Client paid or owed… in the twelve (12) months…") with
  carve-outs for confidentiality, IP indemnity, gross negligence/willful
  misconduct; MSA c13 suspension for payment failure. The OF is silent, so the
  MSA governs. Fine, but the OF never tells the Client a cap exists.
- **Termination mechanics — PARTIAL [NICE TO HAVE].** MSA c12 (L63) covers
  return/delete of data + handover of paid deliverables; DPA c11 (L59) covers
  delete/return of personal data; OF §2.2 gives the Client ownership of the
  site. But **nothing says what happens to the callback-specific assets on
  termination**: the conditional call-forwarding setting on the Client's line,
  the Provider-supplied SMS number, and the accumulated **suppression list**
  (who has opted out). On a §2.3 wind-down, who removes the forwarding, who
  keeps the suppression list, and who deletes it is unaddressed. Add a
  §2.3-termination line.

---

## Q5 — THE CALLBACK / PECR SECTION (2.3)  [SHOULD FIX]

The service is an **outbound SMS** triggered by a no-answer. Its legality rests
on it being a *response to an inbound enquiry*, not a "commercial message" under
PECR reg 22. The drafting **assumes** that position without supporting it:

1. **The exact message text is not fixed.** OF §2.3 (L104-105) only says the
   text is "identifying the Client and inviting a reply." It does not pin the
   wording. The "response not marketing" position lives or dies on the actual
   message, which is outside the contract. "Inviting a reply" is fine; the same
   sentence structure could carry "…or claim 10% off" and become marketing.
   Fix the template message in the OF (or an annex) and make deviation a breach.
2. **No legal basis is stated.** The OF asserts "The message is a response to a
   call the recipient placed" (L112) but never says *why that matters legally*
   (PECR reg 22 / response-to-enquiry). A unilateral assertion by the Provider,
   with no shared statement of the lawful basis, is weak if challenged.
3. **The duty is mis-allocated.** L113: "It must **not be altered** to carry any
   offer, promotion or marketing content." But the message is authored and sent
   **by the Provider** ("sent from a number supplied by the Provider," L108).
   The clause polices the *Client* ("must not be altered") while the *Provider*
   writes the message. The party that actually controls the content should
   warrant it is non-marketing; instead the restriction sits on the party that
   doesn't write it.
4. **An unenforceable technical promise.** L114: "The Provider's systems will
   **refuse to send** a message containing such content." "Such content" is
   undefined, and there is no defined mechanism. This reads as a guarantee of a
   content filter that may not exist. Either specify the control or delete it.

Net: the contractual language **does not** currently support the response
position — it asserts it. The position is defensible in fact (a text saying
"we couldn't get you, call back" to someone who just called in is a
transactional response), but the OF should (a) fix the message text, (b) state
the lawful basis, (c) put the non-marketing warranty on the Provider, and (d)
drop or specify the "systems will refuse" line. `[?]` Final classification of the
SMS under PECR is a solicitor's call; this is the drafting that will be tested.

---

## Q6 — ENFORCEABILITY / ENTITY  [BLOCKER]

**The facts (site.ts L47-77):**
> `registered: false`, `legalName: ""`, `licenceNumber: ""`, `address: ""`,
> `country: "United Arab Emirates"`, `courts: "the courts of Dubai, United Arab Emirates"`.

`entityLine()` (L88-98) therefore returns only the trading name **"NPC Protocol"**
on the MSA. **How bad, for a £10k/yr UK contract:**

1. **No legal counterparty.** The Provider is "NPC Protocol" (a trading name) or
   "FILL THIS IN" (the OF). A contract must be with a legal person. As drafted it
   is with a name — which in practice means *you, personally*, with unlimited
   personal liability and no corporate shield, or with a Meydan FZ-LLC that does
   not yet exist. A client's solicitor will ask "who exactly are we contracting
   with?" and "NPC Protocol" is not an answer (NOTES-BEFORE-USE.md §1 says the
   same).
2. **Foreign law + foreign forum on a UK client.** MSA c16 (L79):
   > "This MSA is governed by the laws of **United Arab Emirates**, with disputes subject to **the courts of Dubai**…"
   For a £10k UK dispute, Dubai is a forum nobody will actually use — too
   expensive to enforce, and a UK client (especially a sole trader) may have the
   clause struck as unfair. You are left either litigating in England (where the
   UAE-law clause may not be given effect) or chasing a Dubai judgment for less
   than the cost of the flight. It is a hard sell and a weak enforcement
   position.

**Cheapest correct fix (two parts, both cheap):**
- **(a) Forum/law — near-free.** The MSA already has the override you need:
  > "…unless an **Order Form sets a different law or forum**." (MSA c16, L79)
  Add one clause to every UK Order Form: *"This Order Form is governed by the
  laws of England and Wales, and disputes are subject to the exclusive
  jurisdiction of the courts of England and Wales."* That alone makes the
  contract enforceable in a forum the client will accept. This is the single
  cheapest fix.
- **(b) Counterparty — required companion.** Either (i) register the Meydan
  entity and fill `entity.legalName / licenceNumber / address`, set
  `registered: true`, so the Provider is a real legal person; or (ii) if that is
  not happening before the first signature, **contract in your personal name and
  say so plainly** in §1 (full name, individual, address). Do not leave it as a
  trading name. (a) + (b) together is the correct, cheap package; (a) without
  (b) leaves the "who is the Provider" hole open.

---

## Q7 — THE GENERATOR (make-order-form.mjs)

**Arithmetic — VERIFIED CORRECT.**
`yearOne = audit(1500) + build(2500) + callback(79×12=948) + retainer(421×12=5052)`
= **10,000**, rendered "£10,000" (out/*HOLMES.md L144). Deposit (1,250) is a
timing split of the 2,500 build fee, not double-counted. **The year-one total is
right.** (Its *label* is the issue — see 1.5.)

Real defects:

1. **"FILL THIS IN" defeats the fail-loudly guard [BLOCKER].**
   The guard (L133-141) only rejects `undefined / null / ""`:
   > `const blanks = Object.entries(values).filter(([, v]) => v === undefined || v === null || v === "").map(...)`
   But `EXAMPLE.json` ships the provider fields as the **non-empty strings**
   `"FILL THIS IN — see NOTES-BEFORE-USE.md §1"` and `"FILL THIS IN"`. Those pass
   the check, so the generator **emits them** — confirmed in the output
   (out/*HOLMES.md L15 and L197: "FILL THIS IN"). SIGNING-WORKFLOW.md L69-71
   promises "the generator **refuses to output a document with any unfilled
   field**." It does not. A client-facing contract reading "Provider: FILL THIS
   IN" is exactly the "evidence nobody read it before sending" the guard exists
   to prevent. Fix: treat a sentinel list (`FILL THIS IN`, `TBD`, `TODO`, …) as
   blank, and/or require the provider block to come from `site.ts`/entity, not
   the client JSON.

2. **HTML tables are not rendered [BLOCKER].** The converter (L175) is a no-op:
   > `.replace(/^\|(.*)\|$/gm, (m) => m) // tables handled below`
   …but nothing below handles tables. The `.split("\n\n")` wrapper then dumps the
   whole pipe block into a `<p>`, so the browser collapses the newlines and shows
   literal pipes. Confirmed in the **signing HTML** (out/*HOLMES.html):
   - Parties table L23-28: `<p>| | | … | <strong>Provider</strong> | FILL THIS IN …`
   - **Fees table L125-131**: `<p>| Item | Fee | When | … | <strong>Year one total</strong> | <strong>£10,000</strong> | |</p>`
   - Signature table L168-173: `<p>| Provider | Client | …`
   The **fee table — the core commercial term — is a run-on string of pipes** in
   the very document the client e-signs. The CSS even has `table/th/td` rules
   (L7-9) that are never used. This is a BLOCKER for the signing path.

3. **HTML lists are fragmented [BLOCKER, same root cause].** The `<li>`/`<ul>`
   regex (L179-180) only converts lines that *start* with `- `. Multi-line
   bullets whose second line is indented continuation text are split: the
   continuation leaks **outside** the list. Confirmed (out/*HOLMES.html L37-41):
   > `<ul><li>Citation checks across five engines: ChatGPT, Gemini, Perplexity, Copilot,</li></ul>  and Google AI Overviews.`
   Every wrapped bullet in §2.1/§2.2/§2.3/§2.4/§5 does this (L37-47, 62-71,
   94-107, 113-119, 149-156). Sentences are severed and orphaned text sits
   between broken `<ul>` blocks. A client reading the HTML sees mangled scope
   lists.

4. **Currency hard-coded to GBP [NICE TO HAVE].** `gbp()` (L40-43) always formats
   `currency: "GBP"`. Fine for UK clients; a silent assumption if any fee is ever
   intended in another currency.

5. **Overage is free text, not currency-formatted [NICE TO HAVE].**
   `OVERAGE_RATE: s.callback.overage` (L109) passes the raw string `"6p"`
   (EXAMPLE.json L31) straight through, bypassing `gbp()`. Works today, but
   inconsistent with every other fee and will render a bare number if someone
   puts `0.06` there.

6. **`DATE` is the generation date, not configurable [NICE TO HAVE].**
   `const today = new Date()` (L45) → the OF "Date" is always the day it is
   generated (L71 `DATE: dateLong`), not the signature date. If generated on the
   6th and signed on the 20th, the document says the 6th. Minor, but it is the
   date a court looks at.

7. **Banner-strip regex is brittle [NICE TO HAVE].** L144:
   > `out.replace(/^# ORDER FORM\n\n\*\*This is a commercial draft[\s\S]*?---\n\n/, …)`
   Works against the current template but will silently stop matching (and leave
   the internal "Do not send" banner in the client doc) the moment the banner
   wording changes. Low priority; note it.

---

## WHAT TO HAND THE SOLICITOR, IN ORDER

1. **Entity + governing law/forum** (Q6 / 1.2) — the whole set is unenforceable
   as drafted against a UK client.
2. **The generated HTML** (Q7.2/Q7.3) — the document the client signs has broken
   fee table and mangled scope lists.
3. **"FILL THIS IN" in the output** (Q7.1) — the safety guarantee is false.
4. **Callback/PECR drafting** (Q5) — fix message text, state the basis, put the
   non-marketing warranty on the Provider.
5. **DPA scope + Voice Schedule mis-incorporation** (1.3/1.4) — the two
   incorporated documents don't actually cover §2.3 as written.
6. **Acceptance 5-vs-10** (1.1) — decide which window is intended.
7. **Insurance, subcontracting, dispute escalation** (Q4) — the three clauses a
   UK B2B form expects and this set lacks.
