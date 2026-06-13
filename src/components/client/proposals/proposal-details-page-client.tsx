"use client";

import { ProposalDetailsContent } from "@/components/client/proposals/proposal-details-content";
import { EmptyState } from "@/components/shared/empty-state";
import { useClientProposals } from "@/hooks/use-client-proposals";

interface ProposalDetailsPageClientProps {
  id: string;
}

export function ProposalDetailsPageClient({ id }: ProposalDetailsPageClientProps) {
  const { getProposalById } = useClientProposals();
  const proposal = getProposalById(id);

  if (!proposal) {
    return (
      <div className="p-8">
        <EmptyState
          title="Proposal not found"
          description="This proposal may have been removed or the link is incorrect."
          actionLabel="Review Proposals"
          actionHref="/client/proposals"
        />
      </div>
    );
  }

  return <ProposalDetailsContent proposal={proposal} />;
}
