"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A two-pixel teal line along the top edge that fills as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-[2px] origin-left bg-teal"
      style={{ scaleX }}
    />
  );
}
