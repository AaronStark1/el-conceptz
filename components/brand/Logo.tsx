import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The full lockup (mark + wordmark) as supplied, with its white background removed.
 * Intrinsic ratio 1247 x 290. Height is controlled by the caller via className.
 */
export function Logo({
  className,
  priority = false,
  height = 28,
}: {
  className?: string;
  priority?: boolean;
  height?: number;
}) {
  const width = Math.round(height * (1247 / 290));
  return (
    <Image
      src="/brand/el-conceptz-logo.png"
      alt="El Conceptz"
      width={width}
      height={height}
      className={cn("h-auto w-auto select-none", className)}
      style={{ height, width }}
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
      draggable={false}
    />
  );
}

/** Wordmark only (841 x 142). Used beneath the animated mark in the opening. */
export function Wordmark({ className, height = 36 }: { className?: string; height?: number }) {
  const width = Math.round(height * (841 / 142));
  return (
    <Image
      src="/brand/el-conceptz-wordmark.png"
      alt="el.conceptz"
      width={width}
      height={height}
      className={cn("select-none", className)}
      style={{ height, width }}
      loading="eager"
      fetchPriority="high"
      draggable={false}
    />
  );
}
