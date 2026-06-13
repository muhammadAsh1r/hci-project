"use client";

import { createToast, ProposalToast, type ToastType } from "@/components/proposals/proposal-toast";

export { createToast, ProposalToast as AppToast, type ToastType };

export function useToast() {
  // Re-export pattern - consumers manage state locally
}
