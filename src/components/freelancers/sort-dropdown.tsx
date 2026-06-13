"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FREELANCER_FILTER_OPTIONS, type FreelancerSortOption } from "@/lib/types/freelancer";

interface SortDropdownProps {
  value: FreelancerSortOption;
  onChange: (value: FreelancerSortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as FreelancerSortOption)}>
      <SelectTrigger
        className="w-full rounded-xl sm:w-52"
        aria-label="Sort freelancers"
      >
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {FREELANCER_FILTER_OPTIONS.sortOptions.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
