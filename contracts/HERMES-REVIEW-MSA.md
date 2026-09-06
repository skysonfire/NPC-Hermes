# ADVERSARIAL REVIEW — MSA CLAUSES 15–18 + contractingParty()

Scope: clauses 15–18 (new) in `src/app/msa/page.tsx`, renumbering of old 15/16 → 19/20,
`contractingParty()` in `src/lib/site.ts`, cross-references in the Order Form, DPA, Terms,
Voice Schedule, and the generated Order Form.

Current MSA numbering (verified against `msa/page.tsx`): 10 = Limitation of liability (L54),
11 = Indemnification (L58), 12 = Term and termination (L62), 13 = Suspension (L66),
14 = Data protection (L70), 15–18 new (L74–88), 19 = Force majeure (L90), 20 = General (L94).

---

## FINDINGS BY RANK

### BLOCKER

**B1. Clause 16 pointed at the wrong clause — clause 12, which contains no cap.**
As reviewed (and as quoted in the tasking), `msa/page.tsx` L79 read:
> "Nothing in this clause increases the liability caps in clause 12."

Clause 12 is **Term and termination** (`msa/page.tsx` L62). It contains no liability cap.
The cap is in clause 10, **Limitation of liability** (`msa/page.tsx` L54–55). The sentence
as reviewed was void: it disclaimed a cap-increase by reference to a clause that has no cap.

OBSERVATION, stated plainly: my first read of L79 during this review returned "clause 12";
three subsequent reads (search + two re-reads) returned "clause 10". The file was changed
mid-review, from the broken reference to the correct one. The current on-disk text
("liability caps in clause 10") is correct. **Verify the deployed/live page** — the fix is
on disk but the live site may still serve "clause 12", in which case the block stands.

**B2. The signed-instrument path names a provider that does not exist, in a document that
incorporates an MSA that names no provider at all.**
- Live generated Order Form, `contracts/out/NPC-2026-09-HOLMES.md` L21:
  `**Provider** | Example Provider Ltd, 1 Test Street, London, N1 1AA` — a fictional
  company, printed into a signable document (L225–226: signatory "A. Example", "Director").
- The same Order Form incorporates the MSA at L12–15 and L231, whose clause 1
  (`msa/page.tsx` L19) currently renders the party as
  `[NO CONTRACTING ENTITY SET — see src/lib/site.ts. This agreement cannot be executed
  until a legal party is named.]`.

Two documents in the same deal, one naming a fictitious London company, the other naming
nobody. A counterparty's solicitor reading both gets a contradiction, not a gap.
The generator's guard exists to prevent exactly this (`make-order-form.mjs` L131–151)
but its sentinel list (L140–142: `fill this in|tbd|todo|xxx+|tba|placeholder|\?+`) does
not catch plausible-looking fake names. The guard tests the string, not the fact.
`contracts/clients/EXAMPLE.json` is the source; until `provider.legalName` is a real
registered entity (or a real individual), the generator should refuse, not print.

### SHOULD FIX

**S1. Clause 16 insurance obligation is hollow — no sum, no floor, no trigger a court
could measure.** (`msa/page.tsx` L78–79)
"professional indemnity insurance **appropriate to the value and nature of the services**"
is a self-referential standard with no minimum. Consequences:
- No breach is provable for dropping cover from an adequate level to an inadequate one —
  the only stated triggers are that cover "lapses" or is "materially reduced" (L79),
  both subjective, and a reduction to an inadequate sum need not be a lapse.
- Client has no right to terminate or demand a sum; the only enforceable teeth are
  "evidence on written request, no more than once a year" (L79) — which also caps the
  client's inspection at one request a year.
- Nothing warrants that cover exists *today*; the obligation is prospective only.
A clause that cannot be breached is worse than no clause: it sells the client protection
and gives the provider false comfort. It needs a stated minimum (PI sum), a defined
minimum period of cover, and a client right on inadequate cover. As drafted: hollow.

**S2. Clause 17 severability qualifier does not work in England; and the clause's
enforceability runs through Dubai courts, not English courts.** (`msa/page.tsx` L82–83)
- "if a court finds any part of it too wide, that part applies as narrowly as needed to
  be enforceable" — English courts do not rewrite over-broad restraints; they enforce as
  written or not at all. The saving clause is decorative in England [?]; its only real
  value is as evidence of the parties' intent at the time of signing. Do not rely on it.
- The substantive scope is defensible: mutual, 12 months, limited to individuals
  "directly involved in that engagement", "knowingly", with a general-advertising carve-out
  and an own-initiative response carve-out. That is within the range commonly accepted for
  B2B staff non-solicits.
