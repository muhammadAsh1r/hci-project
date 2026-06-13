"use client";

import { motion } from "framer-motion";
import { AlertTriangle, FileQuestion } from "lucide-react";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  variant?: "not-found" | "error";
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  className?: string;
}

export function ErrorState({
  variant = "not-found",
  title,
  description,
  actionLabel = "Go Home",
  actionHref = "/",
  secondaryActionLabel,
  secondaryActionHref,
  className,
}: ErrorStateProps) {
  const Icon = variant === "error" ? AlertTriangle : FileQuestion;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "flex flex-col items-center justify-center px-6 py-24 text-center",
        className
      )}
      role="alert"
    >
      <div
        className={cn(
          "mb-6 flex size-20 items-center justify-center rounded-2xl",
          variant === "error" ? "bg-destructive/10" : "bg-muted"
        )}
      >
        <Icon
          className={cn(
            "size-10",
            variant === "error" ? "text-destructive" : "text-muted-foreground"
          )}
          aria-hidden="true"
        />
      </div>
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
      {description && (
        <p className="mt-3 max-w-md text-muted-foreground">{description}</p>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <PrimaryButton href={actionHref} className="rounded-xl">
          {actionLabel}
        </PrimaryButton>
        {secondaryActionLabel && secondaryActionHref && (
          <SecondaryButton href={secondaryActionHref} className="rounded-xl">
            {secondaryActionLabel}
          </SecondaryButton>
        )}
      </div>
    </motion.div>
  );
}
