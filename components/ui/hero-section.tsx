"use client";
import { FlipWords } from "./flip-words";
import Image from "next/image";
import { NavbarButton } from "@/components/ui/navbar";
import { TypewriterEffectSmooth } from "./typewriter-effect";

export function HeroSection() {
  const words = [
    "Artificial Intelligence",
    "Software Development",
    "Cloud-Based Platforms",
    "Full-Stack Applications",
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
      id="hero"
      className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-28 scroll-mt-20"
    >
      {/* Main content - centered on all screens */}
      <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
        {/* Profile image with top padding for mobile */}
        <div className="pt-4 sm:pt-0 flex justify-center">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-neutral-700 shadow-lg">
            <Image
              src="/images/MTayyabSohail.jpeg"
              alt="Tayyab Sohail Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text content - centered */}
        <div className="w-full flex flex-col items-center gap-4 md:gap-6">
          {/* Name with typewriter effect */}
          <TypewriterEffectSmooth
            words={nameWords}
            className="text-center"
            cursorClassName="h-8 sm:h-10 lg:h-12"
          />

          {/* Specialization text */}
          <div className="text-center w-full">
            <div className="text-2xl sm:text-3xl lg:text-5xl text-neutral-300 mb-3">
              I specialize in
            </div>
            <div className="h-16 sm:h-20 lg:h-24 flex items-center justify-center">
              <FlipWords
                words={words}
                duration={3000}
                className="text-2xl sm:text-3xl lg:text-5xl font-bold text-blue-400 text-center"
              />
            </div>
          </div>

          <div className=" flex justify-center">
            <NavbarButton
              href="/resume/Resume_M.TayyabSohail_FullStackDeveloper.pdf"
              download
              variant="primary"
            >
              Download Resume
            </NavbarButton>
          </div>
        </div>
      </div>
    </section>
  );
}
