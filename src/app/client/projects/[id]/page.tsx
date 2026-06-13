import { ClientProjectDetailsPageClient } from "@/components/client/projects/client-project-details-page-client";

export const metadata = {
  title: "Project Details — FreelanceAI",
};

interface ClientProjectDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientProjectDetailsPage({
  params,
}: ClientProjectDetailsPageProps) {
  const { id } = await params;
  return <ClientProjectDetailsPageClient id={id} />;
}
