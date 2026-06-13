"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { howItWorksSteps } from "@/lib/mock-data";

export function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="how-it-works-heading">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From idea to delivery in four simple steps"
          description="Whether you're hiring or looking for work, our streamlined process makes it effortless."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              {index < howItWorksSteps.length - 1 && (
                <div
                  className="absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-gradient-to-r from-primary to-brand-secondary lg:block"
                  aria-hidden="true"
                />
              )}
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brand-secondary text-sm font-bold text-primary-foreground">
                {step.step}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
