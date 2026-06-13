"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";

interface AuthPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthPageLayout({
  title,
  description,
  children,
  footer,
}: AuthPageLayoutProps) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center py-12">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[360px] w-[360px] rounded-full bg-brand-accent/10 blur-3xl" />
      </div>

      <Container className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="FreelanceAI home"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-5" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Freelance<span className="text-primary">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {children}
        </div>

        {footer ? <div className="mt-6 text-center text-sm">{footer}</div> : null}
      </Container>
    </div>
  );
}
