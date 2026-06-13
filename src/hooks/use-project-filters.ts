"use client";

import { useCallback, useMemo, useState } from "react";
import { filterProjects, sortProjects } from "@/lib/project-filters";
import { marketplaceProjects } from "@/lib/projects-data";
import {
  DEFAULT_FILTERS,
  type ProjectFilters,
  type SortOption,
} from "@/lib/types/project";

export function useProjectFilters() {
  const [filters, setFilters] = useState<ProjectFilters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("best-match");
  const [isLoading, setIsLoading] = useState(false);

  const filteredProjects = useMemo(() => {
    const filtered = filterProjects(marketplaceProjects, filters);
    return sortProjects(filtered, sortBy);
  }, [filters, sortBy]);

  const updateSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const toggleFilter = useCallback(
    <K extends keyof ProjectFilters>(group: K, value: ProjectFilters[K] extends (infer U)[] ? U : never) => {
      setFilters((prev) => {
        const current = prev[group] as unknown[];
        const exists = current.includes(value);
        return {
          ...prev,
          [group]: exists
            ? current.filter((v) => v !== value)
            : [...current, value],
        };
      });
    },
    []
  );

  const removeFilter = useCallback(
    (group: keyof ProjectFilters, value?: string) => {
      setFilters((prev) => {
        if (group === "search") {
          return { ...prev, search: "" };
        }
        const current = prev[group] as string[];
        return {
          ...prev,
          [group]: current.filter((v) => v !== value),
        };
      });
    },
    []
  );

  const resetFilters = useCallback(() => {
    setIsLoading(true);
    setFilters(DEFAULT_FILTERS);
    setSortBy("best-match");
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  return {
    filters,
    sortBy,
    setSortBy,
    filteredProjects,
    isLoading,
    updateSearch,
    toggleFilter,
    removeFilter,
    resetFilters,
  };
}
