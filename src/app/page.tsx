import { AiFeaturesSection } from "@/components/landing/ai-features-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FeaturedProjectsSection } from "@/components/landing/featured-projects-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { StatsSection } from "@/components/landing/stats-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TopFreelancersSection } from "@/components/landing/top-freelancers-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TopFreelancersSection />
      <FeaturedProjectsSection />
      <AiFeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
