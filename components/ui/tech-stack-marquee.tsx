"use client";

import type { ComponentType, CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  SiAmazon,
  SiDhl,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFlask,
  SiGithubactions,
  SiGo,
  SiGooglecloud,
  SiGrafana,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiAnthropic,
  SiLangchain,
  SiPaypal,
  SiPostgresql,
  SiPosthog,
  SiPrometheus,
  SiPython,
  SiReact,
  SiRender,
  SiReplit,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiZapier,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import {
  FaDatabase,
  FaMapMarkedAlt,
  FaProjectDiagram,
  FaRobot,
  FaServer,
} from "react-icons/fa";

type TechIcon = ComponentType<{
  className?: string;
  style?: CSSProperties;
}>;

interface TechItem {
  name: string;
  icon: TechIcon;
  color: string;
}

interface TechCategory {
  title: string;
  description: string;
  items: TechItem[];
}

function TriggerDevIcon({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const techCategories: TechCategory[] = [
  {
    title: "Frontend Development",
    description: "Interfaces, design systems and production web applications.",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend & Databases",
    description: "APIs, data models, background jobs and vector retrieval.",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "Flask", icon: SiFlask, color: "#FFFFFF" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    title: "AI & Automation",
    description: "Agents, model orchestration, retrieval and durable workflows.",
    items: [
      { name: "OpenAI", icon: SiOpenai, color: "#10A37F" },
      { name: "Claude", icon: SiAnthropic, color: "#D4A27F" },
      { name: "LangGraph", icon: FaProjectDiagram, color: "#34D399" },
      { name: "LangChain", icon: SiLangchain, color: "#1C3C3C" },
      { name: "OpenRouter", icon: FaRobot, color: "#A855F7" },
      { name: "Trigger.dev", icon: TriggerDevIcon, color: "#FF6B35" },
      { name: "Zapier", icon: SiZapier, color: "#FF4F00" },
      { name: "n8n", icon: SiN8N, color: "#EA4B71" },
      { name: "Pinecone", icon: FaDatabase, color: "#60A5FA" },
    ],
  },
  {
    title: "Cloud & Deployment",
    description: "Infrastructure, containers and reliable delivery pipelines.",
    items: [
      { name: "AWS", icon: SiAmazon, color: "#FF9900" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Coolify", icon: FaServer, color: "#60A5FA" },
      { name: "Replit", icon: SiReplit, color: "#F26207" },
      { name: "Render", icon: SiRender, color: "#FFFFFF" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
      { name: "Azure", icon: VscAzure, color: "#0078D4" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
    ],
  },
  {
    title: "Payments & Services",
    description: "Payments, AI providers and third-party product integrations.",
    items: [
      { name: "Stripe", icon: SiStripe, color: "#635BFF" },
      { name: "PayPal", icon: SiPaypal, color: "#009CDE" },
      { name: "Data for SEO", icon: FaDatabase, color: "#22C55E" },
      { name: "DHL", icon: SiDhl, color: "#FFCC00" },
      { name: "Google Maps API", icon: FaMapMarkedAlt, color: "#34A853" },
    ],
  },
  {
    title: "Tools & Analytics",
    description: "Observability, product analytics and collaborative design.",
    items: [
      { name: "PostHog", icon: SiPosthog, color: "#F9BD2B" },
      { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
      { name: "Grafana", icon: SiGrafana, color: "#F46800" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
];

function TechChip({ tech }: { tech: TechItem }) {
  const Icon = tech.icon;
  return (
    <li
      className="inline-flex h-10 items-center gap-2.5 border border-white/[0.12] bg-white/[0.03] pl-1.5 pr-3.5 text-[13px] font-medium text-neutral-200 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.06]"
      title={tech.name}
    >
      <span
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/[0.08]"
        style={{ backgroundColor: `${tech.color}1f` }}
      >
        <Icon className="h-3.5 w-3.5" style={{ color: tech.color }} />
      </span>
      <span className="whitespace-nowrap">{tech.name}</span>
    </li>
  );
}

function CategoryPanel({
  category,
  index,
}: {
  category: TechCategory;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      viewport={{ once: true, margin: "-60px" }}
      className="relative flex flex-col bg-[#0f0f0f]/95 p-6 sm:p-7"
    >
      <div
        aria-hidden="true"
        className="nx-grid-surface absolute inset-0 opacity-20"
      />

      <header className="relative">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl font-bold tracking-[-0.03em] text-white">
            {category.title}
          </h3>
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-emerald-400/80">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-3 min-h-[2.75rem] max-w-sm text-sm leading-relaxed text-neutral-400">
          {category.description}
        </p>
      </header>

      <div className="relative mt-6 h-px w-full bg-white/10" />

      <ul className="relative mt-6 flex flex-wrap gap-2">
        {category.items.map((tech) => (
          <TechChip key={tech.name} tech={tech} />
        ))}
      </ul>
    </motion.article>
  );
}

export function TechStackSection() {
  return (
    <section id="tech-stack" className="scroll-mt-28 bg-transparent py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="mb-14 grid gap-6 border-b border-white/10 pb-10 md:grid-cols-[1fr_0.9fr] md:items-end">
          <div>
            <p className="nx-kicker">Technical toolkit</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              Tech Stack
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-neutral-300 md:justify-self-end md:text-lg">
            Tools, frameworks and platforms I use to design, build and operate
            production software end to end.
          </p>
        </div>

        <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {techCategories.map((category, index) => (
            <CategoryPanel
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
