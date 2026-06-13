import { DemoModeProvider } from "@/hooks/use-demo-mode";

export const metadata = {
  title: "Demo — FreelanceAI",
  description:
    "Public demo pages for design export, screenshots, and project presentation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <DemoModeProvider>{children}</DemoModeProvider>;
}
