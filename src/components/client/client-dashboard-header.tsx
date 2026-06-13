"use client";

import { FileText, PlusCircle, Users } from "lucide-react";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";

export function ClientDashboardHeader() {
  const { user } = useAuth();

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-xl font-bold text-primary-foreground">
              {user?.avatar ?? "CL"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {user?.name ?? "Client"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {user?.title ?? "Project Owner"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <PrimaryButton href="/client/post-project" size="default">
            <PlusCircle className="size-4" aria-hidden="true" />
            Post Project
          </PrimaryButton>
          <SecondaryButton href="/client/proposals">
            <FileText className="size-4" aria-hidden="true" />
            View Proposals
          </SecondaryButton>
          <SecondaryButton href="/client/hire">
            <Users className="size-4" aria-hidden="true" />
            Hire Freelancer
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
