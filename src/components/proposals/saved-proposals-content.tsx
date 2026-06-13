"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FileText, Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PrimaryButton } from "@/components/shared/primary-button";
import { savedProposals } from "@/lib/proposal-data";
import type { ProposalStatus } from "@/lib/types/proposal";
import { cn } from "@/lib/utils";

const statusStyles: Record<ProposalStatus, string> = {
  Draft: "bg-gray-100 text-gray-700 border-gray-200",
  Submitted: "bg-blue-50 text-blue-700 border-blue-200",
  Won: "bg-green-50 text-green-700 border-green-200",
  Lost: "bg-red-50 text-red-700 border-red-200",
};

export function SavedProposalsContent() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/proposals"
            className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          >
            <ArrowLeft className="size-4" />
            Back to Generator
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Saved Proposals
          </h1>
          <p className="text-sm text-muted-foreground">
            {savedProposals.length} proposals in your history
          </p>
        </div>
        <PrimaryButton href="/dashboard/proposals">
          <Plus className="size-4" aria-hidden="true" />
          New Proposal
        </PrimaryButton>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full" aria-label="Saved proposals">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3" scope="col">Proposal Name</th>
                <th className="px-6 py-3" scope="col">Project</th>
                <th className="px-6 py-3" scope="col">Created</th>
                <th className="px-6 py-3" scope="col">Last Edited</th>
                <th className="px-6 py-3" scope="col">Status</th>
                <th className="px-6 py-3" scope="col"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {savedProposals.map((proposal, index) => (
                <motion.tr
                  key={proposal.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FileText className="size-4" aria-hidden="true" />
                      </div>
                      <span className="font-medium text-foreground">{proposal.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {proposal.projectName}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {proposal.createdDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {proposal.lastEdited}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={cn("rounded-lg font-normal", statusStyles[proposal.status])}
                    >
                      {proposal.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/proposals?project=${proposal.projectId}`}
                      className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                    >
                      Open
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-border md:hidden">
          {savedProposals.map((proposal) => (
            <div key={proposal.id} className="p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="font-medium text-foreground">{proposal.name}</p>
                <Badge
                  variant="outline"
                  className={cn("shrink-0 rounded-lg text-xs font-normal", statusStyles[proposal.status])}
                >
                  {proposal.status}
                </Badge>
              </div>
              <p className="mb-2 text-sm text-muted-foreground">{proposal.projectName}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Created {proposal.createdDate}</span>
                <Link
                  href={`/dashboard/proposals?project=${proposal.projectId}`}
                  className="font-medium text-primary"
                >
                  Open →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
