"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export interface SocialLink {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SocialRailProps {
  items: SocialLink[];
}

/** mailto:/tel: links must open in place; only real URLs get a new tab. */
function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/**
 * Contact links pinned to the right edge behind a labelled tab. Kept closed by
 * default so the icons can never sit over the text column — they slide out only
 * when the tab is activated, and close again on Escape or outside click.
 */
export function SocialRail({ items }: SocialRailProps) {
  const [open, setOpen] = useState(false);
  const railRef = useRef<HTMLElement>(null);

  // A fixed overlay that swallows clicks or traps focus would be worse than the
  // problem it solves, so dismissal is handled with plain listeners instead.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!railRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <nav
      ref={railRef}
      aria-label="Contact and social links"
      className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 items-center"
    >
      {/* Tab: flush to the screen edge, rounded on the left only. Shares the
          panel's surface so the rail reads as one object, and names its own
          purpose — a bare arrow read as a generic drawer handle. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Hide contact links" : "Show contact links"}
        className="group flex w-9 cursor-pointer flex-col items-center gap-2.5 rounded-l-xl border border-r-0 border-neutral-200 bg-white/80 py-4 text-neutral-500 shadow-lg backdrop-blur-md transition-colors hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-400 dark:hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400"
          aria-hidden="true"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 6 10-6" />
        </svg>
        <span
          className="text-[10px] font-medium tracking-[0.18em] uppercase [writing-mode:vertical-rl]"
          aria-hidden="true"
        >
          Get in touch
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3.5 w-3.5 shrink-0 opacity-60 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Panel: slides out from the right edge. The collapsed state is fully
          hidden from pointers and assistive tech, never just faded. */}
      <div
        className={`absolute right-full origin-right transition-all duration-300 ease-out ${
          open
            ? "translate-x-0 opacity-100"
            : "pointer-events-none invisible translate-x-4 opacity-0"
        }`}
      >
        <ul className="mr-px flex flex-col items-center gap-1 rounded-l-xl border border-r-0 border-neutral-200 bg-white/80 p-1.5 shadow-lg backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/70">
          {items.map((item) => {
            const external = isExternal(item.href);
            return (
              <li key={item.title} className="group/item relative">
                <Link
                  href={item.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={item.title}
                  tabIndex={open ? undefined : -1}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-emerald-500/10 hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden dark:text-neutral-400 dark:hover:text-emerald-400"
                >
                  <span className="h-5 w-5">{item.icon}</span>
                </Link>

                {/* Name on hover — the icons alone are guesswork otherwise.
                    Pointer-only: it would be redundant with the aria-label. */}
                <span
                  className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 translate-x-1 rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs font-medium whitespace-nowrap text-neutral-700 opacity-0 shadow-md transition duration-150 group-hover/item:translate-x-0 group-hover/item:opacity-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                  aria-hidden="true"
                >
                  {item.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
