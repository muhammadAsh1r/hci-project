"use client";

import { motion } from "framer-motion";
import { Brain, Code, Palette, PenLine, Smartphone } from "lucide-react";
import { proposalTemplates } from "@/lib/proposal-data";
import type { ProposalTemplate } from "@/lib/types/proposal";
import { cn } from "@/lib/utils";

const iconMap = {
  Code,
  Palette,
  Brain,
  Smartphone,
  PenLine,
};

interface ProposalTemplatesProps {
  selectedId: string | null;
  onSelect: (template: ProposalTemplate) => void;
}

export function ProposalTemplates({ selectedId, onSelect }: ProposalTemplatesProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-1 font-semibold text-foreground">Templates</h3>
      <p className="mb-4 text-xs text-muted-foreground">
        One-click template to pre-fill your proposal
      </p>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {proposalTemplates.map((template, index) => {
          const Icon = iconMap[template.icon];
          const isSelected = selectedId === template.id;

          return (
            <motion.button
              key={template.id}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(template)}
              className={cn(
                "flex items-start gap-3 rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/30 hover:bg-muted/30"
              )}
              aria-pressed={isSelected}
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{template.name}</p>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
