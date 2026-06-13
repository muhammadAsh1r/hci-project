"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, RotateCcw, Save } from "lucide-react";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { cn } from "@/lib/utils";

interface SettingsSaveBarProps {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
  onReset: () => void;
  className?: string;
}

export function SettingsSaveBar({
  hasUnsavedChanges,
  isSaving,
  onSave,
  onReset,
  className,
}: SettingsSaveBarProps) {
  if (!hasUnsavedChanges && !isSaving) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg backdrop-blur-sm sm:bottom-6",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <AlertCircle className="size-5 shrink-0 text-amber-500" aria-hidden="true" />
      <p className="flex-1 text-sm font-medium text-foreground">
        {isSaving ? "Saving changes..." : "You have unsaved changes"}
      </p>
      <SecondaryButton
        onClick={onReset}
        disabled={isSaving}
        className="h-9 rounded-xl px-3 text-xs"
      >
        <RotateCcw className="size-3.5" aria-hidden="true" />
        Reset
      </SecondaryButton>
      <PrimaryButton
        onClick={onSave}
        disabled={isSaving}
        className="h-9 rounded-xl px-4 text-xs"
      >
        {isSaving ? (
          <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
        ) : (
          <Save className="size-3.5" aria-hidden="true" />
        )}
        Save
      </PrimaryButton>
    </motion.div>
  );
}

export function SaveSuccessBanner({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
      role="status"
    >
      <CheckCircle2 className="size-4" aria-hidden="true" />
      Settings saved successfully
    </motion.div>
  );
}
