"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Web3Forms access key. Public by design — it only authorises submissions to
 * the inbox it was issued for, so it is safe in client bundles. Set
 * NEXT_PUBLIC_WEB3FORMS_KEY to activate the form.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

/**
 * Cal.com booking link, as `username/event-slug`. Used as a plain link rather
 * than an embed: Cal serves embed.js from behind a Cloudflare bot check that
 * answers with a 403 HTML challenge marked `cross-origin-resource-policy:
 * same-origin`, so the browser refuses it and no iframe is ever produced. The
 * hosted page itself loads fine, so linking out is the reliable path.
 */
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;
const CAL_URL = CAL_LINK ? `https://cal.com/${CAL_LINK}` : null;

const EMAIL = "m.tayyabsohail614@gmail.com";
const WHATSAPP_URL = "https://wa.me/923338199915";

type Tab = "email" | "call";
type Status = "idle" | "submitting" | "success" | "error";

/** Left padding clears the leading icon; peer-* lets the icon react to focus. */
const FIELD_CLASS =
  "peer w-full border border-white/15 bg-[#050807]/80 py-3 pr-4 pl-11 text-sm text-neutral-100 placeholder:text-neutral-500 transition-all duration-200 focus:border-emerald-500/70 focus:bg-emerald-500/[0.025] focus:ring-1 focus:ring-emerald-500/25 focus:outline-hidden disabled:opacity-60";

/** Sentence case, not uppercase — it reads as a question, not a database column. */
const LABEL_CLASS =
  "mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-200";

/** Sits inside the field's left gutter and picks up the emerald focus tint. */
const ICON_CLASS =
  "pointer-events-none absolute left-3.5 h-4 w-4 text-neutral-300 transition-colors peer-focus:text-emerald-500 dark:text-neutral-300 dark:peer-focus:text-emerald-400";

/** Small caps label above the CTA heading — sets context before the pitch. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 border-l border-emerald-400 bg-emerald-500/[0.06] px-3 py-1 text-[10px] font-semibold tracking-[0.14em] whitespace-nowrap text-emerald-300 uppercase sm:text-[11px]">
      {/* Pulsing dot: reads as "available", cheaply. */}
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      {children}
    </span>
  );
}

