"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { PageTransition } from "@/components/shared/page-transition";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  bottomPadding?: "default" | "large" | "sticky-mobile";
}

const bottomPaddingMap = {
  default: "pb-16",
  large: "pb-24",
  "sticky-mobile": "pb-28 lg:pb-16",
};

export function PageShell({
  children,
  className,
  containerClassName,
  bottomPadding = "default",
}: PageShellProps) {
  return (
    <div className={cn(bottomPaddingMap[bottomPadding], className)}>
      <Container className={cn("py-8", containerClassName)}>
        <PageTransition>{children}</PageTransition>
      </Container>
    </div>
  );
}

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "7xl" | "5xl" | "2xl";
}

const maxWidthMap = {
  "7xl": "max-w-7xl",
  "5xl": "max-w-5xl",
  "2xl": "max-w-2xl",
};

export function DashboardShell({
  children,
  className,
  maxWidth = "7xl",
}: DashboardShellProps) {
  return (
    <div
      className={cn(
        "mx-auto space-y-8 p-4 sm:p-6 lg:p-8",
        maxWidthMap[maxWidth],
        className
      )}
    >
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
