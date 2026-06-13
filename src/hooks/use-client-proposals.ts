"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  CLIENT_PROPOSAL_BUDGET_FILTERS,
  SEED_CLIENT_PROPOSALS,
} from "@/lib/client-proposals-data";
import {
  CLIENT_PROPOSAL_COMPARE_KEY,
  CLIENT_PROPOSALS_STORAGE_KEY,
  DEFAULT_CLIENT_PROPOSAL_FILTERS,
  type ClientProposal,
  type ClientProposalFilters,
  type ClientProposalStatus,
} from "@/lib/types/client-proposal";
import type { ExperienceLevel } from "@/lib/types/project";

const EMPTY: ClientProposal[] = [];
const EMPTY_IDS: string[] = [];

const listeners = new Set<() => void>();
let proposalsCache: { raw: string; data: ClientProposal[] } | null = null;
let compareCache: { raw: string; data: string[] } | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (
      e.key === CLIENT_PROPOSALS_STORAGE_KEY ||
      e.key === CLIENT_PROPOSAL_COMPARE_KEY
    ) {
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function notify() {
  listeners.forEach((cb) => cb());
}

function readProposals(): ClientProposal[] {
  if (typeof window === "undefined") return SEED_CLIENT_PROPOSALS;
  try {
    const raw = localStorage.getItem(CLIENT_PROPOSALS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(
        CLIENT_PROPOSALS_STORAGE_KEY,
        JSON.stringify(SEED_CLIENT_PROPOSALS)
      );
      return SEED_CLIENT_PROPOSALS;
    }
    const parsed = JSON.parse(raw) as ClientProposal[];
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : SEED_CLIENT_PROPOSALS;
  } catch {
    return SEED_CLIENT_PROPOSALS;
  }
}

function getProposalsSnapshot(): ClientProposal[] {
  const raw = localStorage.getItem(CLIENT_PROPOSALS_STORAGE_KEY) ?? "";
  if (proposalsCache?.raw === raw) return proposalsCache.data;
  const data = readProposals();
  proposalsCache = { raw: JSON.stringify(data), data };
  return data;
}

function writeProposals(proposals: ClientProposal[]) {
  const raw = JSON.stringify(proposals);
  localStorage.setItem(CLIENT_PROPOSALS_STORAGE_KEY, raw);
  proposalsCache = { raw, data: proposals };
  notify();
}

function getCompareSnapshot(): string[] {
  if (typeof window === "undefined") return EMPTY_IDS;
  try {
    const raw = localStorage.getItem(CLIENT_PROPOSAL_COMPARE_KEY) ?? "[]";
    if (compareCache?.raw === raw) return compareCache.data;
    const parsed = JSON.parse(raw) as unknown;
    const data = Array.isArray(parsed) ? (parsed as string[]) : EMPTY_IDS;
    compareCache = { raw, data };
    return data;
  } catch {
    return EMPTY_IDS;
  }
}

function writeCompare(ids: string[]) {
  const raw = JSON.stringify(ids);
  localStorage.setItem(CLIENT_PROPOSAL_COMPARE_KEY, raw);
  compareCache = { raw, data: ids };
  notify();
}

export function getProposalStats(proposals: ClientProposal[]) {
  return {
    total: proposals.length,
    new: proposals.filter((p) => p.status === "new").length,
    shortlisted: proposals.filter((p) => p.status === "shortlisted").length,
    accepted: proposals.filter((p) => p.status === "accepted").length,
    rejected: proposals.filter((p) => p.status === "rejected").length,
    saved: proposals.filter((p) => p.status === "saved").length,
  };
}

export function filterProposals(
  proposals: ClientProposal[],
  filters: ClientProposalFilters
): ClientProposal[] {
  let result = [...proposals];

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.freelancerName.toLowerCase().includes(q) ||
        p.projectTitle.toLowerCase().includes(q) ||
        p.coverLetterPreview.toLowerCase().includes(q) ||
        p.freelancerTitle.toLowerCase().includes(q)
    );
  }

  if (filters.statuses.length > 0) {
    result = result.filter((p) => filters.statuses.includes(p.status));
  }

  if (filters.experienceLevels.length > 0) {
    result = result.filter((p) =>
      filters.experienceLevels.includes(p.experienceLevel)
    );
  }

  if (filters.minRating > 0) {
    result = result.filter((p) => p.rating >= filters.minRating);
  }

  if (filters.skills.length > 0) {
    result = result.filter((p) =>
      filters.skills.some((s) =>
        p.skillMatches.some((m) => m.skill.toLowerCase() === s.toLowerCase())
      )
    );
  }

  if (filters.budgetRanges.length > 0) {
    result = result.filter((p) =>
      filters.budgetRanges.some((range) => {
        const opt = CLIENT_PROPOSAL_BUDGET_FILTERS.find((o) => o.value === range);
        if (!opt) return false;
        return (
          p.expectedBudgetAmount >= opt.min && p.expectedBudgetAmount <= opt.max
        );
      })
    );
  }

  return result;
}

export function useClientProposals() {
  const proposals = useSyncExternalStore(
    subscribe,
    getProposalsSnapshot,
    () => SEED_CLIENT_PROPOSALS
  );
  const compareIds = useSyncExternalStore(
    subscribe,
    getCompareSnapshot,
    () => EMPTY_IDS
  );

  const getProposalById = useCallback(
    (id: string) => proposals.find((p) => p.id === id),
    [proposals]
  );

  const updateStatus = useCallback(
    (id: string, status: ClientProposalStatus) => {
      writeProposals(
        proposals.map((p) => (p.id === id ? { ...p, status } : p))
      );
    },
    [proposals]
  );

  const shortlist = useCallback(
    (id: string) => updateStatus(id, "shortlisted"),
    [updateStatus]
  );

  const accept = useCallback(
    (id: string) => updateStatus(id, "accepted"),
    [updateStatus]
  );

  const reject = useCallback(
    (id: string) => updateStatus(id, "rejected"),
    [updateStatus]
  );

  const saveForLater = useCallback(
    (id: string) => updateStatus(id, "saved"),
    [updateStatus]
  );

  const toggleCompare = useCallback(
    (proposalId: string) => {
      const current = getCompareSnapshot();
      const exists = current.includes(proposalId);
      const next = exists
        ? current.filter((id) => id !== proposalId)
        : current.length >= 3
          ? [...current.slice(1), proposalId]
          : [...current, proposalId];
      writeCompare(next);
    },
    []
  );

  const isInCompare = useCallback(
    (proposalId: string) => compareIds.includes(proposalId),
    [compareIds]
  );

  const clearCompare = useCallback(() => writeCompare([]), []);

  const getProposalsByIds = useCallback(
    (ids: string[]) => ids.map((id) => proposals.find((p) => p.id === id)).filter(Boolean) as ClientProposal[],
    [proposals]
  );

  return {
    proposals,
    compareIds,
    stats: getProposalStats(proposals),
    getProposalById,
    updateStatus,
    shortlist,
    accept,
    reject,
    saveForLater,
    toggleCompare,
    isInCompare,
    clearCompare,
    getProposalsByIds,
  };
}
