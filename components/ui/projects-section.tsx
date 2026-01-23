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
  {
    title: "SEOMaven",
    shortDescription: "AI-driven platform for smarter SEO growth.",
    description:
      "An all-in-one SEO & content platform integrating DataForSEO, OpenRouter AI, and content generation, and rank tracking.",
    challenges: [
      "Fragmented SEO workflow with multiple disconnected tools.",
      "Accessing real-time keyword and SERP data reliably.",
      "Scaling bulk content generation while maintaining SEO quality and localization.",
    ],
    actions: [
      "Integrated DataForSEO API for keyword research, SERP analysis, and ranking data.",
      "Built automated content generation with OpenRouter AI using template-based rendering.",
      "Optimized Supabase schema and backend workflows for bulk processing and caching.",
    ],
    results: [
      "Reduced article production time and cost by ~3x with automated AI workflows.",
      "Keyword tracking cost reduced by 50% with caching and batching.",
      "Maintained SEO standards and schema across multiple locales with JSON-LD.",
    ],
    techStack: [
      {
        icon: SiFigma,
        category: "UI/UX",
        tools: "Figma, Excalidraw",
        color: "#F24E1E",
      },
      {
        icon: SiNextdotjs,
        category: "Frontend",
        tools: "Next.js, TailwindCSS, ShadCN",
        color: "#FFFFFF",
      },
      {
        icon: SiSupabase,
        category: "Backend",
        tools: "Supabase, PostgreSQL, Trigger.dev",
        color: "#3ECF8E",
      },
      {
        icon: SiStripe,
        category: "Payment",
        tools: "Stripe",
        color: "#008CDD",
      },
      {
        icon: SiLinear,
        category: "Project Mgmt",
        tools: "Linear, Slack",
        color: "#5C6AC4",
      },
      {
        icon: SiPosthog,
        category: "Analytics",
        tools: "Posthog",
        color: "#FF6B6B",
      },
      {
        icon: FaServer,
        category: "Deployment",
        tools: "AWS EC2 + Lambda",
        color: "#FBBF24",
      },
      {
        icon: SiTypescript,
        category: "Languages",
        tools: "TypeScript",
        color: "#3178C6",
      },
    ],
    image: "/images/SEOMaven.png",
    link: "https://seomaven.ai",
  },
  {
    title: "UniBid",
    shortDescription: "Off-campus rentals platform.",
    description:
      "Developed a bidding-based rental marketplace with real-time notifications, role-based dashboards, and service booking for students, parents, and landlords.",
    challenges: [
      "Implementing real-time bid updates across multiple users simultaneously.",
      "Role-based access with secure parent/student/landlord permissions.",
      "Handling complex data structures for listings, bids, and user interactions.",
    ],
    actions: [
      "Built WebSocket & Supabase real-time DB sync for live bid updates.",
      "Implemented JWT-based role authorization and secure API endpoints.",
      "Designed scalable data models for properties, users, and bids.",
    ],
    results: [
      "Real-time bidding with <200ms latency for 1000+ concurrent users.",
      "Enhanced security and data integrity with role-based access control.",
      "Improved UX with fast-loading, responsive listing and dashboard pages.",
    ],
    techStack: [
      {
        icon: SiFigma,
        category: "UI/UX",
        tools: "Figma, Excalidraw",
        color: "#F24E1E",
      },
      {
        icon: SiNextdotjs,
        category: "Frontend",
        tools: "Next.js, TailwindCSS, ShadCN",
        color: "#FFFFFF",
      },
      {
        icon: SiSupabase,
        category: "Backend",
        tools: "Supabase, PostgreSQL",
        color: "#3ECF8E",
      },
      {
        icon: SiStripe,
        category: "Payment",
        tools: "Stripe",
        color: "#008CDD",
      },
      {
        icon: SiLinear,
        category: "Project Mgmt",
        tools: "Linear, Slack",
        color: "#5C6AC4",
      },
      {
        icon: SiPosthog,
        category: "Analytics",
        tools: "Posthog, GTM",
        color: "#FF6B6B",
      },
    ],
    image: "/images/unibid.png",
    link: "https://unibid.ai",
  },
  {
    title: "Anina",
    shortDescription: "Personalized ecommerce marketplace.",
    description:
      "Built a multi-seller ecommerce platform with a personalized recommendation engine, secure Stripe payments, and DHL API integration for automated order tracking.",
    challenges: [
      "Implementing recommendation engine for thousands of SKUs in real-time.",
      "Multi-tenant architecture for sellers with isolated data and dashboards.",
      "Integrating Stripe payouts and DHL tracking while ensuring compliance.",
    ],
    actions: [
      "Developed recommendation engine using collaborative filtering & Next.js SSR.",
      "Created multi-tenant Supabase schema for secure seller isolation.",
      "Automated order processing, payment, and shipping pipelines via API integrations.",
    ],
    results: [
      "Personalized recommendations increased user engagement by 40%.",
      "Seller dashboard adoption reached 95% within first month.",
      "Checkout & shipping automation reduced manual support tickets by 70%.",
    ],
    techStack: [
      {
        icon: SiFigma,
        category: "UI/UX",
        tools: "Figma, Excalidraw",
        color: "#F24E1E",
      },
      {
        icon: SiNextdotjs,
        category: "Frontend",
        tools: "Next.js, TS, TailwindCSS",
        color: "#FFFFFF",
      },
      {
        icon: SiSupabase,
        category: "Backend",
        tools: "Supabase",
        color: "#3ECF8E",
      },
      {
        icon: SiStripe,
        category: "Payment",
        tools: "Stripe",
        color: "#008CDD",
      },
      {
        icon: FaDhl,
        category: "Logistics",
        tools: "DHL API",
        color: "#FFCC00",
      },
      {
        icon: SiPosthog,
        category: "Analytics",
        tools: "Posthog",
        color: "#FF6B6B",
      },
    ],
    image: "/images/anina.png",
    link: "https://anina.app/",
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="projects"
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-neutral-200 relative inline-block">
          My Projects
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></span>
        </h2>

        <div ref={ref} className="relative">
          <motion.div
            style={{ height: beamHeight }}
            className="absolute left-4 sm:left-6 md:left-8 top-0 w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-600"
          />

          <div className="space-y-10 pl-6 sm:pl-10 md:pl-14">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row gap-6 bg-[#030608] rounded-2xl shadow-lg p-6 border border-gray-700">
                  {/* Image */}
                  <div className="flex-shrink-0 rounded-2xl bg-[#0b1220] flex items-center justify-center overflow-hidden w-44 h-44 md:w-64 md:h-64">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col gap-3">
                    <h3 className="text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm italic text-gray-300">
                      {project.shortDescription}
                    </p>
                    <p className="text-sm text-gray-200">
                      {project.description}
                    </p>

                    {/* Technical Challenges / Actions / Results */}
                    <div className="mt-3 flex flex-col gap-2 text-sm">
                      {project.challenges?.length > 0 && (
                        <div className="bg-gray-800/30 px-3 py-2 rounded-lg border-l-4 border-blue-500">
                          <strong className="text-blue-400">Challenges:</strong>
                          <ul className="list-disc list-inside text-gray-100 mt-1">
                            {project.challenges.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {project.actions?.length > 0 && (
                        <div className="bg-gray-800/30 px-3 py-2 rounded-lg border-l-4 border-green-400">
                          <strong className="text-green-400">Actions:</strong>
                          <ul className="list-disc list-inside text-gray-100 mt-1">
                            {project.actions.map((a, i) => (
                              <li key={i}>{a}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {project.results?.length > 0 && (
                        <div className="bg-gray-800/30 px-3 py-2 rounded-lg border-l-4 border-pink-400">
                          <strong className="text-pink-400">Results:</strong>
                          <ul className="list-disc list-inside text-gray-100 mt-1">
                            {project.results.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.map((t, i) => {
                        const Icon = t.icon;
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-1 bg-gray-800/30 rounded-lg px-2 py-1 text-xs"
                          >
                            <Icon
                              className="h-4 w-4"
                              style={{ color: t.color }}
                            />
                            <span>
                              <strong>{t.category}</strong>: {t.tools}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* View Live */}
                    <div className="mt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-sm"
                      >
                        View Live →
                      </a>
                    </div>
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
