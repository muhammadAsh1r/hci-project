"use client";

import { useEffect, useMemo, useState } from "react";
import { BackLink } from "@/components/shared/back-link";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { ClientTransactionTable } from "@/components/client/escrow/client-transaction-table";
import { useClientContracts } from "@/hooks/use-client-contracts";
import { DEFAULT_TRANSACTION_FILTERS } from "@/lib/types/client-contract";

export function ClientTransactionsPageContent() {
  const { transactions } = useClientContracts();
  const [filters, setFilters] = useState(DEFAULT_TRANSACTION_FILTERS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const projectOptions = useMemo(
    () => [...new Set(transactions.map((t) => t.project))],
    [transactions]
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <BackLink href="/client/escrow" label="Back to Escrow" />

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Transaction History
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          View all escrow funding and payment release transactions
        </p>
      </div>

      {isLoading ? (
        <ListSkeleton count={5} />
      ) : (
        <ClientTransactionTable
          transactions={transactions}
          filters={filters}
          onFiltersChange={setFilters}
          projectOptions={projectOptions}
        />
      )}
    </div>
  );
}
