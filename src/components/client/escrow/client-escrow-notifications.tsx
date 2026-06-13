"use client";

import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle,
  FileCheck,
  Send,
} from "lucide-react";
import { CLIENT_ESCROW_NOTIFICATIONS } from "@/lib/client-contracts-data";
import type { ClientEscrowNotification } from "@/lib/types/client-contract";
import { cn } from "@/lib/utils";

const typeIcons = {
  "milestone-submitted": Send,
  "work-approved": FileCheck,
  "payment-released": CheckCircle,
  "contract-completed": CheckCircle,
};

const typeColors = {
  "milestone-submitted": "bg-violet-50 text-violet-600",
  "work-approved": "bg-blue-50 text-blue-600",
  "payment-released": "bg-green-50 text-green-600",
  "contract-completed": "bg-emerald-50 text-emerald-600",
};

interface ClientEscrowNotificationsProps {
  notifications?: ClientEscrowNotification[];
}

export function ClientEscrowNotifications({
  notifications = CLIENT_ESCROW_NOTIFICATIONS,
}: ClientEscrowNotificationsProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Bell className="size-5 text-primary" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
      </div>

      <ul className="space-y-3" aria-label="Escrow notifications">
        {notifications.map((notification, index) => {
          const Icon = typeIcons[notification.type];
          return (
            <motion.li
              key={notification.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex gap-3 rounded-xl border border-border p-3 transition-colors",
                !notification.read && "bg-primary/5 border-primary/20"
              )}
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  typeColors[notification.type]
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{notification.timestamp}</p>
              </div>
              {!notification.read && (
                <span className="size-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
