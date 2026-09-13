"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { palette } from "@/content/theme";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { easeInOut, easeOut } from "@/lib/motion";

/**
 * Architectural backdrop for the opening: two wall lines meeting at a corner, a floor plane,
 * an archway with its post, and a low sill line. No ornament beyond that. Everything draws
 * itself in the order a plan is drawn, then drifts gently against scroll.
 *
 * Two compositions share the same vocabulary: a wide one for desktop and a tall one for
 * phones, so the forms stay in frame at every width.
 */

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  at: number;
}

interface Scene {
  viewBox: string;
  plane: { x: number; y: number; width: number; height: number };
  arch: { path: string; outline: string; post: { x: number; y1: number; y2: number } };
  lines: Line[];
}

const wide: Scene = {
  viewBox: "0 0 1600 1000",
  plane: { x: 0, y: 318, width: 520, height: 700 },
  arch: {
    path: "M1180 1000 V540 A250 250 0 0 1 1680 540 V1000 Z",
    outline: "M1180 1000 V540 A250 250 0 0 1 1680 540",
    post: { x: 1180, y1: 1000, y2: 540 },
  },
  lines: [
    { x1: 0, y1: 318, x2: 520, y2: 318, opacity: 0.3, at: 0.05 },
    { x1: 520, y1: 318, x2: 520, y2: 1000, opacity: 0.3, at: 0.55 },
    { x1: 0, y1: 780, x2: 380, y2: 780, opacity: 0.18, at: 0.9 },
  ],
};

const tall: Scene = {
  viewBox: "0 0 400 860",
  plane: { x: 0, y: 560, width: 132, height: 320 },
  arch: {
    path: "M300 860 V600 A130 130 0 0 1 560 600 V860 Z",
    outline: "M300 860 V600 A130 130 0 0 1 560 600",
    post: { x: 300, y1: 860, y2: 600 },
  },
  lines: [
    { x1: 0, y1: 560, x2: 132, y2: 560, opacity: 0.3, at: 0.05 },
    { x1: 132, y1: 560, x2: 132, y2: 860, opacity: 0.3, at: 0.55 },
    { x1: 0, y1: 190, x2: 110, y2: 190, opacity: 0.18, at: 0.9 },
  ],
};

export function OpeningScene({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotionSafe();
  const planeY = useTransform(progress, [0, 1], [0, reduce ? 0 : -60]);
  const lineY = useTransform(progress, [0, 1], [0, reduce ? 0 : -24]);
  const archY = useTransform(progress, [0, 1], [0, reduce ? 0 : -90]);

  const draw = (at: number, duration = 1.4) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { duration, delay: at, ease: easeInOut },
      opacity: { duration: 0.4, delay: at },
    },
  });

  const plane = (at: number, fromX: number) => ({
    initial: { opacity: 0, x: fromX },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.6, delay: at, ease: easeOut },
  });

  const render = (scene: Scene, className: string) => (
    <svg
      viewBox={scene.viewBox}
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    >
      {/* Floor plane in the corner formed by the two walls */}
      <motion.g style={{ y: planeY }}>
        <motion.rect {...scene.plane} fill={palette.linen} {...plane(0.1, -40)} />
      </motion.g>

      {/* Archway wall, its outline and the teal post */}
      <motion.g style={{ y: archY }}>
        <motion.path d={scene.arch.path} fill={palette.stone} {...plane(0.35, 40)} />
        <motion.path
          d={scene.arch.outline}
          fill="none"
          stroke={palette.teal}
          strokeOpacity="0.5"
          strokeWidth="1.25"
          {...draw(0.6, 1.8)}
        />
        <motion.line
          x1={scene.arch.post.x}
          y1={scene.arch.post.y1}
          x2={scene.arch.post.x}
          y2={scene.arch.post.y2}
          stroke={palette.teal}
          strokeWidth="2"
          {...draw(1.15, 1)}
        />
      </motion.g>

      {/* Wall lines: one long horizontal, one vertical corner, one low sill */}
      <motion.g style={{ y: lineY }}>
        {scene.lines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={palette.slateDeep}
            strokeOpacity={line.opacity}
            strokeWidth={i === 2 ? "1" : "1.25"}
            {...draw(line.at, i === 2 ? 1 : 1.2)}
          />
        ))}
      </motion.g>
    </svg>
  );

  return (
    <>
      {render(wide, "hidden sm:block")}
      {render(tall, "sm:hidden")}
    </>
  );
}

/** Convenience hook so the section and the scene share one scroll progress value. */
export function useOpeningProgress(target: React.RefObject<HTMLElement | null>) {
  return useScroll({ target, offset: ["start start", "end start"] }).scrollYProgress;
}
