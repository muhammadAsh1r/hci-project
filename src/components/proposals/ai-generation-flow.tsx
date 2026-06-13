"use client";

import { motion } from "framer-motion";
import { Brain, Check, Loader2, Sparkles, Zap } from "lucide-react";
import { GENERATION_STEPS, type GenerationStep } from "@/lib/types/proposal";
import { cn } from "@/lib/utils";

const stepIcons = [Brain, Zap, Sparkles, Check];

interface AiGenerationFlowProps {
  currentStep: GenerationStep | null;
  isGenerating: boolean;
}

export function AiGenerationFlow({ currentStep, isGenerating }: AiGenerationFlowProps) {
  if (!isGenerating || !currentStep || currentStep === "complete") return null;

  const currentIndex = GENERATION_STEPS.findIndex((s) => s.key === currentStep);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-brand-secondary/5 to-brand-accent/5 p-8"
      role="status"
      aria-live="polite"
      aria-label="AI generation in progress"
    >
      <div className="mb-8 flex justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-brand-accent text-primary-foreground shadow-lg shadow-primary/20"
        >
          <Sparkles className="size-8" aria-hidden="true" />
        </motion.div>
      </div>

      <div className="space-y-4">
        {GENERATION_STEPS.map((step, index) => {
          const Icon = stepIcons[index];
          const isActive = index === currentIndex;
          const isComplete = index < currentIndex;

          return (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center gap-4 rounded-xl px-4 py-3 transition-colors",
                isActive && "bg-primary/10",
                isComplete && "opacity-60"
              )}
            >
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg",
                  isComplete && "bg-green-100 text-green-600",
                  isActive && "bg-primary text-primary-foreground",
                  !isComplete && !isActive && "bg-muted text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : isActive ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Icon className="size-4" aria-hidden="true" />
                )}
              </div>
              <div>
                <p className={cn("text-sm font-medium", isActive && "text-primary")}>
                  Step {index + 1}
                </p>
                <p className="text-sm text-muted-foreground">{step.label}</p>
              </div>
              {isActive && (
                <motion.div
                  className="ml-auto flex gap-1"
                  aria-hidden="true"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="size-1.5 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function ProposalSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-2xl border border-border bg-card p-6" aria-hidden="true">
      <div className="h-6 w-1/3 rounded-lg bg-muted" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-4/6 rounded bg-muted" />
      </div>
      <div className="h-6 w-1/4 rounded-lg bg-muted" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-3/4 rounded bg-muted" />
      </div>
    </div>
  );
}
