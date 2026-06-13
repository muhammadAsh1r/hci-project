"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthPageLayout } from "@/components/auth/auth-page-layout";
import { AuthRedirectState } from "@/components/auth/auth-redirect-state";
import { PrimaryButton } from "@/components/shared/primary-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import type { UserRole } from "@/lib/types/auth";
import { redirectAfterAuth } from "@/lib/auth-utils";

interface SignUpFormProps {
  callbackUrl?: string;
}

export function SignUpForm({ callbackUrl = "/dashboard" }: SignUpFormProps) {
  const router = useRouter();
  const { signUp, isAuthenticated, isHydrated } = useAuth();
  const { showToast, ToastContainer } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("freelancer");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isHydrated || !isAuthenticated || isRedirecting) return;
    setIsRedirecting(true);
    redirectAfterAuth(router, callbackUrl);
  }, [isHydrated, isAuthenticated, isRedirecting, router, callbackUrl]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const result = await signUp({ name, email, password, role });

    if (!result.success) {
      setError(result.error ?? "Unable to create account. Please try again.");
      setIsSubmitting(false);
      return;
    }

    setIsRedirecting(true);
    showToast("Account created successfully. Welcome to FreelanceAI!", "success");
    redirectAfterAuth(router, callbackUrl);
  };

  if (isRedirecting || (isHydrated && isAuthenticated)) {
    return (
      <AuthRedirectState
        title="Create your account"
        description="Join FreelanceAI to find projects, hire talent, and manage secure payments."
        message="Account ready. Taking you to your dashboard..."
      />
    );
  }

  return (
    <AuthPageLayout
      title="Create your account"
      description="Join FreelanceAI to find projects, hire talent, and manage secure payments."
      footer={
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={`/sign-in${callbackUrl !== "/dashboard" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
            className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="sign-up-name">Full name</Label>
          <Input
            id="sign-up-name"
            type="text"
            autoComplete="name"
            placeholder="Sarah Chen"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11 rounded-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sign-up-email">Email</Label>
          <Input
            id="sign-up-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 rounded-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sign-up-role">I want to</Label>
          <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
            <SelectTrigger id="sign-up-role" className="h-11 w-full rounded-xl">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="freelancer">Find work as a freelancer</SelectItem>
              <SelectItem value="client">Hire freelancers for projects</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sign-up-password">Password</Label>
          <div className="relative">
            <Input
              id="sign-up-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 rounded-xl pr-11"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sign-up-confirm-password">Confirm password</Label>
          <Input
            id="sign-up-confirm-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="h-11 rounded-xl"
            required
          />
        </div>

        {error ? (
          <p
            className="rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <PrimaryButton
          type="submit"
          className="w-full rounded-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </PrimaryButton>
      </form>

      <ToastContainer />
    </AuthPageLayout>
  );
}
