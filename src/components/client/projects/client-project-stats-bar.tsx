"use client";

import { motion } from "framer-motion";
import {
  Archive,
  CheckCircle,
  FolderKanban,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClientProjectStatsBarProps {
  stats: {
    active: number;
    open: number;
    completed: number;
    archived: number;
  };
}

const statItems = [
  { key: "active" as const, label: "Active Projects", icon: FolderKanban, color: "text-blue-600 bg-blue-50" },
  { key: "open" as const, label: "Open Projects", icon: FolderOpen, color: "text-emerald-600 bg-emerald-50" },
  { key: "completed" as const, label: "Completed Projects", icon: CheckCircle, color: "text-green-600 bg-green-50" },
  { key: "archived" as const, label: "Archived Projects", icon: Archive, color: "text-gray-600 bg-gray-100" },
];

export function ClientProjectStatsBar({ stats }: ClientProjectStatsBarProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className={cn("flex size-10 items-center justify-center rounded-xl", item.color)}>
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats[item.key]}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
