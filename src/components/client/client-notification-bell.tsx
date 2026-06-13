"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useClientNotifications } from "@/hooks/use-client-notifications";
import { cn } from "@/lib/utils";

interface ClientNotificationBellProps {
  className?: string;
}

export function ClientNotificationBell({ className }: ClientNotificationBellProps) {
  const { unreadCount } = useClientNotifications();

  return (
    <Link
      href="/client/notifications"
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
    >
      <Bell className="size-4" aria-hidden="true" />
      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
