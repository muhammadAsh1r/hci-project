"use client";

import { cn } from "@/lib/utils";
import type { NotificationPriority } from "@/lib/types/settings";

const PRIORITY_STYLES: Record<
  NotificationPriority,
  { label: string; dot: string; badge: string }
> = {
  high: {
    label: "High",
    dot: "bg-red-500",
    badge: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
  },
  medium: {
    label: "Medium",
    dot: "bg-amber-500",
    badge: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  },
  low: {
    label: "Low",
    dot: "bg-slate-400",
    badge: "border-border bg-muted text-muted-foreground",
  },
};

interface PriorityIndicatorProps {
  priority: NotificationPriority;
  showLabel?: boolean;
  className?: string;
}

export function PriorityIndicator({
  priority,
  showLabel = true,
  className,
}: PriorityIndicatorProps) {
  const style = PRIORITY_STYLES[priority];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-xs font-medium",
        style.badge,
        className
      )}
      aria-label={`${style.label} priority`}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} aria-hidden="true" />
      {showLabel && style.label}
    </span>
  );
}
