"use client";

import { useEffect, useState } from "react";
import { BellOff, CheckCheck, Search, X } from "lucide-react";
import { ClientNotificationCard } from "@/components/client/notifications/client-notification-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Input } from "@/components/ui/input";
import { useClientNotifications } from "@/hooks/use-client-notifications";
import { useToast } from "@/hooks/use-toast";
import type { ClientNotificationCategory } from "@/lib/types/client-settings";
import { cn } from "@/lib/utils";

const TABS: { value: "all" | ClientNotificationCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "projects", label: "Projects" },
  { value: "proposals", label: "Proposals" },
  { value: "contracts", label: "Contracts" },
  { value: "payments", label: "Payments" },
  { value: "messages", label: "Messages" },
  { value: "system", label: "System" },
];

export function ClientNotificationsContent() {
  const {
    notifications,
    unreadCount,
    search,
    setSearch,
    activeTab,
    setActiveTab,
    markAsRead,
    markAllRead,
    deleteNotification,
  } = useClientNotifications();
  const { showToast, ToastContainer } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 pb-24 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Notifications</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Stay updated on proposals, contracts, payments, and messages.
          </p>
        </div>
        {unreadCount > 0 ? (
          <SecondaryButton
            onClick={() => {
              markAllRead();
              showToast("All notifications marked as read");
            }}
            className="rounded-xl"
          >
            <CheckCheck className="size-4" />
            Mark All Read
          </SecondaryButton>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex flex-wrap gap-1 rounded-xl bg-muted p-1"
          role="tablist"
          aria-label="Notification categories"
        >
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                activeTab === tab.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-xl pl-9 pr-9"
            aria-label="Search notifications"
          />
          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      {isLoading ? (
        <ListSkeleton count={4} />
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={BellOff}
          title="No notifications"
          description={
            search || activeTab !== "all"
              ? "Try adjusting your filters or search terms."
              : "You're all caught up! New notifications will appear here."
          }
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <ClientNotificationCard
              key={n.id}
              notification={n}
              index={i}
              onMarkRead={(id) => {
                markAsRead(id);
                showToast("Marked as read");
              }}
              onDelete={(id) => {
                deleteNotification(id);
                showToast("Notification deleted", "info");
              }}
            />
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
