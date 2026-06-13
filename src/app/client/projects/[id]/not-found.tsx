import Link from "next/link";
import { EmptyState } from "@/components/shared/empty-state";

export default function ClientProjectNotFound() {
  return (
    <div className="p-8">
      <EmptyState
        title="Project not found"
        description="The project you're looking for doesn't exist or has been removed."
        actionLabel="Manage Projects"
        actionHref="/client/projects"
      />
      <p className="mt-4 text-center">
        <Link href="/client/dashboard" className="text-sm text-primary hover:underline">
          Return to dashboard
        </Link>
      </p>
    </div>
  );
}
