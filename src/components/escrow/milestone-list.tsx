"use client";

import { motion } from "framer-motion";
import { Calendar, DollarSign } from "lucide-react";
import { PaymentStatusBadge } from "@/components/escrow/payment-status-badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/escrow-data";
import type { EscrowMilestone } from "@/lib/types/escrow";

interface MilestoneListProps {
  milestones: EscrowMilestone[];
}

export function MilestoneList({ milestones }: MilestoneListProps) {
  return (
    <div className="space-y-4" aria-label="Project milestones">
      {milestones.map((milestone, index) => (
        <motion.div
          key={milestone.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Milestone {milestone.number}
              </p>
              <h4 className="text-lg font-semibold text-foreground">{milestone.title}</h4>
            </div>
            <PaymentStatusBadge status={milestone.status} />
          </div>

          <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <DollarSign className="size-4" aria-hidden="true" />
              <span className="font-semibold text-foreground">{formatCurrency(milestone.amount)}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" aria-hidden="true" />
              Due {milestone.dueDate}
            </span>
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{milestone.progress}%</span>
            </div>
            <Progress
              value={milestone.progress}
              className="h-2"
              aria-label={`${milestone.title} progress: ${milestone.progress}%`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
