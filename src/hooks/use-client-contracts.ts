"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  SEED_CLIENT_CONTRACTS,
  SEED_CLIENT_TRANSACTIONS,
} from "@/lib/client-contracts-data";
import {
  CLIENT_CONTRACTS_STORAGE_KEY,
  CLIENT_TRANSACTIONS_STORAGE_KEY,
  type ClientContract,
  type ClientContractMilestone,
  type ClientContractStats,
  type ClientEscrowStats,
  type ClientTransaction,
  type ClientTransactionFilters,
} from "@/lib/types/client-contract";
import {
  getClientContractStats,
  getClientEscrowStats,
} from "@/lib/client-contracts-data";

const EMPTY_CONTRACTS: ClientContract[] = [];
const EMPTY_TRANSACTIONS: ClientTransaction[] = [];

const listeners = new Set<() => void>();
let contractsCache: { raw: string; data: ClientContract[] } | null = null;
let transactionsCache: { raw: string; data: ClientTransaction[] } | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (
      e.key === CLIENT_CONTRACTS_STORAGE_KEY ||
      e.key === CLIENT_TRANSACTIONS_STORAGE_KEY
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

function readContracts(): ClientContract[] {
  if (typeof window === "undefined") return SEED_CLIENT_CONTRACTS;
  try {
    const raw = localStorage.getItem(CLIENT_CONTRACTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(
        CLIENT_CONTRACTS_STORAGE_KEY,
        JSON.stringify(SEED_CLIENT_CONTRACTS)
      );
      return SEED_CLIENT_CONTRACTS;
    }
    const parsed = JSON.parse(raw) as ClientContract[];
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : SEED_CLIENT_CONTRACTS;
  } catch {
    return SEED_CLIENT_CONTRACTS;
  }
}

function getContractsSnapshot(): ClientContract[] {
  const raw = localStorage.getItem(CLIENT_CONTRACTS_STORAGE_KEY) ?? "";
  if (contractsCache?.raw === raw) return contractsCache.data;
  const data = readContracts();
  contractsCache = { raw: JSON.stringify(data), data };
  return data;
}

function writeContracts(contracts: ClientContract[]) {
  const raw = JSON.stringify(contracts);
  localStorage.setItem(CLIENT_CONTRACTS_STORAGE_KEY, raw);
  contractsCache = { raw, data: contracts };
  notify();
}

function readTransactions(): ClientTransaction[] {
  if (typeof window === "undefined") return SEED_CLIENT_TRANSACTIONS;
  try {
    const raw = localStorage.getItem(CLIENT_TRANSACTIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(
        CLIENT_TRANSACTIONS_STORAGE_KEY,
        JSON.stringify(SEED_CLIENT_TRANSACTIONS)
      );
      return SEED_CLIENT_TRANSACTIONS;
    }
    const parsed = JSON.parse(raw) as ClientTransaction[];
    return Array.isArray(parsed) ? parsed : SEED_CLIENT_TRANSACTIONS;
  } catch {
    return SEED_CLIENT_TRANSACTIONS;
  }
}

function getTransactionsSnapshot(): ClientTransaction[] {
  const raw = localStorage.getItem(CLIENT_TRANSACTIONS_STORAGE_KEY) ?? "";
  if (transactionsCache?.raw === raw) return transactionsCache.data;
  const data = readTransactions();
  transactionsCache = { raw: JSON.stringify(data), data };
  return data;
}

function writeTransactions(transactions: ClientTransaction[]) {
  const raw = JSON.stringify(transactions);
  localStorage.setItem(CLIENT_TRANSACTIONS_STORAGE_KEY, raw);
  transactionsCache = { raw, data: transactions };
  notify();
}

function updateMilestone(
  contracts: ClientContract[],
  contractId: string,
  milestoneId: string,
  updates: Partial<ClientContractMilestone>
): ClientContract[] {
  return contracts.map((c) => {
    if (c.id !== contractId) return c;
    return {
      ...c,
      milestones: c.milestones.map((m) =>
        m.id === milestoneId ? { ...m, ...updates } : m
      ),
    };
  });
}

export function filterTransactions(
  transactions: ClientTransaction[],
  filters: ClientTransactionFilters
): ClientTransaction[] {
  let result = [...transactions];

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.project.toLowerCase().includes(q) ||
        t.freelancer.toLowerCase().includes(q)
    );
  }

  if (filters.project !== "all") {
    result = result.filter((t) => t.project === filters.project);
  }

  if (filters.status !== "all") {
    result = result.filter((t) => t.status === filters.status);
  }

  if (filters.amountRange !== "all") {
    const ranges: Record<string, [number, number]> = {
      "under-1k": [0, 1000],
      "1k-3k": [1000, 3000],
      "3k-5k": [3000, 5000],
      "5k-plus": [5000, Infinity],
    };
    const range = ranges[filters.amountRange];
    if (range) {
      result = result.filter(
        (t) => t.amount >= range[0] && t.amount <= range[1]
      );
    }
  }

  return result;
}

