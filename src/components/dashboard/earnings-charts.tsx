"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monthlyEarnings, proposalConversionData } from "@/lib/dashboard-data";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
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
            {entry.name === "earnings" || entry.name === "Earnings"
              ? `$${entry.value.toLocaleString()}`
              : entry.value}
          </span>
        </p>
      ))}
    </div>
  );
}

export function EarningsChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        Monthly Earnings
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Revenue over the last 6 months
      </p>
      <div className="h-64 min-h-[256px] w-full" role="img" aria-label="Monthly earnings chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyEarnings} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar
              dataKey="earnings"
              name="Earnings"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ProjectRevenueChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        Project Revenue Trend
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Earnings vs. project count
      </p>
      <div className="h-64 min-h-[256px] w-full" role="img" aria-label="Project revenue trend chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyEarnings} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="earnings"
              name="Earnings"
              stroke="#2563EB"
              strokeWidth={2}
              dot={{ fill: "#2563EB", r: 4 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="projects"
              name="Projects"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: "#8B5CF6", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ProposalConversionChart() {
  const total = proposalConversionData.reduce((sum, d) => sum + d.value, 0);
  const conversionRate = Math.round(
    (proposalConversionData[3].value / proposalConversionData[0].value) * 100
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Proposal Conversion
          </h3>
          <p className="text-sm text-muted-foreground">
            Funnel from submission to win
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{conversionRate}%</p>
          <p className="text-xs text-muted-foreground">Win rate</p>
        </div>
      </div>
      <div className="h-52 min-h-[208px] w-full" role="img" aria-label="Proposal conversion funnel chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={proposalConversionData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {proposalConversionData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => {
                const num = Number(value ?? 0);
                return [
                  `${num} (${Math.round((num / total) * 100)}%)`,
                  String(name),
                ];
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
