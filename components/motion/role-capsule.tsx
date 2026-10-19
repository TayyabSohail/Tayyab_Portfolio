"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RoleCapsuleProps {
  roles: string[];
  /** Milliseconds each role stays on screen. */
  interval?: number;
  className?: string;
}

/**
 * One capsule that cycles through the given roles: the text slides up and
 * out while the next slides in. A live dot on the left and a row of position
 * dots on the right make it clear this is one of several, and a tap or click
 * advances to the next role. Only ever one line, so it sits cleanly under
 * the portrait at every width. Screen readers get the full list once instead
 * of a changing live region.
 */
export function RoleCapsule({ roles, interval = 2600, className }: RoleCapsuleProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (roles.length < 2) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % roles.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [roles.length, interval, index]);

  const role = roles[index] ?? roles[0];
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.button
      type="button"
      layout
      onClick={() => setIndex((current) => (current + 1) % roles.length)}
      transition={{ layout: { duration: 0.45, ease } }}
      style={{ borderRadius: 9999 }}
      aria-label={`Roles: ${roles.join(", ")}. Show next role`}
      className={cn(
        "inline-flex min-w-[18rem] cursor-pointer items-center gap-3 overflow-hidden border border-emerald-400/30 bg-emerald-400/10 py-2.5 pr-4 pl-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300 shadow-[0_0_28px_rgb(52_211_153/0.12)] backdrop-blur-sm transition-colors hover:border-emerald-400/50 hover:bg-emerald-400/15 focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:outline-none sm:min-w-[22rem] sm:gap-3.5 sm:py-3 sm:pr-5 sm:pl-5 sm:text-[13px]",
        className,
      )}
    >
      <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>

      <span aria-hidden="true" className="relative grid flex-1 text-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={role}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, filter: "blur(4px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -12, filter: "blur(4px)" }
            }
            transition={{ duration: reduceMotion ? 0.2 : 0.35, ease }}
            className="whitespace-nowrap"
          >
            {role}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* Position dots: the active one stretches into a short bar. */}
      <span aria-hidden="true" className="flex shrink-0 items-center gap-1">
        {roles.map((item, dot) => (
          <span
            key={item}
            className={cn(
              "h-1.5 rounded-full transition-all duration-400",
              dot === index ? "w-4 bg-emerald-400" : "w-1.5 bg-emerald-400/30",
            )}
          />
        ))}
      </span>
    </motion.button>
  );
}
