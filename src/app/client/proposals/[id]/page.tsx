import { ProposalDetailsPageClient } from "@/components/client/proposals/proposal-details-page-client";

export const metadata = {
  title: "Proposal Details — FreelanceAI",
};

interface ClientProposalDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientProposalDetailsPage({
  params,
}: ClientProposalDetailsPageProps) {
  const { id } = await params;
  return <ProposalDetailsPageClient id={id} />;
}
