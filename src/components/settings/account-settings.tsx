"use client";

import { Badge } from "@/components/ui/badge";
import { accountData } from "@/lib/notifications-data";
import { SettingsSectionCard } from "@/components/settings/settings-section-card";

export function AccountSettingsSection() {
  const { stats } = accountData;

  return (
    <div className="space-y-6">
      <SettingsSectionCard
        title="Account Information"
        description="Your account details and membership status."
      >
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-muted/40 p-4">
            <dt className="text-xs text-muted-foreground">Email</dt>
            <dd className="mt-1 font-medium text-foreground">{accountData.email}</dd>
          </div>
          <div className="rounded-xl bg-muted/40 p-4">
            <dt className="text-xs text-muted-foreground">Username</dt>
            <dd className="mt-1 font-medium text-foreground">@{accountData.username}</dd>
          </div>
          <div className="rounded-xl bg-muted/40 p-4">
            <dt className="text-xs text-muted-foreground">Account Status</dt>
            <dd className="mt-1">
              <Badge className="rounded-lg bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300">
                {accountData.accountStatus}
              </Badge>
            </dd>
          </div>
          <div className="rounded-xl bg-muted/40 p-4">
            <dt className="text-xs text-muted-foreground">Membership</dt>
            <dd className="mt-1 font-medium text-primary">{accountData.membershipType}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">
          Member since {accountData.memberSince}
        </p>
      </SettingsSectionCard>

      <SettingsSectionCard title="Account Statistics">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Projects Completed", value: stats.projectsCompleted },
            { label: "Total Earnings", value: stats.totalEarnings },
            { label: "Client Rating", value: stats.clientRating },
            { label: "Response Rate", value: stats.responseRate },
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
