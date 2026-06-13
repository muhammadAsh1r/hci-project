"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { usePreferences } from "@/hooks/use-preferences";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

function subscribeNoop() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function resolveIsDark(theme: "light" | "dark" | "system"): boolean {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { draft, updateAndSave } = usePreferences();
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot
  );
  const isDark = mounted && resolveIsDark(draft.theme);

  const toggle = () => {
    updateAndSave({ theme: isDark ? "light" : "dark" });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!mounted}
      suppressHydrationWarning
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        !mounted && "pointer-events-none opacity-0",
        className
      )}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4" aria-hidden="true" />
        ) : (
          <Moon className="size-4" aria-hidden="true" />
        )
      ) : (
        <span className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
