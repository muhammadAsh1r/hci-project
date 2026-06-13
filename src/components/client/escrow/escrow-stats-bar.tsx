"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Wallet,
} from "lucide-react";
import { formatClientCurrency } from "@/lib/client-contracts-data";
import type { ClientEscrowStats } from "@/lib/types/client-contract";
import { cn } from "@/lib/utils";

interface EscrowStatsBarProps {
  stats: ClientEscrowStats;
}

const items = [
  { key: "totalEscrowBalance" as const, label: "Total Escrow Balance", icon: Wallet, color: "text-violet-600 bg-violet-50", format: true },
  { key: "pendingPayments" as const, label: "Pending Payments", icon: Clock, color: "text-amber-600 bg-amber-50", format: true },
  { key: "releasedFunds" as const, label: "Released Funds", icon: ArrowUpRight, color: "text-green-600 bg-green-50", format: true },
  { key: "upcomingMilestones" as const, label: "Upcoming Milestones", icon: Calendar, color: "text-blue-600 bg-blue-50", format: false },
];

export function EscrowStatsBar({ stats }: EscrowStatsBarProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => {
        const Icon = item.icon;
        const value = item.format
          ? formatClientCurrency(stats[item.key])
          : String(stats[item.key]);

        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/5"
          >
            <div className="flex items-center gap-3">
              <div className={cn("flex size-10 items-center justify-center rounded-xl", item.color)}>
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
