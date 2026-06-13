"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CLIENT_BUDGET_FILTER_OPTIONS } from "@/lib/client-projects-data";
import type { ClientProjectFilters } from "@/lib/types/client-project";
import { FILTER_OPTIONS } from "@/lib/types/project";
import type { ProjectCategory } from "@/lib/types/project";

interface ClientProjectFiltersBarProps {
  filters: ClientProjectFilters;
  onChange: (filters: ClientProjectFilters) => void;
  onReset: () => void;
}

export function ClientProjectFiltersBar({
  filters,
  onChange,
  onReset,
}: ClientProjectFiltersBarProps) {
  const hasFilters =
    filters.search ||
    filters.categories.length > 0 ||
    filters.budgetRanges.length > 0 ||
    filters.dateSort !== "newest";

  const toggleCategory = (cat: ProjectCategory) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const toggleBudget = (range: string) => {
    const next = filters.budgetRanges.includes(range)
      ? filters.budgetRanges.filter((r) => r !== range)
      : [...filters.budgetRanges, range];
    onChange({ ...filters, budgetRanges: next });
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-muted-foreground" aria-hidden="true" />
          <h3 className="font-semibold text-foreground">Filters</h3>
        </div>
        {hasFilters ? (
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-medium text-primary hover:underline"
          >
            Reset all
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="relative lg:col-span-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="h-10 rounded-xl pl-9"
            aria-label="Search projects"
          />
        </div>

        <div>
          <Label htmlFor="date-sort" className="sr-only">Sort by date</Label>
          <Select
            value={filters.dateSort}
            onValueChange={(v) =>
              onChange({
                ...filters,
                dateSort: v as ClientProjectFilters["dateSort"],
              })
            }
          >
            <SelectTrigger id="date-sort" className="h-10 w-full rounded-xl">
              <SelectValue placeholder="Date sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="most-proposals">Most proposals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="lg:col-span-2">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Category</p>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.categories.map((cat) => (
              <label
                key={cat}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs transition-colors has-checked:border-primary has-checked:bg-primary/5"
              >
                <Checkbox
                  checked={filters.categories.includes(cat)}
                  onCheckedChange={() => toggleCategory(cat)}
                  aria-label={`Filter by ${cat}`}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Budget</p>
        <div className="flex flex-wrap gap-2">
          {CLIENT_BUDGET_FILTER_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs transition-colors has-checked:border-primary has-checked:bg-primary/5"
            >
              <Checkbox
                checked={filters.budgetRanges.includes(opt.value)}
                onCheckedChange={() => toggleBudget(opt.value)}
                aria-label={`Filter by ${opt.label}`}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
