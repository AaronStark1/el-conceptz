"use client";

import { useEffect, useState } from "react";

/**
 * Reports the visitor's reduced-motion preference after mount, so server and first client
 * render always agree. Transform animations are already neutralised by MotionConfig; this
 * hook is for the handful of decisions that live outside Motion's variants
 * (parallax offsets, the slider's demonstration nudge, the breathing handle).
 */
export function useReducedMotionSafe(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduce;
}
