import { Suspense } from "react";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { LoadingOverlay } from "@/components/shared/loading-spinner";

export const metadata = {
  title: "Sign Up — FreelanceAI",
  description: "Create a FreelanceAI account to find work, hire talent, and manage secure payments.",
};

export default function SignUpPage() {
  return (
    <Suspense fallback={<LoadingOverlay label="Loading sign up" />}>
      <SignUpForm />
    </Suspense>
  );
}
