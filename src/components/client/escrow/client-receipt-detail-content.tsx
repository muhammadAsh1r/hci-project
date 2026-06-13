"use client";

import { motion } from "framer-motion";
import { Download, Shield } from "lucide-react";
import { TransactionStatusBadge } from "@/components/client/contracts/contract-status-badge";
import { BackLink } from "@/components/shared/back-link";
import { PrimaryButton } from "@/components/shared/primary-button";
import { Separator } from "@/components/ui/separator";
import { formatClientCurrency } from "@/lib/client-contracts-data";
import type { ClientReceipt } from "@/lib/types/client-contract";

interface ClientReceiptDetailContentProps {
  receipt: ClientReceipt;
}

export function ClientReceiptDetailContent({
  receipt,
}: ClientReceiptDetailContentProps) {
  const handleDownload = () => {
    const text = [
      "FREELANCEAI PAYMENT RECEIPT",
      "============================",
      `Receipt Number: ${receipt.receiptNumber}`,
      `Date: ${receipt.date}`,
      `Status: ${receipt.status}`,
      "",
      `Freelancer: ${receipt.freelancer}`,
      `Project: ${receipt.project}`,
      "",
      `Amount: ${formatClientCurrency(receipt.amount)}`,
      `Payment Method: ${receipt.method}`,
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
    <div className="mx-auto max-w-2xl space-y-6 p-4 pb-24 sm:p-6 lg:p-8">
      <BackLink href="/client/escrow/transactions" label="Back to Transactions" />

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
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Receipt Number
              </p>
              <p className="font-mono text-lg font-bold text-foreground">
                {receipt.receiptNumber}
              </p>
            </div>
            <TransactionStatusBadge status={receipt.status} />
          </div>

          <Separator />

          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Project", value: receipt.project },
              { label: "Freelancer", value: receipt.freelancer },
              { label: "Date", value: receipt.date },
              { label: "Payment Method", value: receipt.method },
              { label: "Amount", value: formatClientCurrency(receipt.amount) },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium text-muted-foreground">{item.label}</dt>
                <dd className="mt-0.5 font-medium text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-3xl font-bold text-primary">
              {formatClientCurrency(receipt.amount)}
            </p>
          </div>

          <PrimaryButton onClick={handleDownload} className="w-full rounded-xl">
            <Download className="size-4" aria-hidden="true" />
            Download Receipt
          </PrimaryButton>
        </div>
      </motion.div>
    </div>
  );
}
