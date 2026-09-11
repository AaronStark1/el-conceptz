"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Honour prefers-reduced-motion for every Motion animation on the page: transforms and
 * layout animations become instant while opacity still eases, so nothing breaks or vanishes.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
