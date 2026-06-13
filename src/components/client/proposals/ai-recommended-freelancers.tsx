"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { StarRating } from "@/components/freelancers/star-rating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AI_RECOMMENDED_FREELANCERS } from "@/lib/client-proposals-data";

export function AiRecommendedFreelancers() {
  return (
    <section aria-labelledby="ai-recommendations-heading" className="mt-8">
      <div className="mb-6 flex items-center gap-2">
        <Sparkles className="size-5 text-primary" aria-hidden="true" />
        <div>
          <h2
            id="ai-recommendations-heading"
            className="text-xl font-semibold text-foreground"
          >
            AI-Recommended Freelancers
          </h2>
          <p className="text-sm text-muted-foreground">
            Best matches based on your active projects and requirements
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AI_RECOMMENDED_FREELANCERS.map((rec, index) => (
          <motion.div
            key={rec.freelancerId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <Avatar className="size-12">
                <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-sm font-semibold text-primary-foreground">
                  {rec.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground">{rec.name}</h3>
                <p className="text-xs text-muted-foreground">{rec.title}</p>
                <div className="mt-1">
                  <StarRating rating={rec.rating} size="sm" />
                </div>
              </div>
              <Badge className="rounded-lg bg-primary text-primary-foreground">
                {rec.matchPercentage}%
              </Badge>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">{rec.reason}</p>

            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Portfolio Strength</span>
                <span className="font-medium text-foreground">{rec.portfolioStrength}%</span>
              </div>
              <Progress value={rec.portfolioStrength} className="h-1.5" />
            </div>

            <Link
              href={`/freelancers/${rec.freelancerId}`}
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              View Profile →
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
