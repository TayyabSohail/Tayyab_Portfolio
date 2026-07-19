"use client";

import Link from "next/link";
import { useState } from "react";

export interface SocialLink {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SocialRailProps {
  items: SocialLink[];
}

/**
 * Contact links pinned to the right edge, collapsed behind a green arrow tab
 * at every breakpoint. Kept closed by default so the icons can never sit over
 * the text column — they slide out only when the tab is activated.
 */
export function SocialRail({ items }: SocialRailProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Social links"
      className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 items-center"
    >
      {/* Arrow tab: flush to the screen edge, rounded on the left only. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Hide social links" : "Show social links"}
        className="flex h-12 w-6 items-center justify-center rounded-l-md bg-emerald-500 text-neutral-950 shadow-lg transition hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:outline-hidden"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Icons: slide out from the right edge when open. Collapsed state is
          fully hidden from pointers and assistive tech, never just faded. */}
      <div
        className={`absolute right-full origin-right transition-all duration-300 ease-out ${
          open
            ? "translate-x-0 opacity-100"
            : "pointer-events-none invisible translate-x-full opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-1 rounded-l-full border border-r-0 border-neutral-800 bg-neutral-900/70 p-1.5 shadow-lg backdrop-blur-md">
        {items.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.title}
              className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 transition hover:bg-emerald-500 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
            >
              <span className="h-5 w-5">{item.icon}</span>
            </Link>
          </li>
        ))}
        </ul>
      </div>
    </nav>
  );
}
