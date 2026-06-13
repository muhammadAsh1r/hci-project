"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILTER_OPTIONS, type SortOption } from "@/lib/types/project";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-muted-foreground">
        Sort by:
      </label>
      <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
        <SelectTrigger
          id="sort-select"
          className="h-10 w-[180px] rounded-xl"
          aria-label="Sort projects"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FILTER_OPTIONS.sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
