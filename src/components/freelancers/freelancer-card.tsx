"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Bookmark,
  Briefcase,
  MapPin,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { AvailabilityBadge } from "@/components/freelancers/availability-badge";
import { StarRating } from "@/components/freelancers/star-rating";
import { TrustBadges } from "@/components/freelancers/trust-badges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { FreelancerProfile } from "@/lib/types/freelancer";
import { cn } from "@/lib/utils";

interface FreelancerCardProps {
  freelancer: FreelancerProfile;
  index?: number;
  isSaved?: boolean;
  isInCompare?: boolean;
  onSave?: (id: string) => void;
  onCompare?: (id: string) => void;
  onHire?: (freelancer: FreelancerProfile) => void;
}

export function FreelancerCard({
  freelancer,
  index = 0,
  isSaved = false,
  isInCompare = false,
  onSave,
  onCompare,
  onHire,
}: FreelancerCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -2 }}
      className="group relative rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/5"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="size-14 shrink-0">
            <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-base font-semibold text-primary-foreground">
              {freelancer.avatar}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link
                  href={`/freelancers/${freelancer.id}`}
                  className="text-lg font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {freelancer.name}
                </Link>
                <p className="text-sm text-muted-foreground">{freelancer.role}</p>
              </div>
              <p className="shrink-0 text-sm font-bold text-primary">
                ${freelancer.hourlyRate}
                <span className="text-xs font-normal text-muted-foreground">/hr</span>
              </p>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" aria-hidden="true" />
                {freelancer.location}
              </span>
              <StarRating rating={freelancer.rating} size="sm" />
              <span className="inline-flex items-center gap-1">
                <TrendingUp className="size-3.5" aria-hidden="true" />
                {freelancer.jobSuccessScore}% success
              </span>
              <span className="inline-flex items-center gap-1">
                <Briefcase className="size-3.5" aria-hidden="true" />
                {freelancer.projectsCompleted} projects
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {freelancer.bio}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {freelancer.skills.slice(0, 4).map((skill) => (
            <Badge
              key={skill.name}
              variant="secondary"
              className="rounded-lg bg-muted font-normal text-muted-foreground"
            >
              {skill.name}
            </Badge>
          ))}
        </div>

        <div className="mt-3">
          <TrustBadges badges={freelancer.trustBadges.slice(0, 3)} />
        </div>

        <div className="mt-3">
          <AvailabilityBadge
            status={freelancer.availability}
            lastActive={freelancer.lastActive}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-border px-6 py-4">
        <Link
          href={`/freelancers/${freelancer.id}`}
          className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          View Profile
        </Link>
        <Button
          variant="outline"
          className="flex-1 rounded-xl h-10"
          onClick={() => onHire?.(freelancer)}
        >
          Hire
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-xl size-10 shrink-0",
            isSaved && "border-primary/30 bg-primary/5 text-primary"
          )}
          onClick={() => onSave?.(freelancer.id)}
          aria-label={isSaved ? "Remove from saved" : "Save freelancer"}
          aria-pressed={isSaved}
        >
          <motion.div
            animate={isSaved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Bookmark
              className={cn("size-4", isSaved && "fill-current")}
              aria-hidden="true"
            />
          </motion.div>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-xl size-10 shrink-0",
            isInCompare && "border-primary/30 bg-primary/5 text-primary"
          )}
          onClick={() => onCompare?.(freelancer.id)}
          aria-label={isInCompare ? "Remove from comparison" : "Add to comparison"}
          aria-pressed={isInCompare}
        >
          <ArrowLeftRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </motion.article>
  );
}
