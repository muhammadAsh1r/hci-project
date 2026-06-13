import { ReceiptPageClient } from "@/components/client/escrow/receipt-page-client";

export const metadata = {
  title: "Payment Receipt — FreelanceAI",
};

interface ClientReceiptPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientReceiptPage({ params }: ClientReceiptPageProps) {
  const { id } = await params;
  return <ReceiptPageClient id={id} />;
}
