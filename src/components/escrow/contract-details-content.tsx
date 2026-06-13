"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import { EscrowTimeline } from "@/components/escrow/escrow-timeline";
import { MilestoneList } from "@/components/escrow/milestone-list";
import { PaymentActions } from "@/components/escrow/payment-actions";
import { PaymentStatusBadge } from "@/components/escrow/payment-status-badge";
import { createToast, ProposalToast } from "@/components/proposals/proposal-toast";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/escrow-data";
import type { EscrowContract } from "@/lib/types/escrow";
import type { ToastType } from "@/components/proposals/proposal-toast";

interface ContractDetailsContentProps {
  contract: EscrowContract;
}

interface ToastItem { id: string; message: string; type: ToastType }

export function ContractDetailsContent({ contract }: ContractDetailsContentProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string) => {
    const toast = createToast(message, "success");
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== toast.id)), 4000);
  }, []);

  const handleAction = useCallback((_action: string, message: string) => {
    addToast(message);
  }, [addToast]);

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-8 p-4 sm:p-6 lg:p-8">
        <Link
          href="/dashboard/escrow"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          <ArrowLeft className="size-4" /> Back to Escrow
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Contract Overview</p>
              <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">{contract.projectName}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{contract.description}</p>
            </div>
            <PaymentStatusBadge status={contract.paymentStatus} className="self-start" />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
              <DollarSign className="size-5 text-primary" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">Contract Value</p>
                <p className="font-bold text-foreground">{formatCurrency(contract.contractValue)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-primary/5 p-4">
              <DollarSign className="size-5 text-primary" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">Escrow Amount</p>
                <p className="font-bold text-primary">{formatCurrency(contract.escrowAmount)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
              <Calendar className="size-5 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="font-bold text-foreground">{contract.createdAt}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-border p-4">
            <Users className="size-5 text-muted-foreground" aria-hidden="true" />
            <div className="text-sm">
              <span className="font-medium text-foreground">{contract.clientName}</span>
              <span className="text-muted-foreground"> (Client) → </span>
              <span className="font-medium text-foreground">{contract.freelancerName}</span>
              <span className="text-muted-foreground"> (Freelancer)</span>
            </div>
          </div>
        </motion.div>

        <PaymentActions contract={contract} onAction={handleAction} />

        <Separator />

        <section aria-labelledby="milestones-heading">
          <h2 id="milestones-heading" className="mb-6 text-xl font-semibold text-foreground">Milestone Breakdown</h2>
          <MilestoneList milestones={contract.milestones} />
        </section>

        <EscrowTimeline currentStep={contract.currentTimelineStep} compact />
      </div>

      <ProposalToast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </>
  );
}
