"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useClientNotifications } from "@/hooks/use-client-notifications";
import { useNotifications } from "@/hooks/use-notifications";
import { useAuth } from "@/hooks/use-auth";
import {
  FREELANCER_NOTIFICATIONS_PATH,
  getNotificationsPathForRole,
} from "@/lib/auth-routes";
import { cn } from "@/lib/utils";

interface NotificationBellProps {
  className?: string;
}

export function NotificationBell({ className }: NotificationBellProps) {
  const { user, isHydrated } = useAuth();
  const isClient = isHydrated && user?.role === "client";
  const freelancerNotifications = useNotifications();
  const clientNotifications = useClientNotifications();

  const unreadCount = isClient
    ? clientNotifications.unreadCount
    : freelancerNotifications.unreadCount;

  const href =
    isHydrated && user
      ? getNotificationsPathForRole(user.role)
      : FREELANCER_NOTIFICATIONS_PATH;

  return (
    <Link
      href={href}
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
