# SIGNING WORKFLOW

How a prospect becomes a signed client without it eating your evenings.

---

## What actually gets signed

**One document. The Order Form.**

Everything else is incorporated by reference and lives on the website:

| Document | Where | Signed? |
|---|---|---|
| **Order Form** | Generated per client | **Yes — this is the signature** |
| Master Services Agreement | `/msa` | No — incorporated |
| Data Processing Addendum | `/dpa` | No — incorporated |
| AI Voice Services Schedule | `/voice-services` | No — incorporated, when relevant |
| Terms / Privacy | `/terms`, `/privacy` | No |

This is the standard SaaS pattern and it is the right one here. Sending a
tradesman a 16-clause MSA, a DPA and a schedule to sign is how a deal dies on a
kitchen table. He signs a two-page commercial document that says what he gets
and what it costs; the framework sits behind it.

**The trade-off, stated honestly:** incorporation by reference is weaker than a
signed copy if it is ever contested — particularly if the referenced page has
changed since signature. Mitigate by attaching a **PDF snapshot of the MSA and
DPA as they stood on the signing date** to the same envelope, as supporting
documents rather than signature pages. The e-sign tool bundles them into the
sealed output, so the version they agreed to is fixed in the record. Do this
from client one; retrofitting it is impossible.

---

## The sequence

```
1. Discovery call            no document
2. Proposal                  NOT a contract — see below
3. Order Form issued         generated, e-signed
4. Deposit invoice           on signature
5. Work starts               only after cleared payment
```

**The proposal must not read like a contract.** No signature block, no "by
accepting this you agree", no terms. If a proposal can be construed as an
offer capable of acceptance, a client can accept the version with your
best-case pricing in it. Mark it *"Indicative — not an offer. Fees are fixed in
an Order Form."*

**Never quote a fee anywhere except the Order Form.** The moment a number
appears in an email, a proposal and an Order Form and they differ, the cheapest
one is the one you will be held to.

---

## Generating the Order Form

```bash
cp contracts/clients/EXAMPLE.json contracts/clients/holmes.json
# edit it
node contracts/make-order-form.mjs contracts/clients/holmes.json
```

Produces `contracts/out/NPC-2026-09-HOLMES.{md,html}`. Upload the HTML (or
print it to PDF) into the signature tool.

The generator **refuses to output a document with any unfilled field**. A
contract that goes out with `{{CLIENT_COMPANY_NO}}` in it is worse than no
contract — it is evidence nobody read it before sending.

Every generated document carries the Order Form reference and the template
version in its footer. When something is disputed in year two, *"which version
did they sign"* has an answer.

---

## E-signature

### The legal bar is lower than people assume

For a UK commercial services agreement, a **simple electronic signature is
valid**. You do not need a qualified or advanced signature, and you do not need
a witness. The Law Commission confirmed the position for most commercial
documents, and the Electronic Communications Act underpins it.

What actually matters if a signature is ever challenged is the **evidence**
that this person signed this document at this time:

- Signer identity tied to a verified email
- Timestamp
- IP address
- A tamper-evident sealed final PDF
- A certificate of completion stored with the document

Any mainstream tool produces all of that. That is what you are paying for — not
the drawing of a squiggle.

### Choosing one

Do not start with DocuSign. It is the default because of brand, it is the most
expensive per envelope at low volume, and its entry plans cap envelopes in ways
that bite exactly when you get busy.

At your volume — a handful of contracts a month — the deciding factors are:

1. **Cost at 5–20 envelopes a month**, not at 500.
2. **Does it produce a proper completion certificate?** If not, reject it.
3. **Can you send supporting documents in the same envelope** without them
   needing signature? You need this for the MSA/DPA snapshots.
4. **Templates with reusable fields**, so preparing an envelope is a minute.
5. **API or webhook**, so signature completion can eventually trigger the
   deposit invoice automatically. Not needed on day one; needed by client ten.

Reasonable candidates to price up: **Dropbox Sign**, **SignWell**, **PandaDoc**,
and **Documenso** if you would rather self-host. Several have free or near-free
tiers at single-digit envelope volumes.

**I have not verified current pricing** — it moves, and quoting a stale figure
is exactly the thing this business refuses to do elsewhere. Check the live
pages before committing.

### The one thing to get right on day one

**Send the MSA and DPA snapshots in the same envelope as supporting
documents.** One field to sign, three documents sealed into the record. It
costs nothing at send time and it is the difference between "they agreed to the
terms as they stood" and an argument.

---

## After signature

1. The sealed PDF and the completion certificate go into client storage,
   named by Order Form reference.
2. The deposit invoice goes out the same day. Signature enthusiasm has a
   half-life measured in hours.
3. Work starts on **cleared payment**, not on signature. Written into the
   Order Form so it is never a conversation.
4. The client JSON stays in `contracts/clients/` — it is the record of what was
   agreed, and it regenerates the document byte-for-byte if the PDF is lost.

---

## Change orders — the gap that will cost you

MSA clause 5 covers revisions and changes. There is **no change-order form**.

On a fixed-price build, scope creep is the single most reliable way a
productised offer stops being profitable. "Can you just add a page" three times
is a day of unpaid work, and without an artefact there is nothing to point at.

The fix is small: a one-page change order that names the change, the fee, and
the revised delivery date, signed the same way. Worth building before the first
build client, not after the first argument.
