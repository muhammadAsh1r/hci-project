"use client";

import { Briefcase, Plus, Search, Sparkles } from "lucide-react";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { availabilityLabels, freelancerProfile } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  onAddPortfolio?: () => void;
}

export function DashboardHeader({ onAddPortfolio }: DashboardHeaderProps) {
  const availability = availabilityLabels[freelancerProfile.availability];

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-xl font-bold text-primary-foreground">
              {freelancerProfile.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {freelancerProfile.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {freelancerProfile.title}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={cn("size-2 rounded-full", availability.color)}
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-foreground">
                {availability.label}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <PrimaryButton href="/projects" size="default">
            <Search className="size-4" aria-hidden="true" />
            Find Projects
          </PrimaryButton>
          {onAddPortfolio ? (
            <SecondaryButton onClick={onAddPortfolio}>
              <Plus className="size-4" aria-hidden="true" />
              Create Portfolio Item
            </SecondaryButton>
          ) : (
            <SecondaryButton href="/dashboard/portfolio">
              <Briefcase className="size-4" aria-hidden="true" />
              Create Portfolio Item
            </SecondaryButton>
          )}
          <SecondaryButton href="/dashboard/proposals">
            <Sparkles className="size-4" aria-hidden="true" />
            Generate Proposal
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
