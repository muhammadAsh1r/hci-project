import Link from "next/link";
import { EmptyState } from "@/components/shared/empty-state";

export default function ClientContractNotFound() {
  return (
    <div className="p-8">
      <EmptyState
        title="Contract not found"
        description="The contract you're looking for doesn't exist or has been removed."
        actionLabel="View Contracts"
        actionHref="/client/contracts"
      />
      <p className="mt-4 text-center">
        <Link href="/client/dashboard" className="text-sm text-primary hover:underline">
          Return to dashboard
        </Link>
      </p>
    </div>
  );
}
