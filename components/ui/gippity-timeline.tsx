import {
  IconArrowUpRight,
  IconBolt,
  IconRocket,
  IconRoute,
  IconSparkles,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

interface LifecycleStep {
  icon: Icon;
  number: string;
  title: string;
  detail: string;
  position: string;
  planet: string;
}

const LIFECYCLE_STEPS: LifecycleStep[] = [
  {
    icon: IconRoute,
    number: "01",
    title: "Define",
    detail: "Goals & user flows",
    position: "top-[7%] left-1/2 -translate-x-1/2",
    planet: "h-9 w-9 bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.8)]",
  },
  {
    icon: IconBolt,
    number: "02",
    title: "Build",
    detail: "Product & platform",
    position: "top-1/2 right-[2%] -translate-y-1/2 sm:right-[5%]",
    planet: "h-10 w-10 bg-emerald-400 shadow-[0_0_26px_rgba(52,211,153,0.75)]",
  },
  {
    icon: IconSparkles,
    number: "03",
    title: "Automate",
    detail: "AI & operations",
    position: "bottom-[7%] left-1/2 -translate-x-1/2",
    planet: "h-8 w-8 bg-violet-400 shadow-[0_0_24px_rgba(167,139,250,0.8)]",
  },
  {
    icon: IconRocket,
    number: "04",
    title: "Scale",
    detail: "Cloud & reliability",
    position: "top-1/2 left-[2%] -translate-y-1/2 sm:left-[5%]",
    planet: "h-11 w-11 bg-amber-300 shadow-[0_0_28px_rgba(252,211,77,0.72)]",
  },
];

export function GippityAITimeline() {
  return (
    <section className="w-full bg-transparent pb-24 md:pb-32">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.4fr_1fr] lg:items-center lg:gap-14">
        <header>
          <p className="nx-kicker">Product lifecycle</p>
          <h3 className="mt-4 max-w-sm text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-white md:text-5xl">
            From idea to momentum.
          </h3>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-400 sm:text-base">
            A product is never one thing. Each stage makes the next one stronger.
          </p>
        </header>

        <div className="relative mx-auto aspect-square w-full max-w-[34rem] overflow-hidden rounded-full border border-white/10 bg-neutral-950/35">
          <div aria-hidden="true" className="nx-grid-surface absolute inset-0 opacity-20" />
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
          >
            <circle cx="50" cy="50" r="21" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.22" />
            <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(52,211,153,0.25)" strokeWidth="0.25" strokeDasharray="1.2 1.4" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" />
            <path d="M50 5a45 45 0 0 1 45 45" fill="none" stroke="rgba(52,211,153,0.65)" strokeWidth="0.5" strokeLinecap="round" />
          </svg>

          <div className="absolute top-1/2 left-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-emerald-300/50 bg-emerald-400/[0.08] text-center shadow-[0_0_50px_rgba(52,211,153,0.18)] sm:h-36 sm:w-36">
            <span className="font-mono text-[0.58rem] font-semibold tracking-[0.17em] text-emerald-300 uppercase">
              The result
            </span>
            <span className="mt-1 px-3 text-base font-bold leading-tight tracking-[-0.04em] text-white sm:text-lg">
              A product that moves
            </span>
          </div>

          {LIFECYCLE_STEPS.map(({ icon: Icon, number, title, detail, position, planet }) => (
            <div key={title} className={`absolute z-20 flex items-center gap-2.5 ${position}`}>
              <div className={`shrink-0 rounded-full border border-white/30 ${planet}`} />
              <div className="min-w-0 rounded-sm border border-white/10 bg-neutral-950/90 px-2.5 py-2 shadow-lg backdrop-blur-sm sm:px-3">
                <div className="flex items-center gap-1.5">
                  <Icon aria-hidden="true" className="h-3 w-3 text-emerald-300" stroke={1.8} />
                  <span className="font-mono text-[0.58rem] font-semibold tracking-[0.1em] text-neutral-500">{number}</span>
                </div>
                <p className="mt-1 text-sm font-bold leading-none text-white sm:text-base">{title}</p>
                <p className="mt-1 text-[0.62rem] leading-none text-neutral-400 sm:text-xs">{detail}</p>
              </div>
            </div>
          ))}

          <IconArrowUpRight
            aria-hidden="true"
            className="absolute top-[15%] right-[18%] h-3.5 w-3.5 rotate-12 text-emerald-300/75"
            stroke={1.5}
          />
        </div>
      </div>
    </section>
  );
}
