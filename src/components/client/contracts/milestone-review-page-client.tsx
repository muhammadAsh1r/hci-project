"use client";

import { MilestoneReviewContent } from "@/components/client/contracts/milestone-review-content";
import { EmptyState } from "@/components/shared/empty-state";
import { useClientContracts } from "@/hooks/use-client-contracts";

interface MilestoneReviewPageClientProps {
  contractId: string;
  milestoneId: string;
}

export function MilestoneReviewPageClient({
  contractId,
  milestoneId,
}: MilestoneReviewPageClientProps) {
  const { getContractById, getMilestone } = useClientContracts();
  const contract = getContractById(contractId);
  const milestone = getMilestone(contractId, milestoneId);

  if (!contract || !milestone) {
    return (
      <div className="p-8">
        <EmptyState
          title="Milestone not found"
          description="This milestone may have been removed or the link is incorrect."
          actionLabel="View Contracts"
          actionHref="/client/contracts"
        />
      </div>
    );
  }

  return <MilestoneReviewContent contract={contract} milestone={milestone} />;
}
