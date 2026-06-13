"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CheckCircle,
  ChevronRight,
  FileSignature,
  Search,
  Shield,
  Star,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ContractPreview } from "@/components/client/proposals/contract-preview";
import { HiringConfirmationModal } from "@/components/client/proposals/hiring-confirmation-modal";
import { ProposalSkillMatch } from "@/components/client/proposals/proposal-skill-match";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingOverlay } from "@/components/shared/loading-spinner";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useClientProposals } from "@/hooks/use-client-proposals";
import { useToast } from "@/hooks/use-toast";
import { getContractMilestones } from "@/lib/client-proposals-data";
import {
  HIRING_STEPS,
  type HiringStep,
} from "@/lib/types/client-proposal";
import { cn } from "@/lib/utils";

const stepIcons = {
  review: Search,
  shortlist: Star,
  confirm: CheckCircle,
  contract: FileSignature,
  escrow: Shield,
};

function HiringWorkflowInner() {
  const searchParams = useSearchParams();
  const proposalId = searchParams.get("proposal");
  const { getProposalById, shortlist, accept } = useClientProposals();
  const { showToast, ToastContainer } = useToast();

  const [currentStep, setCurrentStep] = useState<HiringStep>("review");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [hireComplete, setHireComplete] = useState(false);
  const [escrowFunded, setEscrowFunded] = useState(false);

  const proposal = proposalId ? getProposalById(proposalId) : undefined;

  useEffect(() => {
    if (proposal?.status === "shortlisted") {
      setCurrentStep("confirm");
    } else if (proposal?.status === "accepted") {
      setCurrentStep("contract");
    }
  }, [proposal?.status]);

  if (!proposal) {
    return (
      <div className="p-8">
        <EmptyState
          title="Select a proposal to hire"
          description="Choose a proposal from the review page to start the hiring workflow."
          actionLabel="Review Proposals"
          actionHref="/client/proposals"
        />
      </div>
    );
  }

  const milestones = getContractMilestones(proposal);
  const currentIndex = HIRING_STEPS.findIndex((s) => s.key === currentStep);

  const goNext = () => {
    const next = HIRING_STEPS[currentIndex + 1];
    if (next) setCurrentStep(next.key);
  };

  const handleConfirmHire = async () => {
    setIsConfirming(true);
    await new Promise((r) => setTimeout(r, 800));
    shortlist(proposal.id);
    accept(proposal.id);
    setIsConfirming(false);
    setConfirmOpen(false);
    setHireComplete(true);
    showToast("Freelancer hired successfully!", "success");
    setCurrentStep("contract");
    setTimeout(() => setHireComplete(false), 3000);
  };

  const handleFundEscrow = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setEscrowFunded(true);
    showToast("Escrow funded — contract is now active!", "success");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Hiring Workflow
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete each step to hire {proposal.freelancerName} for {proposal.projectTitle}
        </p>
      </div>

      <nav aria-label="Hiring progress">
        <ol className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {HIRING_STEPS.map((step, index) => {
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
                <div className="flex items-center gap-4">
                  <Avatar className="size-14">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-base font-semibold text-primary-foreground">
                      {proposal.freelancerAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {proposal.freelancerName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {proposal.freelancerTitle} · {proposal.expectedBudget}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {proposal.coverLetterPreview}
                </p>
              </div>
              <ProposalSkillMatch
                matches={proposal.skillMatches}
                overallMatch={proposal.overallMatch}
              />
              <PrimaryButton onClick={goNext} className="rounded-xl">
                Continue to Shortlist
                <ChevronRight className="size-4" />
              </PrimaryButton>
            </div>
          )}

          {currentStep === "shortlist" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center">
                <Star className="mx-auto size-12 text-amber-500" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Shortlist {proposal.freelancerName}?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Shortlisting marks this freelancer as a top candidate before final hiring.
                </p>
              </div>
              <div className="flex gap-3">
                <SecondaryButton
                  onClick={() => setCurrentStep("review")}
                  className="rounded-xl"
                >
                  Back
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => {
                    shortlist(proposal.id);
                    showToast("Freelancer shortlisted");
                    goNext();
                  }}
                  className="flex-1 rounded-xl"
                >
                  Shortlist Freelancer
                </PrimaryButton>
              </div>
            </div>
          )}

          {currentStep === "confirm" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">Confirm Hiring</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Review the contract value of {proposal.expectedBudget} over{" "}
                  {proposal.deliveryTime} before confirming.
                </p>
              </div>
              <div className="flex gap-3">
                <SecondaryButton
                  onClick={() => setCurrentStep("shortlist")}
                  className="rounded-xl"
                >
                  Back
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => setConfirmOpen(true)}
                  className="flex-1 rounded-xl"
                >
                  Confirm Hire
                </PrimaryButton>
              </div>
            </div>
          )}

          {currentStep === "contract" && (
            <div className="space-y-6">
              {hireComplete ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center"
                >
                  <CheckCircle className="mx-auto size-12 text-green-600" />
                  <p className="mt-2 font-semibold text-green-800">Hiring confirmed!</p>
                </motion.div>
              ) : null}
              <ContractPreview proposal={proposal} milestones={milestones} />
              <PrimaryButton onClick={goNext} className="rounded-xl">
                Proceed to Fund Escrow
                <ChevronRight className="size-4" />
              </PrimaryButton>
            </div>
          )}

          {currentStep === "escrow" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <Shield className="size-10 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">Fund Escrow</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Secure {proposal.expectedBudget} in escrow. Funds are released per milestone
                  upon your approval.
                </p>
                <div className="mt-4 rounded-xl bg-muted/40 p-4">
                  <p className="text-sm font-medium text-foreground">
                    Initial deposit (Milestone 1): {milestones[0]?.amount}
                  </p>
                </div>
              </div>
              {escrowFunded ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
                >
                  <CheckCircle className="mx-auto size-16 text-green-600" />
                  <h3 className="mt-4 text-xl font-bold text-green-800">
                    Contract Active!
                  </h3>
                  <p className="mt-2 text-sm text-green-700">
                    Escrow funded. {proposal.freelancerName} can now begin work.
                  </p>
                  <PrimaryButton
                    href={`/client/projects/${proposal.projectId}`}
                    className="mt-6 rounded-xl"
                  >
                    View Project
                  </PrimaryButton>
                </motion.div>
              ) : (
                <div className="flex gap-3">
                  <SecondaryButton
                    onClick={() => setCurrentStep("contract")}
                    className="rounded-xl"
                  >
                    Back
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={handleFundEscrow}
                    className="flex-1 rounded-xl"
                  >
                    Fund Escrow — {milestones[0]?.amount}
                  </PrimaryButton>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <HiringConfirmationModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        proposal={proposal}
        isLoading={isConfirming}
        onConfirm={handleConfirmHire}
      />

      <ToastContainer />
    </div>
  );
}

export function HiringWorkflowContent() {
  return (
    <Suspense fallback={<LoadingOverlay label="Loading hiring workflow" />}>
      <HiringWorkflowInner />
    </Suspense>
  );
}
