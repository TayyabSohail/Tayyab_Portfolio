"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const projects = [
  {
    title: "PhysioVision",
    description:
      "Developed an AI-powered physiotherapy platform using Next.js, MERN, Vite, and Tailwind CSS with a responsive UI.",
    tags: [
      "Next.js",
      "Mistral",
      "Tailwind CSS",
      "MERN",
      "RAG",
      "Generative AI",
      "TensorFlow",
    ],
    image: "/images/PhysioVision.png",
    link: "https://github.com/TayyabSohail/PhysioVision",
  },
  {
    title: "PEP News Screening Platform",
    description:
      "Built a financial news screening platform for Bank Islami using React, Vite, and Tailwind CSS during internship at Aawaz AI.",
    tags: ["React", "Node.js", "Tailwind CSS"],
    image: "/images/Awaaz.png",
    link: "https://github.com/TayyabSohail/PEP_NEWS_Screening",
  },
  {
    title: "New Web Order",
    description:
      "Developed a commercial website with enhanced SEO, performance optimization, and clean design using Next.js and TypeScript.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    image: "/images/nwo.png",
    link: "https://www.newweborder.co/",
  },
  {
    title: "Wedding Events Planning App",
    description:
      "Designed and implemented a wedding management app using Java, MySQL, HTML, CSS, and JavaScript. Utilized functionalities like budgeting and venue search and created separate UIs for vendors and users.",
    tags: ["MERN", "JAVA", "SQL", "HTML/CSS"],
    image: "/images/marry.png",
    link: "https://github.com/TayyabSohail/Marriage-Event-Management-System-FULL-STACK-",
  },
];
const certifications = [
  {
    title: "AWS Academy Cloud Web Application Builder",
    link: "https://www.credly.com/badges/116d369d-7582-4683-b9f1-87121ad994af/print",
  },
  {
    title: "AWS Academy Cloud Data Pipeline Builder",
    link: "https://www.credly.com/earner/earned/badge/9c3853b9-f0d2-43c2-9f17-9b0d54c75d80",
  },
  {
    title: "AWS Academy Cloud Foundations",
    link: "http://credly.com/badges/081dcc5f-714e-4db6-a20b-4e7e0933fb8c",
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
      className="relative py-8 sm:py-12 md:py-16 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="w-full flex justify-center">
          <h2 className="relative pt-16 text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-14 text-neutral-200 inline-block">
            My Projects
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
          </h2>
        </div>

        <div ref={ref} className="relative">
          {/* Tracing beam */}
          <motion.div
            style={{ height: beamHeight }}
            className="absolute left-4 sm:left-6 md:left-8 top-0 w-0.5 md:w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"
          />

          <div className="space-y-10 sm:space-y-14 md:space-y-18 pl-8 sm:pl-12 md:pl-20">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-30px" }}
                className="relative"
              >
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-4 sm:gap-5 md:gap-6 items-start`}
                >
                  {/* Rock-solid image container */}
                  <div
                    className={`
                  w-full 
                  max-w-[400px] 
                  sm:max-w-[350px] 
                  md:max-w-[280px] 
                  lg:max-w-[240px]
                  aspect-[4/3] 
                  sm:aspect-[3/2] 
                  md:aspect-square 
                  relative 
                  rounded-xl 
                  overflow-hidden 
                  shadow-lg 
                  mx-auto 
                  md:mx-0
                `}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 280px, 240px"
                    />
                  </div>

                  {/* Content container with pixel-perfect calculations */}
                  <div
                    className={`
                  w-full 
                  md:w-[calc(100%-280px)] 
                  lg:w-[calc(100%-240px)]
                  flex 
                  flex-col 
                  ${index % 2 === 0 ? "md:pl-6" : "md:pr-6"} 
                  py-1 
                  md:py-2
                `}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-neutral-200">
                      {project.title}
                    </h3>
                    <p className="text-base sm:text-lg md:text-[17px] mb-4 sm:mb-5 text-neutral-400">
                      {project.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline font-medium text-sm sm:text-base"
                      >
                        View Project →
                      </a>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 sm:px-3 py-1 bg-neutral-800 rounded-full text-xs sm:text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications Section */}
          <div className="pt-24">
            <div className="w-full flex justify-center">
              <h2 className="relative text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-12 text-neutral-200 inline-block">
                Certifications
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full"></span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-12 md:px-20">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative bg-gradient-to-br from-[#1f2937] to-[#111827] border border-blue-600/30 rounded-xl p-6 shadow-lg hover:shadow-blue-600/30 transition duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl shadow-md mb-4">
                      🎓
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-100 mb-2">
                      {cert.title}
                    </h3>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 underline hover:text-blue-300 transition"
                    >
                      View Certificate →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
