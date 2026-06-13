"use client";

import { useEffect, useState } from "react";
import { FileSignature } from "lucide-react";
import { ClientContractsTable } from "@/components/client/contracts/client-contracts-table";
import { ContractsStatsBar } from "@/components/client/contracts/contracts-stats-bar";
import { EmptyState } from "@/components/shared/empty-state";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { useClientContracts } from "@/hooks/use-client-contracts";

export function ContractsDashboardContent() {
  const { contracts, contractStats } = useClientContracts();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const activeContracts = contracts.filter(
    (c) => c.status !== "Draft" && c.status !== "Cancelled"
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Contracts
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage active contracts, review milestones, and release payments.
        </p>
      </div>

      <ContractsStatsBar stats={contractStats} />

      {isLoading ? (
        <ListSkeleton count={4} />
      ) : contracts.length === 0 ? (
        <EmptyState
          icon={FileSignature}
          title="No contracts yet"
          description="Contracts are created when you hire a freelancer through the hiring workflow."
          actionLabel="Review Proposals"
          actionHref="/client/proposals"
        />
      ) : (
        <ClientContractsTable contracts={contracts} />
      )}
    </div>
  );
}
