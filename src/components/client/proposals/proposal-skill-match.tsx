"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import type { ClientSkillMatch } from "@/lib/types/client-proposal";

interface ProposalSkillMatchProps {
  matches: ClientSkillMatch[];
  overallMatch: number;
}

export function ProposalSkillMatch({
  matches,
  overallMatch,
}: ProposalSkillMatchProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Skill Match Analysis</h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{overallMatch}%</p>
          <p className="text-xs text-muted-foreground">Overall Match</p>
        </div>
      </div>

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
              className="h-2"
              aria-label={`${match.skill} match: ${match.percentage}%`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
