"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/mock-data";

export function FeaturedProjectsSection() {
  return (
    <section
      id="projects"
      className="bg-muted/40 py-16 sm:py-24"
      aria-labelledby="projects-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Featured Projects"
          title="Discover your next opportunity"
          description="Browse curated projects from clients looking for top talent like you."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold leading-snug text-foreground">
                  {project.title}
                </h3>
                <span className="shrink-0 rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {project.budget}
                </span>
              </div>

              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-lg bg-muted font-normal text-muted-foreground"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <PrimaryButton href="#" className="w-full">
                Apply Now
                <ArrowRight className="size-4" aria-hidden="true" />
              </PrimaryButton>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
