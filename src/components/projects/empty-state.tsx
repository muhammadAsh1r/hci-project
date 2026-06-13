"use client";

import { EmptyState as SharedEmptyState } from "@/components/shared/empty-state";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <SharedEmptyState
      title="No projects match your search"
      description="Try adjusting your filters or search terms to find more projects that match your skills and preferences."
      actionLabel="Clear Filters"
      onAction={onClearFilters}
    />
  );
}
