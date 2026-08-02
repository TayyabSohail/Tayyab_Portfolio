import { IconLayoutGrid, IconSparkles, IconCloud } from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

interface Capability {
  icon: Icon;
  index: string;
  title: string;
  headline: string;
  body: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: IconLayoutGrid,
    index: "01",
    title: "Full Stack Development",
    headline: "Production web applications",
    body: "Responsive frontends, secure APIs and scalable data models, built as one coherent product rather than disconnected layers.",
  },
  {
    icon: IconSparkles,
    index: "02",
    title: "AI Integration & Automation",
    headline: "AI built for real workflows",
    body: "LLMs, RAG, speech and intelligent automation grounded in business data and connected to the tools teams already use.",
  },
  {
    icon: IconCloud,
    index: "03",
    title: "Cloud & Infrastructure",
    headline: "Reliable systems, simple delivery",
    body: "Secure authentication, resilient databases, background workflows and deployment pipelines designed for production from day one.",
  },
];

export function GippityAITimeline() {
  return (
    <section className="w-full bg-transparent pb-24 md:pb-32">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.32fr_1fr] lg:gap-14">
        <header className="lg:pt-5">
          <p className="nx-kicker">Capabilities</p>
          <h3 className="mt-4 text-4xl font-bold tracking-[-0.045em] text-white md:text-5xl">
            What I do
          </h3>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-300">
            Product engineering across the application, intelligence and
            infrastructure layers.
          </p>
        </header>

        <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {CAPABILITIES.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="nx-panel nx-panel-interactive group min-h-72 p-5 sm:min-h-[340px] sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-[0.2em] text-emerald-400/65">
                  {item.index}
                </span>
                <Icon
                  aria-hidden="true"
                  className="h-7 w-7 text-emerald-400 transition-transform duration-300 group-hover:-translate-y-1"
                  stroke={1.4}
                />
              </div>

              <div className="mt-12 sm:mt-16">
                <p className="inline-flex min-h-10 items-center border-l-2 border-emerald-400 bg-emerald-400/10 px-3 py-2 font-mono text-sm font-bold leading-snug tracking-[-0.01em] text-emerald-200 shadow-[0_0_24px_rgba(52,211,153,0.08)]">
                  {item.title}
                </p>
                <h4 className="mt-5 text-2xl font-bold leading-tight tracking-[-0.025em] text-white">
                  {item.headline}
                </h4>
                <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
