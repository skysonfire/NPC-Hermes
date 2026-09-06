# BEFORE YOU SEND ANY OF THIS TO A CLIENT

Written 2026-09-06. **None of this is legal advice and none of it has been
reviewed by a solicitor.** It is a commercial draft to take *to* one, which is
cheaper than asking them to start from nothing.

---

## 1. THE BLOCKER — you have no contracting entity

`src/lib/site.ts` has `entity.registered = false`, `legalName = ""`,
`licenceNumber = ""`, `address = ""`.

So `entityLine()` currently renders the Provider in the MSA as the bare words
**"NPC Protocol"**. That is a trading name, not a legal person. Consequences:

- **You are personally liable.** With no company between you and the client,
  the contract is with you as an individual. The limitation-of-liability clause
  in the MSA limits the amount; it does not put a company in the way.
- **The counterparty is ambiguous.** A client's own solicitor will ask who
  exactly they are contracting with, and "NPC Protocol" is not an answer.
- **The governing-law clause reads oddly.** The MSA specifies UAE law and Dubai
  courts. A UK trade signing a £10k/year agreement, enforceable only in Dubai,
  against an entity that does not exist, is a hard sell and arguably unfair
  under UK consumer-facing rules if the client is a sole trader.

**Fix before the first paid Order Form**, not after. Either register the Meydan
entity and fill in `entity.*`, or contract personally and say so plainly. The
one thing not to do is leave it ambiguous.

## 2. Governing law needs a decision

Your clients are in the UK. Your entity is intended to be in the UAE. The MSA
currently picks UAE law and Dubai courts for everything.

Three options, and this is a question for a solicitor, not for me:

1. **UAE law throughout.** Simplest for you, hardest to sell, and practically
   unenforceable for a £10k dispute — nobody flies to Dubai over that.
2. **England and Wales for UK clients.** Easier sale, and the Order Form can
   override the MSA (clause 16 already permits "unless an Order Form sets a
   different law or forum"). The mechanism is already there.
3. **Split**: UAE as the default, England and Wales named in every UK Order
   Form. Probably where you land.

Note the MSA has already anticipated this — the override clause exists. It just
has never been used.

## 3. What is missing beyond the Order Form

| Document | Status | Needed when |
|---|---|---|
| MSA | Exists at `/msa` | — |
| DPA | Exists at `/dpa` | — |
| AI Voice Schedule | Exists at `/voice-services` | — |
| Terms / Privacy | Exist | — |
| **Order Form** | **Written today** | Every engagement |
| **Callback service schedule** | Folded into Order Form §2.3 | If callback is sold standalone at volume, split it out |
| **Proposal / quote** | Missing | Pre-signature. Not a contract — do not let it read like one |
| **Change order** | Missing | MSA clause 5 references changes; there is no form for them |
| **Subprocessor list** | DPA Annex A exists — check it is current | Before any client asks |

The change-order gap is the one that will bite. Scope creep on a fixed-price
build is the classic way a productised offer stops being profitable, and MSA
clause 5 has no artefact behind it.

## 4. Specific things in the Order Form a solicitor should look at

- **§2.3 data-controller allocation.** I have put the Client as controller for
  caller data and you as processor under the DPA. That is the orthodox reading,
  but it is the single most consequential line in the document and it should be
  confirmed rather than assumed.
- **§2.3 "suppression cannot be reversed by the Client."** Deliberate — an
  opt-out the client can undo is not an opt-out. Confirm this is enforceable as
  drafted and that it does not conflict with the client's own controller
  obligations.
- **The callback message being a response rather than marketing.** The whole
  PECR position rests on this. It is enforced in code (`assertNotMarketing`),
  but the contractual language should match the technical reality.
- **"Deemed accepted after N days."** Common and generally fine in B2B, worth a
  check.
- **No guaranteed outcomes (§2.1).** Already strong. Make sure it survives
  contact with a keen salesperson.

## 5. Practical points

- **Never quote fees anywhere except the Order Form.** The moment a price
  appears in an email, a proposal and an Order Form with different numbers, the
  cheapest one is the one you will be held to.
- **The Order Form must name a company number.** It is the difference between
  contracting with a limited company and contracting with a person who happens
  to use a trading name — which is also your PECR position for cold email, so
  you should be capturing it anyway.
- **Version the templates.** Put the version in the footer of every generated
  document. When a dispute happens in year two, "which version did they sign"
  is the first question.
