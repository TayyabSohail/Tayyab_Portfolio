import { IconBrandGithub, IconArrowUpRight } from "@tabler/icons-react";
import { GITHUB_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const USER = "TayyabSohail";

interface Day {
  date: string;
  count: number;
  /** 0 (none) to 4 (most), as GitHub buckets them. */
  level: number;
}

interface Contributions {
  total: number;
  days: Day[];
}

/**
 * Contribution calendar, fetched at build time and revalidated daily, then
 * drawn as plain divs. No third-party image and no client JS, so the section
 * ships as static HTML and cannot break if the upstream API goes away.
 */
async function getContributions(): Promise<Contributions | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const days: Day[] = Array.isArray(data.contributions)
      ? data.contributions
      : [];
    if (days.length === 0) return null;

    return { total: data.total?.lastYear ?? 0, days };
  } catch {
    return null;
  }
}

/** Tailwind class per contribution level. */
const LEVELS = [
  "bg-neutral-800",
  "bg-emerald-900",
  "bg-emerald-700",
  "bg-emerald-500",
  "bg-emerald-400",
];

export async function GithubStats() {
  const data = await getContributions();

  // Nothing to show rather than an empty frame if the API is unavailable.
  if (!data) return null;

  // Group into calendar weeks so each column is one week, as GitHub renders it.
  const weeks: Day[][] = [];
  for (let i = 0; i < data.days.length; i += 7) {
    weeks.push(data.days.slice(i, i + 7));
  }

  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 text-left backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 px-6 py-4">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-200">
          <IconBrandGithub aria-hidden="true" className="h-5 w-5" />
          {data.total.toLocaleString()} contributions in the last year
        </span>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-emerald-400 transition hover:text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
        >
          @{USER}
          <IconArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>

      <div className="overflow-x-auto px-6 py-5">
        <div
          role="img"
          aria-label={`GitHub contribution graph: ${data.total} contributions in the last year`}
          className="flex gap-[3px]"
        >
          {weeks.map((week) => (
            <div key={week[0].date} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} on ${day.date}`}
                  className={cn(
                    "h-[11px] w-[11px] shrink-0 rounded-[2px]",
                    LEVELS[day.level] ?? LEVELS[0]
                  )}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-neutral-500">
          Less
          {LEVELS.map((level) => (
            <span
              key={level}
              aria-hidden="true"
              className={cn("h-[11px] w-[11px] rounded-[2px]", level)}
            />
          ))}
          More
        </div>
      </div>
    </div>
  );
}
