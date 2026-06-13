"use client";

import { useCallback, useMemo, useState } from "react";
import { filterFreelancers, sortFreelancers } from "@/lib/freelancer-filters";
import { freelancerProfiles } from "@/lib/freelancers-data";
import {
  DEFAULT_FREELANCER_FILTERS,
  type FreelancerFilters,
  type FreelancerSortOption,
} from "@/lib/types/freelancer";

export function useFreelancerFilters() {
  const [filters, setFilters] = useState<FreelancerFilters>(
    DEFAULT_FREELANCER_FILTERS
  );
  const [sortBy, setSortBy] = useState<FreelancerSortOption>("best-match");
  const [isLoading, setIsLoading] = useState(false);

  const filteredFreelancers = useMemo(() => {
    const filtered = filterFreelancers(freelancerProfiles, filters);
    return sortFreelancers(filtered, sortBy);
  }, [filters, sortBy]);

  const updateSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const toggleFilter = useCallback(
    <K extends keyof FreelancerFilters>(
      group: K,
      value: FreelancerFilters[K] extends (infer U)[] ? U : never
    ) => {
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

  const updateFilter = useCallback(
    <K extends keyof FreelancerFilters>(group: K, value: FreelancerFilters[K]) => {
      setFilters((prev) => ({ ...prev, [group]: value }));
    },
    []
  );

  const removeFilter = useCallback(
    (group: keyof FreelancerFilters, value?: string) => {
      setFilters((prev) => {
        if (group === "search") return { ...prev, search: "" };
        if (group === "minRating") return { ...prev, minRating: 0 };
        if (group === "minJobSuccess") return { ...prev, minJobSuccess: 0 };
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
    setFilters(DEFAULT_FREELANCER_FILTERS);
    setSortBy("best-match");
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  return {
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
  };
}
