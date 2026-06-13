"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { StarRating } from "@/components/freelancers/star-rating";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { ClientRecommendedFreelancer } from "@/lib/types/client-dashboard";

interface ClientRecommendedFreelancersProps {
  freelancers: ClientRecommendedFreelancer[];
}

export function ClientRecommendedFreelancers({
  freelancers,
}: ClientRecommendedFreelancersProps) {
  return (
    <section aria-labelledby="recommended-freelancers-heading">
      <div className="mb-6">
        <h2
          id="recommended-freelancers-heading"
          className="text-xl font-semibold text-foreground"
        >
          Recommended Freelancers
        </h2>
        <p className="text-sm text-muted-foreground">
          Top talent matched to your recent projects
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {freelancers.map((freelancer, index) => (
          <motion.article
            key={freelancer.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/5"
          >
            <div className="flex items-start gap-4">
              <Avatar className="size-12">
                <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-sm font-semibold text-primary-foreground">
                  {freelancer.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground">{freelancer.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <StarRating rating={freelancer.rating} size="sm" />
                  <span className="text-xs text-muted-foreground">
                    {freelancer.rating}
                  </span>
                </div>
                <p className="mt-2 text-sm font-bold text-primary">
                  ${freelancer.hourlyRate}
                  <span className="text-xs font-normal text-muted-foreground">/hr</span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {freelancer.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="rounded-lg text-xs">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="mt-4">
              <SecondaryButton href={`/freelancers/${freelancer.id}`} className="w-full rounded-xl">
                View Profile
              </SecondaryButton>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/freelancers"
          className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Browse all freelancers
        </Link>
      </div>
    </section>
  );
}
