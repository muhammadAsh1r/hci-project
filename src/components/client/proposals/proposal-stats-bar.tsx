"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  FileText,
  Inbox,
  Star,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProposalStatsBarProps {
  stats: {
    total: number;
    new: number;
    shortlisted: number;
    accepted: number;
    rejected: number;
  };
}

const items = [
  { key: "total" as const, label: "Total Proposals", icon: FileText, color: "text-blue-600 bg-blue-50" },
  { key: "new" as const, label: "New Proposals", icon: Inbox, color: "text-violet-600 bg-violet-50" },
  { key: "shortlisted" as const, label: "Shortlisted", icon: Star, color: "text-amber-600 bg-amber-50" },
  { key: "accepted" as const, label: "Accepted", icon: CheckCircle, color: "text-green-600 bg-green-50" },
  { key: "rejected" as const, label: "Rejected", icon: XCircle, color: "text-red-600 bg-red-50" },
];

export function ProposalStatsBar({ stats }: ProposalStatsBarProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className={cn("flex size-9 items-center justify-center rounded-xl", item.color)}>
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stats[item.key]}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
