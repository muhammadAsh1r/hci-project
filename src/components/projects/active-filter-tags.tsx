"use client";

import { X } from "lucide-react";
import { getActiveFilterTags } from "@/lib/project-filters";
import type { ProjectFilters } from "@/lib/types/project";

interface ActiveFilterTagsProps {
  filters: ProjectFilters;
  onRemove: (group: keyof ProjectFilters, value?: string) => void;
}

export function ActiveFilterTags({ filters, onRemove }: ActiveFilterTagsProps) {
  const tags = getActiveFilterTags(filters);

  if (tags.length === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="list"
      aria-label="Active filters"
    >
      <span className="text-sm text-muted-foreground">Active:</span>
      {tags.map((tag) => (
        <button
          key={tag.key}
          type="button"
          role="listitem"
          onClick={() => onRemove(tag.group, tag.value)}
          className="inline-flex items-center gap-1 rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Remove filter: ${tag.label}`}
        >
          {tag.label}
          <X className="size-3" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
