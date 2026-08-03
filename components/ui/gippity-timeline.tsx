import {
  IconChartDots,
  IconCode,
  IconMap2,
  IconRocket,
  IconShieldCheck,
  IconTargetArrow,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

interface LifecycleStep {
  icon: Icon;
  number: string;
  title: string;
  detail: string;
  position: string;
  layout: string;
  textAlign: string;
  planet: string;
}

const LIFECYCLE_STEPS: LifecycleStep[] = [
  {
    icon: IconTargetArrow,
    number: "01",
    title: "Planning",
    detail: "Goals, scope & success metrics",
    position: "top-[1%] left-1/2 -translate-x-1/2",
    layout: "flex-col items-center",
    textAlign: "items-center text-center",
    planet: "bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.75)]",
  },
  {
    icon: IconMap2,
    number: "02",
    title: "Product design",
    detail: "Experience, workflows & architecture",
    position: "top-[22%] right-0",
    layout: "flex-row items-center",
    textAlign: "items-start text-left",
    planet: "bg-blue-400 shadow-[0_0_24px_rgba(96,165,250,0.7)]",
  },
  {
    icon: IconCode,
    number: "03",
    title: "Development",
    detail: "Interfaces, APIs & data",
    position: "right-0 bottom-[22%]",
    layout: "flex-row items-center",
    textAlign: "items-start text-left",
    planet: "bg-violet-400 shadow-[0_0_24px_rgba(167,139,250,0.72)]",
  },
  {
    icon: IconShieldCheck,
    number: "04",
    title: "Security",
    detail: "Access, privacy & resilience",
    position: "bottom-[1%] left-1/2 -translate-x-1/2",
    layout: "flex-col-reverse items-center",
    textAlign: "items-center text-center",
    planet: "bg-emerald-400 shadow-[0_0_26px_rgba(52,211,153,0.72)]",
  },
  {
    icon: IconRocket,
    number: "05",
    title: "Deployment",
    detail: "Testing, cloud & release",
    position: "bottom-[22%] left-0",
    layout: "flex-row-reverse items-center",
    textAlign: "items-end text-right",
    planet: "bg-amber-300 shadow-[0_0_24px_rgba(252,211,77,0.68)]",
  },
  {
    icon: IconChartDots,
    number: "06",
    title: "Scale up",
    detail: "Measure, automate & improve",
    position: "top-[22%] left-0",
    layout: "flex-row-reverse items-center",
    textAlign: "items-end text-right",
    planet: "bg-rose-400 shadow-[0_0_24px_rgba(251,113,133,0.68)]",
  },
];

export function GippityAITimeline() {
  return (
    <section className="w-full bg-transparent pb-24 md:pb-32">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.4fr_1fr] lg:items-center lg:gap-14">
        <header>
          <p className="nx-kicker">Product lifecycle</p>
          <h3 className="mt-4 max-w-sm text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-white md:text-5xl">
            From planning to a secure, scalable product.
          </h3>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-400 sm:text-base">
            One connected lifecycle from the first decision to continuous growth.
          </p>
        </header>

        <div className="lifecycle-system relative mx-auto aspect-square w-full max-w-[36rem]">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
          >
            <circle cx="50" cy="50" r="18" fill="none" stroke="rgba(52,211,153,0.28)" strokeWidth="0.28" />
            <circle cx="50" cy="50" r="29" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.22" strokeDasharray="1.2 1.6" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.25" />
            <path d="M13.6 71a42 42 0 0 1 0-42" fill="none" stroke="rgba(52,211,153,0.24)" strokeWidth="0.35" strokeDasharray="1 1.6" />
          </svg>

          <div className="absolute top-1/2 left-1/2 z-10 flex h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-emerald-300/45 text-center shadow-[0_0_50px_rgba(52,211,153,0.13)]">
            <span className="font-mono text-[clamp(0.42rem,1.5vw,0.62rem)] font-semibold tracking-[0.15em] text-emerald-300 uppercase">
              The outcome
            </span>
            <span className="mt-1 px-2 text-[clamp(0.72rem,2.8vw,1.25rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
              Useful product.
              <br />
              Measurable value.
            </span>
          </div>

          <div aria-hidden="true" className="lifecycle-orbit absolute inset-[4%]">
            <span className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)] sm:h-3 sm:w-3" />
            <span className="absolute right-[7%] bottom-[19%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.85)] sm:h-2 sm:w-2" />
          </div>

          {LIFECYCLE_STEPS.map(
            ({ icon: Icon, number, title, detail, position, layout, textAlign, planet }) => (
              <div
                key={title}
                className={`absolute z-20 flex gap-2 sm:gap-3 ${position} ${layout}`}
              >
                <span
                  className={`flex h-[clamp(1.75rem,6vw,2.75rem)] w-[clamp(1.75rem,6vw,2.75rem)] shrink-0 items-center justify-center rounded-full border border-white/30 ${planet}`}
                >
                  <Icon
                    aria-hidden="true"
                    className="h-[42%] w-[42%] text-neutral-950/80"
                    stroke={2}
                  />
                </span>
                <span className={`flex w-[clamp(4.5rem,20vw,7rem)] flex-col [text-shadow:0_1px_8px_#000,0_0_12px_#000] ${textAlign}`}>
                  <span className="font-mono text-[clamp(0.42rem,1.6vw,0.58rem)] font-semibold tracking-[0.1em] text-neutral-500">
                    {number}
                  </span>
                  <span className="mt-0.5 text-[clamp(0.6rem,2.45vw,0.9rem)] font-bold leading-tight text-white">
                    {title}
                  </span>
                  <span className="mt-0.5 text-[clamp(0.46rem,1.8vw,0.66rem)] leading-tight text-neutral-400">
                    {detail}
                  </span>
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
