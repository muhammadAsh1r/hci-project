"use client";

import { FolderKanban, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { ClientProjectCard } from "@/components/client/projects/client-project-card";
import { ClientProjectFiltersBar } from "@/components/client/projects/client-project-filters-bar";
import { ClientProjectStatsBar } from "@/components/client/projects/client-project-stats-bar";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { PrimaryButton } from "@/components/shared/primary-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  filterClientProjects,
  useClientProjects,
} from "@/hooks/use-client-projects";
import { useToast } from "@/hooks/use-toast";
import {
  DEFAULT_CLIENT_PROJECT_FILTERS,
  type ClientProjectTab,
} from "@/lib/types/client-project";

const TABS: { value: ClientProjectTab; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "open", label: "Open" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

export function ManageProjectsContent() {
  const {
    projects,
    stats,
    pauseProject,
    reopenProject,
    archiveProject,
    deleteProject,
  } = useClientProjects();
  const { showToast, ToastContainer } = useToast();

  const [activeTab, setActiveTab] = useState<ClientProjectTab>("active");
  const [filters, setFilters] = useState(DEFAULT_CLIENT_PROJECT_FILTERS);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = filterClientProjects(projects, activeTab, filters);
  const hasAnyProjects = projects.length > 0;
  const hasTabProjects = projects.some((p) => {
    if (activeTab === "active") return p.status === "active" || p.status === "paused";
    return p.status === activeTab;
  });

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_CLIENT_PROJECT_FILTERS);
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await new Promise((r) => setTimeout(r, 400));
    deleteProject(deleteId);
    setIsDeleting(false);
    setDeleteId(null);
    showToast("Project deleted");
  };

  const renderGrid = () => {
    if (!hasAnyProjects) {
      return (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Post your first project to start receiving proposals from talented freelancers."
          actionLabel="Post Project"
          actionHref="/client/post-project"
        />
      );
    }

    if (!hasTabProjects) {
      return (
        <EmptyState
          icon={FolderKanban}
          title={`No ${activeTab} projects`}
          description={`You don't have any ${activeTab} projects right now.`}
          actionLabel="Post Project"
          actionHref="/client/post-project"
        />
      );
    }

    if (filtered.length === 0) {
      return (
        <EmptyState
          title="No search results"
          description="Try adjusting your filters or search terms to find projects."
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      );
    }

    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, index) => (
          <ClientProjectCard
            key={project.id}
            project={project}
            index={index}
            onPause={(id) => {
              pauseProject(id);
              showToast("Project paused");
            }}
            onReopen={(id) => {
              reopenProject(id);
              showToast("Project reopened");
            }}
            onArchive={(id) => {
              archiveProject(id);
              showToast("Project archived");
            }}
            onDelete={(id) => setDeleteId(id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 pb-24 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Manage Projects
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Track, filter, and manage all your posted projects.
          </p>
        </div>
        <PrimaryButton href="/client/post-project" className="rounded-xl">
          <Plus className="size-4" />
          Post Project
        </PrimaryButton>
      </div>

      <ClientProjectStatsBar stats={stats} />

      <ClientProjectFiltersBar
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
      />

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as ClientProjectTab)}
      >
        <TabsList className="h-10 w-full justify-start rounded-xl sm:w-auto">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="rounded-lg px-4">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {renderGrid()}
          </TabsContent>
        ))}
      </Tabs>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete this project?"
        description="This action cannot be undone. All project data and proposals will be permanently removed."
        confirmLabel="Delete Project"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
      />

      <ToastContainer />
    </div>
  );
}
