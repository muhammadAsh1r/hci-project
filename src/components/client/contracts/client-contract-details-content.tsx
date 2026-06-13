"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { ContractStatusBadge } from "@/components/client/contracts/contract-status-badge";
import { ContractMilestoneCards } from "@/components/client/contracts/contract-milestone-cards";
import { ClientEscrowTimeline } from "@/components/client/escrow/client-escrow-timeline";
import { BackLink } from "@/components/shared/back-link";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatClientCurrency } from "@/lib/client-contracts-data";
import { getReviewableMilestone } from "@/lib/client-contracts-data";
import type { ClientContract } from "@/lib/types/client-contract";

interface ClientContractDetailsContentProps {
  contract: ClientContract;
}

export function ClientContractDetailsContent({
  contract,
}: ClientContractDetailsContentProps) {
  const reviewMilestone = getReviewableMilestone(contract);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <BackLink href="/client/contracts" label="Back to Contracts" />

      <nav aria-label="Breadcrumb" className="-mt-2 mb-2">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/client/contracts" className="hover:text-foreground">
              Contracts
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-foreground" aria-current="page">
            {contract.projectName}
          </li>
        </ol>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Contract Overview
            </p>
            <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
              {contract.projectName}
            </h1>
            <p className="mt-2 font-mono text-sm text-muted-foreground">{contract.id}</p>
            <p className="mt-2 text-sm text-muted-foreground">{contract.description}</p>
          </div>
          <ContractStatusBadge status={contract.status} className="self-start" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">Contract Value</p>
            <p className="mt-1 text-lg font-bold text-foreground">
              {formatClientCurrency(contract.contractValue)}
            </p>
          </div>
          <div className="rounded-xl bg-primary/5 p-4">
            <p className="text-xs text-muted-foreground">Escrow Balance</p>
            <p className="mt-1 text-lg font-bold text-primary">
              {formatClientCurrency(contract.escrowBalance)}
            </p>
          </div>
          <div className="rounded-xl bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">Start Date</p>
            <p className="mt-1 font-medium text-foreground">{contract.startDate}</p>
          </div>
          <div className="rounded-xl bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">Deadline</p>
            <p className="mt-1 font-medium text-foreground">{contract.deadline}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar className="size-14">
            <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-base font-semibold text-primary-foreground">
              {contract.freelancerAvatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Freelancer</p>
            <p className="text-lg font-semibold text-foreground">
              {contract.freelancerName}
            </p>
            <p className="text-sm text-muted-foreground">{contract.freelancerTitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {reviewMilestone ? (
              <PrimaryButton
                href={`/client/contracts/${contract.id}/milestones/${reviewMilestone.id}`}
                className="rounded-xl"
              >
                Review Work
              </PrimaryButton>
            ) : null}
            <SecondaryButton className="rounded-xl">
              <MessageSquare className="size-4" />
              Message Freelancer
            </SecondaryButton>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2" aria-labelledby="milestones-heading">
          <h2 id="milestones-heading" className="mb-4 text-xl font-semibold text-foreground">
            Milestones
          </h2>
          <ContractMilestoneCards contract={contract} />
        </section>

        <div>
          <ClientEscrowTimeline currentStep={contract.currentTimelineStep} compact />
        </div>
      </div>
    </div>
  );
}
