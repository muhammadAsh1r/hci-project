"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, Shield } from "lucide-react";
import Link from "next/link";
import { PrimaryButton } from "@/components/shared/primary-button";
import { PaymentStatusBadge } from "@/components/escrow/payment-status-badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/escrow-data";
import type { EscrowReceipt } from "@/lib/types/escrow";

interface ReceiptDetailProps {
  receipt: EscrowReceipt;
}

export function ReceiptDetail({ receipt }: ReceiptDetailProps) {
  const handleDownload = () => {
    const text = [
      "FREELANCEAI PAYMENT RECEIPT",
      "============================",
      `Receipt Number: ${receipt.receiptNumber}`,
      `Date: ${receipt.transactionDate}`,
      `Status: ${receipt.status}`,
      "",
      `Client: ${receipt.client}`,
      `Freelancer: ${receipt.freelancer}`,
      `Project: ${receipt.project}`,
      "",
      `Amount: ${formatCurrency(receipt.amount)}`,
      `Method: ${receipt.method}`,
      "",
      "Thank you for using FreelanceAI Escrow.",
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${receipt.receiptNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6 lg:p-8">
      <Link
        href="/dashboard/escrow/receipts"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        <ArrowLeft className="size-4" /> Back to Receipts
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
      >
        <div className="bg-gradient-to-r from-primary to-brand-secondary px-6 py-8 text-primary-foreground sm:px-8">
          <div className="flex items-center gap-3">
            <Shield className="size-8" aria-hidden="true" />
            <div>
              <p className="text-sm opacity-80">FreelanceAI Escrow</p>
              <h1 className="text-2xl font-bold">Payment Receipt</h1>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Receipt Number</p>
              <p className="font-mono text-lg font-bold text-foreground">{receipt.receiptNumber}</p>
            </div>
            <PaymentStatusBadge status={receipt.status} />
          </div>

          <Separator />

          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Client", value: receipt.client },
              { label: "Freelancer", value: receipt.freelancer },
              { label: "Project", value: receipt.project },
              { label: "Transaction Date", value: receipt.transactionDate },
              { label: "Payment Method", value: receipt.method },
              { label: "Amount", value: formatCurrency(receipt.amount) },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium text-muted-foreground">{item.label}</dt>
                <dd className="mt-0.5 font-medium text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-3xl font-bold text-primary">{formatCurrency(receipt.amount)}</p>
          </div>

          <PrimaryButton onClick={handleDownload} className="w-full">
            <Download className="size-4" aria-hidden="true" />
            Download Receipt
          </PrimaryButton>
        </div>
      </motion.div>
    </div>
  );
}
