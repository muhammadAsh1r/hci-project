import { notFound } from "next/navigation";
import { ProfileContent } from "@/components/freelancers/profile-content";
import { getFreelancerById } from "@/lib/freelancers-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const freelancer = getFreelancerById(id);
  if (!freelancer) return { title: "Freelancer Not Found" };
  return {
    title: `${freelancer.name} — FreelanceAI`,
    description: freelancer.bio,
  };
}

export default async function FreelancerProfilePage({ params }: PageProps) {
  const { id } = await params;
  const freelancer = getFreelancerById(id);
  if (!freelancer) notFound();

  return <ProfileContent freelancer={freelancer} />;
}
