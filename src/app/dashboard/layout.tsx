import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        <div className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</div>
      </div>
    </RequireAuth>
  );
}
