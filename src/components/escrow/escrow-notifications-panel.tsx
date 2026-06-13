"use client";

import { motion } from "framer-motion";
import { Bell, CheckCircle, DollarSign, FileCheck } from "lucide-react";
import type { EscrowNotification } from "@/lib/types/escrow";
import { cn } from "@/lib/utils";

const iconMap = {
  "funds-added": DollarSign,
  "milestone-approved": CheckCircle,
  "payment-released": DollarSign,
  "contract-completed": FileCheck,
};

interface EscrowNotificationsPanelProps {
  notifications: EscrowNotification[];
}

export function EscrowNotificationsPanel({ notifications }: EscrowNotificationsPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <Bell className="size-5 text-primary" aria-hidden="true" />
        <h3 className="font-semibold text-foreground">Notifications</h3>
        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {notifications.filter((n) => !n.read).length} new
        </span>
      </div>
      <ul className="divide-y divide-border" aria-label="Escrow notifications">
        {notifications.map((n, index) => {
          const Icon = iconMap[n.type];
          return (
            <motion.li
              key={n.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={cn("flex gap-3 px-5 py-4", !n.read && "bg-primary/5")}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.message}</p>
                <time className="mt-1 block text-xs text-muted-foreground">{n.timestamp}</time>
              </div>
              {!n.read && (
                <span className="size-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