- The operative problem is elsewhere: clause 20 (`msa/page.tsx` L95) selects
  `${entity.country}` law and `${entity.courts}` — UAE / Dubai (`site.ts` L85–88). A UK
  counterparty's enforceability question is therefore a Dubai-court question, and the
  clause's "no wider than reasonable" formulation is an English-law habit imported into a
  non-English forum. Either the Order Form overrides the forum (the mechanism exists,
  clause 20 "unless an Order Form sets a different law or forum") or this clause is
  enforced under a law whose reasonableness doctrine is not the one the drafting assumes [?].

**S3. Clause 18 has a mediator-selection deadlock and no time limit.** (`msa/page.tsx` L86–87)
- "attempt mediation with a **mutually agreed** mediator before starting proceedings" —
  there is no fallback if the parties cannot agree a mediator. One party declining to
  agree stalls the clause indefinitely, and since the clause is a precondition to
  proceedings, the stall is a free option.
- The 14-day limit binds only the negotiation step (L87). Mediation itself is unbounded.
- "Neither step prevents … pursuing a genuinely undisputed debt" — "genuinely" is
  subjective, but the carve-out is directionally consistent with the common-law position
  that a good-faith dispute suspends the duty to pay, so a client withholding in genuine
  dispute can ride the process. That stall is real but bounded: clause 13 (suspension,
  L66–67) and clause 3 (L26–27, "If an invoice is overdue, Provider may suspend") are
  **not** conditioned on clause 18 — Provider keeps the suspension lever for an
  undisputed overdue invoice. So: no conflict with clause 13; the residual stall risk is
  the missing mediator fallback and the open-ended mediation window. Add: mediator
  appointed by a named body on request of either party if none agreed within X days;
  mediation concludes within Y days of first request.

**S4. Clause 15 permits a subcontractor category the DPA's authorisation list omits.**
(`msa/page.tsx` L74–75 vs `dpa/page.tsx` L34–35, L66–68)
- Clause 15 lists "hosting, telephony, **messaging**, and AI model providers" as
  standard subcontractor categories (L75).
- DPA Annex A (`dpa/page.tsx` L67) authorises: AI voice platform, telephony service,
  language-model provider, hosting provider. **No messaging/SMS category.**
- The Order Form's Missed-Call Callback (`ORDER-FORM-TEMPLATE.md` L97–129;
  `contracts/out/NPC-2026-09-HOLMES.md` L97–129) sends SMS via a Provider-supplied
  number — a messaging subprocessor handling caller phone numbers, i.e. personal data.
- It is not a hard conflict: DPA clause 5 (L35) authorises Provider "to replace or add
  subprocessors" with 30 days' notice and a client objection right, so the SMS gateway
  can be added lawfully. But the authorised list in Annex A understates the actual
  subprocessor set the MSA and Order Form both assume, and Annex A's entries still
  carry literal `[region]` placeholders (L67) — an incomplete authorisation annex in a
  signable document. Harmonise Annex A with clause 15's list and fill the regions.

**S5. contractingParty() renders a developer instruction onto a public page.**
(`site.ts` L113–126, rendered at `msa/page.tsx` L19)
With `entity.registered = false` and `principalName = ""` (site.ts L54, L69), the live
`/msa` page clause 1 reads:
> "This Master Services Agreement ("MSA") is between [NO CONTRACTING ENTITY SET — see
> src/lib/site.ts. This agreement cannot be executed until a legal party is named.]
> ("Provider") and the client named in the applicable Order Form…"

Assessment, stated as judgment:
- Against the *previous* behaviour (clause 1 rendered `entityLine()` → the bare trading
  name "NPC Protocol"), the marker is **better, not worse**: a grammatically complete
  sentence naming nobody is a silent misrepresentation; a loud marker at least makes the
  incompleteness visible to the drafter. Failing loudly in a contract is the right
  instinct.
- But on a **public sales page** the marker is the wrong artefact. It is an instruction to
  the operator ("see src/lib/site.ts") — an internal file path printed where a
  counterparty reads — and it publicly discloses the exact blocker that
  `contracts/NOTES-BEFORE-USE.md` §1 (L9–29) says to keep off the table: no registered
  entity, no named individual. The old text hid the defect; the new text advertises it.
- No other leakage: `contractingParty()` is imported only by `msa/page.tsx` (L2) and
  used only at L19. `privacy/page.tsx` L17 and `terms/page.tsx` L90 use `entityLine()`,
  which degrades to "NPC Protocol" (no marker). `sitemap.ts`, `layout.tsx`, `robots.ts`,
  `llms.txt/route.ts` use only `siteUrl`/`site` — no entity rendering. The marker appears
  exactly once, on `/msa`.
