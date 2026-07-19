import {
  IconLayoutGrid,
  IconSparkles,
  IconCloud,
} from "@tabler/icons-react";
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
    body: "From responsive frontends to scalable backends, I build complete products with end-to-end type safety, secure APIs, and databases designed to grow with your business.",
  },
  {
    icon: IconSparkles,
    index: "02",
    title: "AI Integration & Automation",
    headline: "AI built for real workflows",
    body: "I integrate LLMs, RAG, speech, and intelligent automations into existing products, using your own data so responses stay accurate and useful.",
  },
  {
    icon: IconCloud,
    index: "03",
    title: "Cloud & Backend Infrastructure",
    headline: "Reliable systems, simple deployments",
    body: "I build and deploy cloud-native applications with secure authentication, scalable databases, automated workflows, and production-ready infrastructure.",
  },
];

export const GippityAITimeline = () => {
  return (
    <section className="w-full bg-transparent pb-20">
      <div className="mx-auto w-full max-w-5xl px-6">
        <h3 className="mb-12 text-center text-4xl font-bold tracking-tight text-white md:text-5xl">
          What I Do
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {CAPABILITIES.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40"
            >
              {/* Accent wash + oversized index, both revealed on hover. */}
              <div className="absolute inset-0 -z-10 bg-linear-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-4 -z-10 font-mono text-7xl font-bold text-white/[0.04] transition duration-300 group-hover:text-emerald-400/10"
              >
                {item.index}
              </span>

              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 transition duration-300 group-hover:scale-110 group-hover:bg-emerald-500/20">
                <Icon
                  aria-hidden="true"
                  className="h-6 w-6 text-emerald-400"
                  stroke={1.75}
                />
              </span>

              <h4 className="mt-6 text-xs font-semibold uppercase tracking-widest text-emerald-400">
                <span className="font-mono">{item.index}.</span> {item.title}
              </h4>
              <p className="mt-2 text-xl font-bold tracking-tight text-white">
                {item.headline}
              </p>
              <p className="mt-3 text-justify leading-relaxed text-neutral-400 hyphens-auto">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
