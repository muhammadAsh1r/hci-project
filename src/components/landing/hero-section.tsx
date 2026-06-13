"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 sm:pb-24 sm:pt-12 lg:pb-32 lg:pt-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-brand-accent/10 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="size-4" aria-hidden="true" />
              AI-Powered Marketplace
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Find Work. Hire Talent.{" "}
              <span className="text-gradient">Powered by AI.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              A smarter freelancer marketplace connecting clients and
              professionals through AI-powered matching.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryButton href="/projects" size="lg">
                Find Projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </PrimaryButton>
              <SecondaryButton href="/freelancers" size="lg">
                Hire Freelancers
              </SecondaryButton>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {["SC", "MJ", "ER", "DK"].map((initials) => (
                  <div
                    key={initials}
                    className="flex size-10 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-xs font-semibold text-primary"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">10,000+</span>{" "}
                freelancers already on the platform
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xl shadow-primary/5 lg:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="size-3 rounded-full bg-red-400" />
                  <div className="size-3 rounded-full bg-amber-400" />
                  <div className="size-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  Dashboard Preview
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-muted/60 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/20" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-3/4 rounded-full bg-foreground/10" />
                      <div className="h-2 w-1/2 rounded-full bg-foreground/5" />
                    </div>
                    <div className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      98% Match
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {["React", "TypeScript", "UI/UX"].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-background px-2 py-1 text-xs text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active Projects", value: "24" },
                    { label: "Proposals", value: "156" },
                    { label: "Earnings", value: "$12.4k" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border bg-background p-3 text-center"
                    >
                      <p className="text-lg font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-brand-secondary/5 to-brand-accent/5 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Sparkles className="size-4" />
                    AI Recommendation
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    3 new projects match your skills with 90%+ compatibility
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 -top-4 rounded-xl border border-border bg-card px-4 py-3 shadow-lg sm:-right-6"
            >
              <p className="text-xs text-muted-foreground">New match found</p>
              <p className="text-sm font-semibold text-foreground">
                E-commerce Redesign
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card px-4 py-3 shadow-lg sm:-left-6"
            >
              <p className="text-xs text-muted-foreground">Payment released</p>
              <p className="text-sm font-semibold text-green-600">+$2,500</p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
