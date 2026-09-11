"use client";

import { motion } from "framer-motion";
import { logoColors } from "@/content/theme";
import { MARK_VIEWBOX, markPaths } from "@/components/brand/LogoMark";
import { easeOut } from "@/lib/motion";

/**
 * The mark assembling itself: the teal bracket arrives from the left, the grey bracket
 * from the right, and the orange square is the last piece to lock into place.
 * Geometry is identical to the static LogoMark.
 */
export function AnimatedMark({ className, delay = 0.45 }: { className?: string; delay?: number }) {
  const piece = (from: { x?: number; y?: number; scale?: number }, at: number, duration = 1.1) => ({
    initial: { opacity: 0, ...from },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    transition: { duration, delay: at, ease: easeOut },
  });

  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role="img"
      aria-label="El Conceptz mark"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      <motion.path d={markPaths.teal} fill={logoColors.teal} {...piece({ x: -22 }, delay)} />
      <motion.path
        d={markPaths.gray}
        fill={logoColors.gray}
        {...piece({ x: 22, y: 8 }, delay + 0.15)}
      />
      <motion.rect
        {...markPaths.orange}
        fill={logoColors.orange}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        {...piece({ scale: 0 }, delay + 0.75, 0.7)}
      />
    </svg>
  );
}
