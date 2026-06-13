"use client";

import { useEffect, useState } from "react";
import { AiRecommendations } from "@/components/freelancers/ai-recommendations";
import { HireModal } from "@/components/freelancers/hire-modal";
import { MessagingPreview } from "@/components/freelancers/messaging-preview";
import { ProfileAbout } from "@/components/freelancers/profile-about";
import { ProfileCertifications } from "@/components/freelancers/profile-certifications";
import { ProfileHeader } from "@/components/freelancers/profile-header";
import { ProfilePortfolio } from "@/components/freelancers/profile-portfolio";
import { ProfileRatingBreakdown } from "@/components/freelancers/profile-rating-breakdown";
import { ProfileReviews } from "@/components/freelancers/profile-reviews";
import { ProfileSkills } from "@/components/freelancers/profile-skills";
import { ProfileWorkHistory } from "@/components/freelancers/profile-work-history";
import { OutlineLink } from "@/components/shared/outline-link";
import { PageHeader } from "@/components/shared/page-header";
import { PageShell } from "@/components/shared/page-shell";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSavedFreelancers } from "@/hooks/use-saved-freelancers";
import type { FreelancerProfile } from "@/lib/types/freelancer";

interface ProfileContentProps {
  freelancer: FreelancerProfile;
}

export function ProfileContent({ freelancer }: ProfileContentProps) {
  const { toggleSave, isSaved, addRecent, toggleCompare, isInCompare } =
    useSavedFreelancers();
  const [hireOpen, setHireOpen] = useState(false);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    addRecent(freelancer.id);
  }, [freelancer.id, addRecent]);

  return (
    <PageShell>
        <PageHeader
          title={freelancer.name}
          description={freelancer.title}
          breadcrumbs={[
            { label: "Freelancers", href: "/freelancers" },
            { label: freelancer.name },
          ]}
        />

        <ProfileHeader
          freelancer={freelancer}
          isSaved={isSaved(freelancer.id)}
          onSave={() => {
            const wasSaved = isSaved(freelancer.id);
            toggleSave(freelancer.id);
            showToast(wasSaved ? "Removed from saved" : "Freelancer saved!");
          }}
          onHire={() => setHireOpen(true)}
          onMessage={() => showToast("Messaging opened (preview)")}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <ProfileAbout freelancer={freelancer} />
            <Separator />
            <ProfileSkills skills={freelancer.skills} />
            <Separator />
            <ProfilePortfolio items={freelancer.portfolio} />
            <Separator />
            <ProfileWorkHistory items={freelancer.workHistory} />
            <Separator />
            <ProfileCertifications certifications={freelancer.certifications} />
            <Separator />
            <ProfileReviews
              reviews={freelancer.reviews}
              averageRating={freelancer.rating}
              totalReviews={freelancer.totalReviews}
              distribution={freelancer.ratingDistribution}
            />
            <Separator />
            <ProfileRatingBreakdown breakdown={freelancer.ratingBreakdown} />
            <Separator />
            <MessagingPreview
              freelancerName={freelancer.name}
              freelancerAvatar={freelancer.avatar}
            />
          </div>

          <div className="space-y-6">
            <AiRecommendations currentId={freelancer.id} />

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Quick Actions</h3>
              <div className="mt-4 space-y-2">
                <Button
                  className="w-full rounded-xl"
                  onClick={() => setHireOpen(true)}
                >
                  Hire {freelancer.name.split(" ")[0]}
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => {
                    toggleCompare(freelancer.id);
                    showToast("Added to comparison");
                  }}
                >
                  {isInCompare(freelancer.id)
                    ? "In Comparison"
                    : "Add to Compare"}
                </Button>
                <OutlineLink href="/freelancers/compare" className="w-full">
                  View Comparison
                </OutlineLink>
              </div>
            </div>
          </div>
        </div>

      <HireModal
        freelancer={freelancer}
        open={hireOpen}
        onOpenChange={setHireOpen}
        onConfirm={() => showToast("Hiring invitation sent!")}
      />

      <ToastContainer />
    </PageShell>
  );
}
