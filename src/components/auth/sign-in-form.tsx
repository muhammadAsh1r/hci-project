"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthPageLayout } from "@/components/auth/auth-page-layout";
import { AuthRedirectState } from "@/components/auth/auth-redirect-state";
import { PrimaryButton } from "@/components/shared/primary-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { DEMO_CREDENTIALS } from "@/lib/auth-data";
import { redirectAfterAuth } from "@/lib/auth-utils";

interface SignInFormProps {
  callbackUrl?: string;
}

export function SignInForm({ callbackUrl = "/dashboard" }: SignInFormProps) {
  const router = useRouter();
  const { signIn, isAuthenticated, isHydrated } = useAuth();
  const { showToast, ToastContainer } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isHydrated || !isAuthenticated || isRedirecting) return;
    setIsRedirecting(true);
    redirectAfterAuth(router, callbackUrl);
  }, [isHydrated, isAuthenticated, isRedirecting, router, callbackUrl]);

  const fillDemoCredentials = (type: "freelancer" | "client") => {
    setEmail(DEMO_CREDENTIALS[type].email);
    setPassword(DEMO_CREDENTIALS[type].password);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await signIn({ email, password, rememberMe });

    if (!result.success) {
      setError(result.error ?? "Unable to sign in. Please try again.");
      setIsSubmitting(false);
      return;
    }

    setIsRedirecting(true);
    showToast("Welcome back! Redirecting to your dashboard.", "success");
    redirectAfterAuth(router, callbackUrl);
  };

  if (isRedirecting || (isHydrated && isAuthenticated)) {
    return (
      <AuthRedirectState
        title="Welcome back"
        description="Sign in to access your dashboard, proposals, and escrow payments."
        message="Signed in successfully. Taking you to your dashboard..."
      />
    );
  }

  return (
    <AuthPageLayout
      title="Welcome back"
      description="Sign in to access your dashboard, proposals, and escrow payments."
      footer={
        <p className="text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href={`/sign-up${callbackUrl !== "/dashboard" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
            className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Create one
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="sign-in-email">Email</Label>
          <Input
            id="sign-in-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 rounded-xl"
            aria-invalid={!!error}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="sign-in-password">Password</Label>
            <button
              type="button"
              className="text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="sign-in-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 rounded-xl pr-11"
              aria-invalid={!!error}
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

        <div className="flex items-center gap-2">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
          />
          <Label htmlFor="remember-me" className="text-sm font-normal text-muted-foreground">
            Remember me on this device
          </Label>
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
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </PrimaryButton>
      </form>

      <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Demo accounts
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => fillDemoCredentials("freelancer")}
            className="flex-1 rounded-xl border border-border bg-card px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="font-medium text-foreground">Freelancer</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {DEMO_CREDENTIALS.freelancer.email}
            </span>
          </button>
          <button
            type="button"
            onClick={() => fillDemoCredentials("client")}
            className="flex-1 rounded-xl border border-border bg-card px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="font-medium text-foreground">Client</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {DEMO_CREDENTIALS.client.email}
            </span>
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Password for both: <span className="font-mono">{DEMO_CREDENTIALS.freelancer.password}</span>
        </p>
      </div>

      <ToastContainer />
    </AuthPageLayout>
  );
}
