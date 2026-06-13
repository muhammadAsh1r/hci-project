"use client";

import { motion } from "framer-motion";
import {
  Bookmark,
  Clock,
  MessageSquare,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MarketplaceProject } from "@/lib/types/project";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: MarketplaceProject;
  index?: number;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  onApply?: (project: MarketplaceProject) => void;
}

export function ProjectCard({
  project,
  index = 0,
  isSaved = false,
  onSave,
  onApply,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="group relative rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/5"
    >
      <Link
        href={`/projects/${project.id}`}
        className="block p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
        aria-label={`View project: ${project.title}`}
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <span className="shrink-0 rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {project.budget}
          </span>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {project.postedTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageSquare className="size-3.5" aria-hidden="true" />
            {project.proposalCount} proposals
          </span>
          <span className="inline-flex items-center gap-1">
            <Star
              className="size-3.5 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            {project.clientRating} client rating
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
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

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="rounded-lg font-normal">
            {project.experienceLevel}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {project.projectType} · {project.duration}
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-2 border-t border-border px-6 py-4">
        <Button
          variant="default"
          className="flex-1 rounded-xl h-10"
          onClick={(e) => {
            e.preventDefault();
            onApply?.(project);
          }}
        >
          Apply
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-xl size-10 shrink-0",
            isSaved && "border-primary/30 bg-primary/5 text-primary"
          )}
          onClick={(e) => {
            e.preventDefault();
            onSave?.(project.id);
          }}
          aria-label={isSaved ? "Remove from saved" : "Save project"}
          aria-pressed={isSaved}
        >
          <Bookmark
            className={cn("size-4", isSaved && "fill-current")}
            aria-hidden="true"
          />
        </Button>
      </div>
    </motion.article>
  );
}
