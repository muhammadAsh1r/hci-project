import { notFound } from "next/navigation";
import { ReceiptDetail } from "@/components/escrow/receipt-detail";
import { escrowReceipts, getReceiptById } from "@/lib/escrow-data";

interface ReceiptPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return escrowReceipts.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: ReceiptPageProps) {
  const { id } = await params;
  const receipt = getReceiptById(id);
  if (!receipt) return { title: "Receipt Not Found — FreelanceAI" };
  return { title: `${receipt.receiptNumber} — FreelanceAI` };
}

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const { id } = await params;
  const receipt = getReceiptById(id);
  if (!receipt) notFound();
  return <ReceiptDetail receipt={receipt} />;
}
