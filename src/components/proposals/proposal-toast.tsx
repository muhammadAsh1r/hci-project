"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ProposalToastProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ProposalToast({ toasts, onDismiss }: ProposalToastProps) {
  return (
    <div
      className="fixed bottom-24 right-4 z-50 flex flex-col gap-2 lg:bottom-6"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100 }}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm",
              toast.type === "success" && "border-green-200 bg-green-50 text-green-800",
              toast.type === "error" && "border-red-200 bg-red-50 text-red-800",
              toast.type === "info" && "border-border bg-card text-foreground"
            )}
            role="alert"
          >
            {toast.type === "success" && (
              <CheckCircle className="size-5 shrink-0 text-green-600" aria-hidden="true" />
            )}
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="ml-2 rounded-md p-0.5 opacity-60 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Dismiss notification"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function createToast(message: string, type: ToastType = "success"): Toast {
  return { id: Date.now().toString(), message, type };
}
