"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FreelancerComparisonContent } from "@/components/client/proposals/freelancer-comparison-content";
import { LoadingOverlay } from "@/components/shared/loading-spinner";
import { useClientProposals } from "@/hooks/use-client-proposals";

function ComparePageInner() {
  const searchParams = useSearchParams();
  const { compareIds } = useClientProposals();

  const idsParam = searchParams.get("ids");
  const proposalIds = idsParam
    ? idsParam.split(",").filter(Boolean)
    : compareIds;

  return <FreelancerComparisonContent proposalIds={proposalIds} />;
}

export function ComparePageClient() {
  return (
    <Suspense fallback={<LoadingOverlay label="Loading comparison" />}>
      <ComparePageInner />
    </Suspense>
  );
}
