"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IconArrowLeft, IconArrowRight, IconTrendingUp } from "@tabler/icons-react";

const CLIENT_OUTCOMES = [
  {
    value: "3×",
    label: "lower cost per article",
    project: "SEOMaven",
    description:
      "One automated workflow now handles keyword research, content generation, and rank tracking—work that previously required several tools.",
  },
  {
    value: "1,000+",
    label: "concurrent users",
    project: "UniBid",
    description:
      "Conflict-free bid synchronisation keeps every student and landlord on the same live state, even during peak campus traffic.",
  },
  {
    value: "70%",
    label: "fewer support tickets",
    project: "Anina",
    description:
      "Checkout and shipping flows resolve common problems before customers need support, reducing workload without weakening the experience.",
  },
  {
    value: "30 days",
    label: "from brief to shipped MVP",
    project: "Bitsmiths Studio",
    description:
      "A focused scope and reusable content system turned an initial brief into a production-ready launch within one month.",
  },
  {
    value: "40%",
    label: "faster performance",
    project: "New Web Order",
    description:
      "Route-level rendering and bundle improvements made the experience faster while keeping every page focused on conversion.",
  },
  {
    value: "<5 min",
    label: "patient intake",
    project: "AI Physiotherapy Assistant",
    description:
      "A guided clinical flow collects the right information quickly, then creates a plan that adapts to the patient’s daily performance.",
  },
  {
    value: "60%",
    label: "faster deployment",
    project: "SnobBots",
    description:
      "Automated orchestration replaced repetitive tenant setup, helping resellers provision secure AI assistants at scale.",
  },
  {
    value: "30+",
    label: "agencies on one platform",
    project: "Real Estate Management System",
    description:
      "A multi-tenant operating system connects CRM, compliance, documents, and marketing workflows without mixing agency data.",
  },
  {
    value: "50%",
    label: "shorter audit turnaround",
    project: "QA Review Agent",
    description:
      "Clause-level AI review turns a week of repetitive checking into traceable findings that auditors can verify and action.",
  },
  {
    value: "30+",
    label: "interviews completed",
    project: "Realtime Voice Interview Assistant",
    description:
      "Live voice interviews, transcription, invitations, and follow-up delivery run inside one automated recruitment workflow.",
  },
].map((outcome, index) => ({
  ...outcome,
  number: String(index + 1).padStart(2, "0"),
}));

export function HeadlineSection() {
  const [activeOutcome, setActiveOutcome] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setTimeout(
      () => setActiveOutcome((current) => (current + 1) % CLIENT_OUTCOMES.length),
      6000,
    );

    return () => window.clearTimeout(timer);
  }, [activeOutcome, isPaused]);

  const selectOutcome = (direction: 1 | -1) => {
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

            <div className="relative flex items-center justify-between border-b border-white/[0.08] bg-black/10 px-6 py-4 sm:px-7">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-emerald-400/25 bg-emerald-400/[0.06]">
                  <IconTrendingUp aria-hidden="true" className="h-4 w-4 text-emerald-300" stroke={1.7} />
                </span>
                <div className="min-w-0">
                  <span className="block font-mono text-[0.55rem] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
                    Project
                  </span>
                  <h3 className="mt-0.5 truncate text-base font-bold tracking-[-0.025em] text-white sm:text-lg">
                  {outcome.project}
                  </h3>
                </div>
              </div>
              <span className="font-mono text-[0.6rem] tracking-[0.14em] text-neutral-500">
                {outcome.number} / {CLIENT_OUTCOMES.length}
              </span>
            </div>

            <div className="relative min-h-64 px-6 py-6 sm:min-h-56 sm:px-7">
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
                  className="absolute inset-x-6 top-1/2 grid -translate-y-1/2 gap-5 sm:inset-x-7 sm:grid-cols-[0.78fr_1.22fr] sm:items-center sm:gap-7"
                  aria-live="polite"
                >
                  <div className="border-l-2 border-emerald-400 bg-emerald-400/[0.045] px-4 py-4">
                    <p className="text-5xl font-black leading-none tracking-[-0.075em] text-white sm:text-6xl">
                      {outcome.value}
                    </p>
                    <p className="mt-2 max-w-48 text-sm font-semibold leading-tight text-emerald-100 sm:text-base">
                      {outcome.label}
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[0.58rem] font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                      What changed
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300 sm:text-[0.92rem]">
                      {outcome.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors hover:border-emerald-400/50 hover:bg-emerald-400/[0.08] hover:text-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                >
                  <IconArrowLeft aria-hidden="true" className="h-4 w-4" stroke={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => selectOutcome(1)}
                  aria-label="Next outcome"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors hover:border-emerald-400/50 hover:bg-emerald-400/[0.08] hover:text-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                >
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
