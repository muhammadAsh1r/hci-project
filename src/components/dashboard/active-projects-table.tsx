"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { ActiveProject } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";

interface ActiveProjectsTableProps {
  projects: ActiveProject[];
}

const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  Review: "bg-amber-50 text-amber-700 border-amber-200",
  "Starting Soon": "bg-gray-50 text-gray-600 border-gray-200",
};

export function ActiveProjectsTable({ projects }: ActiveProjectsTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Active Projects</h3>
        <p className="text-sm text-muted-foreground">
          {projects.length} projects in progress
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full" aria-label="Active projects">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-3" scope="col">Project</th>
              <th className="px-6 py-3" scope="col">Client</th>
              <th className="px-6 py-3" scope="col">Progress</th>
              <th className="px-6 py-3" scope="col">Deadline</th>
              <th className="px-6 py-3" scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((project, index) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="transition-colors hover:bg-muted/30"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{project.name}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-primary/10 text-xs text-primary">
                        {project.client.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {project.client}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 min-w-[140px]">
                    <Progress
                      value={project.progress}
                      className="h-2 flex-1"
                      aria-label={`${project.name} progress: ${project.progress}%`}
                    />
                    <span className="text-xs font-medium text-muted-foreground w-8">
                      {project.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {project.deadline}
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant="outline"
                    className={cn("rounded-lg font-normal", statusStyles[project.status])}
                  >
                    {project.status}
                  </Badge>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-border md:hidden">
        {projects.map((project) => (
          <div key={project.id} className="p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <p className="font-medium text-foreground">{project.name}</p>
              <Badge
                variant="outline"
                className={cn("shrink-0 rounded-lg text-xs font-normal", statusStyles[project.status])}
              >
                {project.status}
              </Badge>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">{project.client}</p>
            <div className="mb-2 flex items-center gap-3">
              <Progress value={project.progress} className="h-2 flex-1" />
              <span className="text-xs font-medium">{project.progress}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Due {project.deadline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
