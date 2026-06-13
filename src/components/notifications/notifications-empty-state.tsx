"use client";

import { BellOff } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";

export function NotificationsEmptyState() {
  return (
    <EmptyState
      icon={BellOff}
      title="No notifications available."
      description="You're all caught up. New project matches, payments, and messages will appear here."
    />
  );
}
