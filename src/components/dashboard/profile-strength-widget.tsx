"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import type { ProfileRecommendation } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";

interface ProfileStrengthWidgetProps {
  strength: number;
  recommendations: ProfileRecommendation[];
}

export function ProfileStrengthWidget({
  strength,
  recommendations,
}: ProfileStrengthWidgetProps) {
  const completedCount = recommendations.filter((r) => r.completed).length;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Profile Strength
        </h3>
        <span className="text-2xl font-bold text-primary">{strength}%</span>
      </div>

      <Progress
        value={strength}
        className="mb-2 h-3"
        aria-label={`Profile strength: ${strength}% complete`}
      />
      <p className="mb-6 text-xs text-muted-foreground">
        {completedCount} of {recommendations.length} recommendations completed
      </p>

      <ul className="space-y-2" aria-label="Profile improvement recommendations">
        {recommendations.map((rec, index) => (
          <motion.li
            key={rec.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={rec.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                rec.completed
                  ? "text-muted-foreground"
                  : "bg-accent/50 text-foreground hover:bg-accent"
              )}
            >
              <div
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full",
                  rec.completed
                    ? "bg-green-100 text-green-600"
                    : "border-2 border-border bg-background"
                )}
              >
                {rec.completed && <Check className="size-3.5" aria-hidden="true" />}
              </div>
              <span className={cn("flex-1", rec.completed && "line-through")}>
                {rec.label}
              </span>
              {!rec.completed && (
                <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
              )}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
