"use client";
import { FlipWords } from "./flip-words";
import Image from "next/image";

export function HeroSection() {
  const words = [
    "Artificial Intelligence",
    "Software Development",
    "Cloud-Based Platforms",
    "Full-Stack Applications",
  ];

  return (
    <section id="hero" className="container mx-auto px-4 py-24 scroll-mt-20">
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

        {/* Right side - Image and name */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden mb-4">
            <Image
              src="/images/MTayyabSohail.jpeg"
              alt="M Tayyab Sohail Profile Pic"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-600 dark:text-neutral-400 text-center">
            Hi, I’m Tayyab
          </h2>
        </div>
      </div>
    </section>
  );
}
