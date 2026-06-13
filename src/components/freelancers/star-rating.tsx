"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizes = { sm: "size-3.5", md: "size-4", lg: "size-5" };

export function StarRating({
  rating,
  size = "md",
  showValue = true,
  className,
}: StarRatingProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      <Star
        className={cn(sizes[size], "fill-amber-400 text-amber-400")}
        aria-hidden="true"
      />
      {showValue && (
        <span className="text-sm font-semibold text-foreground">{rating}</span>
      )}
    </div>
  );
}
