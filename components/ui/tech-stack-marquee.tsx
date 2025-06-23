"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiVite,
  SiTailwindcss,
  SiFlask,
  SiFirebase,
  SiKubernetes,
  SiDocker,
  SiPrometheus,
  SiGrafana,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  SiPytorch,
  SiNodedotjs,
  SiAmazon,
  SiSupabase,
  SiGooglecloud,
  SiMongodb,
  SiExpress,
  SiGithub,
} from "react-icons/si";

const techCategories = [
  {
    title: "Frontend Development",
    items: [
      { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
      {
        name: "Next.js",
        icon: <SiNextdotjs className="text-black dark:text-white" />,
      },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "Vite", icon: <SiVite className="text-[#646CFF]" /> },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-[#06B6D4]" />,
      },
    ],
  },
  {
    title: "Backend & Databases",
    items: [
      { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
      {
        name: "API Development",
        icon: <SiNextdotjs className="text-black dark:text-white" />,
      },
      {
        name: "Express.js",
        icon: <SiExpress className="text-black dark:text-white" />,
      },
      {
        name: "Flask",
        icon: <SiFlask className="text-black dark:text-white" />,
      },
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      {
        name: "NoSQL",
        icon: <SiMongodb className="text-[#47A248]" />,
      },
      {
        name: "SQL",
        icon: <SiFirebase className="text-[#FFCA28]" />,
      },
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "AWS", icon: <SiAmazon className="text-[#FF9900]" /> },
      {
        name: "Google Cloud",
        icon: <SiGooglecloud className="text-[#4285F4]" />,
      },
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "Kubernetes", icon: <SiKubernetes className="text-[#326CE5]" /> },
      {
        name: "CI/CD",
        icon: <SiGithub className="text-black dark:text-white" />,
      },
      {
        name: "Monitoring (Prometheus)",
        icon: <SiPrometheus className="text-[#E6522C]" />,
      },
      {
        name: "Visualization (Grafana)",
        icon: <SiGrafana className="text-[#F46800]" />,
      },
    ],
  },
  {
    title: "LLMs & Generative AI",
    items: [
      {
        name: "Prompt Engineering",
        icon: <span className="text-2xl">🧠</span>,
      },
      { name: "RAG Systems", icon: <span className="text-2xl">🔍</span> },
      { name: "Text Generation", icon: <span className="text-2xl">✍️</span> },
      { name: "Image Generation", icon: <span className="text-2xl">🖼️</span> },
    ],
  },
  {
    title: "ML & Deep Learning",
    items: [
      {
        name: "Supervised Learning",
        icon: <span className="text-2xl">📘</span>,
      },
      {
        name: "Unsupervised Learning",
        icon: <span className="text-2xl">📙</span>,
      },
      { name: "Deep Learning", icon: <span className="text-2xl">🧠</span> },
      { name: "Model Deployment", icon: <span className="text-2xl">🚀</span> },
    ],
  },
];

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
    <h3 className="text-3xl font-semibold text-center text-neutral-200 mb-6 inline-block border-b-4 border-transparent bg-gradient-to-r from-sky-400 to-emerald-400 bg-[length:100%_4px] bg-no-repeat bg-bottom">
      {category.title}
    </h3>

    <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
      {category.items.map((tech) => (
        <div
          key={tech.name}
          className="flex items-center gap-3 p-4 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.04] transition-all duration-300"
        >
          <div className="text-3xl">{tech.icon}</div>
          <span className="font-medium text-neutral-200 text-sm leading-snug">
            {tech.name}
          </span>
        </div>
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
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
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
