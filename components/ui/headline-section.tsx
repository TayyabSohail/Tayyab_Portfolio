"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { IconArrowLeft, IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";

const CLIENT_OUTCOMES = [
  {
    value: "3×",
    label: "lower cost per article",
    project: "SEOMaven",
    slug: "seomaven",
    description:
      "The same content budget now produces three times more output, helping SEO teams expand coverage without increasing spend.",
  },
  {
    value: "1,000+",
    label: "concurrent users",
    project: "UniBid",
    slug: "unibid",
    description:
      "Peak campus demand can be handled without lost bids or conflicting states, protecting trust when marketplace activity is highest.",
  },
  {
    value: "70%",
    label: "fewer support tickets",
    project: "Anina",
    slug: "anina",
    description:
      "Seven out of every ten support issues were removed, lowering service workload while giving customers a smoother checkout and delivery experience.",
  },
  {
    value: "30 days",
    label: "from brief to shipped MVP",
    project: "Bitsmiths Studio",
    slug: "bitsmiths-studio",
    description:
      "The business reached market in one month, shortening the wait for customer feedback, qualified leads, and revenue opportunities.",
  },
  {
    value: "40%",
    label: "faster performance",
    project: "New Web Order",
    slug: "new-web-order",
    description:
      "Visitors reach the content and call to action sooner, reducing avoidable drop-off and giving each campaign a better chance to convert.",
  },
  {
    value: "<5 min",
    label: "patient intake",
    project: "AI Physiotherapy Assistant",
    slug: "ai-physiotherapy",
    description:
      "Clinicians spend less time on intake administration, while patients can begin a personalised treatment plan during the same session.",
  },
  {
    value: "60%",
    label: "faster deployment",
    project: "SnobBots",
    slug: "snobbots",
    description:
      "New customer environments go live in less than half the previous time, allowing resellers to onboard more clients with the same team.",
  },
  {
    value: "30+",
    label: "agencies on one platform",
    project: "Real Estate Management System",
    slug: "real-estate-management-system",
    description:
      "More than 30 agencies share one secure platform, reducing separate infrastructure and maintenance work without mixing client data.",
  },
  {
    value: "50%",
    label: "shorter audit turnaround",
    project: "QA Review Agent",
    slug: "qa-compliance-agent",
    description:
      "Review teams recover roughly half a week per audit, increasing delivery capacity without needing to double the review team.",
  },
  {
    value: "30+",
    label: "interviews completed",
    project: "Realtime Voice Interview Assistant",
    slug: "ai-interview-assistant",
    description:
      "Recruiters can run consistent interviews with automatic transcripts and follow-ups, reducing coordination work across every candidate.",
  },
];

