"use client";

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
import { monthlyEscrowData, projectEarningsData } from "@/lib/escrow-data";

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
          {entry.name}: <span className="font-semibold text-foreground">${entry.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}

export function EscrowAnalyticsCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-1 text-lg font-semibold text-foreground">Monthly Revenue & Funds</h3>
        <p className="mb-6 text-sm text-muted-foreground">Released vs pending over 6 months</p>
        <div className="h-64 min-h-[256px] w-full" role="img" aria-label="Monthly escrow revenue chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyEscrowData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Legend />
              <Bar dataKey="released" name="Released" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" name="Pending" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-1 text-lg font-semibold text-foreground">Project Earnings</h3>
        <p className="mb-6 text-sm text-muted-foreground">Total earnings by project</p>
        <div className="h-64 min-h-[256px] w-full" role="img" aria-label="Project earnings chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyEscrowData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#2563EB" strokeWidth={2} dot={{ fill: "#2563EB", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
        <h3 className="mb-1 text-lg font-semibold text-foreground">Earnings by Project</h3>
        <p className="mb-6 text-sm text-muted-foreground">Breakdown of released funds per project</p>
        <div className="h-48 min-h-[192px] w-full" role="img" aria-label="Earnings by project chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectEarningsData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <YAxis type="category" dataKey="project" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="earnings" name="Earnings" fill="#6366F1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
