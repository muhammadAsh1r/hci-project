"use client";

import { SlidersHorizontal } from "lucide-react";
import { useCallback, useState } from "react";
import { ActiveFilterTags } from "@/components/projects/active-filter-tags";
import { ApplyModal } from "@/components/projects/apply-modal";
import { EmptyState } from "@/components/projects/empty-state";
import { FilterPanel } from "@/components/projects/filter-panel";
import { ProjectCard } from "@/components/projects/project-card";
import { SearchBar } from "@/components/projects/search-bar";
import { SortDropdown } from "@/components/projects/sort-dropdown";
import { ListSkeleton } from "@/components/shared/list-skeleton";
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
import { useProjectFilters } from "@/hooks/use-project-filters";
import type { MarketplaceProject } from "@/lib/types/project";

export function MarketplaceContent() {
  const {
    filters,
    sortBy,
    setSortBy,
    filteredProjects,
    isLoading,
    updateSearch,
    toggleFilter,
    removeFilter,
    resetFilters,
  } = useProjectFilters();

  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [applyProject, setApplyProject] = useState<MarketplaceProject | null>(
    null
  );
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const { showToast, ToastContainer } = useToast();

  const handleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      const wasSaved = next.has(id);
      if (wasSaved) next.delete(id);
      else next.add(id);
      showToast(wasSaved ? "Project removed from saved" : "Project saved");
      return next;
    });
  }, [showToast]);

  const handleApply = useCallback((project: MarketplaceProject) => {
    setApplyProject(project);
  }, []);

  return (
    <PageShell>
        <PageHeader
          title="Find Projects"
          description="Browse and apply to projects that match your skills and experience."
          breadcrumbs={[{ label: "Projects", href: "/projects" }]}
        />

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              <SearchBar value={filters.search} onChange={updateSearch} />
              <FilterPanel
                filters={filters}
                onToggle={toggleFilter}
                onReset={resetFilters}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* Mobile search + filter trigger */}
            <div className="mb-6 space-y-4 lg:hidden">
              <SearchBar value={filters.search} onChange={updateSearch} />
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
                      onReset={() => {
                        resetFilters();
                        setFilterDrawerOpen(false);
                      }}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Results header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p
                  className="text-sm text-muted-foreground"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {isLoading ? (
                    "Loading projects..."
                  ) : (
                    <>
                      <span className="font-semibold text-foreground">
                        {filteredProjects.length}
                      </span>{" "}
                      {filteredProjects.length === 1 ? "project" : "projects"}{" "}
                      found
                    </>
                  )}
                </p>
              </div>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            <ActiveFilterTags
              filters={filters}
              onRemove={removeFilter}
            />

            {/* Project grid */}
            <div className="mt-6">
              {isLoading ? (
                <ListSkeleton count={4} />
              ) : filteredProjects.length === 0 ? (
                <EmptyState onClearFilters={resetFilters} />
              ) : (
                <div className="grid gap-4">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      isSaved={savedIds.has(project.id)}
                      onSave={handleSave}
                      onApply={handleApply}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      <ApplyModal
        project={applyProject}
        open={!!applyProject}
        onOpenChange={(open) => {
          if (!open) setApplyProject(null);
        }}
      />

      <ToastContainer />
    </PageShell>
  );
}
