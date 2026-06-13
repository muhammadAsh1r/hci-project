"use client";

import { Badge } from "@/components/ui/badge";

export function DemoModeBadge() {
  return (
    <div
      className="pointer-events-none fixed right-4 top-20 z-[60] sm:right-6"
      aria-hidden="true"
    >
      <Badge
        variant="secondary"
        className="border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary shadow-sm"
      >
        Demo Mode
      </Badge>
    </div>
  );
}
