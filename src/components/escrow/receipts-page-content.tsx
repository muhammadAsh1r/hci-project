"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReceiptsList } from "@/components/escrow/receipts-list";
import { escrowReceipts } from "@/lib/escrow-data";

export function ReceiptsPageContent() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <Link href="/dashboard/escrow" className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
          <ArrowLeft className="size-4" /> Back to Escrow
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Receipts</h1>
        <p className="text-sm text-muted-foreground">{escrowReceipts.length} payment receipts</p>
      </div>
      <ReceiptsList receipts={escrowReceipts} />
    </div>
  );
}
