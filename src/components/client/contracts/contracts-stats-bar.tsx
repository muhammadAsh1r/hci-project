"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  DollarSign,
  FileSignature,
  XCircle,
} from "lucide-react";
import { formatClientCurrency } from "@/lib/client-contracts-data";
import type { ClientContractStats } from "@/lib/types/client-contract";
import { cn } from "@/lib/utils";

interface ContractsStatsBarProps {
  stats: ClientContractStats;
}

const items = [
  { key: "active" as const, label: "Active Contracts", icon: FileSignature, color: "text-blue-600 bg-blue-50" },
  { key: "pendingApprovals" as const, label: "Pending Approvals", icon: Clock, color: "text-amber-600 bg-amber-50" },
  { key: "fundsInEscrow" as const, label: "Funds in Escrow", icon: DollarSign, color: "text-violet-600 bg-violet-50", format: true },
  { key: "completed" as const, label: "Completed Contracts", icon: CheckCircle, color: "text-green-600 bg-green-50" },
  { key: "cancelled" as const, label: "Cancelled Contracts", icon: XCircle, color: "text-red-600 bg-red-50" },
  { key: "totalValue" as const, label: "Total Contract Value", icon: DollarSign, color: "text-primary bg-primary/10", format: true },
];

export function ContractsStatsBar({ stats }: ContractsStatsBarProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
            className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/5"
          >
            <div className="flex items-center gap-3">
              <div className={cn("flex size-9 items-center justify-center rounded-xl", item.color)}>
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
