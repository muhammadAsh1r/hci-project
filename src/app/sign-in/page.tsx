import { Suspense } from "react";
import { SignInForm } from "@/components/auth/sign-in-form";
import { LoadingOverlay } from "@/components/shared/loading-spinner";

export const metadata = {
  title: "Sign In — FreelanceAI",
  description: "Sign in to your FreelanceAI account to access your dashboard and manage projects.",
};

export default function SignInPage() {
  return (
    <Suspense fallback={<LoadingOverlay label="Loading sign in" />}>
      <SignInForm />
    </Suspense>
  );
}
