"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  CreditCard,
  FileText,
  FolderPlus,
  Star,
} from "lucide-react";
import type { ActivityItem } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";

const activityIcons = {
  proposal: FileText,
  accepted: CheckCircle,
  payment: CreditCard,
  portfolio: FolderPlus,
  review: Star,
};

const activityColors = {
  proposal: "bg-blue-50 text-blue-600",
  accepted: "bg-green-50 text-green-600",
  payment: "bg-emerald-50 text-emerald-600",
  portfolio: "bg-violet-50 text-violet-600",
  review: "bg-amber-50 text-amber-600",
};

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
      </div>

      <ol className="divide-y divide-border" aria-label="Recent activity timeline">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          return (
            <motion.li
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
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
