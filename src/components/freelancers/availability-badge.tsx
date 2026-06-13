"use client";

import { AVAILABILITY_LABELS, type FreelancerAvailability } from "@/lib/types/freelancer";
import { cn } from "@/lib/utils";

interface AvailabilityBadgeProps {
  status: FreelancerAvailability;
  lastActive?: string;
  showPulse?: boolean;
  className?: string;
}

export function AvailabilityBadge({
  status,
  lastActive,
  showPulse = true,
  className,
}: AvailabilityBadgeProps) {
  const { label, color } = AVAILABILITY_LABELS[status];
  const isOnline = lastActive === "Online now";

  return (
    <span
      className={cn("inline-flex items-center gap-1.5 text-xs font-medium", className)}
      role="status"
      aria-label={`Availability: ${label}${lastActive ? `, ${lastActive}` : ""}`}
    >
      <span className="relative flex size-2">
        {showPulse && isOnline && (
          <span
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-75",
              color
            )}
          />
        )}
        <span className={cn("relative inline-flex size-2 rounded-full", color)} />
      </span>
      <span className="text-foreground">{label}</span>
      {lastActive && (
        <span className="text-muted-foreground">· {lastActive}</span>
      )}
    </span>
  );
}
