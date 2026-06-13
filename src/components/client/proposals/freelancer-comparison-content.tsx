"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { StarRating } from "@/components/freelancers/star-rating";
import { EmptyState } from "@/components/shared/empty-state";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useClientProposals } from "@/hooks/use-client-proposals";
import { useState } from "react";
import type { ClientProposal } from "@/lib/types/client-proposal";

interface FreelancerComparisonContentProps {
  proposalIds: string[];
}

const comparisonRows = [
  { label: "Skills Match", get: (p: ClientProposal) => `${p.overallMatch}%` },
  { label: "Rating", get: (p: ClientProposal) => p.rating },
  { label: "Hourly Rate", get: (p: ClientProposal) => `$${p.hourlyRate}/hr` },
  { label: "Success Rate", get: (p: ClientProposal) => `${p.jobSuccessScore}%` },
  { label: "Projects Completed", get: (p: ClientProposal) => p.projectsCompleted },
  { label: "Response Time", get: (p: ClientProposal) => p.responseTime },
  { label: "Portfolio Strength", get: (p: ClientProposal) => `${p.portfolioStrength}%` },
  { label: "Proposal Score", get: (p: ClientProposal) => `${p.proposalScore}%` },
  { label: "Expected Budget", get: (p: ClientProposal) => p.expectedBudget },
  { label: "Delivery Time", get: (p: ClientProposal) => p.deliveryTime },
];

export function FreelancerComparisonContent({
  proposalIds,
}: FreelancerComparisonContentProps) {
  const { getProposalsByIds, clearCompare, toggleCompare } = useClientProposals();
  const [clearOpen, setClearOpen] = useState(false);

  const proposals = getProposalsByIds(proposalIds);

  if (proposals.length === 0) {
    return (
      <div className="p-8">
        <EmptyState
          title="No freelancers to compare"
          description="Add up to 3 proposals from the review page to compare side-by-side."
          actionLabel="Review Proposals"
          actionHref="/client/proposals"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Compare Freelancers
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Side-by-side comparison of {proposals.length} proposal
            {proposals.length !== 1 ? "s" : ""}
          </p>
        </div>
        <SecondaryButton onClick={() => setClearOpen(true)} className="rounded-xl">
          Clear All
        </SecondaryButton>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full min-w-[640px]" aria-label="Freelancer comparison">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left text-sm font-medium text-muted-foreground" scope="col">
                Criteria
              </th>
              {proposals.map((p) => (
                <th key={p.id} className="p-4 text-center" scope="col">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-sm font-semibold text-primary-foreground">
                        {p.freelancerAvatar}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-semibold text-foreground">{p.freelancerName}</p>
                    <p className="text-xs text-muted-foreground">{p.freelancerTitle}</p>
                    <button
                      type="button"
                      onClick={() => toggleCompare(p.id)}
                      className="text-xs text-muted-foreground hover:text-destructive"
                      aria-label={`Remove ${p.freelancerName} from comparison`}
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border bg-muted/20">
              <td className="p-4 text-sm font-medium text-foreground">Rating</td>
              {proposals.map((p) => (
                <td key={p.id} className="p-4 text-center">
                  <StarRating rating={p.rating} size="sm" />
                </td>
              ))}
            </tr>
            {comparisonRows.slice(1).map((row, rowIndex) => (
              <motion.tr
                key={row.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowIndex * 0.03 }}
                className="border-b border-border last:border-0"
              >
                <td className="p-4 text-sm font-medium text-muted-foreground">
                  {row.label}
                </td>
                {proposals.map((p) => (
                  <td
                    key={p.id}
                    className="p-4 text-center text-sm font-medium text-foreground"
                  >
                    {row.get(p)}
                  </td>
                ))}
              </motion.tr>
            ))}
            <tr>
              <td className="p-4" />
              {proposals.map((p) => (
                <td key={p.id} className="p-4 text-center">
                  <div className="flex flex-col gap-2">
                    <PrimaryButton
                      href={`/client/proposals/${p.id}`}
                      className="rounded-xl text-xs"
                    >
                      View Proposal
                    </PrimaryButton>
                    <Link
                      href={`/client/hire?proposal=${p.id}`}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Hire Freelancer
                    </Link>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={clearOpen}
        onOpenChange={setClearOpen}
        title="Clear comparison?"
        description="This will remove all freelancers from the comparison list."
        confirmLabel="Clear All"
        variant="destructive"
        onConfirm={() => {
          clearCompare();
          setClearOpen(false);
        }}
      />
    </div>
  );
}
