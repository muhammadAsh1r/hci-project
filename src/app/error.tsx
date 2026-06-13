"use client";

import { useEffect } from "react";
import { PageShell } from "@/components/shared/page-shell";
import { ErrorState } from "@/components/shared/error-state";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell>
      <ErrorState
        variant="error"
        title="Something went wrong"
        description="An unexpected error occurred. Please try again or return to the homepage."
        actionLabel="Go Home"
        actionHref="/"
      />
      <div className="mt-6 flex justify-center gap-3">
        <PrimaryButton onClick={reset} className="rounded-xl">
          Try Again
        </PrimaryButton>
        <SecondaryButton href="/projects" className="rounded-xl">
          Browse Projects
        </SecondaryButton>
      </div>
    </PageShell>
  );
}
