"use client";

import { useRef, useState } from "react";
import { Magnetic } from "@/components/motion";
import { site } from "@/lib/site";

type FieldErrors = Partial<Record<"name" | "email" | "what" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-line bg-panel px-4 py-3 text-sm text-snow outline-none transition-colors placeholder:text-fog-2 focus:border-gold/60 aria-[invalid=true]:border-danger/70";

const labelClass =
  "mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-fog-2";

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 font-mono text-[11px] text-danger">
      {children}
    </p>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>("");
  const successRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setErrors({});
    setFormError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));

      if (res.ok && body.ok) {
        setStatus("success");
        form.reset();
        // Move focus to the confirmation so keyboard and screen-reader users
        // are told the submission worked, not just sighted ones.
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }

      if (res.status === 422 && body.errors) {
        setErrors(body.errors as FieldErrors);
        setStatus("idle");
        return;
      }

      setFormError(
        body.error ||
          `Something went wrong (${res.status}). Email ${site.email} directly and it will reach us.`
      );
      setStatus("error");
    } catch {
      // Network failure, offline, blocked request.
      setFormError(
        `Couldn't reach the server. Email ${site.email} directly and it will reach us.`
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-gold/40 bg-panel p-8 outline-none"
      >
        <p className="font-display text-2xl font-bold text-snow">
          Got it — that&rsquo;s in front of me.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-fog">
          I read every one of these myself. {site.response.toLowerCase()}, usually
          sooner. If it&rsquo;s urgent, reply straight to{" "}
          <a className="text-gold hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-mono text-[11px] uppercase tracking-widest text-fog-2 transition-colors hover:text-gold"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* Honeypot. Hidden from people, irresistible to bots. Not `display:none`,
          which some bots detect and skip. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
            className={inputClass}
          />
          <FieldError id="err-name">{errors.name}</FieldError>
        </label>

        <label className="block">
          <span className={labelClass}>Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
            className={inputClass}
          />
          <FieldError id="err-email">{errors.email}</FieldError>
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>What do you do?</span>
        <input
          type="text"
          name="what"
          required
          placeholder="e.g. I run a two-van electrical firm in Leeds"
          aria-invalid={!!errors.what}
          aria-describedby={errors.what ? "err-what" : undefined}
          className={inputClass}
        />
        <FieldError id="err-what">{errors.what}</FieldError>
      </label>

      <label className="block">
        <span className={labelClass}>What&rsquo;s holding you back?</span>
        <textarea
          name="message"
          rows={4}
          placeholder="The part you can't seem to fix…"
          className={`${inputClass} resize-none`}
        />
      </label>

      {formError && (
        <p role="alert" className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-snow">
          {formError}
        </p>
      )}

      <div className="flex items-center justify-between gap-4">
        <Magnetic strength={0.2}>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink shadow-lg shadow-gold/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {status === "submitting" ? "Sending…" : "Send it"}
            <span aria-hidden>{status === "submitting" ? "" : "→"}</span>
          </button>
        </Magnetic>
        <span className="font-mono text-[10px] uppercase tracking-widest text-fog-2">
          No spam, no sequences
        </span>
      </div>

      {/* The form needs JS to submit. Say so rather than letting it fail silently. */}
      <noscript>
        <p className="text-sm text-fog">
          This form needs JavaScript. Email{" "}
          <a className="text-gold underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          instead — it reaches the same place.
        </p>
      </noscript>
    </form>
  );
}
