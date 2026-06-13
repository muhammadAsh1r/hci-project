"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { ClientDeadline } from "@/lib/types/client-dashboard";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  Review: "bg-amber-50 text-amber-700 border-amber-200",
};

interface ClientUpcomingDeadlinesProps {
  deadlines: ClientDeadline[];
}

export function ClientUpcomingDeadlines({ deadlines }: ClientUpcomingDeadlinesProps) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h3>
        <p className="text-sm text-muted-foreground">
          Track milestone progress across active projects
        </p>
      </div>

      <ul className="divide-y divide-border" aria-label="Upcoming project deadlines">
        {deadlines.map((item, index) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="px-6 py-4"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-foreground">{item.projectName}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Due {item.deadline}
                </p>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "shrink-0 rounded-lg font-normal",
                  statusStyles[item.status] ?? "bg-muted text-muted-foreground"
                )}
              >
                {item.status}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Progress
                value={item.progress}
                className="h-2 flex-1"
                aria-label={`${item.projectName} progress: ${item.progress}%`}
              />
              <span className="w-10 text-right text-xs font-medium text-muted-foreground">
                {item.progress}%
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
