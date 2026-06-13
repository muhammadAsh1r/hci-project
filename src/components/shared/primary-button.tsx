import Link from "next/link";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  size?: "default" | "lg";
  disabled?: boolean;
}

export function PrimaryButton({
  children,
  href,
  className,
  onClick,
  type = "button",
  size = "default",
  disabled = false,
}: PrimaryButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground shadow-sm transition-all duration-200",
    "hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    size === "default" && "h-11 px-6 text-sm",
    size === "lg" && "h-12 px-8 text-base",
    className
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
