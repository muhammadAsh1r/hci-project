"use client";

import { motion } from "framer-motion";
import { CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ContractStatusBadge } from "@/components/client/contracts/contract-status-badge";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { formatClientCurrency } from "@/lib/client-contracts-data";
import type { ClientContract } from "@/lib/types/client-contract";

interface ClientContractsTableProps {
  contracts: ClientContract[];
}

export function ClientContractsTable({ contracts }: ClientContractsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Contracts</h3>
        <p className="text-sm text-muted-foreground">{contracts.length} total</p>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[900px]" aria-label="Client contracts">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-3" scope="col">Contract ID</th>
              <th className="px-6 py-3" scope="col">Project Name</th>
              <th className="px-6 py-3" scope="col">Freelancer</th>
              <th className="px-6 py-3" scope="col">Contract Value</th>
              <th className="px-6 py-3" scope="col">Start Date</th>
              <th className="px-6 py-3" scope="col">Deadline</th>
              <th className="px-6 py-3" scope="col">Status</th>
              <th className="px-6 py-3" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {contracts.map((contract, index) => {
              const reviewMilestone = contract.milestones.find(
                (m) => m.status === "Under Review" || m.status === "Submitted"
              );

              return (
                <motion.tr
                  key={contract.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-6 py-4 font-mono text-sm text-foreground">{contract.id}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{contract.projectName}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{contract.freelancerName}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">
                    {formatClientCurrency(contract.contractValue)}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{contract.startDate}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{contract.deadline}</td>
                  <td className="px-6 py-4">
                    <ContractStatusBadge status={contract.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      <Link
                        href={`/client/contracts/${contract.id}`}
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-primary hover:bg-primary/5 hover:underline"
                      >
                        View
                        <ExternalLink className="size-3" />
                      </Link>
                      {reviewMilestone ? (
                        <Link
                          href={`/client/contracts/${contract.id}/milestones/${reviewMilestone.id}`}
                          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-amber-700 hover:bg-amber-50"
                        >
                          <CheckCircle className="size-3" />
                          Review
                        </Link>
                      ) : null}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-border lg:hidden">
        {contracts.map((contract) => {
          const reviewMilestone = contract.milestones.find(
            (m) => m.status === "Under Review" || m.status === "Submitted"
          );

          return (
            <div key={contract.id} className="p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground">{contract.projectName}</p>
                  <p className="font-mono text-xs text-muted-foreground">{contract.id}</p>
                </div>
                <ContractStatusBadge status={contract.status} />
              </div>
              <p className="text-sm text-muted-foreground">{contract.freelancerName}</p>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="font-semibold">{formatClientCurrency(contract.contractValue)}</span>
                <span className="text-muted-foreground">{contract.deadline}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <SecondaryButton
                  href={`/client/contracts/${contract.id}`}
                  className="flex-1 rounded-xl text-xs"
                >
                  View Contract
                </SecondaryButton>
                {reviewMilestone ? (
                  <SecondaryButton
                    href={`/client/contracts/${contract.id}/milestones/${reviewMilestone.id}`}
                    className="rounded-xl text-xs"
                  >
                    <CheckCircle className="size-3.5" />
                    Review
                  </SecondaryButton>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
