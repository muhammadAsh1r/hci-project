"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Briefcase,
  CheckCircle,
  DollarSign,
  FileCheck,
  MessageSquare,
  Shield,
  Trash2,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ClientNotification } from "@/lib/types/client-settings";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, typeof Bell> = {
  Briefcase,
  FileCheck,
  DollarSign,
  CheckCircle,
  MessageSquare,
  Bell,
  Shield,
  Wallet,
};

const priorityStyles = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-slate-50 text-slate-600 border-slate-200",
};

interface ClientNotificationCardProps {
  notification: ClientNotification;
  index?: number;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ClientNotificationCard({
  notification,
  index = 0,
  onMarkRead,
  onDelete,
}: ClientNotificationCardProps) {
  const Icon = ICON_MAP[notification.icon] ?? Bell;
  const isUnread = notification.status === "unread";

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={cn(
        "rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5",
        isUnread ? "border-primary/30 bg-primary/5" : "border-border"
      )}
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
                <h3 className="font-semibold text-foreground">{notification.title}</h3>
                {isUnread ? (
                  <Badge className="rounded-lg bg-primary/15 text-primary hover:bg-primary/15">
                    New
                  </Badge>
                ) : null}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {notification.description}
              </p>
            </div>
            <Badge variant="outline" className={cn("rounded-lg text-xs capitalize", priorityStyles[notification.priority])}>
              {notification.priority}
            </Badge>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
            <Badge variant="outline" className="rounded-lg text-xs capitalize">
              {notification.category}
            </Badge>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Link
              href={notification.actionHref}
              className="inline-flex h-8 items-center justify-center rounded-xl bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {notification.actionLabel}
            </Link>
            {isUnread ? (
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-xl text-xs"
                onClick={() => onMarkRead(notification.id)}
              >
                Mark Read
              </Button>
            ) : null}
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-xl text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(notification.id)}
              aria-label={`Delete: ${notification.title}`}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
