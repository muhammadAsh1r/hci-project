"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { EscrowDispute, DisputeStatus } from "@/lib/types/escrow";
import { cn } from "@/lib/utils";

const disputeStatusStyles: Record<DisputeStatus, string> = {
  Open: "bg-red-50 text-red-700 border-red-200",
  "Under Review": "bg-amber-50 text-amber-700 border-amber-200",
  Resolved: "bg-green-50 text-green-700 border-green-200",
  Closed: "bg-gray-50 text-gray-600 border-gray-200",
};

interface DisputePanelProps {
  disputes: EscrowDispute[];
}

export function DisputePanel({ disputes }: DisputePanelProps) {
  if (disputes.length === 0) return null;

  return (
    <section aria-labelledby="disputes-heading">
      <h2 id="disputes-heading" className="mb-4 text-xl font-semibold text-foreground">
        Dispute Management
      </h2>
      {disputes.map((dispute) => (
        <div key={dispute.id} className="rounded-2xl border border-amber-200 bg-amber-50/30 p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <AlertTriangle className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{dispute.projectName}</h3>
                <p className="text-sm text-muted-foreground">Opened {dispute.openedDate}</p>
              </div>
            </div>
            <span className={cn("rounded-lg border px-2.5 py-0.5 text-xs font-medium", disputeStatusStyles[dispute.status])}>
              {dispute.status}
            </span>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">{dispute.reason}</p>
          <ol className="space-y-3 border-t border-amber-200/60 pt-4" aria-label="Dispute timeline">
            {dispute.updates.map((update, index) => (
              <motion.li
                key={update.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex gap-3 text-sm"
              >
                <span className="shrink-0 font-mono text-xs text-muted-foreground">{update.date}</span>
                <div>
                  <p className="text-foreground">{update.message}</p>
                  <p className="text-xs text-muted-foreground">— {update.author}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}
