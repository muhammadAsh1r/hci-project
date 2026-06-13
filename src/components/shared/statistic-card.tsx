"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatisticCardProps {
  label: string;
  value: string;
  className?: string;
  index?: number;
}

export function StatisticCard({
  label,
  value,
  className,
  index = 0,
}: StatisticCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "rounded-2xl border border-border bg-card px-6 py-8 text-center shadow-sm",
        className
      )}
    >
      <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-muted-foreground">{label}</p>
    </motion.div>
  );
}
