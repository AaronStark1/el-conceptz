import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "quiet";
type Tone = "light" | "dark";

const base =
  "group relative inline-flex h-12 items-center gap-3 rounded-md px-6 text-[0.8125rem] font-bold tracking-[0.08em] uppercase whitespace-nowrap transition-[transform,background-color,color,border-color] duration-300 ease-[var(--ease-out)] active:scale-[0.98] focus-visible:outline-offset-4";

const variants: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-teal-deep text-ivory hover:bg-teal-ink [--rule:var(--ivory)]",
    quiet:
      "border border-[var(--hairline-strong)] text-slate hover:border-teal hover:text-teal-deep",
  },
  dark: {
    primary: "bg-ivory text-slate hover:bg-white",
    quiet:
      "border border-[var(--hairline-on-dark)] text-ivory hover:border-teal-light hover:text-teal-light",
  },
};

export interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
}

/**
 * Text buttons used for the few calls to action on the page.
 * Hover: the arrow steps forward and a short rule grows under the label (ivory on the teal fill, brick elsewhere).
 */
export function ButtonLink({
  variant = "primary",
  tone = "light",
  className,
  children,
  arrow = true,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[tone][variant], className)} {...props}>
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--rule,var(--brick))] transition-[width] duration-500 ease-[var(--ease-out)] group-hover:w-full group-focus-visible:w-full"
        />
      </span>
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1"
          strokeWidth={1.75}
          aria-hidden
        />
      )}
    </Link>
  );
}
