"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";

/**
 * Cal.com booking link, as `username/event-slug` (e.g. "tayyab/30min").
 * Public by design — it is the same identifier as your cal.com URL.
 */
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;

const CAL_NAMESPACE = "portfolio-booking";
const CAL_EMBED_JS = "https://app.cal.com/embed/embed.js";
const CAL_ORIGIN = "https://app.cal.com";
const CAL_CONFIG: Record<string, string> =
  CAL_LINK && CAL_LINK.includes("/") ? { layout: "month_view" } : {};
const EMBED_TIMEOUT_MS = 20000;
const EMBED_POLL_MS = 400;
function CalendarFallback() {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-20 text-center">
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
      <p className="max-w-xs text-sm text-neutral-600 dark:text-neutral-400">
        The booking calendar couldn’t load here — it opens fine in a new tab.
      </p>
      {CAL_LINK && (
        <a
          href={`https://cal.com/${CAL_LINK}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-400 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
        >
          Book on Cal.com
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
        </a>
      )}
      <a
        href="mailto:m.tayyabsohail614@gmail.com"
        className="text-sm text-neutral-500 underline underline-offset-4 transition-colors hover:text-emerald-500 dark:text-neutral-400"
      >
        or email me directly
      </a>
    </div>
  );
}

type EmbedState = "loading" | "ready" | "failed";

export function ContactSection() {
  const [embedState, setEmbedState] = useState<EmbedState>(
    CAL_LINK ? "loading" : "failed",
  );
  const hostRef = useRef<HTMLDivElement>(null);

  // Cal's theme/styling is configured through its own API, not CSS — the embed
  // renders in an iframe we can't reach into.
  useEffect(() => {
    if (!CAL_LINK) {
      console.warn(
        "[contact] NEXT_PUBLIC_CAL_LINK is not set, so the booking embed was skipped. " +
          "Set it in .env.local as `username/event-slug` and restart the dev server — " +
          "NEXT_PUBLIC_ vars are inlined at startup.",
      );
      return;
    }

    (async () => {
      try {
        const cal = await getCalApi({
          namespace: CAL_NAMESPACE,
          embedJsUrl: CAL_EMBED_JS,
        });
        cal("ui", {
          theme: "dark",
          hideEventTypeDetails: false,
          cssVarsPerTheme: {
            light: { "cal-brand": "#10b981" },
            dark: { "cal-brand": "#10b981" },
          },
        });
      } catch (err) {
        // Usually the script being blocked — an ad blocker, a corporate proxy
        // or Cloudflare serving a bot challenge instead of the JS.
        console.error(
          `[contact] Cal.com embed script failed to load from ${CAL_EMBED_JS}. ` +
            "Check the Network tab for a blocked or non-JS response.",
          err,
        );
        setEmbedState("failed");
      }
    })();
  }, []);

  // The embed can also fail silently: a blocked script leaves the host div
  // empty with no error event to listen for. Poll for the iframe rather than
  // checking once, so a slow-but-successful load isn't mistaken for a failure.
  useEffect(() => {
    if (!CAL_LINK) return;

    const startedAt = Date.now();
    const poll = setInterval(() => {
      if (hostRef.current?.querySelector("iframe")) {
        clearInterval(poll);
        setEmbedState("ready");
        return;
      }
      if (Date.now() - startedAt >= EMBED_TIMEOUT_MS) {
        clearInterval(poll);
        console.error(
          `[contact] Cal.com embed produced no iframe within ${
            EMBED_TIMEOUT_MS / 1000
          }s for calLink "${CAL_LINK}". ` +
            "Most likely causes: the script is blocked (see Network tab), or the " +
            `booking link does not exist — confirm https://cal.com/${CAL_LINK} opens.`,
        );
        setEmbedState("failed");
      }
    }, EMBED_POLL_MS);

    return () => clearInterval(poll);
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
          {CAL_LINK && embedState !== "failed" ? (
            // Stays mounted through the loading state — unmounting it would
            // remove the very host the iframe is injected into. The spinner
            // sits over the top instead, so the card is never blank.
            <div className="relative">
              {/* Wrapper carries the ref: <Cal> forwards no ref of its own,
                  and its inner div is where the iframe gets injected. */}
              <div ref={hostRef}>
                <Cal
                  namespace={CAL_NAMESPACE}
                  calLink={CAL_LINK}
                  embedJsUrl={CAL_EMBED_JS}
                  calOrigin={CAL_ORIGIN}
                  className="w-full"
                  style={{ height: "40rem", overflow: "auto" }}
                  config={CAL_CONFIG}
                />
              </div>

              {embedState === "loading" && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-neutral-950/80">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6 animate-spin text-emerald-500"
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
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Loading the booking calendar…
                  </p>
                </div>
              )}
            </div>
          ) : (
            <CalendarFallback />
          )}
        </div>
      </motion.div>
    </div>
  );
}
