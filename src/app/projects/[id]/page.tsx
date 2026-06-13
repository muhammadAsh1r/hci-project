import { notFound } from "next/navigation";
import { ProjectDetailsContent } from "@/components/projects/project-details-content";
import { getProjectById, marketplaceProjects } from "@/lib/projects-data";

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return marketplaceProjects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectDetailsPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: "Project Not Found — FreelanceAI" };
  }

  return {
    title: `${project.title} — FreelanceAI`,
    description: project.description,
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsContent project={project} />;
}
