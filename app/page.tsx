import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { MobileDownload } from "@/components/landing/MobileDownload";
import { StatsBar } from "@/components/landing/StatsBar";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <MobileDownload />
      <StatsBar />
    </div>
  );
}

