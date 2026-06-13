"use client";

import { AnimatePresence } from "framer-motion";
import { FileText, GitCompareArrows } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ProposalCard } from "@/components/client/proposals/proposal-card";
import { ProposalFiltersBar } from "@/components/client/proposals/proposal-filters-bar";
import { ProposalStatsBar } from "@/components/client/proposals/proposal-stats-bar";
import { AiRecommendedFreelancers } from "@/components/client/proposals/ai-recommended-freelancers";
import { EmptyState } from "@/components/shared/empty-state";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import {
  filterProposals,
  useClientProposals,
} from "@/hooks/use-client-proposals";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_CLIENT_PROPOSAL_FILTERS } from "@/lib/types/client-proposal";

export function ProposalsManagementContent() {
  const {
    proposals,
    stats,
    compareIds,
    shortlist,
    reject,
    saveForLater,
    toggleCompare,
    isInCompare,
  } = useClientProposals();
  const { showToast, ToastContainer } = useToast();
  const router = useRouter();

  const [filters, setFilters] = useState(DEFAULT_CLIENT_PROPOSAL_FILTERS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const filtered = filterProposals(proposals, filters);
  const isShortlistOnly =
    filters.statuses.length === 1 &&
    filters.statuses[0] === "shortlisted" &&
    !filters.search &&
    filters.budgetRanges.length === 0 &&
    filters.experienceLevels.length === 0 &&
    filters.minRating === 0 &&
    filters.skills.length === 0;

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_CLIENT_PROPOSAL_FILTERS);
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Proposal Review
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review, compare, and hire freelancers for your projects.
          </p>
        </div>
        <div className="flex gap-2">
          {compareIds.length > 0 ? (
            <PrimaryButton
              href={`/client/proposals/compare?ids=${compareIds.join(",")}`}
              className="rounded-xl"
            >
              <GitCompareArrows className="size-4" />
              Compare ({compareIds.length})
            </PrimaryButton>
          ) : null}
          <SecondaryButton href="/client/hire" className="rounded-xl">
            Hiring Workflow
          </SecondaryButton>
        </div>
      </div>

      <ProposalStatsBar stats={stats} />

      <ProposalFiltersBar
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
      />

      {isLoading ? (
        <ListSkeleton count={3} />
      ) : proposals.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No proposals yet"
          description="Once freelancers submit proposals to your projects, they will appear here for review."
          actionLabel="Manage Projects"
          actionHref="/client/projects"
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={isShortlistOnly ? "No shortlisted freelancers" : "No search results"}
          description={
            isShortlistOnly
              ? "Shortlist promising proposals from the review list to keep track of top candidates."
              : "Try adjusting your filters or search terms."
          }
          actionLabel={isShortlistOnly ? "View All Proposals" : "Reset Filters"}
          onAction={handleReset}
        />
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="grid gap-4 lg:grid-cols-2">
            {filtered.map((proposal, index) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                index={index}
                isInCompare={isInCompare(proposal.id)}
                onShortlist={(id) => {
                  shortlist(id);
                  showToast("Freelancer shortlisted");
                }}
                onAccept={(id) => {
                  router.push(`/client/hire?proposal=${id}`);
                }}
                onReject={(id) => {
                  reject(id);
                  showToast("Proposal rejected", "info");
                }}
                onSave={(id) => {
                  saveForLater(id);
                  showToast("Saved for later");
                }}
                onToggleCompare={(id) => {
                  toggleCompare(id);
                  showToast(
                    isInCompare(id) ? "Removed from compare" : "Added to compare"
                  );
                }}
              />
            ))}
          </div>
        </AnimatePresence>
      )}

      {!isLoading && proposals.length > 0 ? (
        <AiRecommendedFreelancers />
      ) : null}

      <ToastContainer />
    </div>
  );
}