export function useClientContracts() {
  const contracts = useSyncExternalStore(
    subscribe,
    getContractsSnapshot,
    () => SEED_CLIENT_CONTRACTS
  );
  const transactions = useSyncExternalStore(
    subscribe,
    getTransactionsSnapshot,
    () => SEED_CLIENT_TRANSACTIONS
  );

  const getContractById = useCallback(
    (id: string) => contracts.find((c) => c.id === id),
    [contracts]
  );

  const getMilestone = useCallback(
    (contractId: string, milestoneId: string) => {
      const contract = contracts.find((c) => c.id === contractId);
      return contract?.milestones.find((m) => m.id === milestoneId);
    },
    [contracts]
  );

  const approveMilestone = useCallback(
    (contractId: string, milestoneId: string) => {
      let updated = updateMilestone(contracts, contractId, milestoneId, {
        status: "Approved",
      });
      updated = updated.map((c) =>
        c.id === contractId
          ? { ...c, status: "Awaiting Review" as const, currentTimelineStep: "review-phase" as const }
          : c
      );
      writeContracts(updated);
    },
    [contracts]
  );

  const requestRevisions = useCallback(
    (contractId: string, milestoneId: string) => {
      const updated = updateMilestone(contracts, contractId, milestoneId, {
        status: "In Progress",
        progress: 75,
      });
      writeContracts(updated);
    },
    [contracts]
  );

  const rejectSubmission = useCallback(
    (contractId: string, milestoneId: string) => {
      const updated = updateMilestone(contracts, contractId, milestoneId, {
        status: "In Progress",
        progress: 50,
        submission: undefined,
      });
      writeContracts(updated);
    },
    [contracts]
  );

  const releasePayment = useCallback(
    (contractId: string, milestoneId: string) => {
      const contract = contracts.find((c) => c.id === contractId);
      const milestone = contract?.milestones.find((m) => m.id === milestoneId);
      if (!contract || !milestone) return;

      let updated = updateMilestone(contracts, contractId, milestoneId, {
        status: "Paid",
        progress: 100,
      });

      const allPaid = updated
        .find((c) => c.id === contractId)!
        .milestones.every((m) => m.status === "Paid");

      updated = updated.map((c) => {
        if (c.id !== contractId) return c;
        return {
          ...c,
          escrowBalance: Math.max(0, c.escrowBalance - milestone.amount),
          status: allPaid ? ("Completed" as const) : ("In Progress" as const),
          currentTimelineStep: allPaid
            ? ("project-completed" as const)
            : ("payment-released" as const),
        };
      });

      writeContracts(updated);

      const newTxn: ClientTransaction = {
        id: `TXN-${Date.now()}`,
        project: contract.projectName,
        freelancer: contract.freelancerName,
        contractId,
        amount: milestone.amount,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: "Released",
        method: "Escrow Release",
        receiptId: `cr-${Date.now()}`,
      };

      const pendingIdx = transactions.findIndex(
        (t) => t.contractId === contractId && t.status === "Pending"
      );
      const newTxns =
        pendingIdx >= 0
          ? transactions.map((t, i) =>
              i === pendingIdx ? { ...t, status: "Released" as const } : t
            )
          : [...transactions, newTxn];

      writeTransactions(newTxns);
    },
    [contracts, transactions]
  );

  const contractStats: ClientContractStats = getClientContractStats(contracts);
  const escrowStats: ClientEscrowStats = getClientEscrowStats(contracts);

  return {
    contracts,
    transactions,
    contractStats,
    escrowStats,
    getContractById,
    getMilestone,
    approveMilestone,
    requestRevisions,
    rejectSubmission,
    releasePayment,
  };
}
