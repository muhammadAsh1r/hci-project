import { ProposalWorkspace } from "@/components/proposals/proposal-workspace";
import { marketplaceProjects } from "@/lib/projects-data";

export const metadata = {
  title: "AI Proposals Demo — FreelanceAI",
  description:
    "AI proposal generator demo with templates, scoring, and smart suggestions.",
};

export default function DemoAiProposalsPage() {
  return <ProposalWorkspace project={marketplaceProjects[0]} />;
}
