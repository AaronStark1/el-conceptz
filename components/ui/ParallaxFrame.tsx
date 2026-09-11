"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { Photo } from "@/components/ui/Photo";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { easeInOut, easeOut, viewportOnce } from "@/lib/motion";
import type { Photo as PhotoType } from "@/types";
import { cn } from "@/lib/utils";

export type FrameEnter = "settle" | "wipeLeft" | "fade" | "rise" | "zoomOut" | "none";

/**
 * Enter choreography is split in two: the frame handles opacity, position and clipping,
 * the photograph inside handles scale. Scaling inside the clipped frame means the
 * animation never spills outside the layout.
 */
const frameVariants: Record<Exclude<FrameEnter, "none">, Variants> = {
  settle: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.1, ease: easeOut } },
  },
  zoomOut: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, ease: easeOut } },
  },
  wipeLeft: {
    hidden: {},
    visible: {},
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, ease: easeOut } },
  },
  rise: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: easeOut } },
  },
};

/** A panel in the section's own colour slides off to the right, uncovering the photograph. */
const curtainVariants: Variants = {
  hidden: { scaleX: 1 },
  visible: { scaleX: 0, transition: { duration: 1.3, ease: easeInOut } },
};

const imageVariants: Record<Exclude<FrameEnter, "none">, Variants> = {
  settle: {
    hidden: { scale: 1.08 },
    visible: { scale: 1, transition: { duration: 1.6, ease: easeOut } },
  },
  zoomOut: {
    hidden: { scale: 1.14 },
    visible: { scale: 1, transition: { duration: 2, ease: easeInOut } },
  },
  wipeLeft: {
    hidden: { scale: 1.06 },
    visible: { scale: 1, transition: { duration: 1.6, ease: easeOut } },
  },
  fade: { hidden: { scale: 1 }, visible: { scale: 1 } },
  rise: {
    hidden: { scale: 1.03 },
    visible: { scale: 1, transition: { duration: 1.2, ease: easeOut } },
  },
};

interface ParallaxFrameProps {
  photo: PhotoType;
  sizes: string;
  className?: string;
  /** Vertical travel of the photograph inside its frame, as a percentage of frame height. */
  amount?: number;
  enter?: FrameEnter;
  delay?: number;
  priority?: boolean;
  bleed?: boolean;
  objectPosition?: string;
}

/**
 * A photograph in a frame. The image is slightly taller than the frame and drifts
 * against the scroll, so the room seems to move as you walk past it.
 */
export function ParallaxFrame({
  photo,
  sizes,
  className,
  amount = 7,
  enter = "settle",
  delay = 0,
  priority,
  bleed = false,
  objectPosition,
}: ParallaxFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-amount}%`, `${amount}%`]);
  const still = reduce || amount === 0;
  const animated = enter !== "none";
  const outer = animated ? frameVariants[enter] : undefined;
  const inner = animated ? imageVariants[enter] : undefined;

  return (
    <motion.div
      ref={ref}
      className={cn(bleed ? "photo-bleed" : "photo", className)}
      variants={outer}
      initial={animated ? "hidden" : undefined}
      whileInView={animated ? "visible" : undefined}
      viewport={{ ...viewportOnce, amount: 0.25 }}
      transition={{ delay }}
    >
      <motion.div
        className={cn(
          "absolute inset-x-0 will-change-transform",
          still ? "inset-y-0" : "-inset-y-[10%]"
        )}
        style={still ? undefined : { y }}
        variants={inner}
        transition={{ delay }}
      >
        <Photo photo={photo} sizes={sizes} priority={priority} objectPosition={objectPosition} />
      </motion.div>
      {enter === "wipeLeft" && (
        <motion.div
          aria-hidden
          className="absolute inset-0 origin-right bg-[var(--room,var(--ivory))] will-change-transform"
          variants={curtainVariants}
          transition={{ delay }}
        />
      )}
    </motion.div>
  );
}
