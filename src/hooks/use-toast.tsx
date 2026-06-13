"use client";

import { useCallback, useState } from "react";
import { AppToast, createToast, type ToastType } from "@/components/shared/app-toast";

export function useToast() {
  const [toasts, setToasts] = useState<ReturnType<typeof createToast>[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const toast = createToast(message, type);
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 3500);
    return toast.id;
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const ToastContainer = useCallback(
    () => (
      <AppToast toasts={toasts} onDismiss={dismissToast} />
    ),
    [toasts, dismissToast]
  );

  return { showToast, dismissToast, ToastContainer, toasts };
}
