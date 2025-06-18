import { HeroSection } from "@/components/ui/hero-section";
import { HeadlineSection } from "@/components/ui/headline-section";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <HeroSection />
      <HeadlineSection />
    </div>
  );
}
