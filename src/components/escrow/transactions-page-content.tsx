"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TransactionTable } from "@/components/escrow/transaction-table";
import { escrowTransactions } from "@/lib/escrow-data";

export function TransactionsPageContent() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <Link href="/dashboard/escrow" className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
          <ArrowLeft className="size-4" /> Back to Escrow
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Transaction History</h1>
        <p className="text-sm text-muted-foreground">Search, filter, and sort all escrow transactions</p>
      </div>
      <TransactionTable transactions={escrowTransactions} />
    </div>
  );
}
