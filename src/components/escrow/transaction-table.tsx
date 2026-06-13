"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, Download, Search } from "lucide-react";
import Link from "next/link";
import { PaymentStatusBadge } from "@/components/escrow/payment-status-badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/escrow-data";
import type { EscrowTransaction } from "@/lib/types/escrow";
import { PAYMENT_STATUS_ORDER } from "@/lib/types/escrow";

interface TransactionTableProps {
  transactions: EscrowTransaction[];
}

type SortField = "date" | "amount" | "status";
type SortDir = "asc" | "desc";

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.project.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter);
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "amount") cmp = a.amount - b.amount;
      else if (sortField === "status") {
        cmp = PAYMENT_STATUS_ORDER.indexOf(a.status) - PAYMENT_STATUS_ORDER.indexOf(b.status);
      } else {
        cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [transactions, search, statusFilter, sortField, sortDir]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="h-10 rounded-xl pl-9"
            aria-label="Search transactions"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="h-10 w-full rounded-xl sm:w-[180px]" aria-label="Filter by status">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {PAYMENT_STATUS_ORDER.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} transaction{filtered.length !== 1 ? "s" : ""} found
      </p>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full" aria-label="Transaction history">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3" scope="col">Transaction ID</th>
                <th className="px-6 py-3" scope="col">Project</th>
                <th className="px-6 py-3" scope="col">
                  <button type="button" onClick={() => toggleSort("amount")} className="inline-flex items-center gap-1 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
                    Amount <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-6 py-3" scope="col">
                  <button type="button" onClick={() => toggleSort("date")} className="inline-flex items-center gap-1 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
                    Date <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-6 py-3" scope="col">Status</th>
                <th className="px-6 py-3" scope="col">Method</th>
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
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{formatCurrency(txn.amount)}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{txn.date}</td>
                  <td className="px-6 py-4"><PaymentStatusBadge status={txn.status} /></td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{txn.method}</td>
                  <td className="px-6 py-4">
                    {txn.receiptId ? (
                      <Link href={`/dashboard/escrow/receipts/${txn.receiptId}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                        <Download className="size-3.5" /> View
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
                <PaymentStatusBadge status={txn.status} />
              </div>
              <p className="text-sm text-muted-foreground">{txn.project}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-semibold">{formatCurrency(txn.amount)}</span>
                <span className="text-xs text-muted-foreground">{txn.date}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-muted-foreground">
            No transactions match your search.
          </div>
        )}
      </div>
    </div>
  );
}
