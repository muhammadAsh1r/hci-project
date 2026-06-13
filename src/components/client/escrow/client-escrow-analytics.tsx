"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  clientMonthlySpendingData,
  clientProjectCostsData,
} from "@/lib/client-contracts-data";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-xs text-muted-foreground">
          {entry.name}:{" "}
          <span className="font-semibold text-foreground">
            ${entry.value.toLocaleString()}
          </span>
        </p>
      ))}
    </div>
  );
}

export function ClientEscrowAnalytics() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-1 text-lg font-semibold text-foreground">Monthly Spending</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Released payments vs active escrow funds
        </p>
        <div className="h-64 min-h-[256px] w-full" role="img" aria-label="Monthly spending chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={clientMonthlySpendingData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Legend />
              <Bar dataKey="released" name="Released" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="escrow" name="Active Escrow" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-1 text-lg font-semibold text-foreground">Released Payments</h3>
        <p className="mb-6 text-sm text-muted-foreground">Monthly spending trend</p>
        <div className="h-64 min-h-[256px] w-full" role="img" aria-label="Released payments chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={clientMonthlySpendingData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="spending" name="Spending" stroke="#2563EB" strokeWidth={2} dot={{ fill: "#2563EB", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
        <h3 className="mb-1 text-lg font-semibold text-foreground">Project Costs</h3>
        <p className="mb-6 text-sm text-muted-foreground">Total contract value by project</p>
        <div className="h-48 min-h-[192px] w-full" role="img" aria-label="Project costs chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={clientProjectCostsData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
              <YAxis type="category" dataKey="project" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="cost" name="Cost" fill="#22C55E" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
