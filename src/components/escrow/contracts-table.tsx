"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { PaymentStatusBadge } from "@/components/escrow/payment-status-badge";
import { formatCurrency } from "@/lib/escrow-data";
import type { EscrowContract } from "@/lib/types/escrow";

interface ContractsTableProps {
  contracts: EscrowContract[];
  compact?: boolean;
}

export function ContractsTable({ contracts, compact }: ContractsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Active Contracts</h3>
        {!compact && (
          <p className="text-sm text-muted-foreground">{contracts.length} contracts</p>
        )}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full" aria-label="Active escrow contracts">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-3" scope="col">Project</th>
              <th className="px-6 py-3" scope="col">Client</th>
              <th className="px-6 py-3" scope="col">Freelancer</th>
              <th className="px-6 py-3" scope="col">Value</th>
              <th className="px-6 py-3" scope="col">Milestones</th>
              <th className="px-6 py-3" scope="col">Status</th>
              <th className="px-6 py-3" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {contracts.map((contract, index) => (
              <motion.tr
                key={contract.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.04 }}
                className="transition-colors hover:bg-muted/30"
              >
                <td className="px-6 py-4 font-medium text-foreground">{contract.projectName}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{contract.clientName}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{contract.freelancerName}</td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">
                  {formatCurrency(contract.contractValue)}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{contract.milestoneStatus}</td>
                <td className="px-6 py-4">
                  <PaymentStatusBadge status={contract.paymentStatus} />
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/escrow/contracts/${contract.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                  >
                    View
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-border md:hidden">
        {contracts.map((contract) => (
          <div key={contract.id} className="p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <p className="font-medium text-foreground">{contract.projectName}</p>
              <PaymentStatusBadge status={contract.paymentStatus} />
            </div>
            <p className="text-sm text-muted-foreground">{contract.clientName} → {contract.freelancerName}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-semibold text-foreground">{formatCurrency(contract.contractValue)}</span>
              <Link href={`/dashboard/escrow/contracts/${contract.id}`} className="text-sm font-medium text-primary">
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
