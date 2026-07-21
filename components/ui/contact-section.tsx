"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";

/**
 * Cal.com booking link, as `username/event-slug` (e.g. "tayyab/30min").
 * Public by design — it is the same identifier as your cal.com URL.
 */
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;

/** Shown instead of the embed when CAL_LINK is unset, so the section is never blank. */
function CalendarFallback() {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-20 text-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10 text-emerald-500/70"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Booking calendar isn’t available.
      </p>
      <a
        href="mailto:m.tayyabsohail614@gmail.com"
        className="text-sm text-emerald-600 underline underline-offset-4 transition-colors hover:text-emerald-500 dark:text-emerald-400"
      >
        Email me instead
      </a>
    </div>
  );
}

export function ContactSection() {
  // Cal's theme/styling is configured through its own API, not CSS — the embed
  // renders in an iframe we can't reach into.
  useEffect(() => {
    if (!CAL_LINK) return;

    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: { "cal-brand": "#10b981" },
          dark: { "cal-brand": "#10b981" },
        },
      });
    })();
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 py-20 md:py-28">
      {/* Ambient emerald bloom behind the card, echoing GridBackground. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="relative inline-block text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
          Book a Call
          <span className="absolute -bottom-2 left-1/2 h-1 w-full -translate-x-1/2 rounded-full bg-linear-to-r from-emerald-500 to-emerald-300" />
        </h2>
        <p className="mx-auto mt-8 max-w-md text-sm text-neutral-600 dark:text-neutral-400">
          Pick a time that works for you and let’s talk about your project.
          You’ll get a calendar invite straight away.
        </p>
      </motion.div>

      {/* Gradient ring wrapper: a padded gradient layer showing through as a
          1px border, which a plain border-color can't do. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-linear-to-br from-emerald-500/30 via-neutral-500/10 to-sky-500/20 p-px shadow-2xl shadow-emerald-500/5"
      >
        <div className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl dark:bg-neutral-950/80">
          {CAL_LINK ? (
            <Cal
              calLink={CAL_LINK}
              className="min-h-[36rem] w-full"
              config={{ layout: "month_view" }}
            />
          ) : (
            <CalendarFallback />
          )}
        </div>
      </motion.div>
    </div>
  );
}
