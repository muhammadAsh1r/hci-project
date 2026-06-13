"use client";

import { EmptyState as SharedEmptyState } from "@/components/shared/empty-state";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <SharedEmptyState
      title="No freelancers found"
      description="Try adjusting your search or filters to find the talent you need."
      actionLabel="Clear all filters"
      onAction={onClearFilters}
    />
  );
}
