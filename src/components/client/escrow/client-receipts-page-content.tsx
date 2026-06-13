"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText } from "lucide-react";
import Link from "next/link";
import { TransactionStatusBadge } from "@/components/client/contracts/contract-status-badge";
import { SEED_CLIENT_RECEIPTS } from "@/lib/client-contracts-data";

function formatClientAmount(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function ClientReceiptsPageContent() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 pb-24 sm:p-6 lg:p-8">
      <div>
        <Link
          href="/client/escrow"
          className="mb-2 inline-flex items-center gap-1 rounded-md text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4" /> Back to Escrow
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Receipts</h1>
        <p className="text-sm text-muted-foreground">
          {SEED_CLIENT_RECEIPTS.length} payment receipts
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SEED_CLIENT_RECEIPTS.map((receipt, index) => (
          <motion.div
            key={receipt.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-sm font-semibold text-foreground">
                    {receipt.receiptNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">{receipt.date}</p>
                </div>
              </div>
              <TransactionStatusBadge status={receipt.status} />
            </div>
            <p className="mb-1 text-sm font-medium text-foreground">{receipt.project}</p>
            <p className="mb-3 text-xs text-muted-foreground">Paid to {receipt.freelancer}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                {formatClientAmount(receipt.amount)}
              </span>
              <Link
                href={`/client/escrow/receipts/${receipt.id}`}
                className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Download className="size-3.5" /> View
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
