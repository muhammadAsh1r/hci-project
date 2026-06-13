"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getFreelancerById } from "@/lib/freelancers-data";

interface AiRecommendationsProps {
  currentId?: string;
}

const DEFAULT_RECS = [
  { freelancerId: "sarah-chen", reason: "Best Match for React Projects", highlight: "98% skill match" },
  { freelancerId: "elena-rodriguez", reason: "Strong UI/UX Experience", highlight: "5.0 rating" },
  { freelancerId: "david-kim", reason: "High Success Rate", highlight: "97% job success" },
];

export function AiRecommendations({ currentId }: AiRecommendationsProps) {
  const recs = DEFAULT_RECS.filter((r) => r.freelancerId !== currentId);

  return (
    <section
      aria-labelledby="ai-rec-heading"
      className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-brand-secondary/5 p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="size-5 text-primary" aria-hidden="true" />
        <h2 id="ai-rec-heading" className="text-lg font-semibold text-foreground">
          AI Recommendations
        </h2>
      </div>
      <div className="space-y-3">
        {recs.map((rec) => {
          const freelancer = getFreelancerById(rec.freelancerId);
          if (!freelancer) return null;
          return (
            <Link
              key={rec.freelancerId}
              href={`/freelancers/${rec.freelancerId}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all hover:border-primary/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Avatar className="size-10">
                <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-xs font-semibold text-primary-foreground">
                  {freelancer.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {rec.reason}
                </p>
                <p className="text-xs text-muted-foreground">
                  {freelancer.name} · {rec.highlight}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
