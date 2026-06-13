"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { FILTER_OPTIONS, type ProjectFilters } from "@/lib/types/project";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  filters: ProjectFilters;
  onToggle: <K extends keyof ProjectFilters>(
    group: K,
    value: ProjectFilters[K] extends (infer U)[] ? U : never
  ) => void;
  onReset: () => void;
  className?: string;
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-foreground">{title}</legend>
      <div className="space-y-2">{children}</div>
    </fieldset>
  );
}

function FilterCheckbox({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: () => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={label}
      />
      <Label
        htmlFor={id}
        className="cursor-pointer text-sm font-normal text-muted-foreground hover:text-foreground"
      >
        {label}
      </Label>
    </div>
  );
}

export function FilterPanel({
  filters,
  onToggle,
  onReset,
  className,
}: FilterPanelProps) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.budgetRanges.length > 0 ||
    filters.experienceLevels.length > 0 ||
    filters.projectTypes.length > 0 ||
    filters.durations.length > 0 ||
    filters.skills.length > 0;

  return (
    <aside
      className={cn("space-y-6", className)}
      aria-label="Project filters"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1"
          >
            Reset all
          </button>
        )}
      </div>

      <FilterGroup title="Category">
        {FILTER_OPTIONS.categories.map((cat) => (
          <FilterCheckbox
            key={cat}
            id={`cat-${cat}`}
            label={cat}
            checked={filters.categories.includes(cat)}
            onCheckedChange={() => onToggle("categories", cat)}
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Budget">
        {FILTER_OPTIONS.budgetRanges.map(({ value, label }) => (
          <FilterCheckbox
            key={value}
            id={`budget-${value}`}
            label={label}
            checked={filters.budgetRanges.includes(value)}
            onCheckedChange={() => onToggle("budgetRanges", value)}
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Experience Level">
        {FILTER_OPTIONS.experienceLevels.map((level) => (
          <FilterCheckbox
            key={level}
            id={`exp-${level}`}
            label={level}
            checked={filters.experienceLevels.includes(level)}
            onCheckedChange={() => onToggle("experienceLevels", level)}
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Project Type">
        {FILTER_OPTIONS.projectTypes.map((type) => (
          <FilterCheckbox
            key={type}
            id={`type-${type}`}
            label={type}
            checked={filters.projectTypes.includes(type)}
            onCheckedChange={() => onToggle("projectTypes", type)}
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Duration">
        {FILTER_OPTIONS.durations.map((dur) => (
          <FilterCheckbox
            key={dur}
            id={`dur-${dur}`}
            label={dur}
            checked={filters.durations.includes(dur)}
            onCheckedChange={() => onToggle("durations", dur)}
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Skills">
        {FILTER_OPTIONS.skills.map((skill) => (
          <FilterCheckbox
            key={skill}
            id={`skill-${skill}`}
            label={skill}
            checked={filters.skills.includes(skill)}
            onCheckedChange={() => onToggle("skills", skill)}
          />
        ))}
      </FilterGroup>

      <SecondaryButton onClick={onReset} className="w-full">
        Reset Filters
      </SecondaryButton>
    </aside>
  );
}
