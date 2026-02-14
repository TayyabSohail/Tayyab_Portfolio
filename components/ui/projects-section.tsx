"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiSupabase,
  SiStripe,
  SiTypescript,
  SiPosthog,
  SiLinear,
  SiFigma,
} from "react-icons/si";
import { FaDhl, FaServer } from "react-icons/fa";

const projects = [
  // -------------------- SEOMaven --------------------
  {
    title: "SEOMaven",
    shortDescription: "AI-Powered SEO & Content Platform",
    description:
      "A unified SEO platform that combines real-time keyword insights, AI-driven content generation, and automated rank tracking to streamline workflows and accelerate content production.",
    
    whatIDid: [
      "Engineered real-time SEO insights with DataForSEO and built a scalable OpenRouter-powered AI engine for rapid, high-quality content generation.",
      "Automated complex SEO workflows using Trigger.dev, handling bulk content processing, caching, and multi-locale SEO optimizations.",
    ],
    
    impact: [
      "Delivered 3× faster content production with fully automated AI workflows.",
      "Reduced keyword tracking costs by 50% through optimized batching and caching strategies.",
    ],
    
    techStack: [
      { icon: SiFigma, category: "UI/UX", tools: "Figma, Excalidraw", color: "#F24E1E" },
      { icon: SiNextdotjs, category: "Frontend", tools: "Next.js, TailwindCSS, ShadCN", color: "#FFFFFF" },
      { icon: SiSupabase, category: "Backend", tools: "Supabase, PostgreSQL, Trigger.dev", color: "#3ECF8E" },
      { icon: SiStripe, category: "Payment", tools: "Stripe", color: "#008CDD" },
      { icon: SiLinear, category: "Project Mgmt", tools: "Linear, Slack", color: "#5C6AC4" },
      { icon: SiPosthog, category: "Analytics", tools: "Posthog", color: "#FF6B6B" },
      { icon: FaServer, category: "Deployment", tools: "AWS EC2 + Lambda", color: "#FBBF24" },
      { icon: SiTypescript, category: "Languages", tools: "TypeScript", color: "#3178C6" },
    ],
    image: "/images/SEOMaven.png",
    link: "https://seomaven.ai",
  },

  // -------------------- UniBid --------------------
  {
    title: "UniBid",
    shortDescription: "Off-campus rentals platform.",
    description:
      "Developed a bidding-based rental marketplace with real-time notifications, role-based dashboards, and service booking for students, parents, and landlords.",

    whatIDid: [
      "Built a WebSocket-driven real-time bidding system with <200ms updates and optimized data models for listings, bids, and notifications.",
      "Developed secure role-based dashboards with server-side bid validation and a fast, responsive UI in Next.js.",
    ],

    impact: [
      "Supported 1,000+ concurrent users with smooth, conflict-free bid synchronization.",
      "Increased user engagement through instant updates and faster dashboard performance.",
    ],

    techStack: [
      { icon: SiFigma, category: "UI/UX", tools: "Figma, Excalidraw", color: "#F24E1E" },
      { icon: SiNextdotjs, category: "Frontend", tools: "Next.js, TailwindCSS, ShadCN", color: "#FFFFFF" },
      { icon: SiSupabase, category: "Backend", tools: "Supabase, PostgreSQL", color: "#3ECF8E" },
      { icon: SiStripe, category: "Payment", tools: "Stripe", color: "#008CDD" },
      { icon: SiLinear, category: "Project Mgmt", tools: "Linear, Slack", color: "#5C6AC4" },
      { icon: SiPosthog, category: "Analytics", tools: "Posthog", color: "#FF6B6B" },
    ],
    image: "/images/unibid.png",
    link: "https://unibid.ai",
  },

  // -------------------- Anina --------------------
  {
    title: "Anina",
    shortDescription: "Personalized ecommerce marketplace.",
    description:
      "Built a multi-seller ecommerce platform with a personalized recommendation engine, secure Stripe payments, and DHL API integration for automated order tracking.",

    whatIDid: [
      "Built an SSR-optimized recommendation engine and multi-tenant seller architecture in Supabase with secure data isolation.",
      "Integrated Stripe Connect for automated payouts and DHL API for end-to-end shipment tracking and order updates.",
    ],

    impact: [
      "Increased user engagement by 40% with personalized product recommendations.",
      "Reduced support tickets by 70% through automated checkout and shipping flows.",
    ],

    techStack: [
      { icon: SiFigma, category: "UI/UX", tools: "Figma, Excalidraw", color: "#F24E1E" },
      { icon: SiNextdotjs, category: "Frontend", tools: "Next.js, TS, TailwindCSS", color: "#FFFFFF" },
      { icon: SiSupabase, category: "Backend", tools: "Supabase", color: "#3ECF8E" },
      { icon: SiStripe, category: "Payment", tools: "Stripe", color: "#008CDD" },
      { icon: FaDhl, category: "Logistics", tools: "DHL API", color: "#FFCC00" },
      { icon: SiPosthog, category: "Analytics", tools: "Posthog", color: "#FF6B6B" },
    ],
    image: "/images/anina.png",
    link: "https://anina.app/",
  },
];

