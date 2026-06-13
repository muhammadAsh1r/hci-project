import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata = {
  title: "Sign In — FreelanceAI",
  description: "Sign in to your FreelanceAI account to access your dashboard and manage projects.",
};

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;

  return <SignInForm callbackUrl={callbackUrl} />;
}
