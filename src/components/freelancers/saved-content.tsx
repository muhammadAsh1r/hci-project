"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bookmark, Sparkles } from "lucide-react";
import { AiRecommendations } from "@/components/freelancers/ai-recommendations";
import { AvailabilityBadge } from "@/components/freelancers/availability-badge";
import { StarRating } from "@/components/freelancers/star-rating";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingOverlay } from "@/components/shared/loading-spinner";
import { OutlineLink } from "@/components/shared/outline-link";
import { PageHeader } from "@/components/shared/page-header";
import { PageShell } from "@/components/shared/page-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSavedFreelancers } from "@/hooks/use-saved-freelancers";
import {
  freelancerProfiles,
  getFreelancersByIds,
  recommendedFreelancers,
} from "@/lib/freelancers-data";

function FreelancerMiniCard({
  id,
  index,
}: {
  id: string;
  index: number;
}) {
  const freelancer = freelancerProfiles.find((f) => f.id === id);
  const { toggleSave, isSaved } = useSavedFreelancers();

  if (!freelancer) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <Avatar className="size-12">
          <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-sm font-semibold text-primary-foreground">
            {freelancer.avatar}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <Link
            href={`/freelancers/${freelancer.id}`}
            className="font-semibold text-foreground hover:text-primary"
          >
            {freelancer.name}
          </Link>
          <p className="text-sm text-muted-foreground">{freelancer.role}</p>
          <div className="mt-2 flex items-center gap-3">
            <StarRating rating={freelancer.rating} size="sm" />
            <span className="text-sm font-bold text-primary">
              ${freelancer.hourlyRate}/hr
            </span>
          </div>
          <AvailabilityBadge
            status={freelancer.availability}
            lastActive={freelancer.lastActive}
            showPulse={false}
            className="mt-2"
          />
          <div className="mt-3 flex flex-wrap gap-1.5">
            {freelancer.skills.slice(0, 3).map((s) => (
              <Badge
                key={s.name}
                variant="secondary"
                className="rounded-lg text-xs font-normal"
              >
                {s.name}
              </Badge>
            ))}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0 rounded-lg"
          onClick={() => toggleSave(freelancer.id)}
          aria-label={isSaved(freelancer.id) ? "Unsave" : "Save"}
        >
          <Bookmark
            className={isSaved(freelancer.id) ? "size-4 fill-primary text-primary" : "size-4"}
          />
        </Button>
      </div>
      <OutlineLink href={`/freelancers/${freelancer.id}`} className="mt-4 w-full">
        View Profile
      </OutlineLink>
    </motion.article>
  );
}

export function SavedContent() {
  const { savedIds, recentIds, hydrated } = useSavedFreelancers();
  const saved = getFreelancersByIds(savedIds);
  const recent = getFreelancersByIds(recentIds.filter((id) => !savedIds.includes(id)));
  const recommended = recommendedFreelancers
    .map((r) => freelancerProfiles.find((f) => f.id === r.freelancerId))
    .filter(Boolean)
    .filter((f) => !savedIds.includes(f!.id) && !recentIds.includes(f!.id));

  if (!hydrated) {
    return (
      <PageShell>
        <LoadingOverlay label="Loading saved freelancers" />
      </PageShell>
    );
  }

  return (
    <PageShell>
        <PageHeader
          title="Saved Freelancers"
          description="Your saved profiles, recently viewed, and AI recommendations."
          breadcrumbs={[
            { label: "Freelancers", href: "/freelancers" },
            { label: "Saved" },
          ]}
        />

        <section className="mt-2" aria-labelledby="saved-heading">
          <h2
            id="saved-heading"
            className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground"
          >
            <Bookmark className="size-5" aria-hidden="true" />
            Saved Profiles
            <span className="text-sm font-normal text-muted-foreground">
              ({saved.length})
            </span>
          </h2>
          {saved.length === 0 ? (
            <EmptyState
              title="No saved freelancers yet"
              description="Browse and save profiles to review later."
              actionLabel="Find Freelancers"
              actionHref="/freelancers"
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedIds.map((id, i) => (
                <FreelancerMiniCard key={id} id={id} index={i} />
              ))}
            </div>
          )}
        </section>

        {recent.length > 0 && (
          <section className="mt-12" aria-labelledby="recent-heading">
            <h2
              id="recent-heading"
              className="mb-4 text-xl font-semibold text-foreground"
            >
              Recently Viewed
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((f, i) => (
                <FreelancerMiniCard key={f.id} id={f.id} index={i} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-12" aria-labelledby="recommended-heading">
          <h2
            id="recommended-heading"
            className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground"
          >
            <Sparkles className="size-5 text-primary" aria-hidden="true" />
            Recommended Profiles
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2">
                {recommended.slice(0, 4).map((f, i) => (
                  <FreelancerMiniCard key={f!.id} id={f!.id} index={i} />
                ))}
              </div>
            </div>
            <AiRecommendations />
          </div>
        </section>
    </PageShell>
  );
}
