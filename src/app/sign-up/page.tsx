import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata = {
  title: "Sign Up — FreelanceAI",
  description: "Create a FreelanceAI account to find work, hire talent, and manage secure payments.",
};

interface SignUpPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { callbackUrl } = await searchParams;

  return <SignUpForm callbackUrl={callbackUrl} />;
}
