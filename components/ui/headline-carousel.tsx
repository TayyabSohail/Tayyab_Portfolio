"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { IconArrowLeft, IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { ProjectMockup } from "@/components/mockups/project-mockup";
import { CountUp } from "@/components/motion/count-up";
import type { HeadlineOutcome } from "@/components/ui/headline-section";

interface HeadlineCarouselProps {
  outcomes: HeadlineOutcome[];
}

/**
 * Auto-advancing carousel of headline results. Each slide leads with the
 * product on devices, full width, then the figure counting up beside why it
 * mattered. Pauses while hovered or focused.
 */
export function HeadlineCarousel({ outcomes }: HeadlineCarouselProps) {
  const [activeOutcome, setActiveOutcome] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = current + 100 / 70;

        if (next >= 100) {
          setActiveOutcome((active) => (active + 1) % outcomes.length);
          return 0;
        }

        return next;
      });
    }, 100);

    return () => window.clearInterval(timer);
  }, [isPaused, outcomes.length]);

  const selectOutcome = (direction: 1 | -1) => {
    setProgress(0);
    setActiveOutcome(
      (current) => (current + direction + outcomes.length) % outcomes.length,
    );
  };

  const outcome = outcomes[activeOutcome];
  if (!outcome) return null;

  const caseStudyHref = `/case-studies/${outcome.project.slug}`;

  return (
    <section className="w-full bg-transparent py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-10 border-b border-white/10 pb-12 md:grid-cols-[0.5fr_1.5fr] md:gap-10 lg:gap-14">
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

            <div className="relative flex items-center justify-between gap-4 border-b border-white/[0.08] bg-black/15 px-6 py-4 sm:px-7">
              <div className="flex min-w-0 items-center gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-emerald-400/30 bg-emerald-400/[0.08]">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.8)]" />
                </span>
                <div className="min-w-0">
                  <span className="block font-mono text-[0.55rem] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
                    Featured project
                  </span>
                  <h3 className="mt-0.5 line-clamp-2 text-lg font-bold leading-tight tracking-[-0.035em] text-white sm:text-xl">
                    {outcome.project.title}
                  </h3>
                </div>
              </div>
              <span className="hidden shrink-0 font-mono text-[0.58rem] tracking-[0.16em] text-neutral-500 uppercase sm:block">
                {String(activeOutcome + 1).padStart(2, "0")} / {String(outcomes.length).padStart(2, "0")}
              </span>
            </div>

            {/* Old and new slides share one grid cell, so the panel keeps the
                taller slide's height while they cross-fade. */}
            <div className="relative grid">
              <AnimatePresence initial={false}>
                <motion.div
                  key={outcome.project.slug}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -12, transition: { duration: 0.25 } }
                  }
                  transition={{
                    duration: reduceMotion ? 0.15 : 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="col-start-1 row-start-1 [&:not(:last-child)]:pointer-events-none"
                  aria-live="polite"
                >
                  {/* The product, full width: the picture is the point. The
                      plate keeps the same 16:11 proportions as the project
                      cards so the devices fill it on large screens. */}
                  <Link
                    href={caseStudyHref}
                    aria-label={`${outcome.project.title} case study`}
                    tabIndex={-1}
                    className="group/shot block overflow-hidden border-b border-white/[0.08] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                  >
                    <ProjectMockup
                      project={outcome.project}
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="transition-transform duration-700 group-hover/shot:scale-[1.015]"
                    />
                  </Link>

                  <div className="grid gap-6 px-6 py-6 sm:px-7 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-0">
                    <div className="md:pr-8">
                      <p className="font-mono text-[0.58rem] font-semibold tracking-[0.14em] text-emerald-300/75 uppercase">
                        Project outcome
                      </p>
                      <p className="mt-3 text-5xl font-black leading-none tracking-[-0.06em] text-emerald-300 [text-shadow:0_0_28px_rgb(52_211_153/0.2)] sm:text-6xl">
                        <CountUp value={outcome.value} duration={1.4} />
                      </p>
                      <p className="mt-3 text-base font-bold leading-tight text-white">
                        {outcome.label}
                      </p>
                    </div>

                    <div className="flex flex-col border-t border-white/[0.08] pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-8">
                      <p className="font-mono text-[0.58rem] font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                        Why it matters
                      </p>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-neutral-300">
                        {outcome.description}
                      </p>
                      <Link
                        href={caseStudyHref}
                        className="group mt-auto inline-flex w-fit items-center gap-2 border-b border-emerald-400/35 pt-5 pb-1 font-mono text-[0.62rem] font-semibold tracking-[0.11em] text-emerald-300 uppercase transition-colors hover:border-emerald-300 hover:text-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                      >
                        View case study
                        <IconArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" stroke={1.7} />
                      </Link>
                    </div>
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
              <div className="flex max-w-[70%] gap-1" aria-label={`Slide ${activeOutcome + 1} of ${outcomes.length}`}>
                {outcomes.map((item, index) => (
                  <span
                    key={item.project.slug}
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
