import { ProposalWorkspace } from "@/components/proposals/proposal-workspace";
import { getProjectById, marketplaceProjects } from "@/lib/projects-data";

export const metadata = {
  title: "AI Proposal Generator — FreelanceAI",
  description:
    "Generate professional project proposals with AI assistance. Templates, scoring, and smart suggestions.",
};

interface ProposalsPageProps {
  searchParams: Promise<{ project?: string }>;
}

export default async function ProposalsPage({ searchParams }: ProposalsPageProps) {
  const { project: projectId } = await searchParams;
  const project = projectId
    ? getProjectById(projectId) ?? marketplaceProjects[0]
    : marketplaceProjects[0];

  return <ProposalWorkspace project={project} />;
}
