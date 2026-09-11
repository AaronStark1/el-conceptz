"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { easeOut, fade, rise, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const families = {
  rise,
  fade,
  /** Handled as a mask: the wrapper clips and the content rises out of it. */
  wipeBottom: {
    hidden: {},
    visible: {},
  },
} satisfies Record<string, Variants>;

export type RevealFamily = keyof typeof families;

const maskInner: Variants = {
  hidden: { y: "108%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 1.1, ease: easeOut } },
};

const tags = {
  div: motion.div,
  section: motion.section,
  p: motion.p,
  span: motion.span,
  li: motion.li,
  figure: motion.figure,
} as const;
export type RevealTag = keyof typeof tags;

interface RevealProps {
  children: ReactNode;
  family?: RevealFamily;
  delay?: number;
  className?: string;
  as?: RevealTag;
  amount?: number;
}

/**
 * Scroll-triggered reveal. Each section picks the family that suits it;
 * MotionConfig makes the transforms instant under reduced motion while opacity still eases.
 * Only transforms and opacity are animated.
 */
export function Reveal({
  children,
  family = "rise",
  delay = 0,
  className,
  as = "div",
  amount,
}: RevealProps) {
  const Component = tags[as];
  const masked = family === "wipeBottom";
  const variants = families[family];

  return (
    <Component
      className={cn(className, masked && "overflow-hidden pb-[0.12em] -mb-[0.12em]")}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOnce, amount: amount ?? viewportOnce.amount }}
      transition={{ delay }}
    >
      {masked ? (
        <motion.div variants={maskInner} transition={{ delay }} className="will-change-transform">
          {children}
        </motion.div>
      ) : (
        children
      )}
    </Component>
  );
}
