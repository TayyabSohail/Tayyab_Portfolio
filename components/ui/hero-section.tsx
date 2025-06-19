"use client";
import { FlipWords } from "./flip-words";
import Image from "next/image";
import { NavbarButton } from "@/components/ui/navbar";
import { TypewriterEffectSmooth } from "./typewriter-effect"; // Import the component

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
      className:
        "text-neutral-600 dark:text-neutral-400 text-4xl md:text-5xl font-bold",
    },
    {
      text: "I'm",
      className:
        "text-neutral-600 dark:text-neutral-400 text-4xl md:text-5xl font-bold",
    },
    {
      text: "Tayyab Sohail",
      className: "text-white dark:text-white text-4xl md:text-5xl font-bold",
    },
  ];

  return (
    <section id="hero" className="container mx-auto px-4 py-56 scroll-mt-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left side - Flip words */}
        <div className="w-full md:w-1/2">
          <div className="text-5xl md:text-6xl font-bold text-neutral-700 dark:text-neutral-300 space-y-4 leading-tight">
            <div>I specialize in</div>
            <div className="min-h-[72px]">
              <FlipWords words={words} />
            </div>
          </div>
        </div>

        {/* Right side - Image, name, and resume button */}
        <div className="w-full md:w-1/2 flex flex-col items-center gap-6">
          <div className="relative w-64 h-64 rounded-full overflow-hidden mb-4">
            <Image
              src="/images/MTayyabSohail.jpeg"
              alt="M Tayyab Sohail Profile Pic"
              fill
              className="object-cover"
            />
          </div>

          {/* Replaced static text with TypewriterEffectSmooth */}
          <TypewriterEffectSmooth
            words={nameWords}
            className="text-center"
            cursorClassName="h-8 md:h-10" // Adjust cursor size
          />
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <NavbarButton variant="primary">Download Resume</NavbarButton>
      </div>
    </section>
  );
}
