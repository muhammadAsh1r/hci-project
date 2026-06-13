"use client";

import { ArrowLeft, History, Receipt, Shield } from "lucide-react";
import Link from "next/link";
import { ContractsTable } from "@/components/escrow/contracts-table";
import { DisputePanel } from "@/components/escrow/dispute-panel";
import { EscrowAnalyticsCharts } from "@/components/escrow/escrow-analytics-charts";
import { EscrowNotificationsPanel } from "@/components/escrow/escrow-notifications-panel";
import { EscrowStatCard } from "@/components/escrow/escrow-stat-card";
import { EscrowTimeline } from "@/components/escrow/escrow-timeline";
import { TrustSecuritySection } from "@/components/escrow/trust-security-section";
import {
  escrowContracts,
  escrowDisputes,
  escrowNotifications,
  escrowOverviewStats,
  escrowSummary,
  formatCurrency,
} from "@/lib/escrow-data";

export function EscrowDashboardContent() {
  const activeContract = escrowContracts[0];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/dashboard" className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
              <ArrowLeft className="size-4" /> Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brand-accent text-primary-foreground">
                <Shield className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Escrow Payments</h1>
                <p className="text-sm text-muted-foreground">Secure payment management & milestone tracking</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/dashboard/escrow/transactions" className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <History className="size-4" /> Transactions
            </Link>
            <Link href="/dashboard/escrow/receipts" className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Receipt className="size-4" /> Receipts
            </Link>
          </div>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-5 sm:gap-4 sm:p-6">
          {[
            { label: "In Escrow", value: formatCurrency(escrowSummary.totalInEscrow) },
            { label: "Released", value: formatCurrency(escrowSummary.releasedPayments) },
            { label: "Pending", value: formatCurrency(escrowSummary.pendingPayments) },
            { label: "Completed", value: String(escrowSummary.completedTransactions) },
            { label: "Active Contracts", value: String(escrowSummary.activeContracts) },
          ].map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-lg font-bold text-foreground sm:text-xl">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Overview cards */}
        <section aria-labelledby="escrow-stats-heading">
          <h2 id="escrow-stats-heading" className="sr-only">Payment overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {escrowOverviewStats.map((stat, index) => (
              <EscrowStatCard key={stat.id} stat={stat} index={index} />
            ))}
          </div>
        </section>

        {/* Timeline + Notifications */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EscrowTimeline currentStep={activeContract.currentTimelineStep} />
          </div>
          <EscrowNotificationsPanel notifications={escrowNotifications} />
        </div>

        {/* Active contracts */}
        <ContractsTable contracts={escrowContracts} />

        {/* Analytics */}
        <section aria-labelledby="analytics-heading">
          <h2 id="analytics-heading" className="mb-6 text-xl font-semibold text-foreground">Payment Analytics</h2>
          <EscrowAnalyticsCharts />
        </section>

        {/* Trust & Disputes */}
        <TrustSecuritySection />
        <DisputePanel disputes={escrowDisputes} />
    </div>
  );
}
