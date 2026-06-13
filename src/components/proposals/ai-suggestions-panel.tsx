"use client";

import { motion } from "framer-motion";
import { Lightbulb, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AiSuggestion } from "@/lib/types/proposal";
import { cn } from "@/lib/utils";

interface AiSuggestionsPanelProps {
  suggestions: AiSuggestion[];
  onApply: (id: string) => void;
}

export function AiSuggestionsPanel({ suggestions, onApply }: AiSuggestionsPanelProps) {
  const pending = suggestions.filter((s) => !s.applied);

  if (pending.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="size-5 text-amber-500" aria-hidden="true" />
        <h3 className="font-semibold text-foreground">AI Suggestions</h3>
      </div>

      <ul className="space-y-2" aria-label="AI improvement suggestions">
        {suggestions.map((suggestion, index) => (
          <motion.li
            key={suggestion.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
              suggestion.applied
                ? "border-green-200 bg-green-50/50 text-muted-foreground line-through"
                : "border-border bg-muted/30 hover:border-primary/30"
            )}
          >
            <span className="flex-1 text-foreground">{suggestion.text}</span>
            {!suggestion.applied && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onApply(suggestion.id)}
                className="shrink-0 rounded-lg text-primary hover:text-primary"
                aria-label={`Apply suggestion: ${suggestion.text}`}
              >
                <Plus className="size-3.5 mr-1" />
                Apply
              </Button>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
