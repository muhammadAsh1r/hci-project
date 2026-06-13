"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { SearchX } from "lucide-react";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  secondaryActionLabel,
  secondaryActionHref,
  onSecondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center",
        className
      )}
      role="status"
    >
      <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-muted">
        <Icon className="size-8 text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actionLabel && (actionHref || onAction) && (
            actionHref ? (
              <PrimaryButton href={actionHref} className="rounded-xl">
                {actionLabel}
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={onAction} className="rounded-xl">
                {actionLabel}
              </PrimaryButton>
            )
          )}
          {secondaryActionLabel && (secondaryActionHref || onSecondaryAction) && (
            secondaryActionHref ? (
              <SecondaryButton href={secondaryActionHref} className="rounded-xl">
                {secondaryActionLabel}
              </SecondaryButton>
            ) : (
              <SecondaryButton onClick={onSecondaryAction} className="rounded-xl">
                {secondaryActionLabel}
              </SecondaryButton>
            )
          )}
        </div>
      )}
    </motion.div>
  );
}
