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
import { formatClientCurrency } from "@/lib/client-contracts-data";
import type { ClientContract, ClientContractMilestone } from "@/lib/types/client-contract";

interface PaymentReleaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contract: ClientContract;
  milestone: ClientContractMilestone;
  isLoading?: boolean;
  onConfirm: () => void;
}

export function PaymentReleaseModal({
  open,
  onOpenChange,
  contract,
  milestone,
  isLoading = false,
  onConfirm,
}: PaymentReleaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Release Payment</DialogTitle>
          <DialogDescription>
            Confirm payment release from escrow to the freelancer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            This action will release {formatClientCurrency(milestone.amount)} from escrow.
            This cannot be undone once confirmed.
          </div>

          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Milestone Amount</span>
              <span className="font-bold text-primary">
                {formatClientCurrency(milestone.amount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Freelancer</span>
              <span className="font-medium text-foreground">{contract.freelancerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Project</span>
              <span className="font-medium text-foreground">{contract.projectName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Milestone</span>
              <span className="font-medium text-foreground">{milestone.title}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            By confirming, you authorize FreelanceAI to release escrow funds to{" "}
            {contract.freelancerName} for completed work on &ldquo;{milestone.title}&rdquo;.
          </p>
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
              <LoadingSpinner size="sm" label="Releasing payment" />
            ) : (
              "Release Payment"
            )}
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
