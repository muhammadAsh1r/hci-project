import Link from "next/link";
import { EmptyState } from "@/components/shared/empty-state";

export default function ClientProposalNotFound() {
  return (
    <div className="p-8">
      <EmptyState
        title="Proposal not found"
        description="The proposal you're looking for doesn't exist or has been removed."
        actionLabel="Review Proposals"
        actionHref="/client/proposals"
      />
      <p className="mt-4 text-center">
        <Link href="/client/dashboard" className="text-sm text-primary hover:underline">
          Return to dashboard
        </Link>
      </p>
    </div>
  );
}
