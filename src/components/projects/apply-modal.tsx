"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { MarketplaceProject } from "@/lib/types/project";

interface ApplyModalProps {
  project: MarketplaceProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormErrors {
  coverLetter?: string;
  expectedBudget?: string;
  deliveryTime?: string;
}

export function ApplyModal({ project, open, onOpenChange }: ApplyModalProps) {
  const [coverLetter, setCoverLetter] = useState("");
  const [expectedBudget, setExpectedBudget] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = () => {
    setCoverLetter("");
    setExpectedBudget("");
    setDeliveryTime("");
    setErrors({});
    setIsSuccess(false);
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    } else if (coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Cover letter must be at least 50 characters";
    }

    if (!expectedBudget.trim()) {
      newErrors.expectedBudget = "Expected budget is required";
    } else if (isNaN(Number(expectedBudget)) || Number(expectedBudget) <= 0) {
      newErrors.expectedBudget = "Please enter a valid budget amount";
    }

    if (!deliveryTime.trim()) {
      newErrors.deliveryTime = "Delivery time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg" showCloseButton>
        {isSuccess ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl">Application Submitted!</DialogTitle>
              <DialogDescription className="mt-2">
                Your proposal for &ldquo;{project.title}&rdquo; has been sent.
                The client will review it and get back to you soon.
              </DialogDescription>
            </DialogHeader>
            <PrimaryButton
              onClick={() => handleClose(false)}
              className="mt-6 w-full"
            >
              Done
            </PrimaryButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Apply to Project</DialogTitle>
              <DialogDescription>
                Submit your proposal for &ldquo;{project.title}&rdquo;
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cover-letter">
                  Cover Letter <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="cover-letter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Explain why you're the best fit for this project..."
                  rows={5}
                  aria-invalid={!!errors.coverLetter}
                  aria-describedby={
                    errors.coverLetter ? "cover-letter-error" : undefined
                  }
                  className="rounded-xl resize-none"
                />
                {errors.coverLetter && (
                  <p
                    id="cover-letter-error"
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {errors.coverLetter}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expected-budget">
                  Expected Budget ($) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="expected-budget"
                  type="number"
                  value={expectedBudget}
                  onChange={(e) => setExpectedBudget(e.target.value)}
                  placeholder="e.g. 5000"
                  aria-invalid={!!errors.expectedBudget}
                  aria-describedby={
                    errors.expectedBudget ? "budget-error" : undefined
                  }
                  className="h-11 rounded-xl"
                />
                {errors.expectedBudget && (
                  <p
                    id="budget-error"
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {errors.expectedBudget}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery-time">
                  Delivery Time <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="delivery-time"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  placeholder="e.g. 3 weeks"
                  aria-invalid={!!errors.deliveryTime}
                  aria-describedby={
                    errors.deliveryTime ? "delivery-error" : undefined
                  }
                  className="h-11 rounded-xl"
                />
                {errors.deliveryTime && (
                  <p
                    id="delivery-error"
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {errors.deliveryTime}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="mt-6 gap-2 sm:gap-0">
              <SecondaryButton
                type="button"
                onClick={() => handleClose(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                type="submit"
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </PrimaryButton>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
