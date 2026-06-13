"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FreelancerSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FreelancerSearchBar({
  value,
  onChange,
  className,
}: FreelancerSearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder="Search by name, skill, role, or technology..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-xl pl-10 pr-10"
        aria-label="Search freelancers"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
