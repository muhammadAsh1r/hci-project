"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  Calendar,
  DollarSign,
  Globe,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { StarRating } from "@/components/freelancers/star-rating";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SEED_CLIENT_REVIEWS } from "@/lib/client-profile-data";
import { formatClientCurrency } from "@/lib/client-contracts-data";
import { useClientProfile } from "@/hooks/use-client-profile";

export function ClientProfileContent() {
  const { profile } = useClientProfile();

  const stats = [
    { label: "Projects Posted", value: profile.projectsPosted, icon: Building2 },
    { label: "Freelancers Hired", value: profile.freelancersHired, icon: Users },
    { label: "Average Rating", value: profile.averageRating.toFixed(1), icon: Star },
    { label: "Payments Released", value: profile.paymentsReleased, icon: DollarSign },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Avatar className="size-24">
            <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-3xl font-bold text-primary-foreground">
              {profile.logo}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                {profile.companyName}
              </h1>
              {profile.verified ? (
                <Badge className="gap-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/10">
                  <BadgeCheck className="size-3.5" />
                  Verified
                </Badge>
              ) : null}
            </div>

            <p className="mt-1 text-lg text-muted-foreground">{profile.industry}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" />
                Member since {profile.memberSince}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="size-4" />
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {profile.website.replace("https://", "")}
                </a>
              </span>
            </div>

            <div className="mt-4">
              <StarRating rating={profile.averageRating} />
            </div>
          </div>

          <SecondaryButton href="/client/settings?section=profile" className="rounded-xl">
            Edit Profile
          </SecondaryButton>
        </div>
      </motion.div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Company Overview</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{profile.description}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-muted/40 p-4">
            <p className="text-xs text-muted-foreground">Business Type</p>
            <p className="mt-1 font-medium text-foreground">{profile.businessType}</p>
          </div>
          <div className="rounded-xl bg-muted/40 p-4">
            <p className="text-xs text-muted-foreground">Total Spent</p>
            <p className="mt-1 font-bold text-primary">{formatClientCurrency(profile.totalSpent)}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="reputation-heading">
        <h2 id="reputation-heading" className="mb-4 text-xl font-semibold text-foreground">
          Client Reputation
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <p className="mt-3 text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="mb-4 text-xl font-semibold text-foreground">
          Reviews from Freelancers
        </h2>
        <div className="space-y-4">
          {SEED_CLIENT_REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <Avatar className="size-10">
                  <AvatarFallback className="text-xs">{review.freelancerAvatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-foreground">{review.freelancerName}</p>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.review}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>{review.projectName}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
