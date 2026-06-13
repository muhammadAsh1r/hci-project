import { RequireClientAuth } from "@/components/auth/require-client-auth";
import { ClientSidebar } from "@/components/client/client-sidebar";
import { ClientTopNav } from "@/components/client/client-top-nav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireClientAuth>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <ClientSidebar />
        <div className="min-w-0 flex-1">
          <ClientTopNav />
          <main>{children}</main>
        </div>
      </div>
    </RequireClientAuth>
  );
}
