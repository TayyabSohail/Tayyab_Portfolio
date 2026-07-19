import Link from "next/link";

export interface SocialLink {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SocialRailProps {
  items: SocialLink[];
}

/**
 * Contact links as a vertical rail pinned to the right edge at every
 * breakpoint — never a bottom bar, so it can't sit over page content or
 * collide with the thumb zone on mobile.
 */
export function SocialRail({ items }: SocialRailProps) {
  return (
    <nav
      aria-label="Social links"
      className="fixed right-1.5 top-1/2 z-40 -translate-y-1/2 sm:right-3"
    >
      <ul className="flex flex-col items-center gap-0.5 rounded-full border border-neutral-800 bg-neutral-900/70 p-1 shadow-lg backdrop-blur-md sm:gap-1 sm:p-1.5">
        {items.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.title}
              className="group relative flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-emerald-500 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden sm:h-10 sm:w-10"
            >
              <span className="h-4 w-4 sm:h-5 sm:w-5">{item.icon}</span>

              {/* Label slides out to the left; pointer-only so it never
                  blocks taps on touch devices. */}
              <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs font-medium text-neutral-200 opacity-0 shadow-lg transition group-hover:opacity-100 lg:block">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
