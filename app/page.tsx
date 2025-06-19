"use client";
import { HeroSection } from "@/components/ui/hero-section";
import { HeadlineSection } from "@/components/ui/headline-section";
import { GippityAITimeline } from "@/components/ui/gippity-timeline"; // Import your Wobble Cards component

export default function Home() {
  return (
    <div className=" w-full">
      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Headline Section */}
      <section>
        <HeadlineSection />
      </section>

      {/* About Section with Wobble Cards */}
      <section id="about" className="py-20 scroll-mt-20">
        {" "}
        {/* scroll-mt-20 accounts for navbar height */}
        <GippityAITimeline />
      </section>

      {/*
        Add more sections as needed
        <section id="projects" className="py-20 scroll-mt-20">
          <ProjectsSection />
        </section>
      */}
    </div>
  );
}