/** Bullet list used on both CTA panels. */
function Perks({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3 border-t border-white/10 pt-5 sm:mt-7 sm:space-y-3.5 sm:pt-6">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-3 text-[13px] text-neutral-300 sm:text-sm"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-emerald-500/30 bg-emerald-500/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3 text-emerald-400"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Marks a required field up front, rather than letting the browser's validation
 * popup be the first hint. Hidden from screen readers — `required` already
 * conveys it.
 */
function RequiredMark() {
  return (
    <span className="text-emerald-500" aria-hidden="true">
      *
    </span>
  );
}

/**
 * "or → WhatsApp" escape hatch under the form — plenty of people would rather
 * send one message than fill in three fields.
 */
function WhatsAppOption() {
  return (
    <>
      <div className="mt-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        <span className="text-[11px] font-medium tracking-wide text-neutral-300 uppercase">
          or
        </span>
        <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="nx-btn nx-btn-secondary group mx-auto mt-4 flex w-fit items-center justify-center gap-3 px-5 py-3.5"
      >
        <span className="flex min-w-0 items-center gap-3">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 shrink-0 text-emerald-500"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.13c-.25.69-1.45 1.32-1.99 1.37-.53.05-1.03.24-3.47-.72-2.92-1.15-4.77-4.13-4.91-4.32-.14-.19-1.17-1.55-1.17-2.96s.74-2.1 1-2.39c.26-.29.57-.36.76-.36h.54c.18 0 .41-.03.64.49.24.55.81 1.92.88 2.06.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.29.14.46.12.63-.07.17-.19.72-.85.92-1.14.19-.29.38-.24.64-.14.26.09 1.64.77 1.92.91.29.14.48.22.55.34.07.12.07.69-.18 1.38z" />
          </svg>
          <span className="truncate text-sm font-medium text-inherit">
            Message me on WhatsApp
          </span>
        </span>
        <ArrowIcon />
      </a>
    </>
  );
}

/**
 * Success toast. Anchored bottom-right on desktop but full-width along the
 * bottom on mobile, where a floating corner card would crowd the thumb area.
 *
 * Deliberately not an aria-live region: the inline status line under the button
 * already announces the same result, and doubling it would make a screen reader
 * read the confirmation twice. This is the visual half of that pair, hence
 * aria-hidden.
 */
function SuccessToast({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      aria-hidden="true"
      className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-auto sm:max-w-sm"
    >
      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-white/95 px-4 py-3 shadow-lg shadow-emerald-500/10 backdrop-blur-sm dark:bg-neutral-900/95">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 text-emerald-500"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>

        {/* Single line only — the reply-time promise lives on the inline
          status row under the button, so repeating it here just doubles it. */}
        <span className="min-w-0 flex-1 self-center text-sm font-medium text-neutral-900 dark:text-white">
          Message sent
        </span>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="-mr-1 shrink-0 rounded-lg p-1.5 text-neutral-400 transition hover:bg-neutral-500/10 hover:text-neutral-600 dark:hover:text-neutral-300"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export function ContactSection() {
  const [tab, setTab] = useState<Tab>("email");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  /* Auto-dismiss the toast, but only while it is actually on screen — keyed on
     toastVisible so dismissing by hand clears the timer instead of leaving it
     to fire against an already-hidden toast. */
  useEffect(() => {
    if (!toastVisible) return;
    const id = setTimeout(() => setToastVisible(false), 6000);
    return () => clearTimeout(id);
  }, [toastVisible]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!ACCESS_KEY) {
      setStatus("error");
      setError("The form isn’t set up right now — email me and I’ll reply.");
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Submission failed.");
      }

      form.reset();
      setStatus("success");
      setToastVisible(true);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 md:py-28">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 grid gap-5 border-b border-white/10 pb-10 text-left md:grid-cols-[1fr_0.85fr] md:items-end"
      >
        <div>
          <p className="nx-kicker">Start a conversation</p>
          <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] text-white sm:text-5xl md:text-6xl">
            Get in touch
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-neutral-400 md:justify-self-end">
          Send a message, ping me on WhatsApp, or grab a slot on my calendar.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[0.3fr_1fr] lg:items-start">

      {/* Tabs: one panel at a time, so each gets the full card width and
          nothing has to survive a half-width column on a phone. */}
      <div
        role="tablist"
        aria-label="How to get in touch"
        className="grid w-full grid-cols-2 gap-px border border-white/10 bg-[#020605] p-px lg:grid-cols-1"
      >
        {(
          [
            ["email", "Send a message"],
            ["call", "Book a call"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={tab === value}
            aria-controls={`contact-panel-${value}`}
            id={`contact-tab-${value}`}
            onClick={() => setTab(value)}
            className={
              tab === value
                ? "w-full border border-emerald-400 bg-emerald-400 px-3 py-3 text-xs font-semibold whitespace-nowrap text-neutral-950 transition focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
                : "w-full border border-white/15 bg-[#050807] px-3 py-3 text-xs font-medium whitespace-nowrap text-neutral-300 transition hover:border-emerald-400/40 hover:bg-emerald-500/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Gradient ring wrapper: a padded gradient layer showing through as a
          1px border, which a plain border-color can't do. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="nx-panel"
      >
        <div className="relative overflow-hidden bg-[#050807]/90 p-4 backdrop-blur-xl sm:p-6 md:p-8">
          {/* Card backdrop — clipped to the rounded corners, so it decorates
              the card itself rather than bleeding across the whole section. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {/* Grid, faded out at the edges so it has no visible seam. */}
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(16,185,129,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.4)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />

            {/* Hairline highlight along the top edge — catches the light. */}
            <div className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/40 to-transparent" />
          </div>

          <div className="relative">
            {tab === "email" ? (
              <div
                role="tabpanel"
                id="contact-panel-email"
                aria-labelledby="contact-tab-email"
                className="mx-auto w-full"
              >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Web3Forms routes on this key and uses `subject` as the
                    email subject. */}
                  <input
                    type="hidden"
                    name="access_key"
                    value={ACCESS_KEY ?? ""}
                  />
                  <input
                    type="hidden"
                    name="subject"
                    value="New message from your portfolio"
                  />
                  {/* Honeypot: bots fill it, humans never see it. */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name and email are both short — pairing them keeps the
                      form to three rows instead of four. */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className={LABEL_CLASS}>
                        Name <RequiredMark />
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          maxLength={100}
                          autoComplete="name"
                          placeholder="Your name"
                          disabled={status === "submitting"}
                          className={FIELD_CLASS}
                        />
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={ICON_CLASS}
                          aria-hidden="true"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-email" className={LABEL_CLASS}>
                        Email <RequiredMark />
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          maxLength={200}
                          autoComplete="email"
                          placeholder="you@example.com"
                          disabled={status === "submitting"}
                          className={FIELD_CLASS}
                        />
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={ICON_CLASS}
                          aria-hidden="true"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m2 7 10 6 10-6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={LABEL_CLASS}>
                      What can I help with? <RequiredMark />
                    </label>
                    <div className="relative flex">
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        maxLength={5000}
                        placeholder="A few lines about your project, timeline, and budget"
                        disabled={status === "submitting"}
                        className={`${FIELD_CLASS} resize-y`}
                      />
                      {/* top-3.5, not centred — the field is multi-line. */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`${ICON_CLASS} top-3.5`}
                        aria-hidden="true"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="nx-btn nx-btn-primary group mt-2 flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-4 w-4 animate-spin"
                          aria-hidden="true"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="opacity-25"
                          />
                          <path
                            d="M12 2a10 10 0 0 1 10 10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowIcon />
                      </>
                    )}
                  </button>

                  {/* Announced to screen readers without stealing focus. The
                      idle state isn't blank — the row is reserved either way,
                      so it carries a reply-time expectation instead. */}
                  <p aria-live="polite" className="min-h-5 text-center text-sm">
                    {status === "success" && (
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Thanks. I’ll reply within a day.
                      </span>
                    )}
                    {status === "error" && (
                      <span className="text-red-600 dark:text-red-400">
                        {error}{" "}
                        {/* Any failure here is a dead end unless the address is
                          right there to click, so always offer the mailto. */}
                        <a
                          href={`mailto:${EMAIL}`}
                          className="font-medium underline underline-offset-2 hover:text-red-700 dark:hover:text-red-300"
                        >
                          {EMAIL}
                        </a>
                      </span>
                    )}
                  </p>
                </form>

                {/* Same WhatsApp escape hatch as the call tab — plenty of people
                  would rather send one message than fill in three fields. */}
                <WhatsAppOption />
              </div>
            ) : (
              <div
                role="tabpanel"
                id="contact-panel-call"
                aria-labelledby="contact-tab-call"
                className="mx-auto w-full"
              >
                {/* The booking plate. Layered dark surface: a deep gradient base, a
              fine grid, and two emerald blooms — built up rather than flat so
              it reads as the primary action and not as empty space. */}
                <div className="nx-panel relative p-5 sm:p-6 md:p-8">
                  {/* No grid here — the card behind already provides one, and
                    two grids at different pitches moiré against each other. */}
                  {/* Two blooms at opposing corners give the plate depth. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-emerald-500/25 blur-[60px] sm:-top-20 sm:-right-16 sm:h-64 sm:w-64 sm:blur-[80px]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-sky-500/10 blur-[60px] sm:-bottom-24 sm:-left-20 sm:h-64 sm:w-64 sm:blur-[90px]"
                  />
                  {/* Hairline highlight along the top edge — catches the light. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/50 to-transparent"
                  />

                  <div className="relative flex h-full flex-col justify-center">
                    <Eyebrow>Free · 30 minutes</Eyebrow>

                    <h3 className="mt-3.5 text-xl font-bold tracking-tight text-balance text-white sm:mt-4 sm:text-2xl md:text-3xl">
                      Rather talk it{" "}
                      <span className="bg-linear-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
                        through?
                      </span>
                    </h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-neutral-400 sm:mt-3 sm:text-sm">
                      Skip the form — grab a slot on my calendar. Twenty minutes
                      usually beats a week of back-and-forth.
                    </p>
                    <Perks
                      items={[
                        "30-minute intro call",
                        "Free project scoping",
                        "No commitment",
                      ]}
                    />

                    {CAL_URL ? (
                      <a
                        href={CAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nx-btn nx-btn-primary group mx-auto mt-6 inline-flex w-fit items-center gap-2 px-5 py-3 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:outline-hidden sm:mt-8 sm:px-6 sm:py-3.5"
                      >
                        Book a call
                        <ArrowIcon />
                      </a>
                    ) : (
                      <a
                        href={`mailto:${EMAIL}`}
                        className="nx-btn nx-btn-primary group mx-auto mt-6 inline-flex w-fit items-center gap-2 px-5 py-3 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:outline-hidden sm:mt-8 sm:px-6 sm:py-3.5"
                      >
                        Email me
                        <ArrowIcon />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      </div>

      {/* Mounted outside the animated card on purpose: that wrapper is
        transformed by motion, which would make it the containing block for
        position:fixed and pin the toast to the card instead of the viewport. */}
      <AnimatePresence>
        {toastVisible && (
          <SuccessToast onDismiss={() => setToastVisible(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
