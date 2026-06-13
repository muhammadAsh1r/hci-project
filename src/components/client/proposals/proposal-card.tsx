"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Bookmark,
  Check,
  MessageSquare,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import { AvailabilityBadge } from "@/components/freelancers/availability-badge";
import { StarRating } from "@/components/freelancers/star-rating";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ClientProposal } from "@/lib/types/client-proposal";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  new: "bg-violet-50 text-violet-700 border-violet-200",
  shortlisted: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  saved: "bg-blue-50 text-blue-700 border-blue-200",
};

interface ProposalCardProps {
  proposal: ClientProposal;
  index?: number;
  isInCompare?: boolean;
  onShortlist: (id: string) => void;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
}

export function ProposalCard({
  proposal,
  index = 0,
  isInCompare = false,
  onShortlist,
  onAccept,
  onReject,
  onSave,
  onToggleCompare,
}: ProposalCardProps) {
  const statusLabel =
    proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/5"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="size-14 shrink-0">
            <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-base font-semibold text-primary-foreground">
              {proposal.freelancerAvatar}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {proposal.freelancerName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {proposal.freelancerTitle}
                </p>
              </div>
              <Badge
                variant="outline"
                className={cn("rounded-lg font-normal", statusStyles[proposal.status])}
              >
                {statusLabel}
              </Badge>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <StarRating rating={proposal.rating} size="sm" />
              <span className="inline-flex items-center gap-1">
                <TrendingUp className="size-3.5" aria-hidden="true" />
                {proposal.jobSuccessScore}% success
              </span>
              <AvailabilityBadge status={proposal.availability} />
            </div>
          </div>
        </div>

        <p className="mt-1 text-xs font-medium text-primary">
          For: {proposal.projectTitle}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-muted/40 px-3 py-2">
            <p className="text-xs text-muted-foreground">Budget</p>
            <p className="text-sm font-bold text-foreground">{proposal.expectedBudget}</p>
          </div>
          <div className="rounded-xl bg-muted/40 px-3 py-2">
            <p className="text-xs text-muted-foreground">Delivery</p>
            <p className="text-sm font-bold text-foreground">{proposal.deliveryTime}</p>
          </div>
          <div className="rounded-xl bg-muted/40 px-3 py-2">
            <p className="text-xs text-muted-foreground">Score</p>
            <p className="text-sm font-bold text-primary">{proposal.proposalScore}%</p>
          </div>
          <div className="rounded-xl bg-muted/40 px-3 py-2">
            <p className="text-xs text-muted-foreground">Submitted</p>
            <p className="text-sm font-bold text-foreground">{proposal.submittedDate}</p>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {proposal.coverLetterPreview}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border px-6 py-4">
        <PrimaryButton
          href={`/client/proposals/${proposal.id}`}
          className="flex-1 rounded-xl sm:flex-none sm:px-6"
        >
          View Proposal
        </PrimaryButton>

        {proposal.status !== "shortlisted" && proposal.status !== "accepted" ? (
          <SecondaryButton
            onClick={() => onShortlist(proposal.id)}
            className="rounded-xl"
          >
            <Star className="size-4" />
            Shortlist
          </SecondaryButton>
        ) : null}

        {proposal.status === "shortlisted" ? (
          <SecondaryButton
            onClick={() => onAccept(proposal.id)}
            className="rounded-xl"
          >
            <Check className="size-4" />
            Accept
          </SecondaryButton>
        ) : null}

        {proposal.status !== "rejected" && proposal.status !== "accepted" ? (
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={() => onReject(proposal.id)}
            aria-label="Reject proposal"
          >
            <X className="size-4" />
          </Button>
        ) : null}

        <Button
          variant="outline"
          size="icon"
          className={cn("rounded-xl", isInCompare && "border-primary bg-primary/5 text-primary")}
          onClick={() => onToggleCompare(proposal.id)}
          aria-label={isInCompare ? "Remove from compare" : "Add to compare"}
          aria-pressed={isInCompare}
        >
          <ArrowLeftRight className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          onClick={() => onSave(proposal.id)}
          aria-label="Save for later"
        >
          <Bookmark className="size-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
          aria-label="Message freelancer"
        >
          <MessageSquare className="size-4" />
        </Button>
      </div>
    </motion.article>
  );
}
