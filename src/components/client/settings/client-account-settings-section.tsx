"use client";

import { Badge } from "@/components/ui/badge";
import { SettingsSectionCard } from "@/components/settings/settings-section-card";
import { DEMO_CREDENTIALS } from "@/lib/auth-data";
import { SEED_CLIENT_PROFILE } from "@/lib/client-profile-data";

const clientAccountData = {
  email: DEMO_CREDENTIALS.client.email,
  username: "riveradigital",
  accountStatus: "Active",
  membershipType: "Business Client",
  memberSince: SEED_CLIENT_PROFILE.memberSince,
  stats: {
    projectsPosted: SEED_CLIENT_PROFILE.projectsPosted,
    freelancersHired: SEED_CLIENT_PROFILE.freelancersHired,
    totalSpent: `$${SEED_CLIENT_PROFILE.totalSpent.toLocaleString()}`,
    averageRating: SEED_CLIENT_PROFILE.averageRating,
  },
};

export function ClientAccountSettingsSection() {
  const { stats } = clientAccountData;

  return (
    <div className="space-y-6">
      <SettingsSectionCard
        title="Account Information"
        description="Your company account details and membership status."
      >
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-muted/40 p-4">
            <dt className="text-xs text-muted-foreground">Email</dt>
            <dd className="mt-1 font-medium text-foreground">{clientAccountData.email}</dd>
          </div>
          <div className="rounded-xl bg-muted/40 p-4">
            <dt className="text-xs text-muted-foreground">Company</dt>
            <dd className="mt-1 font-medium text-foreground">{SEED_CLIENT_PROFILE.companyName}</dd>
          </div>
          <div className="rounded-xl bg-muted/40 p-4">
            <dt className="text-xs text-muted-foreground">Account Status</dt>
            <dd className="mt-1">
              <Badge className="rounded-lg bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300">
                {clientAccountData.accountStatus}
              </Badge>
            </dd>
          </div>
          <div className="rounded-xl bg-muted/40 p-4">
            <dt className="text-xs text-muted-foreground">Membership</dt>
            <dd className="mt-1 font-medium text-primary">{clientAccountData.membershipType}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">
          Member since {clientAccountData.memberSince}
        </p>
      </SettingsSectionCard>

      <SettingsSectionCard title="Account Statistics">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Projects Posted", value: stats.projectsPosted },
            { label: "Freelancers Hired", value: stats.freelancersHired },
            { label: "Total Spent", value: stats.totalSpent },
            { label: "Average Rating", value: stats.averageRating },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-muted/30 p-4 text-center"
            >
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </SettingsSectionCard>
    </div>
  );
}
