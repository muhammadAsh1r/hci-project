"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface OutlineLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary";
}

export function OutlineLink({
  href,
  children,
  className,
  variant = "default",
}: OutlineLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variant === "default" &&
          "border-border bg-card text-foreground hover:bg-accent",
        variant === "primary" &&
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
    >
      {children}
    </Link>
  );
}
