"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { MarketplaceProject } from "@/lib/types/project";

interface SimilarProjectsProps {
  projects: MarketplaceProject[];
}

export function SimilarProjects({ projects }: SimilarProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="similar-projects-heading">
      <h2
        id="similar-projects-heading"
        className="mb-6 text-xl font-semibold text-foreground"
      >
        Similar Projects
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <span className="shrink-0 text-xs font-semibold text-primary">
                {project.budget}
              </span>
            </div>
            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
              {project.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.skills.slice(0, 3).map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-md bg-muted text-xs font-normal"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              <ArrowRight
                className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
