import { ContractDetailsPageClient } from "@/components/client/contracts/contract-details-page-client";

export const metadata = {
  title: "Contract Details — FreelanceAI",
};

interface ClientContractDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientContractDetailsPage({
  params,
}: ClientContractDetailsPageProps) {
  const { id } = await params;
  return <ContractDetailsPageClient id={id} />;
}
