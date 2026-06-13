"use client";

import { ClientReceiptDetailContent } from "@/components/client/escrow/client-receipt-detail-content";
import { EmptyState } from "@/components/shared/empty-state";
import { getClientReceiptById } from "@/lib/client-contracts-data";

interface ReceiptPageClientProps {
  id: string;
}

export function ReceiptPageClient({ id }: ReceiptPageClientProps) {
  const receipt = getClientReceiptById(id);

  if (!receipt) {
    return (
      <div className="p-8">
        <EmptyState
          title="Receipt not found"
          description="This receipt may have been removed or the link is incorrect."
          actionLabel="View Transactions"
          actionHref="/client/escrow/transactions"
        />
      </div>
    );
  }

  return <ClientReceiptDetailContent receipt={receipt} />;
}
