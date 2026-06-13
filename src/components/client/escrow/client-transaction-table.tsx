"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, Download, Search } from "lucide-react";
import Link from "next/link";
import { TransactionStatusBadge } from "@/components/client/contracts/contract-status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatClientCurrency } from "@/lib/client-contracts-data";
import type {
  ClientTransaction,
  ClientTransactionFilters,
} from "@/lib/types/client-contract";

interface ClientTransactionTableProps {
  transactions: ClientTransaction[];
  filters: ClientTransactionFilters;
  onFiltersChange: (filters: ClientTransactionFilters) => void;
  projectOptions: string[];
}

type SortField = "date" | "amount" | "status";
type SortDir = "asc" | "desc";

const STATUS_ORDER = ["Pending", "Funded", "Released", "Completed", "Cancelled"];

export function ClientTransactionTable({
  transactions,
  filters,
  onFiltersChange,
  projectOptions,
}: ClientTransactionTableProps) {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(() => {
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

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "amount") cmp = a.amount - b.amount;
      else if (sortField === "status") {
        cmp = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
      } else {
        cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [transactions, filters, sortField, sortDir]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const handleReset = () => {
    onFiltersChange({
      search: "",
      project: "all",
      status: "all",
      amountRange: "all",
      dateRange: "all",
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value })
              }
              className="h-10 rounded-xl pl-9"
              aria-label="Search transactions"
            />
          </div>

          <Select
            value={filters.project}
            onValueChange={(v) =>
              onFiltersChange({ ...filters, project: v ?? "all" })
            }
          >
            <SelectTrigger className="h-10 rounded-xl" aria-label="Filter by project">
              <SelectValue placeholder="All projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projectOptions.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(v) =>
              onFiltersChange({ ...filters, status: v ?? "all" })
            }
          >
            <SelectTrigger className="h-10 rounded-xl" aria-label="Filter by status">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUS_ORDER.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.amountRange}
            onValueChange={(v) =>
              onFiltersChange({ ...filters, amountRange: v ?? "all" })
            }
          >
            <SelectTrigger className="h-10 rounded-xl" aria-label="Filter by amount">
              <SelectValue placeholder="All amounts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Amounts</SelectItem>
              <SelectItem value="under-1k">Under $1,000</SelectItem>
              <SelectItem value="1k-3k">$1,000 – $3,000</SelectItem>
              <SelectItem value="3k-5k">$3,000 – $5,000</SelectItem>
              <SelectItem value="5k-plus">$5,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} transaction{filtered.length !== 1 ? "s" : ""} found
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title="No transactions found"
          description="Try adjusting your filters or search terms."
          actionLabel="Reset Filters"
          onAction={handleReset}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[800px]" aria-label="Transaction history">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3" scope="col">Transaction ID</th>
                  <th className="px-6 py-3" scope="col">Project</th>
                  <th className="px-6 py-3" scope="col">Freelancer</th>
                  <th className="px-6 py-3" scope="col">
                    <button
                      type="button"
                      onClick={() => toggleSort("amount")}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      Amount <ArrowUpDown className="size-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3" scope="col">
                    <button
                      type="button"
                      onClick={() => toggleSort("date")}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      Date <ArrowUpDown className="size-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3" scope="col">Status</th>
                  <th className="px-6 py-3" scope="col">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((txn, index) => (
                  <motion.tr
                    key={txn.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-6 py-4 font-mono text-sm text-foreground">{txn.id}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{txn.project}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{txn.freelancer}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      {formatClientCurrency(txn.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{txn.date}</td>
                    <td className="px-6 py-4">
                      <TransactionStatusBadge status={txn.status} />
                    </td>
                    <td className="px-6 py-4">
                      {txn.receiptId ? (
                        <Link
                          href={`/client/escrow/receipts/${txn.receiptId}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          <Download className="size-3.5" />
                          View
                        </Link>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-border md:hidden">
            {filtered.map((txn) => (
              <div key={txn.id} className="p-4">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <p className="font-mono text-sm text-foreground">{txn.id}</p>
                  <TransactionStatusBadge status={txn.status} />
                </div>
                <p className="text-sm text-muted-foreground">{txn.project}</p>
                <p className="text-xs text-muted-foreground">{txn.freelancer}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold">{formatClientCurrency(txn.amount)}</span>
                  <span className="text-xs text-muted-foreground">{txn.date}</span>
                </div>
                {txn.receiptId ? (
                  <Link
                    href={`/client/escrow/receipts/${txn.receiptId}`}
                    className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
                  >
                    View Receipt →
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
