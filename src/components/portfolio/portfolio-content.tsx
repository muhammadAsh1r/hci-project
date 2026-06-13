"use client";

import { motion } from "framer-motion";
import { Eye, Heart, Mail, Plus, Bookmark } from "lucide-react";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AddPortfolioModal } from "@/components/portfolio/add-portfolio-modal";
import { CertificationsSection } from "@/components/portfolio/certifications-section";
import { ClientReviews } from "@/components/portfolio/client-reviews";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { SkillsManagement } from "@/components/portfolio/skills-management";
import { PrimaryButton } from "@/components/shared/primary-button";
import {
  certifications,
  clientReviews,
  portfolioItems,
  portfolioStats,
  skills,
} from "@/lib/dashboard-data";

const statItems = [
  { label: "Views", value: portfolioStats.views, icon: Eye },
  { label: "Likes", value: portfolioStats.likes, icon: Heart },
  { label: "Client Contacts", value: portfolioStats.clientContacts, icon: Mail },
  { label: "Saved by Clients", value: portfolioStats.savedByClients, icon: Bookmark },
];

export function PortfolioContent() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
      <DashboardHeader onAddPortfolio={() => setAddModalOpen(true)} />

      {/* Portfolio stats header */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Portfolio Management
            </h1>
            <p className="text-sm text-muted-foreground">
              {portfolioItems.length} projects showcased
            </p>
          </div>
          <PrimaryButton onClick={() => setAddModalOpen(true)}>
            <Plus className="size-4" aria-hidden="true" />
            Add Portfolio
          </PrimaryButton>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl border border-border bg-muted/30 p-4 text-center"
            >
              <stat.icon className="mx-auto mb-2 size-5 text-primary" aria-hidden="true" />
              <p className="text-2xl font-bold text-foreground">
                {stat.value.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Portfolio grid */}
      <section aria-labelledby="portfolio-grid-heading">
        <h2 id="portfolio-grid-heading" className="mb-6 text-xl font-semibold text-foreground">
          Your Portfolio
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>

      <SkillsManagement initialSkills={[...skills]} />

      <CertificationsSection certifications={[...certifications]} />

      <ClientReviews reviews={[...clientReviews]} />

      <AddPortfolioModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
      />
    </div>
  );
}
