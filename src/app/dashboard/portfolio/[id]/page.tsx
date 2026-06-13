import { notFound } from "next/navigation";
import { PortfolioDetailsContent } from "@/components/portfolio/portfolio-details-content";
import { getPortfolioItemById, portfolioItems } from "@/lib/dashboard-data";

interface PortfolioDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return portfolioItems.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: PortfolioDetailsPageProps) {
  const { id } = await params;
  const item = getPortfolioItemById(id);
  if (!item) return { title: "Portfolio Item Not Found — FreelanceAI" };
  return {
    title: `${item.title} — Portfolio — FreelanceAI`,
    description: item.description,
  };
}

export default async function PortfolioDetailsPage({
  params,
}: PortfolioDetailsPageProps) {
  const { id } = await params;
  const item = getPortfolioItemById(id);
  if (!item) notFound();
  return <PortfolioDetailsContent item={item} />;
}
