"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

export function LoadingSpinner({
  size = "md",
  label = "Loading",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-2 text-muted-foreground", className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <Loader2
        className={cn(sizeMap[size], "animate-spin text-primary")}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

interface LoadingOverlayProps {
  label?: string;
}

export function LoadingOverlay({ label = "Loading content" }: LoadingOverlayProps) {
  return (
    <div
      className="flex min-h-[200px] items-center justify-center rounded-2xl border border-border bg-card/50"
      role="status"
      aria-live="polite"
    >
      <LoadingSpinner size="lg" label={label} />
    </div>
  );
}
