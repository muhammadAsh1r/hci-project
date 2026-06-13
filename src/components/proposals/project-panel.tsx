"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  DollarSign,
  Layers,
  Star,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDeadlineFromProject } from "@/lib/proposal-data";
import type { MarketplaceProject } from "@/lib/types/project";

interface ProjectPanelProps {
  project: MarketplaceProject;
}

export function ProjectPanel({ project }: ProjectPanelProps) {
  const deadline = getDeadlineFromProject(project);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Selected Project
        </p>
        <h2 className="mt-1 text-lg font-bold text-foreground">{project.title}</h2>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center gap-3 rounded-xl bg-primary/5 px-4 py-3">
          <DollarSign className="size-5 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs text-muted-foreground">Budget</p>
            <p className="font-semibold text-foreground">{project.budget}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <User className="size-4 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">Client</p>
              <p className="font-medium text-foreground">{project.client.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">Rating</p>
              <p className="font-medium text-foreground">{project.clientRating}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="size-4 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">Deadline</p>
              <p className="font-medium text-foreground">{deadline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Layers className="size-4 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">Category</p>
              <p className="font-medium text-foreground">{project.category}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Description</p>
          <p className="text-sm leading-relaxed text-foreground">{project.description}</p>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Required Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-lg bg-muted font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">{project.duration}</span>
          </div>
          <Badge variant="outline" className="rounded-lg">
            {project.experienceLevel}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}
