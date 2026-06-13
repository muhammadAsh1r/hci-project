import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

interface FreelancerAppShellProps {
  children: React.ReactNode;
}

export function FreelancerAppShell({ children }: FreelancerAppShellProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar />
      <div className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</div>
    </div>
  );
}
