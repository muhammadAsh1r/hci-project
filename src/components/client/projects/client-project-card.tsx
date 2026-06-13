"use client";

import { motion } from "framer-motion";
import {
  Archive,
  Eye,
  MessageSquare,
  MoreHorizontal,
  Pause,
  Pencil,
  Play,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "@/components/shared/primary-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { ClientManagedProject } from "@/lib/types/client-project";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  active: "bg-blue-50 text-blue-700 border-blue-200",
  open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  archived: "bg-gray-50 text-gray-600 border-gray-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
};

interface ClientProjectCardProps {
  project: ClientManagedProject;
  index?: number;
  onPause: (id: string) => void;
  onReopen: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ClientProjectCard({
  project,
  index = 0,
  onPause,
  onReopen,
  onArchive,
  onDelete,
}: ClientProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const statusLabel =
    project.status.charAt(0).toUpperCase() + project.status.slice(1);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/5"
    >
      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Link
              href={`/client/projects/${project.id}`}
              className="text-lg font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {project.title}
            </Link>
            <p className="mt-1 text-sm font-bold text-primary">{project.budget}</p>
          </div>
          <Badge
            variant="outline"
            className={cn("shrink-0 rounded-lg font-normal", statusStyles[project.status])}
          >
            {statusLabel}
          </Badge>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MessageSquare className="size-3.5" aria-hidden="true" />
            {project.proposalCount} proposals
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3.5" aria-hidden="true" />
            {project.views} views
          </span>
          <span>Posted {project.postedDate}</span>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary" className="rounded-lg text-xs font-normal">
              {skill}
            </Badge>
          ))}
          {project.skills.length > 4 ? (
            <Badge variant="secondary" className="rounded-lg text-xs font-normal">
              +{project.skills.length - 4}
            </Badge>
          ) : null}
        </div>

        {project.progress > 0 ? (
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border px-6 py-4">
        <PrimaryButton href={`/client/projects/${project.id}`} className="flex-1 rounded-xl">
          View Details
        </PrimaryButton>

        <div ref={menuRef} className="relative">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            aria-label="Project actions"
          >
            <MoreHorizontal className="size-4" />
          </Button>

          {menuOpen ? (
            <div
              role="menu"
              className="absolute right-0 bottom-full z-10 mb-1 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
            >
              <Link
                href={`/client/post-project?edit=${project.id}`}
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
                onClick={() => setMenuOpen(false)}
              >
                <Pencil className="size-4" /> Edit Project
              </Link>
              {project.status === "active" || project.status === "open" ? (
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
                  onClick={() => { onPause(project.id); setMenuOpen(false); }}
                >
                  <Pause className="size-4" /> Pause Project
                </button>
              ) : null}
              {project.status === "paused" ? (
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
                  onClick={() => { onReopen(project.id); setMenuOpen(false); }}
                >
                  <Play className="size-4" /> Reopen Project
                </button>
              ) : null}
              {project.status !== "archived" ? (
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
                  onClick={() => { onArchive(project.id); setMenuOpen(false); }}
                >
                  <Archive className="size-4" /> Archive Project
                </button>
              ) : null}
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                onClick={() => { onDelete(project.id); setMenuOpen(false); }}
              >
                <Trash2 className="size-4" /> Delete Project
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
