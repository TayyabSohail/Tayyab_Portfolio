"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPostgresql,
  SiVite,
  SiTailwindcss,
  SiFlask,
  SiFirebase,
  SiMysql,
  SiKubernetes,
  SiDocker,
  SiPrometheus,
  SiGrafana,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  SiPytorch,
  SiNumpy,
  SiPandas,
  SiScipy,
  SiGooglecloud,
  SiMongodb,
  SiExpress,
  SiGithub,
  SiRedis,
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
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      {
        name: "Flask",
        icon: <SiFlask className="text-black dark:text-white" />,
      },
      {
        name: "Express",
        icon: <SiExpress className="text-black dark:text-white" />,
      },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
      { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "Kubernetes", icon: <SiKubernetes className="text-[#326CE5]" /> },
      {
        name: "GitHub Actions",
        icon: <SiGithub className="text-black dark:text-white" />,
      },
      { name: "Prometheus", icon: <SiPrometheus className="text-[#E6522C]" /> },
      { name: "Grafana", icon: <SiGrafana className="text-[#F46800]" /> },
      {
        name: "Google Cloud",
        icon: <SiGooglecloud className="text-[#4285F4]" />,
      },
      { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
    ],
  },
  {
    title: "AI/ML & Data Science",
    items: [
      { name: "TensorFlow", icon: <SiTensorflow className="text-[#FF6F00]" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-[#EE4C2C]" /> },
      { name: "Keras", icon: <SiKeras className="text-[#D00000]" /> },
      {
        name: "scikit-learn",
        icon: <SiScikitlearn className="text-[#F7931E]" />,
      },
      { name: "NumPy", icon: <SiNumpy className="text-[#4D77CF]" /> },
      { name: "Pandas", icon: <SiPandas className="text-[#150458]" /> },
      { name: "SciPy", icon: <SiScipy className="text-[#8CAAE6]" /> },
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

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {category.items.map((tech) => (
        <div
          key={tech.name}
          className="flex items-center gap-3 p-4 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.04] transition-all duration-300"
        >
          <div className="text-3xl">{tech.icon}</div>
          <span className="font-medium text-neutral-200 whitespace-nowrap">
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
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-white">
            My Tech Stack
          </h2>
          <p className="text-lg text-neutral-400 mt-4 max-w-2xl mx-auto">
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
