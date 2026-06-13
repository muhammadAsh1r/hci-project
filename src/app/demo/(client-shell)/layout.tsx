import { DemoAuthProvider } from "@/components/demo/demo-auth-provider";
import { ClientAppShell } from "@/components/layout/client-app-shell";

export default function DemoClientShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoAuthProvider role="client">
      <ClientAppShell>{children}</ClientAppShell>
    </DemoAuthProvider>
  );
}
