"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiTailwindcss,
  SiFlask,
  SiFirebase,
  SiKubernetes,
  SiDocker,
  SiPrometheus,
  SiGrafana,
  SiNodedotjs,
  SiAmazon,
  SiStripe,
  SiDhl,
  SiPaypal,
  SiPosthog,
  SiGooglecloud,
  SiMongodb,
  SiSupabase,
  SiExpress,
  SiFigma,
  SiPostgresql,
} from "react-icons/si";

// Custom Trigger.dev icon component
const TriggerDevIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const techCategories = [
  {
    title: "Frontend Development",
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
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "Flask", icon: SiFlask, color: "#FFFFFF" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Trigger.dev", icon: TriggerDevIcon, color: "#FF6B35" },
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "AWS", icon: SiAmazon, color: "#FF9900" },
      { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    ],
  },
  {
    title: "Payments & Services",
    items: [
      { name: "Stripe", icon: SiStripe, color: "#008CDD" },
      { name: "PayPal", icon: SiPaypal, color: "#003087" },
      { name: "DHL", icon: SiDhl, color: "#FFCC00" },
    ],
  },
  {
    title: "Tools & Analytics",
    items: [
      { name: "Posthog", icon: SiPosthog, color: "#FF6B6B" },
      { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
      { name: "Grafana", icon: SiGrafana, color: "#F46800" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
];

const TechCard = ({ tech }: { tech: { name: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string } }) => {
  const Icon = tech.icon;
  
  return (
    <div className="h-32 w-full flex flex-col items-center justify-center gap-3 p-4 bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex items-center justify-center w-12 h-12">
        <Icon 
          className="w-12 h-12" 
          style={{ color: tech.color }}
        />
      </div>
      <span className="font-medium text-neutral-200 text-sm text-center leading-tight">
        {tech.name}
      </span>
    </div>
  );
};

const TechCategory = ({
  category,
}: {
  category: (typeof techCategories)[0];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="mb-16"
  >
    <h3 className="text-3xl font-semibold text-center text-neutral-200 mb-8 inline-block border-b-4 border-transparent bg-linear-to-r from-sky-400 to-emerald-400 bg-size-[100%_4px] bg-no-repeat bg-bottom">
      {category.title}
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {category.items.map((tech) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <TechCard tech={tech} />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export function TechStackSection() {
  return (
    <section id="tech-stack" className="py-24 scroll-mt-20 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="relative inline-block text-4xl md:text-5xl font-bold bg-clip-text text-white">
            My Tech Stack
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-full"></span>
          </h2>

          <p className="text-2xl text-neutral-400 mt-4 max-w-2xl mx-auto">
            Tools, frameworks, and platforms I use to build high-performance
            apps.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {techCategories.map((category) => (
            <TechCategory key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
