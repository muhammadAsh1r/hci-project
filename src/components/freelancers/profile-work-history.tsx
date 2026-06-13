"use client";

import { motion } from "framer-motion";
import { DollarSign, Star } from "lucide-react";
import type { WorkHistoryItem } from "@/lib/types/freelancer";

interface ProfileWorkHistoryProps {
  items: WorkHistoryItem[];
}

export function ProfileWorkHistory({ items }: ProfileWorkHistoryProps) {
  if (items.length === 0) {
    return (
      <section aria-labelledby="work-history-heading">
        <h2 id="work-history-heading" className="text-xl font-semibold text-foreground">
          Work History
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">
          No work history available yet.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="work-history-heading">
      <h2 id="work-history-heading" className="mb-6 text-xl font-semibold text-foreground">
        Work History
      </h2>
      <div className="relative space-y-0">
        <div
          className="absolute left-4 top-2 bottom-2 w-px bg-border"
          aria-hidden="true"
        />
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="relative pl-10 pb-8 last:pb-0"
          >
            <div
              className="absolute left-2.5 top-1.5 size-3 rounded-full border-2 border-primary bg-card"
              aria-hidden="true"
            />
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {item.projectName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Client: {item.client} · {item.duration}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                    <DollarSign className="size-4" aria-hidden="true" />
                    {item.earnings.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star
                      className="size-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                    {item.rating}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm italic text-muted-foreground">
                &ldquo;{item.feedback}&rdquo;
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
