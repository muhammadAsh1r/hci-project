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
import {
  hiringActivityData,
  monthlySpending,
  projectsCreatedData,
} from "@/lib/client-dashboard-data";

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
            {entry.name.toLowerCase().includes("spending")
              ? `$${entry.value.toLocaleString()}`
              : entry.value}
          </span>
        </p>
      ))}
    </div>
  );
}

export function MonthlySpendingChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-1 text-lg font-semibold text-foreground">Monthly Spending</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Total project spend over the last 6 months
      </p>
      <div className="h-64 min-h-[256px] w-full" role="img" aria-label="Monthly spending chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlySpending} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
              dataKey="spending"
              name="Spending"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ProjectsCreatedChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-1 text-lg font-semibold text-foreground">Projects Created</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        New projects posted each month
      </p>
      <div className="h-64 min-h-[256px] w-full" role="img" aria-label="Projects created chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectsCreatedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
            />
            <Tooltip content={<ChartTooltip />} />
            <Line
              type="monotone"
              dataKey="created"
              name="Projects Created"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ fill: "#6366F1", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function HiringActivityChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-1 text-lg font-semibold text-foreground">Hiring Activity</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Interviews conducted vs. freelancers hired
      </p>
      <div className="h-64 min-h-[256px] w-full" role="img" aria-label="Hiring activity chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hiringActivityData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Bar dataKey="interviews" name="Interviews" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="hires" name="Hires" fill="#22C55E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
