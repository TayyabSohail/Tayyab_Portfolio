"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const proficiencies = [
  "Web products ready to scale",
  "AI agents for real workflows",
  "Automation that saves teams time",
  "Cloud systems that stay reliable",
  "Software architecture built to last",
];

export function HeadlineSection() {
  const [activeProficiency, setActiveProficiency] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const nextProficiency = (activeProficiency + 1) % proficiencies.length;

  useEffect(() => {
    if (isPaused) return;

    const id = window.setTimeout(() => {
      setActiveProficiency((current) => (current + 1) % proficiencies.length);
    }, 2800);

    return () => window.clearTimeout(id);
  }, [activeProficiency, isPaused]);

  return (
    <section className="w-full bg-transparent py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="grid items-start gap-10 border-b border-white/10 pb-12 md:grid-cols-[0.58fr_1.42fr] md:gap-10 lg:gap-14">
          <div>
            <p className="nx-kicker">About</p>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.045em] text-white md:text-5xl lg:text-6xl">
              Building beyond the brief.
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-emerald-300/20 bg-[linear-gradient(145deg,rgba(16,185,129,0.14),rgba(10,10,10,0.96)_48%,rgba(16,185,129,0.06))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="nx-grid-surface pointer-events-none absolute inset-0 opacity-35 [mask-image:linear-gradient(to_bottom_right,black,transparent_72%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl"
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,0.95)]"
                />
                <p className="font-mono text-[0.68rem] font-bold tracking-[0.2em] text-emerald-200 uppercase sm:text-xs">
                  Production engineering
                </p>
              </div>

              <p className="mt-7 max-w-3xl text-3xl font-black leading-[1.06] tracking-[-0.05em] text-white sm:text-4xl lg:text-[2.75rem]">
                Full Stack Developer building systems that perform when the
                <span className="text-emerald-300"> stakes are real.</span>
              </p>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                I engineer modern web platforms, AI systems, and resilient cloud
                infrastructure. From marketplaces that move real money to
                multitenant products that power real teams.
              </p>

              <div className="mt-8 inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] py-2.5 pr-5 pl-3 backdrop-blur-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-300 text-xs font-black text-emerald-950">
                  CS
                </span>
                <p className="text-sm font-semibold text-neutral-100 sm:text-base">
                  Computer Science graduate
                  <span className="mx-2 text-emerald-300" aria-hidden="true">
                    &bull;
                  </span>
                  FAST NUCES Islamabad
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-b border-white/10 py-8 sm:py-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          <p className="nx-kicker text-center">What I build</p>

          <div className="relative mt-5 h-36 overflow-hidden border border-white/10 bg-emerald-500/[0.035] px-5 [perspective:900px] sm:h-40 sm:px-8">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 mx-auto h-px w-28 bg-linear-to-r from-transparent via-emerald-400 to-transparent sm:w-40"
            />

            <AnimatePresence initial={false} mode="sync">
              <motion.p
                key={proficiencies[activeProficiency]}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, rotateX: -28 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -30, rotateX: 24 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-5 top-0 z-10 flex h-24 items-center justify-center text-center text-balance text-xl font-bold tracking-[-0.03em] text-white [transform-origin:center_top] [transform-style:preserve-3d] sm:inset-x-8 sm:h-28 sm:text-3xl"
                aria-live="polite"
              >
                {proficiencies[activeProficiency]}
              </motion.p>
            </AnimatePresence>

            <motion.p
              key={`next-${proficiencies[nextProficiency]}`}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 0.24, y: 0 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
              className="absolute inset-x-5 bottom-4 truncate text-center text-sm font-semibold tracking-[-0.02em] text-emerald-100 blur-[0.25px] sm:inset-x-8 sm:bottom-5 sm:text-base"
            >
              {proficiencies[nextProficiency]}
            </motion.p>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-[#050807]/75 to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
