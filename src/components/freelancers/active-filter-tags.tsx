"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getActiveFilterTags } from "@/lib/freelancer-filters";
import type { FreelancerFilters } from "@/lib/types/freelancer";

interface ActiveFilterTagsProps {
  filters: FreelancerFilters;
  onRemove: (group: keyof FreelancerFilters, value?: string) => void;
}

export function ActiveFilterTags({ filters, onRemove }: ActiveFilterTagsProps) {
  const tags = getActiveFilterTags(filters);
  if (tags.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap gap-2" aria-label="Active filters">
      {tags.map((tag) => (
        <Badge
          key={tag.key}
          variant="secondary"
          className="gap-1 rounded-lg py-1 pl-2.5 pr-1 font-normal"
        >
          {tag.label}
          <button
            type="button"
            onClick={() => onRemove(tag.group, tag.value)}
            className="rounded-md p-0.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Remove filter: ${tag.label}`}
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
