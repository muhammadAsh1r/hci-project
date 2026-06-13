"use client";

import { useState } from "react";
import {
  CheckCircle,
  FileText,
  Loader2,
  Receipt,
  Send,
  Unlock,
} from "lucide-react";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EscrowContract } from "@/lib/types/escrow";
import { formatCurrency } from "@/lib/escrow-data";

type ActionType = "submit" | "approve" | "release" | "receipt";

interface PaymentActionsProps {
  contract: EscrowContract;
  onAction: (action: ActionType, message: string) => void;
}

const actionConfig: Record<ActionType, { title: string; description: string; confirm: string; icon: typeof Send }> = {
  submit: {
    title: "Submit Work",
    description: "Submit your completed work for client review. The client will be notified to review and approve.",
    confirm: "Submit Work",
    icon: Send,
  },
  approve: {
    title: "Request Approval",
    description: "Send a reminder to the client to review and approve your submitted milestone.",
    confirm: "Request Approval",
    icon: CheckCircle,
  },
  release: {
    title: "Release Payment",
    description: "Release escrow funds to the freelancer. This action cannot be undone once confirmed.",
    confirm: "Release Payment",
    icon: Unlock,
  },
  receipt: {
    title: "View Receipt",
    description: "View and download the payment receipt for this transaction.",
    confirm: "View Receipt",
    icon: Receipt,
  },
};

export function PaymentActions({ contract, onAction }: PaymentActionsProps) {
  const [dialogAction, setDialogAction] = useState<ActionType | null>(null);
  const [loading, setLoading] = useState(false);

  const activeMilestone = contract.milestones.find(
    (m) => m.status === "In Progress" || m.status === "Awaiting Review"
  );

  const handleConfirm = async () => {
    if (!dialogAction) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    const messages: Record<ActionType, string> = {
      submit: "Work submitted successfully! Client has been notified.",
      approve: "Approval request sent to client.",
      release: `$${activeMilestone?.amount.toLocaleString() ?? ""} payment released successfully!`,
      receipt: "Receipt opened.",
    };
    onAction(dialogAction, messages[dialogAction]);
    setDialogAction(null);
  };

  const config = dialogAction ? actionConfig[dialogAction] : null;

  const canSubmit = contract.paymentStatus === "In Progress" || contract.paymentStatus === "Funded";
  const canRelease = contract.paymentStatus === "Awaiting Review" || contract.paymentStatus === "Approved";

  return (
    <>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Payment actions">
        <PrimaryButton onClick={() => setDialogAction("submit")} disabled={!canSubmit}>
          <Send className="size-4" aria-hidden="true" />
          Submit Work
        </PrimaryButton>
        <SecondaryButton onClick={() => setDialogAction("approve")} disabled={!canSubmit}>
          <CheckCircle className="size-4" aria-hidden="true" />
          Request Approval
        </SecondaryButton>
        <SecondaryButton onClick={() => setDialogAction("release")} disabled={!canRelease}>
          <Unlock className="size-4" aria-hidden="true" />
          Release Payment
        </SecondaryButton>
        <SecondaryButton onClick={() => setDialogAction("receipt")}>
          <Receipt className="size-4" aria-hidden="true" />
          View Receipt
        </SecondaryButton>
      </div>

      <Dialog open={!!dialogAction} onOpenChange={(open) => !open && setDialogAction(null)}>
        <DialogContent className="sm:max-w-md">
          {config && (
            <>
              <DialogHeader>
                <DialogTitle>{config.title}</DialogTitle>
                <DialogDescription>{config.description}</DialogDescription>
              </DialogHeader>
              {dialogAction === "release" && activeMilestone && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  <strong>Warning:</strong> You are about to release {formatCurrency(activeMilestone.amount)} for &ldquo;{activeMilestone.title}&rdquo;. This action is irreversible.
                </div>
              )}
              {dialogAction === "receipt" && (
                <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
                  <FileText className="size-8 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-foreground">{contract.projectName}</p>
                    <p className="text-sm text-muted-foreground">Receipt available for download</p>
                  </div>
                </div>
              )}
              <DialogFooter className="gap-2">
                <SecondaryButton onClick={() => setDialogAction(null)}>Cancel</SecondaryButton>
                <PrimaryButton onClick={handleConfirm} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Processing...
                    </>
                  ) : (
                    config.confirm
                  )}
                </PrimaryButton>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
