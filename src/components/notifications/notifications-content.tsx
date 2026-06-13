"use client";

import { CheckCheck, Search, X } from "lucide-react";
import { NotificationCard } from "@/components/notifications/notification-card";
import { NotificationsEmptyState } from "@/components/notifications/notifications-empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { PageShell } from "@/components/shared/page-shell";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useNotifications } from "@/hooks/use-notifications";
import type { NotificationCategory } from "@/lib/types/settings";
import { cn } from "@/lib/utils";

const TABS: { value: "all" | NotificationCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "projects", label: "Projects" },
  { value: "proposals", label: "Proposals" },
  { value: "payments", label: "Payments" },
  { value: "messages", label: "Messages" },
  { value: "system", label: "System" },
];

export function NotificationsContent() {
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
    hydrated,
  } = useNotifications();

  const { showToast, ToastContainer } = useToast();

  return (
    <PageShell>
        <PageHeader
          title="Notifications"
          description="Stay updated on projects, proposals, payments, and messages."
          breadcrumbs={[{ label: "Notifications", href: "/notifications" }]}
          actions={
            unreadCount > 0 ? (
              <SecondaryButton
                className="rounded-xl gap-2"
                onClick={() => {
                  markAllRead();
                  showToast("All notifications marked as read");
                }}
              >
                <CheckCheck className="size-4" aria-hidden="true" />
                Mark All Read
              </SecondaryButton>
            ) : undefined
          }
        />

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2 rounded-xl bg-muted p-1" role="tablist" aria-label="Notification categories">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeTab === tab.value
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 rounded-xl pl-10 pr-10"
              aria-label="Search notifications"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        <p
          className="mb-4 text-sm text-muted-foreground"
          aria-live="polite"
        >
          {unreadCount > 0 ? (
            <>
              <span className="font-semibold text-foreground">{unreadCount}</span>{" "}
              unread notification{unreadCount !== 1 ? "s" : ""}
            </>
          ) : (
            "All caught up"
          )}
        </p>

        <div className={cn(!hydrated && "opacity-50")}>
          {notifications.length === 0 ? (
            <NotificationsEmptyState />
          ) : (
            <div className="space-y-3">
              {notifications.map((n, i) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  index={i}
                  onMarkRead={(id) => {
                    markAsRead(id);
                    showToast("Notification marked as read");
                  }}
                  onDelete={(id) => {
                    deleteNotification(id);
                    showToast("Notification deleted");
                  }}
                />
              ))}
            </div>
          )}
        </div>

      <ToastContainer />
    </PageShell>
  );
}
