"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  CreditCard,
  FileText,
  FolderPlus,
  UserPlus,
} from "lucide-react";
import type { ClientProjectActivity } from "@/lib/types/client-project";
import { cn } from "@/lib/utils";

const activityIcons = {
  project_posted: FolderPlus,
  proposal_received: FileText,
  freelancer_shortlisted: UserPlus,
  freelancer_hired: UserPlus,
  project_updated: FileText,
  contract_created: CheckCircle,
  payment_released: CreditCard,
};

const activityColors = {
  project_posted: "bg-blue-50 text-blue-600",
  proposal_received: "bg-violet-50 text-violet-600",
  freelancer_shortlisted: "bg-indigo-50 text-indigo-600",
  freelancer_hired: "bg-green-50 text-green-600",
  project_updated: "bg-amber-50 text-amber-600",
  contract_created: "bg-emerald-50 text-emerald-600",
  payment_released: "bg-emerald-50 text-emerald-600",
};

interface ClientProjectActivityFeedProps {
  activities: ClientProjectActivity[];
}

export function ClientProjectActivityFeed({
  activities,
}: ClientProjectActivityFeedProps) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Activity Feed</h3>
      </div>
      <ol className="divide-y divide-border" aria-label="Project activity feed">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          return (
            <motion.li
              key={activity.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-4 px-6 py-4"
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-xl",
                  activityColors[activity.type]
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{activity.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <time className="mt-1 block text-xs text-muted-foreground">
                  {activity.timestamp}
                </time>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
