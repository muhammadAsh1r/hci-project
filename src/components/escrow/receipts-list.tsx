"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import Link from "next/link";
import { PaymentStatusBadge } from "@/components/escrow/payment-status-badge";
import { formatCurrency } from "@/lib/escrow-data";
import type { EscrowReceipt } from "@/lib/types/escrow";

interface ReceiptsListProps {
  receipts: EscrowReceipt[];
}

export function ReceiptsList({ receipts }: ReceiptsListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {receipts.map((receipt, index) => (
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
                <p className="font-mono text-sm font-semibold text-foreground">{receipt.receiptNumber}</p>
                <p className="text-xs text-muted-foreground">{receipt.transactionDate}</p>
              </div>
            </div>
            <PaymentStatusBadge status={receipt.status} />
          </div>
          <p className="mb-1 text-sm font-medium text-foreground">{receipt.project}</p>
          <p className="mb-3 text-xs text-muted-foreground">{receipt.client} → {receipt.freelancer}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">{formatCurrency(receipt.amount)}</span>
            <Link
              href={`/dashboard/escrow/receipts/${receipt.id}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              <Download className="size-3.5" /> View
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
