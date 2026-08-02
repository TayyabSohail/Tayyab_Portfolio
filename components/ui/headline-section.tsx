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
              Engineering the whole system.
            </h2>
          </div>

          <div className="relative pt-1 md:pl-7 lg:pl-10">
            <span
              aria-hidden="true"
              className="absolute top-1 bottom-0 left-0 hidden w-px bg-linear-to-b from-emerald-400/80 via-white/10 to-transparent md:block"
            />

            <p className="font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-emerald-300/80 uppercase sm:text-xs">
              Product engineering &middot; Applied AI &middot; Cloud architecture
            </p>

            <p className="mt-6 max-w-3xl text-3xl font-black leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl lg:text-[2.7rem]">
              I turn complex ideas into complete, production-ready systems.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              My work spans product interfaces, backend architecture, AI agents,
              workflow automation, and cloud infrastructure. I connect every
              layer into software that is useful, reliable, and ready to grow.
            </p>

            <div className="mt-9 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-[9rem_1fr] sm:items-baseline">
              <p className="font-mono text-[0.65rem] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
                Foundation
              </p>
              <p className="text-sm text-neutral-300 sm:text-base">
                <span className="font-semibold text-neutral-200">
                  Computer Science graduate
                </span>
                <span className="mx-2 text-neutral-700" aria-hidden="true">
                  /
                </span>
                <span className="text-neutral-500">FAST NUCES Islamabad</span>
              </p>
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
