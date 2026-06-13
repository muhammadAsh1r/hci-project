import { MilestoneReviewPageClient } from "@/components/client/contracts/milestone-review-page-client";

export const metadata = {
  title: "Milestone Review — FreelanceAI",
};

interface MilestoneReviewPageProps {
  params: Promise<{ id: string; milestoneId: string }>;
}

export default async function MilestoneReviewPage({
  params,
}: MilestoneReviewPageProps) {
  const { id, milestoneId } = await params;
  return (
    <MilestoneReviewPageClient contractId={id} milestoneId={milestoneId} />
  );
}
