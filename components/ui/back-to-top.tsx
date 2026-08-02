"use client";

import { IconArrowUp } from "@tabler/icons-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="group inline-flex items-center gap-2 border border-emerald-400/30 bg-emerald-400/[0.06] px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:bg-emerald-400 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
    >
      <IconArrowUp
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      Back to top
    </button>
  );
}
