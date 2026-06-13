"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getContractMilestones } from "@/lib/client-proposals-data";
import type { ClientProposal } from "@/lib/types/client-proposal";

interface HiringConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: ClientProposal | null;
  isLoading?: boolean;
  onConfirm: () => void;
}

export function HiringConfirmationModal({
  open,
  onOpenChange,
  proposal,
  isLoading = false,
  onConfirm,
}: HiringConfirmationModalProps) {
  if (!proposal) return null;

  const milestones = getContractMilestones(proposal);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Confirm Hiring</DialogTitle>
          <DialogDescription>
            Review the hiring details before proceeding to contract generation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-4">
            <Avatar className="size-12">
              <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-sm font-semibold text-primary-foreground">
                {proposal.freelancerAvatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{proposal.freelancerName}</p>
              <p className="text-sm text-muted-foreground">{proposal.freelancerTitle}</p>
            </div>
          </div>

          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Project</span>
              <span className="font-medium text-foreground">{proposal.projectTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contract Value</span>
              <span className="font-bold text-primary">{proposal.expectedBudget}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Timeline</span>
              <span className="font-medium text-foreground">{proposal.deliveryTime}</span>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Milestones</p>
            <ul className="space-y-2">
              {milestones.map((m) => (
                <li
                  key={m.id}
                  className="flex justify-between rounded-lg border border-border px-3 py-2 text-sm"
                >
                  <span className="text-foreground">{m.title}</span>
                  <span className="font-medium text-primary">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <SecondaryButton
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="rounded-xl"
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-xl"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" label="Confirming" />
            ) : (
              "Confirm Hire"
            )}
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
