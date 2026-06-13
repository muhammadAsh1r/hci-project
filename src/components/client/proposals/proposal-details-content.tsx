"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Check,
  MessageSquare,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AvailabilityBadge } from "@/components/freelancers/availability-badge";
import { StarRating } from "@/components/freelancers/star-rating";
import { ProposalSkillMatch } from "@/components/client/proposals/proposal-skill-match";
import { BackLink } from "@/components/shared/back-link";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useClientProposals } from "@/hooks/use-client-proposals";
import { useToast } from "@/hooks/use-toast";
import type { ClientProposal } from "@/lib/types/client-proposal";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  new: "bg-violet-50 text-violet-700 border-violet-200",
  shortlisted: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  saved: "bg-blue-50 text-blue-700 border-blue-200",
};

interface ProposalDetailsContentProps {
  proposal: ClientProposal;
}

export function ProposalDetailsContent({ proposal }: ProposalDetailsContentProps) {
  const router = useRouter();
  const { shortlist, accept, reject, toggleCompare, isInCompare } = useClientProposals();
  const { showToast, ToastContainer } = useToast();

  const statusLabel =
    proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <BackLink href="/client/proposals" label="Back to Proposals" />

      <nav aria-label="Breadcrumb" className="-mt-2 mb-2">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/client/proposals" className="hover:text-foreground">
              Proposals
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-foreground" aria-current="page">
            {proposal.freelancerName}
          </li>
        </ol>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <Avatar className="size-20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-2xl font-bold text-primary-foreground">
              {proposal.freelancerAvatar}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={cn("rounded-lg font-normal", statusStyles[proposal.status])}
              >
                {statusLabel}
              </Badge>
              <Badge variant="secondary" className="rounded-lg">
                Score: {proposal.proposalScore}%
              </Badge>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              {proposal.freelancerName}
            </h1>
            <p className="text-lg text-muted-foreground">{proposal.freelancerTitle}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <StarRating rating={proposal.rating} />
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="size-4" />
                {proposal.jobSuccessScore}% success rate
              </span>
              <span className="text-muted-foreground">
                {proposal.projectsCompleted} projects completed
              </span>
              <span className="text-muted-foreground">
                Responds {proposal.responseTime}
              </span>
              <AvailabilityBadge status={proposal.availability} />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            <SecondaryButton
              onClick={() => {
                shortlist(proposal.id);
                showToast("Freelancer shortlisted");
              }}
              className="rounded-xl"
              disabled={proposal.status === "shortlisted" || proposal.status === "accepted"}
            >
              <Star className="size-4" />
              Shortlist
            </SecondaryButton>
            <PrimaryButton
              href={`/client/hire?proposal=${proposal.id}`}
              className="rounded-xl"
            >
              <Check className="size-4" />
              Accept & Hire
            </PrimaryButton>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Proposal Content</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-foreground">Cover Letter</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {proposal.coverLetter}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-foreground">Project Understanding</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {proposal.projectUnderstanding}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-foreground">Proposed Solution</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {proposal.proposedSolution}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-muted/40 p-4">
                  <p className="text-xs text-muted-foreground">Timeline</p>
                  <p className="mt-1 font-medium text-foreground">{proposal.timeline}</p>
                </div>
                <div className="rounded-xl bg-muted/40 p-4">
                  <p className="text-xs text-muted-foreground">Estimated Cost</p>
                  <p className="mt-1 font-medium text-primary">{proposal.estimatedCost}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Portfolio References</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {proposal.portfolioReferences.map((ref) => (
                <div
                  key={ref.id}
                  className="rounded-xl border border-border p-4 transition-colors hover:bg-muted/30"
                >
                  <p className="font-medium text-foreground">{ref.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{ref.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <ProposalSkillMatch
            matches={proposal.skillMatches}
            overallMatch={proposal.overallMatch}
          />

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-foreground">Client Actions</h3>
            <div className="flex flex-col gap-2">
              <SecondaryButton
                onClick={() => {
                  toggleCompare(proposal.id);
                  showToast(
                    isInCompare(proposal.id)
                      ? "Removed from compare"
                      : "Added to compare"
                  );
                }}
                className="w-full justify-start rounded-xl"
              >
                <ArrowLeftRight className="size-4" />
                {isInCompare(proposal.id) ? "Remove from Compare" : "Compare Freelancer"}
              </SecondaryButton>
              <SecondaryButton className="w-full justify-start rounded-xl">
                <MessageSquare className="size-4" />
                Message Freelancer
              </SecondaryButton>
              {proposal.status !== "rejected" ? (
                <SecondaryButton
                  onClick={() => {
                    reject(proposal.id);
                    showToast("Proposal rejected", "info");
                    router.push("/client/proposals");
                  }}
                  className="w-full justify-start rounded-xl text-destructive hover:text-destructive"
                >
                  <X className="size-4" />
                  Reject Proposal
                </SecondaryButton>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-4 text-sm">
            <p className="font-medium text-foreground">Project</p>
            <p className="text-muted-foreground">{proposal.projectTitle}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Submitted {proposal.submittedDate}
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
