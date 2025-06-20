"use client";
import { motion } from "framer-motion";

export function HeadlineSection() {
  return (
    <section className="w-full py-16 md:py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Animated Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white inline-block relative pb-2"
          >
            About Me
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
          </motion.h2>

          {/* Animated Paragraph */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 text-lg md:text-xl leading-8 text-gray-300"
          >
            I’m a{" "}
            <span className="font-semibold text-white">
              Full Stack Developer
            </span>{" "}
            based in{" "}
            <span className="text-blue-400 font-medium">Rawalpindi</span>,
            skilled in <span className="text-purple-400">MERN, Next.js</span>,
            and the modern web. With a{" "}
            <span className="text-white font-semibold">
              Bachelor’s in Computer Science
            </span>{" "}
            from <span className="text-blue-400">FAST NUCES Islamabad</span>, I
            bring{" "}
            <span className="font-semibold text-white">
              1+ year of experience
            </span>{" "}
            across freelance and tech industries. I’m passionate about{" "}
            <span className="text-purple-400 font-medium">
              high-performance UIs
            </span>{" "}
            and always exploring tools that help me build better, faster,
            smarter.
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
