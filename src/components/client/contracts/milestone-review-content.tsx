"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CheckCircle,
  ChevronRight,
  File,
  FileText,
  MessageSquare,
  RefreshCw,
  Unlock,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MilestoneStatusBadge } from "@/components/client/contracts/contract-status-badge";
import { PaymentReleaseModal } from "@/components/client/contracts/payment-release-modal";
import { BackLink } from "@/components/shared/back-link";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useClientContracts } from "@/hooks/use-client-contracts";
import { useToast } from "@/hooks/use-toast";
import { formatClientCurrency } from "@/lib/client-contracts-data";
import {
  MILESTONE_REVIEW_STEPS,
  type MilestoneReviewStep,
} from "@/lib/types/client-contract";
import type { ClientContract, ClientContractMilestone } from "@/lib/types/client-contract";
import { cn } from "@/lib/utils";

const stepIcons = {
  review: FileText,
  confirm: CheckCircle,
  release: Unlock,
  success: Check,
};

interface MilestoneReviewContentProps {
  contract: ClientContract;
  milestone: ClientContractMilestone;
}

export function MilestoneReviewContent({
  contract,
  milestone,
}: MilestoneReviewContentProps) {
  const router = useRouter();
  const {
    approveMilestone,
    requestRevisions,
    rejectSubmission,
    releasePayment,
  } = useClientContracts();
  const { showToast, ToastContainer } = useToast();

  const [currentStep, setCurrentStep] = useState<MilestoneReviewStep>("review");
  const [releaseOpen, setReleaseOpen] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);
  const [revisionOpen, setRevisionOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  useEffect(() => {
    if (milestone.status === "Approved") setCurrentStep("release");
    else if (milestone.status === "Paid") setCurrentStep("success");
  }, [milestone.status]);

  const currentIndex = MILESTONE_REVIEW_STEPS.findIndex((s) => s.key === currentStep);
  const isApproved = milestone.status === "Approved" || milestone.status === "Paid";

  const goNext = () => {
    const next = MILESTONE_REVIEW_STEPS[currentIndex + 1];
    if (next) setCurrentStep(next.key);
  };

  const handleApprove = () => {
    approveMilestone(contract.id, milestone.id);
    showToast("Work approved — proceed to release payment", "success");
    setCurrentStep("confirm");
  };

  const handleRelease = async () => {
    setIsReleasing(true);
    await new Promise((r) => setTimeout(r, 800));
    releasePayment(contract.id, milestone.id);
    setIsReleasing(false);
    setReleaseOpen(false);
    setCurrentStep("success");
    showToast("Payment released successfully!", "success");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <BackLink
        href={`/client/contracts/${contract.id}`}
        label="Back to Contract"
      />

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <MilestoneStatusBadge status={milestone.status} />
          <span className="text-sm text-muted-foreground">
            Milestone {milestone.number} of {contract.milestones.length}
          </span>
        </div>
        <h2 className="mt-2 text-2xl font-bold text-foreground">{milestone.title}</h2>
        <p className="text-sm text-muted-foreground">
          {contract.projectName} · {contract.freelancerName}
        </p>
      </div>

      <nav aria-label="Approval progress">
        <ol className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {MILESTONE_REVIEW_STEPS.map((step, index) => {
            const Icon = stepIcons[step.key];
            const isActive = step.key === currentStep;
            const isComplete = index < currentIndex;

            return (
              <li
                key={step.key}
                className={cn(
                  "flex flex-1 items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "border-primary bg-primary/5 text-primary"
                    : isComplete
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-border text-muted-foreground"
                )}
              >
                <div
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isComplete
                        ? "bg-green-600 text-white"
                        : "bg-muted"
                  )}
                >
                  {isComplete ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Icon className="size-3.5" />
                  )}
                </div>
                <span className="hidden font-medium sm:inline">{step.label}</span>
              </li>
            );
          })}
        </ol>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {currentStep === "review" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">Milestone Details</h3>
                <p className="mt-2 text-sm text-muted-foreground">{milestone.description}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="font-bold text-primary">
                      {formatClientCurrency(milestone.amount)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">Due Date</p>
                    <p className="font-medium text-foreground">{milestone.dueDate}</p>
                  </div>
                  <div className="rounded-xl bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">Progress</p>
                    <p className="font-medium text-foreground">{milestone.progress}%</p>
                  </div>
                </div>
              </div>

              {milestone.submission ? (
                <>
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">
                      Submission Notes
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {milestone.submission.notes}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Submitted {milestone.submission.submittedDate}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">
                      Submitted Files
                    </h3>
                    <ul className="space-y-2">
                      {milestone.submission.files.map((file) => (
                        <li
                          key={file.id}
                          className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 transition-colors hover:bg-muted/30"
                        >
                          <File className="size-5 text-primary" aria-hidden="true" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-foreground">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.size}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No submission files available for this milestone yet.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <PrimaryButton
                  onClick={handleApprove}
                  disabled={isApproved || milestone.status === "Paid"}
                  className="flex-1 rounded-xl"
                >
                  <CheckCircle className="size-4" />
                  Approve Work
                </PrimaryButton>
                <SecondaryButton
                  onClick={() => setRevisionOpen(true)}
                  className="rounded-xl"
                >
                  <RefreshCw className="size-4" />
                  Request Revisions
                </SecondaryButton>
                <SecondaryButton
                  onClick={() => setRejectOpen(true)}
                  className="rounded-xl text-destructive hover:text-destructive"
                >
                  <X className="size-4" />
                  Reject
                </SecondaryButton>
                <SecondaryButton className="rounded-xl">
                  <MessageSquare className="size-4" />
                  Message
                </SecondaryButton>
              </div>
            </div>
          )}

          {currentStep === "confirm" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
                <CheckCircle className="mx-auto size-12 text-green-600" />
                <h3 className="mt-4 text-lg font-semibold text-green-800">Work Approved</h3>
                <p className="mt-2 text-sm text-green-700">
                  You approved {contract.freelancerName}&apos;s submission for &ldquo;
                  {milestone.title}&rdquo;. Proceed to release {formatClientCurrency(milestone.amount)}.
                </p>
              </div>
              <div className="flex gap-3">
                <SecondaryButton
                  onClick={() => setCurrentStep("review")}
                  className="rounded-xl"
                >
                  Back
                </SecondaryButton>
                <PrimaryButton onClick={goNext} className="flex-1 rounded-xl">
                  Proceed to Release
                  <ChevronRight className="size-4" />
                </PrimaryButton>
              </div>
            </div>
          )}

          {currentStep === "release" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <Avatar className="size-12">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-sm font-semibold text-primary-foreground">
                      {contract.freelancerAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{contract.freelancerName}</p>
                    <p className="text-sm text-muted-foreground">{milestone.title}</p>
                  </div>
                  <p className="ml-auto text-xl font-bold text-primary">
                    {formatClientCurrency(milestone.amount)}
                  </p>
                </div>
              </div>
              <PrimaryButton
                onClick={() => setReleaseOpen(true)}
                className="w-full rounded-xl"
              >
                <Unlock className="size-4" />
                Release Payment
              </PrimaryButton>
            </div>
          )}

          {currentStep === "success" && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
            >
              <CheckCircle className="mx-auto size-16 text-green-600" />
              <h3 className="mt-4 text-xl font-bold text-green-800">Payment Released!</h3>
              <p className="mt-2 text-sm text-green-700">
                {formatClientCurrency(milestone.amount)} has been released to{" "}
                {contract.freelancerName}.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <PrimaryButton
                  href={`/client/contracts/${contract.id}`}
                  className="rounded-xl"
                >
                  Back to Contract
                </PrimaryButton>
                <SecondaryButton
                  href="/client/escrow/transactions"
                  className="rounded-xl"
                >
                  View Transactions
                </SecondaryButton>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <PaymentReleaseModal
        open={releaseOpen}
        onOpenChange={setReleaseOpen}
        contract={contract}
        milestone={milestone}
        isLoading={isReleasing}
        onConfirm={handleRelease}
      />

      <ConfirmDialog
        open={revisionOpen}
        onOpenChange={setRevisionOpen}
        title="Request revisions?"
        description={`Send ${contract.freelancerName} a revision request for "${milestone.title}". The milestone will return to In Progress status.`}
        confirmLabel="Request Revisions"
        onConfirm={() => {
          requestRevisions(contract.id, milestone.id);
          showToast("Revision request sent");
          setRevisionOpen(false);
          router.push(`/client/contracts/${contract.id}`);
        }}
      />

      <ConfirmDialog
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        title="Reject submission?"
        description="This will reject the current submission and return the milestone to In Progress. The freelancer will need to resubmit."
        confirmLabel="Reject Submission"
        variant="destructive"
        onConfirm={() => {
          rejectSubmission(contract.id, milestone.id);
          showToast("Submission rejected", "info");
          setRejectOpen(false);
          router.push(`/client/contracts/${contract.id}`);
        }}
      />

      <ToastContainer />
    </div>
  );
}
