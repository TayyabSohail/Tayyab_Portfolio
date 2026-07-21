"use client";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { NavbarButton } from "@/components/ui/navbar";
import { TypewriterEffectSmooth } from "./typewriter-effect";
import { FlipWords } from "./flip-words";
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export function HeroSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px", once: false });

  const words = [
    "Full-Stack Applications",
    "Software Development",
    "Artificial Intelligence",
    "Cloud-Based Platforms",
  ];

  const nameWords = [
    {
      text: "Hi,",
      className: "text-neutral-400 text-3xl sm:text-5xl lg:text-5xl font-bold",
    },
    {
      text: "I'm",
      className: "text-neutral-400 text-3xl sm:text-5xl lg:text-5xl font-bold",
    },
    {
      text: "Tayyab Sohail",
      className: "text-white text-3xl sm:text-5xl lg:text-5xl font-bold",
    },
  ];

  return (
    <section
        ref={sectionRef}
        id="hero"
        className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-28 scroll-mt-20 overflow-hidden w-full max-w-full"
      >
        <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
          <div className="pt-4 sm:pt-0 flex justify-center">
            {/* The portrait is a cut-out on an opaque white background, so the
                circle uses a light plate rather than a dark one. */}
            <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-emerald-500/30 bg-white shadow-lg shadow-emerald-500/10 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72">
              <Image
                src="/images/Photograph-Tayyab-Sohail.png"
                alt="Tayyab Sohail"
                fill
                sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 12rem"
                // The source is 955x1188 in a square frame, so object-cover
                // renders it exactly frame-width and object-position has no
                // horizontal overflow to work with. The head measures at x 46%
                // of the source, so a small positive translate brings it to
                // the centre of the circle.
                className="translate-x-[4%] object-cover object-top"
                priority
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-4 md:gap-6">
            {/* The name is animated glyph-by-glyph below, which carries no
                heading semantics — this gives the page its single <h1>. */}
            <h1 className="sr-only">
              Tayyab Sohail, Full Stack Developer
            </h1>

            <TypewriterEffectSmooth
              words={nameWords}
              className="text-center"
              cursorClassName="h-8 sm:h-10 lg:h-12"
            />

            <div className="text-center w-full max-w-full overflow-hidden px-2">
              <div className="text-2xl sm:text-3xl lg:text-5xl text-neutral-300 mb-3">
                I specialize in
              </div>
              <div className="h-16 sm:h-20 lg:h-24 flex items-center justify-center overflow-hidden relative w-full">
                <FlipWords
                  words={words}
                  duration={3000}
                  isActive={isInView}
                  className="text-2xl sm:text-3xl lg:text-5xl font-bold text-emerald-400 text-center"
                />
              </div>
            </div>

            {/* RESUME BUTTON */}
            <div className="flex justify-center w-full px-4">
              <NavbarButton
                href="/resume/Resume_M.TayyabSohail_FullStackDeveloper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full sm:w-auto max-w-full"
              >
                <span className="text-sm sm:text-base">Check Out My Resume</span>
              </NavbarButton>
            </div>

            {/* SOCIAL ICONS — same priority order as the SocialRail in
                app/layout.tsx: email and WhatsApp first, profiles after. */}
            <div className="flex gap-3 justify-center mt-2">
              <a
                href="mailto:m.tayyabsohail614@gmail.com"
                className="p-2 rounded-full bg-neutral-800 hover:bg-red-600 transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="text-lg text-red-400" />
              </a>
              <a
                href="https://wa.me/923338199915"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-800 hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-lg text-green-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-tayyab-sohail/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-800 hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg text-blue-400" />
              </a>
              <a
                href="https://github.com/TayyabSohail"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-600 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="text-lg text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>
  );
}
