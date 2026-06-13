"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SecondaryButton } from "@/components/shared/secondary-button";
import {
  AVAILABILITY_LABELS,
  FREELANCER_FILTER_OPTIONS,
  type FreelancerFilters,
} from "@/lib/types/freelancer";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  filters: FreelancerFilters;
  onToggle: <K extends keyof FreelancerFilters>(
    group: K,
    value: FreelancerFilters[K] extends (infer U)[] ? U : never
  ) => void;
  onUpdate: <K extends keyof FreelancerFilters>(
    group: K,
    value: FreelancerFilters[K]
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
  onUpdate,
  onReset,
  className,
}: FilterPanelProps) {
  const hasActiveFilters =
    filters.skills.length > 0 ||
    filters.experienceLevels.length > 0 ||
    filters.availability.length > 0 ||
    filters.locations.length > 0 ||
    filters.languages.length > 0 ||
    filters.minRating > 0 ||
    filters.minJobSuccess > 0 ||
    filters.rateMin > 0 ||
    filters.rateMax < 200;

  return (
    <aside
      className={cn("space-y-6", className)}
      aria-label="Freelancer filters"
    >
      <FilterGroup title="Skills">
        {FREELANCER_FILTER_OPTIONS.skills.map((skill) => (
          <FilterCheckbox
            key={skill}
            id={`skill-${skill}`}
            label={skill}
            checked={filters.skills.includes(skill)}
            onCheckedChange={() => onToggle("skills", skill)}
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Experience Level">
        {FREELANCER_FILTER_OPTIONS.experienceLevels.map((level) => (
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

      <FilterGroup title="Hourly Rate">
        <div className="space-y-2">
          {[0, 50, 75, 100].map((min) => (
            <FilterCheckbox
              key={min}
              id={`rate-${min}`}
              label={min === 0 ? "Any rate" : `$${min}+/hr`}
              checked={
                min === 0
                  ? filters.rateMin === 0 && filters.rateMax === 200
                  : filters.rateMin === min && filters.rateMax === 200
              }
              onCheckedChange={() => {
                if (min === 0) {
                  onUpdate("rateMin", 0);
                  onUpdate("rateMax", 200);
                } else {
                  onUpdate("rateMin", min);
                  onUpdate("rateMax", 200);
                }
              }}
            />
          ))}
        </div>
      </FilterGroup>

      <Separator />

      <FilterGroup title="Availability">
        {FREELANCER_FILTER_OPTIONS.availability.map((avail) => (
          <FilterCheckbox
            key={avail}
            id={`avail-${avail}`}
            label={AVAILABILITY_LABELS[avail].label}
            checked={filters.availability.includes(avail)}
            onCheckedChange={() => onToggle("availability", avail)}
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Location">
        {FREELANCER_FILTER_OPTIONS.locations.map((loc) => (
          <FilterCheckbox
            key={loc}
            id={`loc-${loc}`}
            label={loc}
            checked={filters.locations.includes(loc)}
            onCheckedChange={() => onToggle("locations", loc)}
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Rating">
        {[4.5, 4.7, 4.9].map((rating) => (
          <FilterCheckbox
            key={rating}
            id={`rating-${rating}`}
            label={`${rating}+ stars`}
            checked={filters.minRating === rating}
            onCheckedChange={() =>
              onUpdate("minRating", filters.minRating === rating ? 0 : rating)
            }
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Job Success Score">
        {[90, 95, 98].map((score) => (
          <FilterCheckbox
            key={score}
            id={`jss-${score}`}
            label={`${score}%+`}
            checked={filters.minJobSuccess === score}
            onCheckedChange={() =>
              onUpdate(
                "minJobSuccess",
                filters.minJobSuccess === score ? 0 : score
              )
            }
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Languages">
        {FREELANCER_FILTER_OPTIONS.languages.map((lang) => (
          <FilterCheckbox
            key={lang}
            id={`lang-${lang}`}
            label={lang}
            checked={filters.languages.includes(lang)}
            onCheckedChange={() => onToggle("languages", lang)}
          />
        ))}
      </FilterGroup>

      {hasActiveFilters && (
        <SecondaryButton onClick={onReset} className="w-full rounded-xl">
          Clear all filters
        </SecondaryButton>
      )}
    </aside>
  );
}
