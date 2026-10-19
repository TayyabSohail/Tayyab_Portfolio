"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { IconArrowLeft, IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { ProjectMockup } from "@/components/mockups/project-mockup";
import type { HeadlineOutcome } from "@/components/ui/headline-section";

interface HeadlineCarouselProps {
  outcomes: HeadlineOutcome[];
}

/**
 * Auto-advancing carousel of headline results. Each slide shows the product
 * on devices beside its figure, so the number is always attached to the
 * thing that produced it. Pauses while hovered or focused.
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
        const next = current + 100 / 60;

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
                    {outcome.project.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Old and new slides share one grid cell, so the panel keeps the
                taller slide's height while they cross-fade. */}
            <div className="relative grid px-6 py-6 sm:px-7">
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
                  className="col-start-1 row-start-1 grid gap-5 [&:not(:last-child)]:pointer-events-none md:grid-cols-[1.1fr_0.9fr] md:gap-6"
                  aria-live="polite"
                >
                  <Link
                    href={caseStudyHref}
                    aria-label={`${outcome.project.title} case study`}
                    tabIndex={-1}
                    className="group/shot relative block overflow-hidden border border-white/10 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                  >
                    <ProjectMockup
                      project={outcome.project}
                      centered
                      sizes="(min-width: 1024px) 34vw, (min-width: 768px) 45vw, 90vw"
                      className="aspect-[16/11] transition-transform duration-500 group-hover/shot:scale-[1.02]"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-2 border border-white/10 bg-neutral-950/85 px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.16em] text-neutral-300 uppercase backdrop-blur-md">
                      <span aria-hidden="true" className="h-px w-3 bg-emerald-400" />
                      Live product
                    </span>
                  </Link>

                  <div className="flex flex-col gap-4">
                    <div className="relative overflow-hidden border border-emerald-400/20 bg-linear-to-br from-emerald-400/[0.13] via-emerald-400/[0.035] to-transparent px-5 py-4">
                      <div aria-hidden="true" className="nx-grid-surface absolute inset-0 opacity-35" />
                      <p className="relative font-mono text-[0.55rem] font-semibold tracking-[0.14em] text-emerald-300/75 uppercase">
                        Project outcome
                      </p>
                      <p className="relative mt-3 text-4xl font-black leading-none tracking-[-0.075em] text-emerald-300 [text-shadow:0_0_28px_rgb(52_211_153/0.2)] sm:text-5xl">
                        {outcome.value}
                      </p>
                      <p className="relative mt-2 max-w-52 text-sm font-bold leading-tight text-white">
                        {outcome.label}
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col">
                      <p className="font-mono text-[0.58rem] font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                        Why it matters
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                        {outcome.description}
                      </p>
                      <Link
                        href={caseStudyHref}
                        className="group mt-auto inline-flex w-fit items-center gap-2 border-b border-emerald-400/35 pt-4 pb-1 font-mono text-[0.62rem] font-semibold tracking-[0.11em] text-emerald-300 uppercase transition-colors hover:border-emerald-300 hover:text-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
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
