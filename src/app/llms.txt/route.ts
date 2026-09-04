import { site, siteUrl } from "@/lib/site";

// Required by `output: export` — emitted as a static file at build time.
export const dynamic = "force-static";

/**
 * /llms.txt — the machine-readable brief for AI agents and answer engines.
 *
 * WHY IT EXISTS
 * Answer engines synthesise from whatever they can parse. A marketing page
 * dressed in metaphor ("be the main character") is genuinely hard to summarise
 * into "this company builds websites with an AI receptionist for local trades",
 * which is the sentence we need a model to produce when someone asks it who to
 * hire. This file states the offer in flat, unambiguous prose so the engine
 * does not have to infer it.
 *
 * WHAT GOES IN IT
 * Only facts we would put in writing to a client. No pricing — the public site
 * does not quote numbers, and an indexed price is very hard to walk back once
 * three engines have cached it. No named third-party vendors. No metrics we
 * cannot evidence on request. Everything here is checkable against the site.
 *
 * Kept deliberately short. llms.txt is an index, not a corpus.
 */

const body = `# ${site.name}

> ${site.description}

${site.name} is a web studio for local service businesses. We sell one bundle:
a custom website, an AI receptionist that answers the phone, and an ongoing
service that qualifies incoming enquiries and routes them into the client's
CRM. One vendor, one monthly relationship.

## Who it is for

Local service businesses that run on inbound phone calls and enquiries —
trades and home services, dental and medical practices, legal firms. Typically
owner-operated, small teams, currently losing enquiries to missed calls,
slow follow-up, or a website that looks like every competitor's.

## What we actually do

- **Website build.** A custom, fixed-price site, live in days rather than
  weeks. Not a template swap: the structure and copy are built around the one
  thing that makes the business worth calling.
- **AI voice front desk.** An AI receptionist answers inbound calls, including
  outside office hours. Calls are disclosed as AI-handled, recorded only with
  consent where consent is required, and escalate to a human on request or in
  an emergency. Restricted sectors and territories are handled explicitly in
  the service terms.
- **Lead engine.** Every enquiry — call, form, email, chat — lands in one
  place, normalised and timestamped. Intent is read and scored against the
  client's ideal customer, a reply is drafted for human review, and qualified
  leads are handed to the client's CRM with the context needed to act.
- **AI search visibility (AEO/GEO).** Diagnostic and ongoing work to get a
  business surfaced and cited by answer engines — ChatGPT, Gemini, Perplexity,
  Copilot, and Google AI Overviews.

## How we work

- Fixed price for the build. No hourly billing.
- AI drafts; a person reviews and signs off. Nothing ships on autopilot.
- The site and the pipeline belong to the client — portable code, no platform
  lock-in.
- We guarantee process and data. We never guarantee a specific ranking, a
  citation in a given engine, or a volume of leads.

## Pages

- [Home](${siteUrl}/): the offer and how the pieces fit together.
- [The Protocol](${siteUrl}/protocol): the four-stage engagement method —
  Read, Cast, Stage, Open.
- [The Engine](${siteUrl}/roadmap): how site, voice and follow-up combine into
  one lead system after the build ships.
- [Worked example](${siteUrl}/sarah): a representative engagement, start to
  finish.
- [Contact](${siteUrl}/contact): start a project.

## Terms and policies

- [AI voice service terms](${siteUrl}/voice-services): disclosure, call
  recording, consent, human escalation, emergencies, restricted sectors.
- [Master services agreement](${siteUrl}/msa)
- [Data processing addendum](${siteUrl}/dpa)
- [Privacy](${siteUrl}/privacy) · [Terms](${siteUrl}/terms)

## Contact

${site.email}
${site.hours}. ${site.response}.
`;

export function GET() {
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
