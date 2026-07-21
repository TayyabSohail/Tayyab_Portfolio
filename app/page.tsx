import { HeroSection } from "@/components/ui/hero-section";
import { HeadlineSection } from "@/components/ui/headline-section";
import { GippityAITimeline } from "@/components/ui/gippity-timeline";
import { ProjectsSection } from "@/components/ui/projects-section";
import { TechStackSection } from "@/components/ui/tech-stack-marquee";
import { ContactSection } from "@/components/ui/contact-section";

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

      {/* ProjectsSection renders its own <section id="projects">. */}
      <ProjectsSection />

      {
        <section id="stack" className="scroll-mt-5">
          <TechStackSection />
        </section>
      }

      <section id="contact" className="scroll-mt-5">
        <ContactSection />
      </section>
    </div>
  );
}
