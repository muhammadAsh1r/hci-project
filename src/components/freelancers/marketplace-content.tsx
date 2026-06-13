"use client";

import { GitCompare, SlidersHorizontal } from "lucide-react";
import { useCallback, useState } from "react";
import { ActiveFilterTags } from "@/components/freelancers/active-filter-tags";
import { EmptyState } from "@/components/freelancers/empty-state";
import { FilterPanel } from "@/components/freelancers/filter-panel";
import { FreelancerCard } from "@/components/freelancers/freelancer-card";
import { FreelancerCardSkeleton } from "@/components/freelancers/freelancer-card-skeleton";
import { FreelancerSearchBar } from "@/components/freelancers/freelancer-search-bar";
import { HireModal } from "@/components/freelancers/hire-modal";
import { SortDropdown } from "@/components/freelancers/sort-dropdown";
import { OutlineLink } from "@/components/shared/outline-link";
import { PageHeader } from "@/components/shared/page-header";
import { PageShell } from "@/components/shared/page-shell";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFreelancerFilters } from "@/hooks/use-freelancer-filters";
import { useSavedFreelancers } from "@/hooks/use-saved-freelancers";
import type { FreelancerProfile } from "@/lib/types/freelancer";
import { cn } from "@/lib/utils";

export function MarketplaceContent() {
  const {
    filters,
    sortBy,
    setSortBy,
    filteredFreelancers,
    isLoading,
    updateSearch,
    toggleFilter,
    updateFilter,
    removeFilter,
    resetFilters,
  } = useFreelancerFilters();

  const {
    toggleSave,
    isSaved,
    toggleCompare,
    isInCompare,
    compareIds,
    hydrated,
  } = useSavedFreelancers();

  const [hireFreelancer, setHireFreelancer] =
    useState<FreelancerProfile | null>(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const { showToast, ToastContainer } = useToast();

  const handleSave = useCallback(
    (id: string) => {
      const wasSaved = isSaved(id);
      toggleSave(id);
      showToast(
        wasSaved
          ? "Freelancer removed from saved"
          : "Freelancer saved successfully"
      );
    },
    [toggleSave, isSaved, showToast]
  );

  const handleCompare = useCallback(
    (id: string) => {
      const wasInCompare = isInCompare(id);
      toggleCompare(id);
      showToast(
        wasInCompare
          ? "Removed from comparison"
          : "Added to comparison (max 3)"
      );
    },
    [toggleCompare, isInCompare, showToast]
  );

  const handleHireConfirm = useCallback(() => {
    showToast("Hiring invitation sent!");
  }, [showToast]);

  return (
    <PageShell>
        <PageHeader
          title="Find Freelancers"
          description="Discover top talent, compare profiles, and hire with confidence."
          breadcrumbs={[{ label: "Freelancers", href: "/freelancers" }]}
          actions={
            <>
              <OutlineLink href="/freelancers/saved">Saved Freelancers</OutlineLink>
              {compareIds.length > 0 && (
                <OutlineLink href="/freelancers/compare" variant="primary">
                  <GitCompare className="size-4" aria-hidden="true" />
                  Compare ({compareIds.length})
                </OutlineLink>
              )}
            </>
          }
        />

        <div className="flex gap-8">
          <div className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              <FreelancerSearchBar
                value={filters.search}
                onChange={updateSearch}
              />
              <FilterPanel
                filters={filters}
                onToggle={toggleFilter}
                onUpdate={updateFilter}
                onReset={resetFilters}
              />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-6 space-y-4 lg:hidden">
              <FreelancerSearchBar
                value={filters.search}
                onChange={updateSearch}
              />
              <Sheet open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
                <SheetTrigger
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Open filters"
                >
                  <SlidersHorizontal className="size-4" />
                  Filters
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-sm overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel
                      filters={filters}
                      onToggle={toggleFilter}
                      onUpdate={updateFilter}
                      onReset={() => {
                        resetFilters();
                        setFilterDrawerOpen(false);
                      }}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p
                className="text-sm text-muted-foreground"
                aria-live="polite"
                aria-atomic="true"
              >
                {isLoading ? (
                  "Loading freelancers..."
                ) : (
                  <>
                    <span className="font-semibold text-foreground">
                      {filteredFreelancers.length}
                    </span>{" "}
                    {filteredFreelancers.length === 1
                      ? "freelancer"
                      : "freelancers"}{" "}
                    found
                  </>
                )}
              </p>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            <ActiveFilterTags filters={filters} onRemove={removeFilter} />

            <div
              className={cn(
                "mt-6",
                isLoading && "opacity-50 pointer-events-none"
              )}
            >
              {!hydrated || isLoading ? (
                <div className="grid gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <FreelancerCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredFreelancers.length === 0 ? (
                <EmptyState onClearFilters={resetFilters} />
              ) : (
                <div className="grid gap-4">
                  {filteredFreelancers.map((freelancer, index) => (
                    <FreelancerCard
                      key={freelancer.id}
                      freelancer={freelancer}
                      index={index}
                      isSaved={isSaved(freelancer.id)}
                      isInCompare={isInCompare(freelancer.id)}
                      onSave={handleSave}
                      onCompare={handleCompare}
                      onHire={setHireFreelancer}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      <HireModal
        freelancer={hireFreelancer}
        open={!!hireFreelancer}
        onOpenChange={(open) => {
          if (!open) setHireFreelancer(null);
        }}
        onConfirm={handleHireConfirm}
      />

      <ToastContainer />
    </PageShell>
  );
}