- The codebase already contains the predicate for the correct fix, unused:
  `entityComplete` (`site.ts` L91–94) is exported and referenced nowhere else. The
  `/msa` page (or at minimum its clause 1) should be gated on it — or the page should
  say the agreement is available on request — rather than printing an internal
  instruction. And the "src/lib/site.ts" reference should not appear in any string that
  can render publicly.

### NICE TO HAVE

**N1. Order Form clause references all survive renumbering — verified, no stale hits.**
Every MSA clause reference in live documents points below 15 and is unaffected:
- `ORDER-FORM-TEMPLATE.md` L31 (clause 5), L63 (clause 6), L89 (clause 7), L159
  (clause 3), L164 (clause 3), L178 (clause 4), L184 (clause 5).
- `contracts/out/NPC-2026-09-HOLMES.md` L31, L63, L89, L159, L164, L178, L184 — same set.
- `contracts/NOTES-BEFORE-USE.md` L41: "clause 20 already permits 'unless an Order Form
  sets a different law or forum'" — clause 20 is now General (L94–95) and does contain
  exactly that text. Correct under the **new** numbering.
- `contracts/SIGNING-WORKFLOW.md` L148: clause 5 — correct.
- No live document references old clause 15 (force majeure) or old clause 16 (general) by
  number anywhere. The Terms, DPA, and Voice Schedule pages contain no MSA clause numbers
  at all (DPA L63 references "the limitation of liability in the MSA" without a number).

**N2. `contracts/out/NPC-2026-09-HOLMES.md` L63 (and template L63): "receipt of the intake
information at clause 6."** Ambiguous between Order Form §6 (Client responsibilities,
L193–199/L194–200, where the intake items are listed) and MSA clause 6 (Client
responsibilities, `msa/page.tsx` L38–39). Both point at the same substance, so nothing is
broken — but the Order Form uses "section" for its own numbering everywhere else
("section 2", "section 8"), making "clause 6" an unexplained term in a client document.
Say which one.

**N3. `contracts/HERMES-REVIEW.md` L18: "MSA c1/c16".** Historical review written against
the old numbering, where c16 = General (governing law). Under the new numbering c16 =
Insurance (`msa/page.tsx` L78–79). Anyone re-reading that review today will mislocate the
governing-law clause. Historical artefact; the current MSA clause 20 is the right target.

**N4. DPA objection right has no consequence.** (`dpa/page.tsx` L34–35) Client "may
object on reasonable data-protection grounds" — and then nothing: no mechanism to block
the addition, no termination right for the affected part, no cost allocation. Pre-existing
gap, made more visible by clause 15's "Client's rights and remedies … are unaffected"
(L75), which promises rights without saying what they do.

**N5. Clause 13 vs clause 18 interaction is untested for the disputed-invoice case.**
Provider suspends under clause 13 (L66–67) for "a payment failure" while the client runs
the clause 18 process over the same invoice: clause 13 requires a "reasonable, good-faith
concern" (L67), and suspending over a genuinely disputed invoice may fail that test [?].
The clauses do not contradict — clause 18 never stays suspension — but the interplay is
undefined. One sentence in clause 18 (suspension of an undisputed overdue invoice is
unaffected by this process) would close it.

---

## ANSWERS TO THE SEVEN QUESTIONS

**1. Renumbering breakage.** One live hit, in the new text itself: clause 16's reference
to "clause 12" (L79 as reviewed) pointed at Term and termination, not the limitation of
liability (clause 10, L54). It is now "clause 10" on disk (changed mid-review — see B1);
verify the live page. Every other MSA clause reference in every live document
(Order Form template L31/63/89/159/164/178/184; generated OF L31/63/89/159/164/178/184;
NOTES-BEFORE-USE L41/60/65; SIGNING-WORKFLOW L148) points at clauses 3–7 or the new
clause 20, all of which resolve correctly under the new numbering. No other stale
reference exists. The only number that moved (old 15/16 → 19/20) is referenced by number
nowhere in a live document.

**2. Clause 15 vs the DPA.** No direct conflict: clause 15 expressly defers to the DPA
where personal data is processed ("the Data Processing Addendum governs and the
subprocessor terms in it apply", L75), and that matches the precedence stack (DPA >
Order Form > MSA, `dpa/page.tsx` L18). Gaps: (a) clause 15 lists "messaging" as a
standard subcontractor category, the Order Form's callback service uses one, and DPA
Annex A omits it — S4; (b) Annex A's authorisation entries still contain `[region]`
placeholders — L67; (c) the DPA's client objection right has no stated consequence — N4.
There is no case where the MSA permits what the DPA forbids or vice versa; the overlap is
a mismatch in the authorised list, not a contradiction.

