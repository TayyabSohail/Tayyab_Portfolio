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
  SiGooglecloud,
  SiGrafana,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
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
      { name: "Flask", icon: SiFlask, color: "#FFFFFF" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
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
      className={`nx-panel nx-panel-interactive group relative p-6 ${
        index === 1 || index === 2 || index === 4 ? "lg:col-span-2" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute -right-2 -top-7 font-mono text-8xl font-black text-white/[0.025] transition-colors group-hover:text-emerald-400/[0.07]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        aria-hidden="true"
        className="nx-grid-surface absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-70"
      />
      <span className="absolute left-0 top-7 h-12 w-px bg-emerald-400/70" />

      <header className="relative flex items-start gap-5 border-b border-white/10 pb-5">
        <span className="font-mono text-[10px] tracking-[0.2em] text-emerald-400/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {category.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-300">
            {category.description}
          </p>
        </div>
      </header>

      <ul
        className={`relative mt-5 grid grid-cols-1 gap-x-5 min-[420px]:grid-cols-2 ${
          index === 1 || index === 2 || index === 4
            ? "sm:grid-cols-3"
            : ""
        }`}
      >
        {category.items.map((tech) => {
          const Icon = tech.icon;
          return (
            <li
              key={tech.name}
              className="group/tool flex min-h-12 items-center gap-3 border-b border-white/[0.12] py-3 text-sm text-neutral-300 transition-all hover:border-emerald-400/40 hover:pl-1 hover:text-white"
            >
              <Icon
                aria-hidden="true"
                className="h-5 w-5 shrink-0 transition-transform group-hover/tool:scale-110"
                style={{ color: tech.color }}
              />
              <span>{tech.name}</span>
            </li>
          );
        })}
      </ul>
    </motion.article>
  );
}

export function TechStackSection() {
  return (
    <section id="tech-stack" className="scroll-mt-20 bg-transparent py-24">
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

        <div className="grid gap-px border border-white/10 bg-white/10 lg:grid-cols-3">
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
