"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle,
  Clock,
  FileCheck,
  Minus,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { EscrowOverviewStat } from "@/lib/types/escrow";
import { cn } from "@/lib/utils";

const iconMap = {
  Wallet,
  ArrowUpRight,
  Clock,
  Target,
  FileCheck,
  CheckCircle,
};

interface EscrowStatCardProps {
  stat: EscrowOverviewStat;
  index?: number;
}

export function EscrowStatCard({ stat, index = 0 }: EscrowStatCardProps) {
  const Icon = iconMap[stat.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        {stat.trend !== "neutral" && (
          <div
            className={cn(
              "flex items-center gap-0.5 rounded-lg px-2 py-0.5 text-xs font-medium",
              stat.trend === "up" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            )}
          >
            {stat.trend === "up" ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            {stat.change > 0 ? "+" : ""}{stat.change}%
          </div>
        )}
        {stat.trend === "neutral" && (
          <div className="flex items-center gap-0.5 rounded-lg bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            <Minus className="size-3" /> No change
          </div>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">{stat.value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
      {stat.progress !== undefined && (
        <Progress
          value={stat.progress}
          className="mt-3 h-1.5"
          aria-label={`${stat.label} progress: ${stat.progress}%`}
        />
      )}
    </motion.div>
  );
}
