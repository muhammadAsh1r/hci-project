"use client";

import {
  activeProjects,
  dashboardStats,
  profileRecommendations,
  profileStrength,
  recentActivity,
  recommendedProjects,
} from "@/lib/dashboard-data";
import { ActiveProjectsTable } from "@/components/dashboard/active-projects-table";
import { AnalyticsStatCard } from "@/components/dashboard/analytics-stat-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  EarningsChart,
  ProjectRevenueChart,
  ProposalConversionChart,
} from "@/components/dashboard/earnings-charts";
import { ProfileStrengthWidget } from "@/components/dashboard/profile-strength-widget";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { RecommendedProjects } from "@/components/dashboard/recommended-projects";

export function DashboardContent() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
      <DashboardHeader />

      {/* Overview stats */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Overview statistics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {dashboardStats.map((stat, index) => (
            <AnalyticsStatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </section>

      {/* Earnings analytics */}
      <section aria-labelledby="earnings-heading">
        <h2
          id="earnings-heading"
          className="mb-6 text-xl font-semibold text-foreground"
        >
          Earnings Analytics
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <EarningsChart />
          <ProjectRevenueChart />
        </div>
        <div className="mt-6">
          <ProposalConversionChart />
        </div>
      </section>

      {/* Active projects + profile strength */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ActiveProjectsTable projects={activeProjects} />
        </div>
        <ProfileStrengthWidget
          strength={profileStrength}
          recommendations={profileRecommendations}
        />
      </div>

      {/* Recommended projects */}
      <RecommendedProjects projects={recommendedProjects} />

      {/* Recent activity */}
      <RecentActivity activities={recentActivity} />
    </div>
  );
}
