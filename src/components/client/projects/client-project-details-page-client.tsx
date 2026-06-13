"use client";

import { ClientProjectDetailsContent } from "@/components/client/projects/client-project-details-content";
import { EmptyState } from "@/components/shared/empty-state";
import { useClientProjects } from "@/hooks/use-client-projects";

interface ClientProjectDetailsPageClientProps {
  id: string;
}

export function ClientProjectDetailsPageClient({
  id,
}: ClientProjectDetailsPageClientProps) {
  const { getProjectById } = useClientProjects();
  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="p-8">
        <EmptyState
          title="Project not found"
          description="This project may have been deleted or the link is incorrect."
          actionLabel="Manage Projects"
          actionHref="/client/projects"
        />
      </div>
    );
  }

  return <ClientProjectDetailsContent project={project} />;
}
