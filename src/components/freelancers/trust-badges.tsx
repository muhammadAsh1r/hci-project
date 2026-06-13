"use client";

import {
  Award,
  BadgeCheck,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TrustBadge } from "@/lib/types/freelancer";
import { cn } from "@/lib/utils";

const BADGE_CONFIG: Record<
  TrustBadge,
  { icon: typeof Award; className: string }
> = {
  "Top Rated": { icon: Award, className: "border-amber-200 bg-amber-50 text-amber-800" },
  "Verified Identity": { icon: BadgeCheck, className: "border-blue-200 bg-blue-50 text-blue-800" },
  "100% Completion": { icon: CheckCircle2, className: "border-green-200 bg-green-50 text-green-800" },
  "Fast Response": { icon: Zap, className: "border-violet-200 bg-violet-50 text-violet-800" },
  "Rising Talent": { icon: TrendingUp, className: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  "Expert Level": { icon: Sparkles, className: "border-indigo-200 bg-indigo-50 text-indigo-800" },
};

interface TrustBadgesProps {
  badges: TrustBadge[];
  size?: "sm" | "md";
  className?: string;
}

export function TrustBadges({ badges, size = "sm", className }: TrustBadgesProps) {
  if (badges.length === 0) return null;

  return (
    <div
      className={cn("flex flex-wrap gap-1.5", className)}
      aria-label="Trust badges"
    >
      {badges.map((badge) => {
        const { icon: Icon, className: badgeClass } = BADGE_CONFIG[badge];
        return (
          <Badge
            key={badge}
            variant="outline"
            className={cn(
              "gap-1 rounded-lg font-normal",
              badgeClass,
              size === "sm" && "text-xs px-2 py-0.5",
              size === "md" && "text-sm px-2.5 py-1"
            )}
          >
            <Icon className={cn(size === "sm" ? "size-3" : "size-3.5")} aria-hidden="true" />
            {badge}
          </Badge>
        );
      })}
    </div>
  );
}