// Helper function to highlight numbers and key metrics
const highlightNumbers = (text: string) => {
  // Match numbers with units: 3×, 50%, 1,000+, <200ms, etc.
  const regex = /(<\d+ms|\d+[×x]|\d{1,3}(?:,\d{3})+[+]|\d+%|\d+[+])/gi;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(<span key={`text-${key++}`}>{text.substring(lastIndex, match.index)}</span>);
    }
    // Add highlighted number
    parts.push(
      <span
        key={`num-${key++}`}
        className="font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400"
      >
        {match[0]}
      </span>
    );
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(<span key={`text-${key++}`}>{text.substring(lastIndex)}</span>);
  }
  
  return parts.length > 0 ? <>{parts}</> : text;
};

export function ProjectsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="projects" className="relative py-20 bg-transparent text-neutral-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          My Projects
        </h2>
  
        <div ref={ref} className="relative">
          <motion.div
            style={{ height: beamHeight }}
            className="absolute left-4 top-0 w-[2px] bg-blue-500/50"
          />
  
          <div className="space-y-16 pl-10">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 bg-transparent backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg"
              >
                {/* Image Box */}
                <div className="shrink-0 rounded-xl overflow-hidden w-44 h-44 md:w-64 md:h-64 border border-white/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
  
                {/* Content */}
                <div className="flex-1 flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
  
                  <p className="text-sm italic text-neutral-400">
                    {project.shortDescription}
                  </p>
  
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {project.description}
                  </p>
  
                  {/* What I Did */}
                  <div className="mt-4 bg-transparent backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10">
                    <strong className="text-white">What I Did:</strong>
                    <ul className="list-disc list-inside text-neutral-300 mt-1 space-y-1">
                      {project.whatIDid.map((item, i) => (
                        <li key={i}>{highlightNumbers(item)}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div className="mt-3 bg-transparent backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10">
                    <strong className="text-white">Impact:</strong>
                    <ul className="list-disc list-inside text-neutral-300 mt-1 space-y-1">
                      {project.impact.map((item, i) => (
                        <li key={i}>{highlightNumbers(item)}</li>
                      ))}
                    </ul>
                  </div>
  
                  {/* Tech Stack */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((t, i) => {
                      const Icon = t.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-1 bg-transparent backdrop-blur-sm border border-white/10 rounded-lg px-2 py-1 text-xs text-neutral-200"
                        >
                          <Icon className="h-4 w-4" style={{ color: t.color }} />
                          <span>
                            <strong>{t.category}</strong>: {t.tools}
                          </span>
                        </div>
                      );
                    })}
                  </div>
  
                  {/* View Live */}
                  <div className="mt-5">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-800 hover:text-white outline outline-white/10 transition text-sm"
                    >
                      View Live →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
  
  
}