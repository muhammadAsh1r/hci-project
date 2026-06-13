"use client";

import { motion } from "framer-motion";
import {
  Eye,
  FileText,
  Pencil,
  Send,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { ClientProjectActivityFeed } from "@/components/client/projects/client-project-activity-feed";
import { ProjectTimeline } from "@/components/projects/project-timeline";
import { BackLink } from "@/components/shared/back-link";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { ClientManagedProject } from "@/lib/types/client-project";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  active: "bg-blue-50 text-blue-700 border-blue-200",
  open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  archived: "bg-gray-50 text-gray-600 border-gray-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
};

interface ClientProjectDetailsContentProps {
  project: ClientManagedProject;
}

export function ClientProjectDetailsContent({
  project,
}: ClientProjectDetailsContentProps) {
  const statusLabel =
    project.status.charAt(0).toUpperCase() + project.status.slice(1);

  const analyticsCards = [
    {
      label: "Views",
      value: project.analytics.views,
      icon: Eye,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Applications",
      value: project.analytics.applications,
      icon: Send,
      color: "text-violet-600 bg-violet-50",
    },
    {
      label: "Shortlisted",
      value: project.analytics.shortlisted,
      icon: UserCheck,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      label: "Hiring Progress",
      value: `${project.analytics.hiringProgress}%`,
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  const proposalCards = [
    { label: "Total Proposals", value: project.proposalSummary.total },
    { label: "Shortlisted", value: project.proposalSummary.shortlisted },
    { label: "Accepted", value: project.proposalSummary.accepted },
    { label: "Rejected", value: project.proposalSummary.rejected },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <BackLink href="/client/projects" label="Back to Projects" />

      <nav aria-label="Breadcrumb" className="-mt-2 mb-2">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link
              href="/client/projects"
              className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Projects
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-foreground" aria-current="page">
            {project.title}
          </li>
        </ol>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={cn("rounded-lg font-normal", statusStyles[project.status])}
              >
                {statusLabel}
              </Badge>
              <Badge variant="secondary" className="rounded-lg font-normal">
                {project.category}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {project.title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.description}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            <span className="rounded-xl bg-primary/10 px-4 py-2 text-center text-xl font-bold text-primary">
              {project.budget}
            </span>
            <SecondaryButton
              href={`/client/post-project?edit=${project.id}`}
              className="rounded-xl"
            >
              <Pencil className="size-4" />
              Edit Project
            </SecondaryButton>
            <PrimaryButton href="/client/proposals" className="rounded-xl">
              <FileText className="size-4" />
              View Proposals
            </PrimaryButton>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Timeline
            </p>
            <p className="mt-1 font-medium text-foreground">{project.timeline}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Project Type
            </p>
            <p className="mt-1 font-medium text-foreground">{project.projectType}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Experience Level
            </p>
            <p className="mt-1 font-medium text-foreground">
              {project.experienceLevel}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Posted
            </p>
            <p className="mt-1 font-medium text-foreground">{project.postedDate}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-foreground">Required Skills</p>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-lg font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {project.progress > 0 ? (
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Overall Progress</span>
              <span className="text-muted-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        ) : null}
      </motion.div>

      <section aria-labelledby="analytics-heading">
        <h2 id="analytics-heading" className="mb-4 text-xl font-semibold text-foreground">
          Project Analytics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {analyticsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-xl",
                      card.color
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{card.value}</p>
                    <p className="text-sm text-muted-foreground">{card.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="proposals-heading">
        <h2 id="proposals-heading" className="mb-4 text-xl font-semibold text-foreground">
          Proposal Summary
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proposalCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
            >
              <p className="text-3xl font-bold text-foreground">{card.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <ProjectTimeline steps={project.timelineSteps} />
        <ClientProjectActivityFeed activities={project.activities} />
      </div>
    </div>
  );
}
