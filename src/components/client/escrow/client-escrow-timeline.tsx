"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CLIENT_ESCROW_TIMELINE_STEPS } from "@/lib/types/client-contract";
import type { ClientEscrowTimelineStep } from "@/lib/types/client-contract";
import { cn } from "@/lib/utils";

interface ClientEscrowTimelineProps {
  currentStep: ClientEscrowTimelineStep;
  compact?: boolean;
}

export function ClientEscrowTimeline({
  currentStep,
  compact,
}: ClientEscrowTimelineProps) {
  const currentIndex = CLIENT_ESCROW_TIMELINE_STEPS.findIndex(
    (s) => s.key === currentStep
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Payment Timeline</h3>
      <ol className="relative" aria-label="Escrow payment workflow">
        {CLIENT_ESCROW_TIMELINE_STEPS.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <motion.li
              key={step.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              className={cn(
                "relative flex gap-4",
                !compact && index < CLIENT_ESCROW_TIMELINE_STEPS.length - 1 && "pb-8"
              )}
            >
              {index < CLIENT_ESCROW_TIMELINE_STEPS.length - 1 && (
                <div
                  className={cn(
                    "absolute left-[15px] top-8 h-full w-0.5",
                    isComplete ? "bg-primary" : "bg-border"
                  )}
                  aria-hidden="true"
                />
              )}
              <div
                className={cn(
                  "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                  isComplete && "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary bg-primary/10 text-primary ring-4 ring-primary/20",
                  isUpcoming && "border-border bg-muted text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>
              <div className="pt-0.5">
                <p
                  className={cn(
                    "font-medium",
                    isUpcoming ? "text-muted-foreground" : "text-foreground",
                    isCurrent && "text-primary"
                  )}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="mt-0.5 text-xs font-medium text-primary">Current step</p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