**3. Clause 16 insurance.** Clause 12 is **not** the limitation-of-liability clause —
it is Term and termination (L62). The cap sits in clause 10 (L54). The reference as
reviewed ("clause 12") was therefore void; it reads "clause 10" on disk now — B1.
Substance: an obligation with no stated sum, no minimum, no objective trigger, and no
client remedy on inadequate cover is hollow — S1.

**4. Clause 17 non-solicitation.** Scope and duration are defensible for a UK B2B
counterparty: mutual, 12 months, limited to individuals "directly involved in that
engagement", "knowingly", with general-advertising and own-initiative carve-outs — within
the range English courts commonly accept. The "applies as narrowly as needed" qualifier
does not work as a narrowing mechanism in England — courts do not rewrite over-broad
restraints; it is evidence of intent at best [?] — S2. The decisive issue is that the
clause will be construed under the MSA's chosen forum, which is Dubai (clause 20, L95),
so its "UK enforceability" is a function of the forum question the Order Form must
resolve, not of the clause's own words.

**5. Clause 18 disputes.** No conflict with clause 13 (suspension) or clause 3 (payment):
neither is conditioned on the dispute process, so Provider keeps suspension and late-fee
levers for an undisputed overdue invoice, and the "genuinely undisputed debt" carve-out
(L87) is consistent with the common-law treatment of a good-faith dispute. A client
cannot use clause 18 to *block* suspension, only to delay a *claim* — and even that delay
is bounded if a mediator fallback and a time limit existed. They do not: no fallback if
the parties cannot agree a mediator, no time limit on mediation, and "genuinely" is
subjective — S3. As drafted, a client who declines to agree a mediator stalls the clause
without breaching it.

**6. contractingParty().** The marker is the better failure mode *as a contract
behaviour* — a silent "NPC Protocol" was a false complete sentence, and the marker makes
the gap visible to the drafter. It is the wrong failure mode *on a public page*: it prints
an internal file path ("see src/lib/site.ts") and publicly discloses the missing-entity
blocker that `NOTES-BEFORE-USE.md` §1 says must be resolved before the first paid Order
Form. No other page, the sitemap, or the metadata renders the marker — it appears exactly
once, at `msa/page.tsx` L19 (verified by import search: `contractingParty` is used
nowhere else; `entityLine()` on privacy/terms degrades to the trading name, not the
marker). `entityComplete` (site.ts L91–94) exists and is referenced nowhere — it is the
unused gate this needs. S5.

**7. Contradictions elsewhere.**
- The generated Order Form names "Example Provider Ltd" (B2) while the MSA it
  incorporates names no one — the sharpest live contradiction, and it is in a
  signable-format document.
- Clause 15's "messaging" category vs DPA Annex A's omission of it — S4.
- Clause 17/18 drafted to English-law assumptions while clause 20 (L95) selects
  UAE law and Dubai courts — S2/S3; the clauses are not internally contradictory, they
  are each other's wrong jurisdiction.
- Nothing in the four new clauses contradicts the Terms page, the DPA's substantive
  obligations, or the Voice Schedule. The Terms page's own clauses (liability cap at
  L73–74, suspension at L81–82, force majeure at L85–86) mirror MSA clauses 10, 13 and 19
  without numbering them, so the renumbering did not touch them.

---

## VERIFICATION NOTES (what I checked, what I could not)

- Read in full: `msa/page.tsx`, `site.ts`, `dpa/page.tsx`, `terms/page.tsx`,
  `voice-services/page.tsx`, `ORDER-FORM-TEMPLATE.md`, `contracts/out/NPC-2026-09-HOLMES.md`,
  `make-order-form.mjs`, `NOTES-BEFORE-USE.md`, `SIGNING-WORKFLOW.md` (L148 context),
  `HERMES-REVIEW.md` (references only), `privacy/page.tsx` (entity usage),
  `clients/EXAMPLE.json` (reference pattern only).
- Searched: every `clause N` occurrence repo-wide (excluding third-party `pitch/` text),
  every import from `@/lib/site`, every use of `contractingParty`/`entityLine`/
  `entityComplete`, and alternative cross-reference phrasings (§, "pursuant to", "per
  clause", "section 1x").
- Not checked: the deployed site at npcprotocol.com (no browser tool in this session) —
  which is exactly why B1 says "verify the live page". `clients/EXAMPLE.json` was not
  read line-by-line; the HOLMES output was used as its materialised form.
- Marked [?] where the answer depends on a jurisdiction's case law I will not assert
  from memory: English judicial rewriting of restraints (S2), UAE construction of
  non-solicits and the mediation clause (S2/S3), good-faith dispute vs suspension
  (N5).
