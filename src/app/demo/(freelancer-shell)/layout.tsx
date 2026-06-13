import { DemoAuthProvider } from "@/components/demo/demo-auth-provider";
import { FreelancerAppShell } from "@/components/layout/freelancer-app-shell";

export default function DemoFreelancerShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoAuthProvider role="freelancer">
      <FreelancerAppShell>{children}</FreelancerAppShell>
    </DemoAuthProvider>
  );
}
