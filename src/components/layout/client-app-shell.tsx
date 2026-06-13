import { ClientSidebar } from "@/components/client/client-sidebar";
import { ClientTopNav } from "@/components/client/client-top-nav";

interface ClientAppShellProps {
  children: React.ReactNode;
}

export function ClientAppShell({ children }: ClientAppShellProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <ClientSidebar />
      <div className="min-w-0 flex-1">
        <ClientTopNav />
        <main>{children}</main>
      </div>
    </div>
  );
}
