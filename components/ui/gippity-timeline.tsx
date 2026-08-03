import Link from "next/link";
import {
  IconArrowRight,
  IconCloud,
  IconLayoutGrid,
  IconSparkles,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import type { ProjectCategory } from "@/data/projects";

interface Capability {
  icon: Icon;
  index: string;
  title: string;
  statement: string;
  signals: string[];
  projectFilter: ProjectCategory | "All";
}

const CAPABILITIES: Capability[] = [
  {
    icon: IconLayoutGrid,
    index: "01",
    title: "Product systems",
    statement: "End-to-end platforms that work as one.",
    signals: ["Interfaces", "APIs", "Data", "Payments"],
    projectFilter: "SaaS",
  },
  {
    icon: IconSparkles,
    index: "02",
    title: "Applied AI",
    statement: "Agents and automation built into real workflows.",
    signals: ["RAG", "Voice", "Multi-agent", "Automation"],
    projectFilter: "AI",
  },
  {
    icon: IconCloud,
    index: "03",
    title: "Cloud architecture",
    statement: "Secure foundations for products that need to grow.",
    signals: ["Security", "Multi-tenancy", "Workflows", "Delivery"],
    projectFilter: "All",
  },
];

export function GippityAITimeline() {
  return (
    <section className="w-full bg-transparent pb-24 md:pb-32">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.32fr_1fr] lg:gap-14">
        <header className="lg:pt-2">
          <p className="nx-kicker">Capabilities</p>
          <h3 className="mt-4 max-w-xs text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-white md:text-5xl">
            From idea to infrastructure.
          </h3>
        </header>

        <div className="border-t border-white/15">
          {CAPABILITIES.map(({ icon: Icon, ...item }) => (
            <Link
              key={item.title}
              href={item.projectFilter === "All" ? "/#projects" : `/?category=${item.projectFilter}#projects`}
              aria-label={`View projects related to ${item.title}`}
              className="group relative grid cursor-pointer gap-5 border-b border-white/15 px-3 py-7 transition-all duration-300 hover:border-emerald-400/45 hover:bg-white/[0.035] hover:shadow-[inset_3px_0_0_rgb(52_211_153/0.9)] focus-visible:bg-white/[0.035] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400 focus-visible:outline-hidden md:grid-cols-[2.5rem_minmax(0,1fr)_auto] md:items-center md:gap-6 md:px-5 md:py-8"
            >
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-neutral-600 transition-colors group-hover:text-emerald-400">
                {item.index}
              </span>

              <div className="flex items-center gap-4 sm:gap-5">
                <Icon
                  aria-hidden="true"
                  className="h-8 w-8 shrink-0 text-emerald-400/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
                  stroke={1.25}
                />
                <div>
                  <h4 className="text-2xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-3xl">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-neutral-400 sm:text-base">
                    {item.statement}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 pl-[4.75rem] md:max-w-[19rem] md:items-end md:pl-0">
                <ul className="flex flex-wrap gap-2 md:justify-end">
                  {item.signals.map((signal) => (
                    <li
                      key={signal}
                      className="inline-flex items-center gap-2 border border-white/[0.09] bg-white/[0.025] px-2.5 py-1.5 font-mono text-[0.62rem] font-semibold tracking-[0.1em] whitespace-nowrap text-neutral-400 uppercase transition-colors group-hover:border-emerald-400/25 group-hover:bg-emerald-400/[0.04] group-hover:text-neutral-200"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 shrink-0 rounded-full bg-emerald-400/75"
                      />
                      {signal}
                    </li>
                  ))}
                </ul>

                <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-emerald-300/80 transition-colors group-hover:text-emerald-300">
                  View related work
                  <IconArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>

              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-0 bg-emerald-400 transition-all duration-500 group-hover:w-full"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
