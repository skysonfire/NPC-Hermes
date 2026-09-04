---
title: "Why ChatGPT doesn't recommend your business"
description: "People ask AI who to call now instead of searching. If you are not in the answer, you are not on the list, and most reasons are fixable in an afternoon."
date: "2026-09-04"
tags: ["AI search", "AEO", "Local business"]
draft: false
---

Someone in your city needs an electrician tonight. Ten years ago they opened
Yellow Pages. Five years ago they searched Google and picked from the map pack.
Increasingly, they open ChatGPT and type *"who's a reliable electrician in
Bristol?"* — and they get a short list of three or four names with a sentence
about each.

You are either on that list or you do not exist for that customer. There is no
page two.

This is a different game from SEO, and most of the advice you'll read conflates
the two. Ranking is about being *findable*. This is about being *quotable* — an
answer engine has to be able to say something specific and confident about you
without hedging. Here is what actually decides that.

## You might be blocking the crawlers

Start here, because it is the one that takes ten minutes and silently undoes
everything else.

Answer engines send their own crawlers, and they are not Googlebot. If your
`robots.txt` blocks them — or your host, firewall or bot-protection blocks them
before they reach it — then nothing else on this list matters. You have opted
out of being cited without ever deciding to.

The agents worth knowing about:

- `GPTBot` and `OAI-SearchBot` — OpenAI's crawler and its search grounding
- `PerplexityBot` — Perplexity's index
- `Google-Extended` — controls Gemini and AI Overviews *separately* from search
- `ClaudeBot` — Anthropic
- `Bingbot` — Copilot's answers ride on Bing's index

That `Google-Extended` line catches people out. It is not a search setting. You
can rank perfectly well in Google and still be excluded from AI Overviews
because a plugin or a well-meaning consultant blocked it to "stop AI stealing
our content."

Check `yourdomain.com/robots.txt` right now. If you see any of those names next
to `Disallow: /`, that is your afternoon's work.

## The machine can't tell what you do

Most local business sites describe themselves in a way that is perfectly clear
to a human and nearly useless to a model.

"Quality workmanship since 1998." "Your trusted local partner." "We go the
extra mile." A person reads that and fills in the gaps from the photos, the
van, the tone. A model reads it and extracts approximately nothing, because
nothing in it is *specific* — no trade, no city, no service, no proof.

Compare it to what an engine actually needs in order to name you:

- **What** you do, in the words a customer would use — "emergency electrician,"
  not "electrical solutions"
- **Where** you do it, by name — the towns and postcodes, written out
- **What you don't do** — the jobs you turn down are as clarifying as the ones
  you take
- **Why someone picks you** over the other four, stated plainly enough that it
  could be quoted back

A model generating an answer is looking for a sentence it can lift. Give it
one. If your site does not contain a sentence you would be happy to see quoted
verbatim in a recommendation, write it today.

## Nobody else says it about you

This is the uncomfortable one, and it's why this work takes months rather than
an afternoon.

Models weight what *other people* say about you far more heavily than what you
say about yourself. Your own site establishes that you exist and what you
claim. Directories, local press, trade bodies, forum threads, supplier pages,
review platforms and community sites establish whether it's true.

If you are absent everywhere except your own domain, an engine has one source
with an obvious motive, and it will hedge — "you may want to check local
directories" — rather than name you. That hedge is the sound of you losing the
job.

You cannot shortcut this, and you should not try. Fake reviews and paid mention
farms are detectable, they poison the well, and the platforms that matter are
getting better at spotting them every quarter. The legitimate version is slower
and it works: be genuinely listed where your trade is genuinely listed, and be
consistent everywhere you appear.

## Your details disagree with each other

Name, address, phone. If your unit number is on the Google listing but not on
Yell, if you've got an old mobile on one directory and a landline on another,
if the business is "Smith & Sons" here and "Smith and Sons Ltd" there — every
inconsistency is a reason for a model to lower its confidence and recommend
someone whose details agree with themselves.

It is boring, unglamorous work. It is also the highest ratio of result to
effort on this entire page.

## You're invisible to the parser

Schema markup — the structured data in your page's source — is how you tell a
machine *this is a business, this is the service, this is the area, these are
the opening hours* without it having to infer any of it from your layout.

For a local service business the ones that earn their keep are `LocalBusiness`,
`Service`, and `FAQPage`. That last one matters more than people expect:
answer engines are, structurally, in the business of matching questions to
answers. A page that is literally formatted as questions and answers is the
path of least resistance.

Write the ten questions you actually get asked on the phone. Answer them in
plain language. Mark them up. That single page will do more for your AI
visibility than a year of blog posts about industry trends.

## What to do this week

In order, because the order matters:

1. Read your `robots.txt`. Unblock the agents above if they're blocked.
2. Write one sentence that says what you do, where, and why you. Put it near
   the top of your homepage.
3. Make your name, address and phone identical everywhere they appear.
4. Build a real FAQ page from real questions and mark it up.
5. Then — and only then — start thinking about content and mentions.

Then go and ask ChatGPT, Gemini and Perplexity who the best in your trade is in
your town. Ask three times each, in a fresh session, because these systems are
non-deterministic and one run tells you nothing. Write down who gets named.

That list is your actual competition now. Not who ranks above you — who gets
*said out loud* when a customer asks.

---

*This is the diagnostic half of what we do. If you'd rather not run it
yourself, [get in touch](/contact) — we do it across five engines and hand you
the fix list.*
