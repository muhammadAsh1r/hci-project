"use client";

import { useEffect, useState } from "react";
import { History, Receipt, Shield } from "lucide-react";
import { ClientContractsTable } from "@/components/client/contracts/client-contracts-table";
import { ClientEscrowAnalytics } from "@/components/client/escrow/client-escrow-analytics";
import { ClientEscrowNotifications } from "@/components/client/escrow/client-escrow-notifications";
import { ClientEscrowTimeline } from "@/components/client/escrow/client-escrow-timeline";
import { EscrowStatsBar } from "@/components/client/escrow/escrow-stats-bar";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { useClientContracts } from "@/hooks/use-client-contracts";

export function EscrowPaymentCenterContent() {
  const { contracts, escrowStats } = useClientContracts();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const activeContract = contracts.find(
    (c) => c.status === "Awaiting Review" || c.status === "In Progress"
  ) ?? contracts[0];

  const activeContracts = contracts.filter(
    (c) => c.status !== "Cancelled" && c.status !== "Draft"
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brand-accent text-primary-foreground">
            <Shield className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Escrow Payment Center
            </h2>
            <p className="text-sm text-muted-foreground">
              Monitor escrow balances, approve milestones, and release payments
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <SecondaryButton href="/client/escrow/receipts" className="rounded-xl">
            <Receipt className="size-4" />
            View Receipts
          </SecondaryButton>
          <SecondaryButton href="/client/escrow/transactions" className="rounded-xl">
            <History className="size-4" />
            Transaction History
          </SecondaryButton>
        </div>
      </div>

      {isLoading ? (
        <ListSkeleton count={4} />
      ) : (
        <>
          <EscrowStatsBar stats={escrowStats} />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {activeContract ? (
                <ClientEscrowTimeline currentStep={activeContract.currentTimelineStep} />
              ) : null}
            </div>
            <ClientEscrowNotifications />
          </div>

          <ClientContractsTable contracts={activeContracts} />

          <section aria-labelledby="analytics-heading">
            <h2 id="analytics-heading" className="mb-6 text-xl font-semibold text-foreground">
              Payment Analytics
            </h2>
            <ClientEscrowAnalytics />
          </section>
        </>
      )}
    </div>
  );
}
