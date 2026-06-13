"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Briefcase,
  CheckCircle,
  DollarSign,
  Eye,
  FileCheck,
  MessageSquare,
  PenLine,
  Shield,
  Sparkles,
  Trash2,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { PriorityIndicator } from "@/components/notifications/priority-indicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AppNotification } from "@/lib/types/settings";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, typeof Bell> = {
  Briefcase,
  FileCheck,
  DollarSign,
  CheckCircle,
  MessageSquare,
  Eye,
  Sparkles,
  Bell,
  Shield,
  Wallet,
  PenLine,
};

interface NotificationCardProps {
  notification: AppNotification;
  index?: number;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationCard({
  notification,
  index = 0,
  onMarkRead,
  onDelete,
}: NotificationCardProps) {
  const Icon = ICON_MAP[notification.icon] ?? Bell;
  const isUnread = notification.status === "unread";

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={cn(
        "group rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5",
        isUnread ? "border-primary/30 bg-primary/5" : "border-border"
      )}
      aria-label={`${notification.title}, ${notification.status}`}
    >
      <div className="flex gap-4">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl",
            isUnread ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-foreground">
                  {notification.title}
                </h3>
                {isUnread && (
                  <Badge className="rounded-lg bg-primary/15 text-primary hover:bg-primary/15">
                    New
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {notification.description}
              </p>
            </div>
            <PriorityIndicator priority={notification.priority} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {notification.timestamp}
            </span>
            <Badge variant="outline" className="rounded-lg text-xs capitalize">
              {notification.category}
            </Badge>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Link
              href={notification.actionHref}
              className="inline-flex h-8 items-center justify-center rounded-xl bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {notification.actionLabel}
            </Link>
            {isUnread && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-xl text-xs"
                onClick={() => onMarkRead(notification.id)}
              >
                Mark as Read
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-xl text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(notification.id)}
              aria-label={`Delete notification: ${notification.title}`}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
