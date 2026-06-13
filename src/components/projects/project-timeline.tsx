"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ProjectTimelineStep } from "@/lib/types/project";
import { cn } from "@/lib/utils";

interface ProjectTimelineProps {
  steps: ProjectTimelineStep[];
}

export function ProjectTimeline({ steps }: ProjectTimelineProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-foreground">
        Project Timeline
      </h3>

      <ol className="relative space-y-0" aria-label="Project timeline">
        {steps.map((step, index) => (
          <motion.li
            key={step.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-[15px] top-8 h-full w-0.5",
                  step.status === "completed"
                    ? "bg-primary"
                    : "bg-border"
                )}
                aria-hidden="true"
              />
            )}

            <div
              className={cn(
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2",
                step.status === "completed" &&
                  "border-primary bg-primary text-primary-foreground",
                step.status === "current" &&
                  "border-primary bg-primary/10 text-primary",
                step.status === "upcoming" &&
                  "border-border bg-muted text-muted-foreground"
              )}
            >
              {step.status === "completed" ? (
                <Check className="size-4" aria-hidden="true" />
              ) : (
                <span className="text-xs font-semibold">{index + 1}</span>
              )}
            </div>

            <div className="pt-0.5">
              <p
                className={cn(
                  "font-medium",
                  step.status === "upcoming"
                    ? "text-muted-foreground"
                    : "text-foreground"
                )}
              >
                {step.label}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {step.date}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
