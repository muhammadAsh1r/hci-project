"use client";

import { motion } from "framer-motion";
import {
  Bookmark,
  Clock,
  MapPin,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { AvailabilityBadge } from "@/components/freelancers/availability-badge";
import { StarRating } from "@/components/freelancers/star-rating";
import { TrustBadges } from "@/components/freelancers/trust-badges";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { FreelancerProfile } from "@/lib/types/freelancer";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  freelancer: FreelancerProfile;
  isSaved?: boolean;
  onSave?: () => void;
  onHire?: () => void;
  onMessage?: () => void;
}

export function ProfileHeader({
  freelancer,
  isSaved = false,
  onSave,
  onHire,
  onMessage,
}: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Avatar className="size-20 shrink-0 sm:size-24">
          <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-2xl font-semibold text-primary-foreground">
            {freelancer.avatar}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                {freelancer.name}
              </h1>
              <p className="mt-1 text-lg text-muted-foreground">
                {freelancer.title}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" aria-hidden="true" />
                  {freelancer.location}
                </span>
                <AvailabilityBadge
                  status={freelancer.availability}
                  lastActive={freelancer.lastActive}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <PrimaryButton onClick={onHire} className="rounded-xl">
                Hire Now
              </PrimaryButton>
              <SecondaryButton onClick={onMessage} className="rounded-xl gap-2">
                <MessageSquare className="size-4" />
                Message
              </SecondaryButton>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-xl size-10",
                  isSaved && "border-primary/30 bg-primary/5 text-primary"
                )}
                onClick={onSave}
                aria-label={isSaved ? "Remove from saved" : "Save freelancer"}
                aria-pressed={isSaved}
              >
                <Bookmark
                  className={cn("size-4", isSaved && "fill-current")}
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Rating" value={<StarRating rating={freelancer.rating} />} />
            <Stat
              label="Job Success"
              value={
                <span className="inline-flex items-center gap-1 font-semibold">
                  <TrendingUp className="size-4 text-green-600" aria-hidden="true" />
                  {freelancer.jobSuccessScore}%
                </span>
              }
            />
            <Stat
              label="Response Time"
              value={
                <span className="inline-flex items-center gap-1 font-semibold">
                  <Clock className="size-4 text-primary" aria-hidden="true" />
                  {freelancer.responseTime}
                </span>
              }
            />
            <Stat
              label="Hourly Rate"
              value={
                <span className="font-bold text-primary">
                  ${freelancer.hourlyRate}
                  <span className="text-sm font-normal text-muted-foreground">/hr</span>
                </span>
              }
            />
          </div>

          <div className="mt-4">
            <TrustBadges badges={freelancer.trustBadges} size="md" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-muted/40 px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 text-sm text-foreground">{value}</div>
    </div>
  );
}
