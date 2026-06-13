"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import type { ProposalScore } from "@/lib/types/proposal";

interface ProposalScoreCardProps {
  score: ProposalScore;
}

const metrics = [
  { key: "clarity" as const, label: "Clarity" },
  { key: "skillsMatch" as const, label: "Skills Match" },
  { key: "professionalism" as const, label: "Professionalism" },
  { key: "completeness" as const, label: "Completeness" },
];

export function ProposalScoreCard({ score }: ProposalScoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Proposal Score</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-primary">{score.overall}</span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
      </div>

      <div className="space-y-3" role="list" aria-label="Score breakdown">
        {metrics.map((metric) => (
          <div key={metric.key} role="listitem">
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-muted-foreground">{metric.label}</span>
              <span className="font-medium text-foreground">{score[metric.key]}%</span>
            </div>
            <Progress
              value={score[metric.key]}
              className="h-2"
              aria-label={`${metric.label}: ${score[metric.key]}%`}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
