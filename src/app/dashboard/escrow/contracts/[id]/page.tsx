import { notFound } from "next/navigation";
import { ContractDetailsContent } from "@/components/escrow/contract-details-content";
import { escrowContracts, getContractById } from "@/lib/escrow-data";

interface ContractPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return escrowContracts.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: ContractPageProps) {
  const { id } = await params;
  const contract = getContractById(id);
  if (!contract) return { title: "Contract Not Found — FreelanceAI" };
  return { title: `${contract.projectName} — Escrow — FreelanceAI` };
}

export default async function ContractPage({ params }: ContractPageProps) {
  const { id } = await params;
  const contract = getContractById(id);
  if (!contract) notFound();
  return <ContractDetailsContent contract={contract} />;
}
