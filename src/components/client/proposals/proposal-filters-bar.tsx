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
import { CLIENT_PROPOSAL_BUDGET_FILTERS } from "@/lib/client-proposals-data";
import type {
  ClientProposalFilters,
  ClientProposalStatus,
} from "@/lib/types/client-proposal";
import { FILTER_OPTIONS } from "@/lib/types/project";
import type { ExperienceLevel } from "@/lib/types/project";

const STATUS_OPTIONS: { value: ClientProposalStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "saved", label: "Saved" },
];

const SKILL_OPTIONS = ["React", "Next.js", "UI/UX", "Node.js", "Python"];

interface ProposalFiltersBarProps {
  filters: ClientProposalFilters;
  onChange: (filters: ClientProposalFilters) => void;
  onReset: () => void;
}

export function ProposalFiltersBar({
  filters,
  onChange,
  onReset,
}: ProposalFiltersBarProps) {
  const hasFilters =
    filters.search ||
    filters.statuses.length > 0 ||
    filters.budgetRanges.length > 0 ||
    filters.experienceLevels.length > 0 ||
    filters.minRating > 0 ||
    filters.skills.length > 0;

  const toggleStatus = (status: ClientProposalStatus) => {
    const next = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    onChange({ ...filters, statuses: next });
  };

  const toggleBudget = (range: string) => {
    const next = filters.budgetRanges.includes(range)
      ? filters.budgetRanges.filter((r) => r !== range)
      : [...filters.budgetRanges, range];
    onChange({ ...filters, budgetRanges: next });
  };

  const toggleExperience = (level: ExperienceLevel) => {
    const next = filters.experienceLevels.includes(level)
      ? filters.experienceLevels.filter((l) => l !== level)
      : [...filters.experienceLevels, level];
    onChange({ ...filters, experienceLevels: next });
  };

  const toggleSkill = (skill: string) => {
    const next = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    onChange({ ...filters, skills: next });
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

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search proposals..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="h-10 rounded-xl pl-9"
            aria-label="Search proposals"
          />
        </div>

        <div>
          <Label htmlFor="rating-filter" className="sr-only">Minimum rating</Label>
          <Select
            value={filters.minRating ? String(filters.minRating) : "0"}
            onValueChange={(v) =>
              onChange({ ...filters, minRating: Number(v) })
            }
          >
            <SelectTrigger id="rating-filter" className="h-10 w-full rounded-xl">
              <SelectValue placeholder="Rating filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any rating</SelectItem>
              <SelectItem value="4.5">4.5+ stars</SelectItem>
              <SelectItem value="4.7">4.7+ stars</SelectItem>
              <SelectItem value="4.9">4.9+ stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Status</p>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs has-checked:border-primary has-checked:bg-primary/5"
              >
                <Checkbox
                  checked={filters.statuses.includes(opt.value)}
                  onCheckedChange={() => toggleStatus(opt.value)}
                  aria-label={`Filter ${opt.label}`}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Budget</p>
          <div className="flex flex-wrap gap-2">
            {CLIENT_PROPOSAL_BUDGET_FILTERS.map((opt) => (
              <label
                key={opt.value}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs has-checked:border-primary has-checked:bg-primary/5"
              >
                <Checkbox
                  checked={filters.budgetRanges.includes(opt.value)}
                  onCheckedChange={() => toggleBudget(opt.value)}
                  aria-label={`Filter ${opt.label}`}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Experience</p>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.experienceLevels.map((level) => (
              <label
                key={level}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs has-checked:border-primary has-checked:bg-primary/5"
              >
                <Checkbox
                  checked={filters.experienceLevels.includes(level)}
                  onCheckedChange={() => toggleExperience(level)}
                  aria-label={`Filter ${level}`}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Skills</p>
          <div className="flex flex-wrap gap-2">
            {SKILL_OPTIONS.map((skill) => (
              <label
                key={skill}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs has-checked:border-primary has-checked:bg-primary/5"
              >
                <Checkbox
                  checked={filters.skills.includes(skill)}
                  onCheckedChange={() => toggleSkill(skill)}
                  aria-label={`Filter ${skill}`}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
