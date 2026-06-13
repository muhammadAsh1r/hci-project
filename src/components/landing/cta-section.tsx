"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";

export function CtaSection() {
  return (
    <section id="pricing" className="py-16 sm:py-24" aria-labelledby="cta-heading">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-brand-secondary to-brand-accent px-8 py-16 text-center sm:px-16"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"
            aria-hidden="true"
          />

          <h2
            id="cta-heading"
            className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Start Your Freelancing Journey Today
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/80">
            Join thousands of freelancers and clients who are already building
            successful partnerships on FreelanceAI.
          </p>

          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton
              href="#"
              size="lg"
              className="bg-white text-primary hover:bg-white/90 hover:shadow-lg"
            >
              Get Started
              <ArrowRight className="size-4" aria-hidden="true" />
            </PrimaryButton>
            <SecondaryButton
              href="/projects"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20 hover:text-white"
            >
              Explore Projects
            </SecondaryButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
