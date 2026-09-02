/**
 * Cloudflare Worker in front of the static Next.js export (out/).
 *
 * Responsibilities:
 *   1. POST /api/contact  — the lead endpoint. The contact form used to post to
 *      a `mailto:` action, which modern browsers either ignore or mangle, so
 *      every lead submitted through the site was silently lost.
 *   2. Security headers on every HTML response.
 *   3. A real branded 404 (the assets binding returned an empty body before).
 *   4. Immutable caching for content-hashed build assets.
 */

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  // Report-only to start: the site loads Google Fonts and inline styles, and a
  // blocking policy that gets one directive wrong takes the site down silently.
  // Watch the reports, then promote to Content-Security-Policy.
  "Content-Security-Policy-Report-Only": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...SECURITY_HEADERS,
    },
  });

/** Trim, cap length, and strip control characters from a submitted field. */
function clean(value, max) {
  if (typeof value !== "string") return "";
  // Control chars (incl. newlines in single-line fields) become spaces, so a
  // submitted value cannot forge headers or break out of the email body.
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function handleContact(request, env) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405);
  }

  // Same-origin only. Blocks the simplest cross-site abuse of the endpoint.
  const origin = request.headers.get("Origin");
  if (origin) {
    const expected = new URL(request.url).origin;
    if (origin !== expected) {
      return json({ ok: false, error: "Bad origin." }, 403);
    }
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Malformed request." }, 400);
  }

  // Honeypot: a real person never fills a field they cannot see.
  if (clean(payload.company, 200)) {
    // Pretend success so bots do not learn they were caught.
    return json({ ok: true });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 200);
  const what = clean(payload.what, 400);
  const message = clean(payload.message, 4000);

  const errors = {};
  if (!name) errors.name = "Tell me your name.";
  if (!email) errors.email = "I need an email to reply to.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";
  if (!what) errors.what = "Tell me what you do.";
  if (Object.keys(errors).length) {
    return json({ ok: false, errors }, 422);
  }

  const lead = {
    name,
    email,
    what,
    message,
    submittedAt: new Date().toISOString(),
    // Useful for triage, and none of it is sensitive.
    country: request.headers.get("CF-IPCountry") || null,
    userAgent: clean(request.headers.get("User-Agent") || "", 300),
    referer: clean(request.headers.get("Referer") || "", 300),
  };

  // --- Delivery -----------------------------------------------------------
  // Two interchangeable transports. Configure ONE of them, otherwise a lead
  // cannot be delivered and we must say so loudly rather than drop it.
  const delivered = [];
  const failures = [];

  if (env.LEAD_WEBHOOK_URL) {
    try {
      const r = await fetch(env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      r.ok ? delivered.push("webhook") : failures.push(`webhook ${r.status}`);
    } catch (e) {
      failures.push(`webhook ${e.message}`);
    }
  }

  if (env.RESEND_API_KEY && env.LEAD_TO_EMAIL && env.LEAD_FROM_EMAIL) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.LEAD_FROM_EMAIL,
          to: [env.LEAD_TO_EMAIL],
          reply_to: email,
          subject: `New lead — ${name}`,
          text: [
            `Name:    ${name}`,
            `Email:   ${email}`,
            `Does:    ${what}`,
            ``,
            message || "(no message)",
            ``,
            `--`,
            `Country: ${lead.country || "unknown"}`,
            `Page:    ${lead.referer || "unknown"}`,
            `At:      ${lead.submittedAt}`,
          ].join("\n"),
        }),
      });
      r.ok ? delivered.push("email") : failures.push(`email ${r.status}`);
    } catch (e) {
      failures.push(`email ${e.message}`);
    }
  }

  if (delivered.length === 0) {
    // Never tell a prospect "thanks" when the lead went nowhere.
    console.error("LEAD NOT DELIVERED", { failures, lead });
    return json(
      {
        ok: false,
        error:
          "Something broke on our side. Email hello@npcprotocol.com directly and it will reach us.",
      },
      502
    );
  }

  if (failures.length) console.warn("partial lead delivery", failures);
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    const response = await env.ASSETS.fetch(request);

    // Branded 404 instead of the assets binding's empty body.
    if (response.status === 404) {
      const notFound = await env.ASSETS.fetch(
        new Request(new URL("/404.html", url), { method: "GET" })
      );
      if (notFound.ok) {
        return new Response(notFound.body, {
          status: 404,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
            ...SECURITY_HEADERS,
          },
        });
      }
    }

    const headers = new Headers(response.headers);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);

    // Build assets are content-hashed, so they can be cached forever.
    if (url.pathname.startsWith("/_next/static/")) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
