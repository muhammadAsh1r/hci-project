"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle, DollarSign, Unlock } from "lucide-react";
import {
  ContractStatusBadge,
  MilestoneStatusBadge,
} from "@/components/client/contracts/contract-status-badge";
import { BackLink } from "@/components/shared/back-link";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { formatClientCurrency } from "@/lib/client-contracts-data";
import type { ClientContract, ClientContractMilestone } from "@/lib/types/client-contract";

interface ContractMilestoneCardsProps {
  contract: ClientContract;
}

function MilestoneCard({
  contract,
  milestone,
  index,
}: {
  contract: ClientContract;
  milestone: ClientContractMilestone;
  index: number;
}) {
  const canReview =
    milestone.status === "Under Review" || milestone.status === "Submitted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/5"
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Milestone {milestone.number}
          </p>
          <h4 className="text-lg font-semibold text-foreground">{milestone.title}</h4>
        </div>
        <MilestoneStatusBadge status={milestone.status} />
      </div>

      <p className="mb-4 text-sm text-muted-foreground">{milestone.description}</p>

      <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <DollarSign className="size-4" aria-hidden="true" />
          <span className="font-semibold text-foreground">
            {formatClientCurrency(milestone.amount)}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="size-4" aria-hidden="true" />
          Due {milestone.dueDate}
        </span>
      </div>

      <div className="mb-4">
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

      <div className="flex flex-wrap gap-2">
        {canReview ? (
          <PrimaryButton
            href={`/client/contracts/${contract.id}/milestones/${milestone.id}`}
            className="rounded-xl text-xs"
          >
            <CheckCircle className="size-3.5" />
            Review Work
          </PrimaryButton>
        ) : null}
        {milestone.status === "Approved" ? (
          <PrimaryButton
            href={`/client/contracts/${contract.id}/milestones/${milestone.id}`}
            className="rounded-xl text-xs"
          >
            <Unlock className="size-3.5" />
            Release Payment
          </PrimaryButton>
        ) : null}
      </div>
    </motion.div>
  );
}

export function ContractMilestoneCards({ contract }: ContractMilestoneCardsProps) {
  return (
    <div className="space-y-4" aria-label="Contract milestones">
      {contract.milestones.map((milestone, index) => (
        <MilestoneCard
          key={milestone.id}
          contract={contract}
          milestone={milestone}
          index={index}
        />
      ))}
    </div>
  );
}
