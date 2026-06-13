"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { WinProbability } from "@/lib/types/proposal";
import { cn } from "@/lib/utils";

interface WinProbabilityCardProps {
  data: WinProbability;
}

export function WinProbabilityCard({ data }: WinProbabilityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-brand-secondary/5 to-brand-accent/10 p-5 shadow-sm"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mb-4 flex items-center gap-2">
        <Sparkles className="size-5 text-primary" aria-hidden="true" />
        <h3 className="font-semibold text-foreground">Win Probability</h3>
      </div>

      <div className="relative mb-4 flex items-baseline gap-2">
        <span className="text-4xl font-bold text-primary">{data.percentage}%</span>
        <span className="text-sm text-muted-foreground">estimated success</span>
      </div>

      <Progress
        value={data.percentage}
        className="relative mb-4 h-3 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-brand-accent"
        aria-label={`Estimated success: ${data.percentage}%`}
      />

      <ul className="relative space-y-2" aria-label="Success factors">
        {data.factors.map((factor) => (
          <li key={factor.label} className="flex items-center gap-2 text-sm">
            {factor.positive ? (
              <Check className="size-4 text-green-600" aria-hidden="true" />
            ) : (
              <X className="size-4 text-amber-500" aria-hidden="true" />
            )}
            <span className={cn(factor.positive ? "text-foreground" : "text-muted-foreground")}>
              {factor.label}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
