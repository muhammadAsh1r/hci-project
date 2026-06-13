"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { StarRating } from "@/components/freelancers/star-rating";
import { TrustBadges } from "@/components/freelancers/trust-badges";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingOverlay } from "@/components/shared/loading-spinner";
import { PageHeader } from "@/components/shared/page-header";
import { PageShell } from "@/components/shared/page-shell";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useSavedFreelancers } from "@/hooks/use-saved-freelancers";
import { getFreelancersByIds } from "@/lib/freelancers-data";
import Link from "next/link";

export function CompareContent() {
  const { compareIds, toggleCompare, clearCompare, hydrated } =
    useSavedFreelancers();
  const [clearOpen, setClearOpen] = useState(false);

  const freelancers = getFreelancersByIds(compareIds);

  if (!hydrated) {
    return (
      <PageShell>
        <LoadingOverlay label="Loading comparison" />
      </PageShell>
    );
  }

  if (freelancers.length === 0) {
    return (
      <PageShell>
        <PageHeader
          title="Compare Freelancers"
          description="Add up to 3 freelancers to compare side-by-side."
          breadcrumbs={[
            { label: "Freelancers", href: "/freelancers" },
            { label: "Compare" },
          ]}
        />
        <EmptyState
          title="No freelancers to compare"
          description="Browse freelancers and add up to 3 profiles to compare skills, rates, and ratings."
          actionLabel="Browse Freelancers"
          actionHref="/freelancers"
        />
      </PageShell>
    );
  }

  const rows = [
    { label: "Role", get: (f: (typeof freelancers)[0]) => f.role },
    { label: "Experience", get: (f: (typeof freelancers)[0]) => f.experienceLevel },
    { label: "Hourly Rate", get: (f: (typeof freelancers)[0]) => `$${f.hourlyRate}/hr` },
    { label: "Rating", get: (f: (typeof freelancers)[0]) => f.rating },
    { label: "Projects Completed", get: (f: (typeof freelancers)[0]) => f.projectsCompleted },
    { label: "Success Rate", get: (f: (typeof freelancers)[0]) => `${f.jobSuccessScore}%` },
    { label: "Location", get: (f: (typeof freelancers)[0]) => f.location },
    { label: "Response Time", get: (f: (typeof freelancers)[0]) => f.responseTime },
  ];

  return (
    <PageShell>
        <PageHeader
          title="Compare Freelancers"
          description={`Side-by-side comparison of ${freelancers.length} profile${freelancers.length !== 1 ? "s" : ""}`}
          breadcrumbs={[
            { label: "Freelancers", href: "/freelancers" },
            { label: "Compare" },
          ]}
          actions={
            <SecondaryButton className="rounded-xl" onClick={() => setClearOpen(true)}>
              Clear All
            </SecondaryButton>
          }
        />

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-left font-semibold text-foreground">
                  Attribute
                </th>
                {freelancers.map((f) => (
                  <th key={f.id} className="p-4 text-left">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-xs font-semibold text-primary-foreground">
                            {f.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Link
                            href={`/freelancers/${f.id}`}
                            className="font-semibold text-foreground hover:text-primary"
                          >
                            {f.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">{f.title}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleCompare(f.id)}
                        className="rounded-md p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Remove ${f.name} from comparison`}
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium text-muted-foreground">
                    {row.label}
                  </td>
                  {freelancers.map((f) => (
                    <td key={f.id} className="p-4 text-foreground">
                      {row.label === "Rating" ? (
                        <StarRating rating={f.rating} size="sm" />
                      ) : (
                        row.get(f)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-border">
                <td className="p-4 font-medium text-muted-foreground">Skills</td>
                {freelancers.map((f) => (
                  <td key={f.id} className="p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {f.skills.map((s) => (
                        <Badge
                          key={s.name}
                          variant="secondary"
                          className="rounded-lg text-xs font-normal"
                        >
                          {s.name}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-muted-foreground">Badges</td>
                {freelancers.map((f) => (
                  <td key={f.id} className="p-4">
                    <TrustBadges badges={f.trustBadges} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      <ConfirmDialog
        open={clearOpen}
        onOpenChange={setClearOpen}
        title="Clear comparison?"
        description="All freelancers will be removed from the comparison list."
        confirmLabel="Clear All"
        variant="destructive"
        onConfirm={() => {
          clearCompare();
          setClearOpen(false);
        }}
      />
    </PageShell>
  );
}
