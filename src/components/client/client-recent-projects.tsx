"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { ClientProject } from "@/lib/types/client-dashboard";
import { cn } from "@/lib/utils";

const statusStyles = {
  Active: "bg-blue-50 text-blue-700 border-blue-200",
  Open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "In Review": "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-gray-50 text-gray-600 border-gray-200",
};

interface ClientRecentProjectsProps {
  projects: ClientProject[];
}

export function ClientRecentProjects({ projects }: ClientRecentProjectsProps) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Projects</h3>
        <p className="text-sm text-muted-foreground">
          Latest projects you have posted
        </p>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full" aria-label="Recent client projects">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-3" scope="col">Project</th>
              <th className="px-6 py-3" scope="col">Status</th>
              <th className="px-6 py-3" scope="col">Budget</th>
              <th className="px-6 py-3" scope="col">Proposals</th>
              <th className="px-6 py-3" scope="col">Posted</th>
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
                  <Link
                    href={`/client/projects/${project.id}`}
                    className="font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                  >
                    {project.name}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant="outline"
                    className={cn("rounded-lg font-normal", statusStyles[project.status])}
                  >
                    {project.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {project.budget}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {project.proposalCount}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {project.postedDate}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-border md:hidden">
        {projects.map((project) => (
          <div key={project.id} className="p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <Link
                href={`/client/projects/${project.id}`}
                className="font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              >
                {project.name}
              </Link>
              <Badge
                variant="outline"
                className={cn("shrink-0 rounded-lg text-xs font-normal", statusStyles[project.status])}
              >
                {project.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <span>{project.budget}</span>
              <span>{project.proposalCount} proposals</span>
              <span className="col-span-2 text-xs">Posted {project.postedDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
