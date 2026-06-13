"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  formDataToProject,
  projectToFormData,
  SEED_CLIENT_PROJECTS,
} from "@/lib/client-projects-data";
import {
  CLIENT_PROJECT_DRAFT_KEY,
  CLIENT_PROJECTS_STORAGE_KEY,
  DEFAULT_CLIENT_PROJECT_FILTERS,
  DEFAULT_CLIENT_PROJECT_FORM,
  type ClientManagedProject,
  type ClientProjectFilters,
  type ClientProjectFormData,
  type ClientProjectTab,
} from "@/lib/types/client-project";
import type { ProjectCategory } from "@/lib/types/project";
import { CLIENT_BUDGET_FILTER_OPTIONS } from "@/lib/client-projects-data";

const EMPTY_PROJECTS: ClientManagedProject[] = [];

const storeListeners = new Set<() => void>();
let projectsCache: { raw: string; data: ClientManagedProject[] } | null = null;

function subscribe(callback: () => void) {
  storeListeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CLIENT_PROJECTS_STORAGE_KEY || e.key === CLIENT_PROJECT_DRAFT_KEY) {
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    storeListeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function notify() {
  storeListeners.forEach((cb) => cb());
}

function readProjects(): ClientManagedProject[] {
  if (typeof window === "undefined") return SEED_CLIENT_PROJECTS;

  try {
    const raw = localStorage.getItem(CLIENT_PROJECTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(
        CLIENT_PROJECTS_STORAGE_KEY,
        JSON.stringify(SEED_CLIENT_PROJECTS)
      );
      return SEED_CLIENT_PROJECTS;
    }
    const parsed = JSON.parse(raw) as ClientManagedProject[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_CLIENT_PROJECTS;
  } catch {
    return SEED_CLIENT_PROJECTS;
  }
}

function getProjectsSnapshot(): ClientManagedProject[] {
  const raw = localStorage.getItem(CLIENT_PROJECTS_STORAGE_KEY) ?? "";
  if (projectsCache?.raw === raw) return projectsCache.data;

  const data = readProjects();
  projectsCache = { raw: JSON.stringify(data), data };
  return data;
}

function writeProjects(projects: ClientManagedProject[]) {
  const raw = JSON.stringify(projects);
  localStorage.setItem(CLIENT_PROJECTS_STORAGE_KEY, raw);
  projectsCache = { raw, data: projects };
  notify();
}

function useStoredProjects() {
  return useSyncExternalStore(
    subscribe,
    getProjectsSnapshot,
    () => SEED_CLIENT_PROJECTS
  );
}

export function readProjectDraft(): ClientProjectFormData {
  if (typeof window === "undefined") return DEFAULT_CLIENT_PROJECT_FORM;
  try {
    const raw = localStorage.getItem(CLIENT_PROJECT_DRAFT_KEY);
    if (!raw) return DEFAULT_CLIENT_PROJECT_FORM;
    return { ...DEFAULT_CLIENT_PROJECT_FORM, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CLIENT_PROJECT_FORM;
  }
}

export function saveProjectDraft(data: ClientProjectFormData) {
  localStorage.setItem(CLIENT_PROJECT_DRAFT_KEY, JSON.stringify(data));
  notify();
}

export function clearProjectDraft() {
  localStorage.removeItem(CLIENT_PROJECT_DRAFT_KEY);
  notify();
}

export function filterClientProjects(
  projects: ClientManagedProject[],
  tab: ClientProjectTab,
  filters: ClientProjectFilters
): ClientManagedProject[] {
  let result = projects.filter((p) => {
    if (tab === "active") return p.status === "active" || p.status === "paused";
    return p.status === tab;
  });

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q))
    );
  }

  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  if (filters.budgetRanges.length > 0) {
    result = result.filter((p) =>
      filters.budgetRanges.some((range) => {
        const opt = CLIENT_BUDGET_FILTER_OPTIONS.find((o) => o.value === range);
        if (!opt) return false;
        return p.budgetMax >= opt.min && p.budgetMin <= opt.max;
      })
    );
  }

  result = [...result].sort((a, b) => {
    if (filters.dateSort === "most-proposals") {
      return b.proposalCount - a.proposalCount;
    }
    const dateA = new Date(a.postedAt).getTime();
    const dateB = new Date(b.postedAt).getTime();
    return filters.dateSort === "newest" ? dateB - dateA : dateA - dateB;
  });

  return result;
}

export function getClientProjectStats(projects: ClientManagedProject[]) {
  return {
    active: projects.filter((p) => p.status === "active" || p.status === "paused").length,
    open: projects.filter((p) => p.status === "open").length,
    completed: projects.filter((p) => p.status === "completed").length,
    archived: projects.filter((p) => p.status === "archived").length,
    total: projects.length,
  };
}

export function useClientProjects() {
  const projects = useStoredProjects();

  const getProjectById = useCallback(
    (id: string) => projects.find((p) => p.id === id),
    [projects]
  );

  const publishProject = useCallback((data: ClientProjectFormData, editId?: string) => {
    const existing = editId ? projects.find((p) => p.id === editId) : undefined;
    const project = formDataToProject(data, existing);
    if (existing) {
      writeProjects(projects.map((p) => (p.id === editId ? { ...project, status: existing.status } : p)));
    } else {
      writeProjects([project, ...projects]);
    }
    clearProjectDraft();
    return project;
  }, [projects]);

  const saveDraftOnly = useCallback((data: ClientProjectFormData) => {
    saveProjectDraft(data);
  }, []);

  const updateProjectStatus = useCallback(
    (id: string, status: ClientManagedProject["status"]) => {
      writeProjects(projects.map((p) => (p.id === id ? { ...p, status } : p)));
    },
    [projects]
  );

  const deleteProject = useCallback(
    (id: string) => {
      writeProjects(projects.filter((p) => p.id !== id));
    },
    [projects]
  );

  const pauseProject = useCallback(
    (id: string) => updateProjectStatus(id, "paused"),
    [updateProjectStatus]
  );

  const reopenProject = useCallback(
    (id: string) => {
      const project = projects.find((p) => p.id === id);
      if (!project) return;
      const newStatus = project.proposalCount > 0 && project.progress > 0 ? "active" : "open";
      updateProjectStatus(id, newStatus);
    },
    [projects, updateProjectStatus]
  );

  const archiveProject = useCallback(
    (id: string) => updateProjectStatus(id, "archived"),
    [updateProjectStatus]
  );

  const getEditFormData = useCallback(
    (id: string): ClientProjectFormData | null => {
      const project = projects.find((p) => p.id === id);
      return project ? projectToFormData(project) : null;
    },
    [projects]
  );

  return {
    projects,
    getProjectById,
    publishProject,
    saveDraftOnly,
    updateProjectStatus,
    deleteProject,
    pauseProject,
    reopenProject,
    archiveProject,
    getEditFormData,
    stats: getClientProjectStats(projects),
  };
}
