"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { PrimaryButton } from "@/components/shared/primary-button";
import { Badge } from "@/components/ui/badge";
import type { RecommendedProject } from "@/lib/types/dashboard";

interface RecommendedProjectsProps {
  projects: RecommendedProject[];
}

export function RecommendedProjects({ projects }: RecommendedProjectsProps) {
  return (
    <section aria-labelledby="recommended-heading">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="size-5 text-primary" aria-hidden="true" />
        <h3 id="recommended-heading" className="text-lg font-semibold text-foreground">
          AI-Recommended Projects
        </h3>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        Projects matched to your skills and experience
      </p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -2 }}
            className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <h4 className="font-semibold leading-snug text-foreground">
                {project.title}
              </h4>
              <div className="flex shrink-0 items-center gap-1 rounded-lg bg-primary/10 px-2 py-1">
                <Sparkles className="size-3 text-primary" aria-hidden="true" />
                <span className="text-xs font-bold text-primary">
                  {project.matchPercentage}%
                </span>
              </div>
            </div>

            <p className="mb-3 text-sm font-semibold text-primary">
              {project.budget}
            </p>

            <div className="mb-3 flex flex-wrap gap-1.5">
              {project.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="rounded-md bg-muted text-xs font-normal"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              {project.clientRating} client rating
            </div>

            <PrimaryButton
              href={`/projects/${project.id}`}
              className="mt-auto w-full"
            >
              Apply
              <ArrowRight className="size-4" aria-hidden="true" />
            </PrimaryButton>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
