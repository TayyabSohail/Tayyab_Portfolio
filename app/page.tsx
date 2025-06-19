"use client";
import { HeroSection } from "@/components/ui/hero-section";
import { HeadlineSection } from "@/components/ui/headline-section";
import { GippityAITimeline } from "@/components/ui/gippity-timeline";
import { ProjectsSection } from "@/components/ui/projects-section";
import { TechStackSection } from "@/components/ui/tech-stack-marquee";

export default function Home() {
  return (
    <div className=" w-full">
      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Headline Section */}

      {/* About Section with Wobble Cards */}
      <section id="about" className="scroll-mt-5">
        {" "}
        {/* scroll-mt-20 accounts for navbar height */}
        <HeadlineSection />
        <GippityAITimeline />
      </section>

      {
        <section id="projects" className="scroll-mt-5">
          <ProjectsSection />
        </section>
      }

      {
        <section id="services" className="scroll-mt-5">
          <TechStackSection />
        </section>
      }
    </div>
  );
}
