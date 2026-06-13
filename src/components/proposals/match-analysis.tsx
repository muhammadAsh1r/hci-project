"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import type { SkillMatch } from "@/lib/types/proposal";

interface MatchAnalysisProps {
  matches: SkillMatch[];
}

export function MatchAnalysis({ matches }: MatchAnalysisProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-4 font-semibold text-foreground">Match Analysis</h3>
      <div className="space-y-4" role="list" aria-label="Skill match analysis">
        {matches.map((match, index) => (
          <motion.div
            key={match.skill}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            role="listitem"
          >
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-foreground">{match.skill}</span>
              <span className="font-semibold text-primary">{match.percentage}%</span>
            </div>
            <Progress
              value={match.percentage}
              className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-brand-accent"
              aria-label={`${match.skill} match: ${match.percentage}%`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
