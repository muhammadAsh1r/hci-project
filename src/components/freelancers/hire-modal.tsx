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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { FreelancerProfile } from "@/lib/types/freelancer";

interface HireModalProps {
  freelancer: FreelancerProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

export function HireModal({
  freelancer,
  open,
  onOpenChange,
  onConfirm,
}: HireModalProps) {
  if (!freelancer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hire {freelancer.name}</DialogTitle>
          <DialogDescription>
            Send a hiring invitation to start your project. This is a frontend
            preview — no actual invitation will be sent.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4">
          <Avatar className="size-12">
            <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary font-semibold text-primary-foreground">
              {freelancer.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{freelancer.name}</p>
            <p className="text-sm text-muted-foreground">{freelancer.title}</p>
            <p className="text-sm font-medium text-primary">
              ${freelancer.hourlyRate}/hr
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <SecondaryButton
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            onClick={() => {
              onConfirm?.();
              onOpenChange(false);
            }}
            className="rounded-xl"
          >
            Send Invitation
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
