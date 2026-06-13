import { DemoAuthProvider } from "@/components/demo/demo-auth-provider";

export default function DemoStandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DemoAuthProvider role="freelancer">{children}</DemoAuthProvider>;
}
