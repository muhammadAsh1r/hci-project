"use client";

import { Loader2 } from "lucide-react";
import { AuthPageLayout } from "@/components/auth/auth-page-layout";

interface AuthRedirectStateProps {
  title: string;
  description: string;
  message?: string;
}

export function AuthRedirectState({
  title,
  description,
  message = "Redirecting you now...",
}: AuthRedirectStateProps) {
  return (
    <AuthPageLayout title={title} description={description}>
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
        <p className="text-sm font-medium text-foreground">{message}</p>
        <p className="text-xs text-muted-foreground">This should only take a moment.</p>
      </div>
    </AuthPageLayout>
  );
}
