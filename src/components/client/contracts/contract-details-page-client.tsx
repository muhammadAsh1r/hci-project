"use client";

import { ClientContractDetailsContent } from "@/components/client/contracts/client-contract-details-content";
import { EmptyState } from "@/components/shared/empty-state";
import { useClientContracts } from "@/hooks/use-client-contracts";

interface ContractDetailsPageClientProps {
  id: string;
}

export function ContractDetailsPageClient({ id }: ContractDetailsPageClientProps) {
  const { getContractById } = useClientContracts();
  const contract = getContractById(id);

  if (!contract) {
    return (
      <div className="p-8">
        <EmptyState
          title="Contract not found"
          description="This contract may have been removed or the link is incorrect."
          actionLabel="View Contracts"
          actionHref="/client/contracts"
        />
      </div>
    );
  }

  return <ClientContractDetailsContent contract={contract} />;
}
