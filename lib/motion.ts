import type { Transition, Variants } from "framer-motion";
import { duration, easing } from "@/content/theme";

export const easeOut = [...easing.out] as [number, number, number, number];
export const easeInOut = [...easing.inOut] as [number, number, number, number];
export const easeSoft = [...easing.soft] as [number, number, number, number];

export const transitions = {
  fast: { duration: duration.fast, ease: easeOut } satisfies Transition,
  base: { duration: duration.base, ease: easeOut } satisfies Transition,
  slow: { duration: duration.slow, ease: easeOut } satisfies Transition,
  reveal: { duration: duration.reveal, ease: easeInOut } satisfies Transition,
  spring: { type: "spring", stiffness: 260, damping: 30, mass: 0.9 } satisfies Transition,
  springSoft: { type: "spring", stiffness: 120, damping: 24, mass: 1 } satisfies Transition,
};

/** Fade with a short rise. Used sparingly, mostly for metadata and body copy. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

/** Pure opacity for elements that should not move. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.slow },
};

/** Masked line reveal for display typography. Parent must clip overflow. */
export const lineMask: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1, ease: easeOut } },
};

/** Photograph enters slightly zoomed and settles. */
export const settleImage: Variants = {
  hidden: { scale: 1.08, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1.4, ease: easeOut } },
};

export const stagger = (children = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: children, delayChildren: delay } },
});

/** Viewport options shared by scroll-triggered reveals. */
export const viewportOnce = { once: true, amount: 0.3, margin: "0px 0px -8% 0px" } as const;
