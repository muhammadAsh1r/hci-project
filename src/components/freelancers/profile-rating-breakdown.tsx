"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import type { RatingBreakdown } from "@/lib/types/freelancer";

interface ProfileRatingBreakdownProps {
  breakdown: RatingBreakdown;
}

const CATEGORIES: { key: keyof RatingBreakdown; label: string }[] = [
  { key: "communication", label: "Communication" },
  { key: "quality", label: "Quality" },
  { key: "timeliness", label: "Timeliness" },
  { key: "professionalism", label: "Professionalism" },
];

export function ProfileRatingBreakdown({
  breakdown,
}: ProfileRatingBreakdownProps) {
  return (
    <section aria-labelledby="rating-breakdown-heading">
      <h2
        id="rating-breakdown-heading"
        className="mb-6 text-xl font-semibold text-foreground"
      >
        Rating Breakdown
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map(({ key, label }, index) => {
          const value = breakdown[key];
          const percent = (value / 5) * 100;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {label}
                </span>
                <span className="text-sm font-bold text-primary">{value}</span>
              </div>
              <Progress
                value={percent}
                className="h-2"
                aria-label={`${label}: ${value} out of 5`}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
