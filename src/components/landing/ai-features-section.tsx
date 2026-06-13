"use client";

import { motion } from "framer-motion";
import { Brain, Lightbulb, Wand2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { aiFeatures } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap = {
  Wand2,
  Brain,
  Lightbulb,
} as const;

export function AiFeaturesSection() {
  return (
    <section
      id="ai-features"
      className="py-16 sm:py-24"
      aria-labelledby="ai-features-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="AI Features"
          title="Work smarter with AI"
          description="Cutting-edge artificial intelligence that gives you a competitive edge in the freelance marketplace."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {aiFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "relative overflow-hidden rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-lg",
                  feature.highlight
                    ? "border-primary/30 bg-gradient-to-br from-primary/5 via-brand-secondary/5 to-brand-accent/10 lg:col-span-1"
                    : "border-border bg-card"
                )}
              >
                {feature.highlight && (
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-2xl"
                    aria-hidden="true"
                  />
                )}

                <div
                  className={cn(
                    "relative mb-6 flex size-14 items-center justify-center rounded-2xl",
                    feature.highlight
                      ? "bg-gradient-to-br from-primary to-brand-accent text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  <Icon className="size-7" aria-hidden="true" />
                </div>

                <h3 className="relative mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="relative text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
