"use client";

import {
  clientDashboardStats,
  clientRecentActivity,
  clientRecentProjects,
  clientRecommendedFreelancers,
  clientUpcomingDeadlines,
} from "@/lib/client-dashboard-data";
import {
  HiringActivityChart,
  MonthlySpendingChart,
  ProjectsCreatedChart,
} from "@/components/client/client-analytics-charts";
import { ClientDashboardHeader } from "@/components/client/client-dashboard-header";
import { ClientRecentActivity } from "@/components/client/client-recent-activity";
import { ClientRecentProjects } from "@/components/client/client-recent-projects";
import { ClientRecommendedFreelancers } from "@/components/client/client-recommended-freelancers";
import { ClientStatCard } from "@/components/client/client-stat-card";
import { ClientUpcomingDeadlines } from "@/components/client/client-upcoming-deadlines";

export function ClientDashboardContent() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <ClientDashboardHeader />

      <section aria-labelledby="client-stats-heading">
        <h2 id="client-stats-heading" className="sr-only">
          Overview statistics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {clientDashboardStats.map((stat, index) => (
            <ClientStatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </section>

      <section aria-labelledby="client-analytics-heading">
        <h2
          id="client-analytics-heading"
          className="mb-6 text-xl font-semibold text-foreground"
        >
          Analytics
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <MonthlySpendingChart />
          <ProjectsCreatedChart />
        </div>
        <div className="mt-6">
          <HiringActivityChart />
        </div>
      </section>

      <ClientRecentProjects projects={clientRecentProjects} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ClientRecentActivity activities={clientRecentActivity} />
        </div>
        <ClientUpcomingDeadlines deadlines={clientUpcomingDeadlines} />
      </div>

      <ClientRecommendedFreelancers freelancers={clientRecommendedFreelancers} />
    </div>
  );
}
