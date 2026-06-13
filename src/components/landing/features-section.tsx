"use client";

import {
  Briefcase,
  FileText,
  Shield,
  Sparkles,
  Target,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { FeatureCard } from "@/components/shared/feature-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { features } from "@/lib/mock-data";

const iconMap = {
  FileText,
  Target,
  Shield,
  Briefcase,
  Sparkles,
} as const;

export function FeaturesSection() {
  return (
    <section
      className="bg-muted/40 py-16 sm:py-24"
      aria-labelledby="features-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to succeed"
          description="Powerful tools designed for both freelancers and clients to collaborate effectively."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={iconMap[feature.icon]}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
