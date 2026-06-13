"use client";

import { motion } from "framer-motion";
import {
  Bookmark,
  Clock,
  MessageSquare,
  Star,
} from "lucide-react";
import { useCallback, useState } from "react";
import Link from "next/link";
import { ApplyModal } from "@/components/projects/apply-modal";
import { ClientCard } from "@/components/projects/client-card";
import { ProjectTimeline } from "@/components/projects/project-timeline";
import { SimilarProjects } from "@/components/projects/similar-projects";
import { BackLink } from "@/components/shared/back-link";
import { PageShell } from "@/components/shared/page-shell";
import { PrimaryButton } from "@/components/shared/primary-button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSimilarProjects } from "@/lib/projects-data";
import type { MarketplaceProject } from "@/lib/types/project";
import { cn } from "@/lib/utils";

interface ProjectDetailsContentProps {
  project: MarketplaceProject;
}

export function ProjectDetailsContent({ project }: ProjectDetailsContentProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const similarProjects = getSimilarProjects(project);
  const { showToast, ToastContainer } = useToast();

  const handleSave = useCallback(() => {
    setIsSaved((prev) => {
      showToast(prev ? "Removed from saved" : "Project saved");
      return !prev;
    });
  }, [showToast]);

  return (
    <>
      <PageShell bottomPadding="sticky-mobile">
        <BackLink href="/projects" label="Back to Projects" />

        <nav aria-label="Breadcrumb" className="mb-6 -mt-2">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/projects" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-foreground" aria-current="page">{project.title}</li>
          </ol>
        </nav>

        {/* Top section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {project.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-lg bg-primary/10 px-4 py-1.5 text-lg font-bold text-primary">
                  {project.budget}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="size-4" aria-hidden="true" />
                  Posted {project.postedTime}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageSquare className="size-4" aria-hidden="true" />
                  {project.proposalCount} proposals
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Star
                    className="size-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                  {project.clientRating} client rating
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="rounded-lg">
                  {project.category}
                </Badge>
                <Badge variant="outline" className="rounded-lg">
                  {project.experienceLevel}
                </Badge>
                <Badge variant="outline" className="rounded-lg">
                  {project.projectType}
                </Badge>
                <Badge variant="outline" className="rounded-lg">
                  {project.duration}
                </Badge>
              </div>
            </div>

            {/* Desktop actions */}
            <div className="hidden shrink-0 gap-3 sm:flex">
              <PrimaryButton onClick={() => setApplyOpen(true)} size="lg">
                Apply Now
              </PrimaryButton>
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  "rounded-xl h-12",
                  isSaved && "border-primary/30 bg-primary/5 text-primary"
                )}
                onClick={handleSave}
                aria-label={isSaved ? "Remove from saved" : "Save project"}
                aria-pressed={isSaved}
              >
                <Bookmark
                  className={cn("size-4 mr-2", isSaved && "fill-current")}
                />
                {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main content column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Overview */}
            <section aria-labelledby="overview-heading">
              <h2
                id="overview-heading"
                className="mb-4 text-xl font-semibold text-foreground"
              >
                Project Overview
              </h2>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="leading-relaxed text-muted-foreground">
                  {project.overview}
                </p>
              </div>
            </section>

            {/* Objectives */}
            <section aria-labelledby="objectives-heading">
              <h2
                id="objectives-heading"
                className="mb-4 text-xl font-semibold text-foreground"
              >
                Objectives
              </h2>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <ul className="space-y-3">
                  {project.objectives.map((objective, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Deliverables */}
            <section aria-labelledby="deliverables-heading">
              <h2
                id="deliverables-heading"
                className="mb-4 text-xl font-semibold text-foreground"
              >
                Deliverables
              </h2>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <ul className="space-y-3">
                  {project.deliverables.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Timeline text */}
            <section aria-labelledby="timeline-text-heading">
              <h2
                id="timeline-text-heading"
                className="mb-4 text-xl font-semibold text-foreground"
              >
                Timeline
              </h2>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.timeline}
                </p>
              </div>
            </section>

            {/* Skills */}
            <section aria-labelledby="skills-heading">
              <h2
                id="skills-heading"
                className="mb-4 text-xl font-semibold text-foreground"
              >
                Skills Required
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="rounded-lg bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/15"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            <Separator />

            {/* Similar projects */}
            <SimilarProjects projects={similarProjects} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ClientCard client={project.client} />
            <ProjectTimeline steps={project.timelineSteps} />
          </div>
        </div>
      </PageShell>

      <ToastContainer />

      {/* Mobile sticky apply bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-4 backdrop-blur-lg sm:hidden">
        <div className="flex gap-3">
          <PrimaryButton
            onClick={() => setApplyOpen(true)}
            className="flex-1"
            size="lg"
          >
            Apply Now
          </PrimaryButton>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "rounded-xl size-12 shrink-0",
              isSaved && "border-primary/30 bg-primary/5 text-primary"
            )}
            onClick={handleSave}
            aria-label={isSaved ? "Remove from saved" : "Save project"}
            aria-pressed={isSaved}
          >
            <Bookmark
              className={cn("size-5", isSaved && "fill-current")}
            />
          </Button>
        </div>
      </div>

      <ApplyModal
        project={project}
        open={applyOpen}
        onOpenChange={setApplyOpen}
      />
    </>
  );
}