export function HeadlineSection() {
  const [activeOutcome, setActiveOutcome] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = current + 100 / 60;

        if (next >= 100) {
          setActiveOutcome(
            (active) => (active + 1) % CLIENT_OUTCOMES.length,
          );
          return 0;
        }

        return next;
      });
    }, 100);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const selectOutcome = (direction: 1 | -1) => {
    setProgress(0);
    setActiveOutcome(
      (current) =>
        (current + direction + CLIENT_OUTCOMES.length) % CLIENT_OUTCOMES.length,
    );
  };

  const outcome = CLIENT_OUTCOMES[activeOutcome];

  return (
    <section className="w-full bg-transparent py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-10 border-b border-white/10 pb-12 md:grid-cols-[0.58fr_1.42fr] md:gap-10 lg:gap-14">
          <header>
            <p className="nx-kicker">Measured outcomes</p>
            <h2 className="mt-5 text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-white md:text-5xl lg:text-6xl">
              Work that moved the needle.
            </h2>
          </header>

          <article
            className="nx-panel relative md:ml-7 lg:ml-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
            }}
          >
            <div aria-hidden="true" className="nx-grid-surface absolute inset-0 opacity-25" />
            <span aria-hidden="true" className="absolute top-16 left-0 h-16 w-px bg-emerald-400/80" />

            <div className="relative flex items-center border-b border-white/[0.08] bg-black/15 px-6 py-4 sm:px-7">
              <div className="flex min-w-0 items-center gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-emerald-400/30 bg-emerald-400/[0.08]">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.8)]" />
                </span>
                <div className="min-w-0">
                  <span className="block font-mono text-[0.55rem] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
                    Featured project
                  </span>
                  <h3 className="mt-0.5 line-clamp-2 text-lg font-bold leading-tight tracking-[-0.035em] text-white sm:text-xl">
                    {outcome.project}
                  </h3>
                </div>
              </div>
            </div>

            <div className="relative min-h-80 px-6 py-6 sm:min-h-64 sm:px-7">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`${outcome.project}-${outcome.value}`}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{
                    duration: reduceMotion ? 0.15 : 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-x-6 top-1/2 grid -translate-y-1/2 gap-5 sm:inset-x-7 sm:grid-cols-[0.9fr_1.1fr] sm:items-stretch sm:gap-6"
                  aria-live="polite"
                >
                  <div className="relative overflow-hidden border border-emerald-400/20 bg-linear-to-br from-emerald-400/[0.13] via-emerald-400/[0.035] to-transparent px-5 py-5">
                    <div aria-hidden="true" className="nx-grid-surface absolute inset-0 opacity-35" />
                    <p className="relative font-mono text-[0.55rem] font-semibold tracking-[0.14em] text-emerald-300/75 uppercase">
                      Project outcome
                    </p>
                    <p className="relative mt-4 text-5xl font-black leading-none tracking-[-0.075em] text-emerald-300 [text-shadow:0_0_28px_rgb(52_211_153/0.2)] sm:text-6xl">
                      {outcome.value}
                    </p>
                    <p className="relative mt-2 max-w-48 text-sm font-bold leading-tight text-white sm:text-base">
                      {outcome.label}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between py-1">
                    <p className="font-mono text-[0.58rem] font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                      Why it matters
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300 sm:text-[0.92rem]">
                      {outcome.description}
                    </p>
                    <Link
                      href={`/case-studies/${outcome.slug}`}
                      className="group mt-5 inline-flex w-fit items-center gap-2 border-b border-emerald-400/35 pb-1 font-mono text-[0.62rem] font-semibold tracking-[0.11em] text-emerald-300 uppercase transition-colors hover:border-emerald-300 hover:text-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                    >
                      View case study
                      <IconArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" stroke={1.7} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className="relative h-1 bg-white/[0.06]"
              role="progressbar"
              aria-label="Time until next outcome"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <span
                className="absolute inset-y-0 left-0 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.55)] transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="relative flex items-center justify-between border-t border-white/[0.08] bg-black/10 px-6 py-3.5 sm:px-7">
              <div className="flex max-w-[70%] gap-1" aria-label={`Slide ${activeOutcome + 1} of ${CLIENT_OUTCOMES.length}`}>
                {CLIENT_OUTCOMES.map((item, index) => (
                  <span
                    key={`${item.project}-${item.value}`}
                    className={`h-1 transition-all duration-300 ${index === activeOutcome ? "w-6 bg-emerald-400" : "w-2 bg-white/15"}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => selectOutcome(-1)}
                  aria-label="Previous outcome"
                  className="inline-flex min-h-9 items-center justify-center gap-2 border border-white/10 px-3 font-mono text-[0.58rem] font-semibold tracking-[0.08em] text-neutral-400 uppercase transition-colors hover:border-emerald-400/50 hover:bg-emerald-400/[0.08] hover:text-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                >
                  <IconArrowLeft aria-hidden="true" className="h-4 w-4" stroke={1.5} />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => selectOutcome(1)}
                  aria-label="Next outcome"
                  className="inline-flex min-h-9 items-center justify-center gap-2 border border-emerald-400/30 bg-emerald-400/[0.06] px-3 font-mono text-[0.58rem] font-semibold tracking-[0.08em] text-emerald-200 uppercase transition-colors hover:border-emerald-300/60 hover:bg-emerald-400/[0.12] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                >
                  <span className="hidden sm:inline">Next</span>
                  <IconArrowRight aria-hidden="true" className="h-4 w-4" stroke={1.5} />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
