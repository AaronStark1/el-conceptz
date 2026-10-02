"use client";

import { useEffect, useRef } from "react";
import { createDrawable, createTimeline, stagger, type Timeline } from "animejs";
import { palette } from "@/content/theme";
import { animeEase } from "@/lib/anime";
import { motionQueries } from "@/lib/gsap";

/**
 * Architectural backdrop for the opening. Lower left, a fragment of floor plan on a faint
 * sheet: walls drawn with their thickness, a window with its dimension string, a door with
 * its swing, a low sill. Right, an archway with its stone fill, teal outline and post.
 * Everything draws itself in the order a plan is drawn (anime.js), then drifts gently
 * against scroll (GSAP in Opening.tsx, by `data-drift`).
 *
 * Two compositions share the same vocabulary: a wide one for desktop and a tall, simpler one
 * for phones, where the forms sit low so they stay clear of the centred lockup and buttons.
 */

type Part =
  | "walls"
  | "jambs"
  | "glazing"
  | "leaf"
  | "swing"
  | "dims"
  | "ticks"
  | "sill"
  | "sillTick"
  | "arch"
  | "post";

interface Stroke {
  part: Part;
  d: string;
  stroke: string;
  opacity: number;
  width: number;
}

interface Scene {
  id: string;
  viewBox: string;
  sheet: { x: number; y: number; width: number; height: number };
  grid: { size: number; opacity: number };
  /** Column marker at the wall corner. */
  node: { x: number; y: number; size: number };
  strokes: Stroke[];
  archFill: string;
}

const { slateDeep: slate, teal, terracotta } = palette;

const wide: Scene = {
  id: "wide",
  viewBox: "0 0 1600 1000",
  sheet: { x: 0, y: 318, width: 520, height: 700 },
  grid: { size: 40, opacity: 0.07 },
  node: { x: 514, y: 312, size: 12 },
  strokes: [
    // Outer and inner wall faces; the gaps are a window on the long wall and a door on the corner wall.
    {
      part: "walls",
      d: "M0 318 H160 M300 318 H520 V590 M520 690 V1000",
      stroke: slate,
      opacity: 0.3,
      width: 1.25,
    },
    {
      part: "walls",
      d: "M0 332 H160 M300 332 H506 V590 M506 690 V1000",
      stroke: teal,
      opacity: 0.4,
      width: 1,
    },
    {
      part: "jambs",
      d: "M160 318 V332 M300 318 V332 M506 590 H520 M506 690 H520",
      stroke: slate,
      opacity: 0.3,
      width: 1,
    },
    { part: "glazing", d: "M160 325 H300", stroke: teal, opacity: 0.45, width: 1 },
    { part: "leaf", d: "M506 690 H406", stroke: teal, opacity: 0.45, width: 1 },
    {
      part: "swing",
      d: "M406 690 A100 100 0 0 1 506 590",
      stroke: terracotta,
      opacity: 0.5,
      width: 1,
    },
    {
      part: "dims",
      d: "M160 310 V284 M300 310 V284 M148 290 H312",
      stroke: slate,
      opacity: 0.25,
      width: 1,
    },
    {
      part: "ticks",
      d: "M155 295 L165 285 M295 295 L305 285",
      stroke: slate,
      opacity: 0.35,
      width: 1,
    },
    { part: "sill", d: "M0 780 H380", stroke: slate, opacity: 0.18, width: 1 },
    { part: "sillTick", d: "M380 774 V786", stroke: slate, opacity: 0.25, width: 1 },
    {
      part: "arch",
      d: "M1180 1000 V540 A250 250 0 0 1 1680 540",
      stroke: teal,
      opacity: 0.5,
      width: 1.25,
    },
    { part: "post", d: "M1180 1000 V540", stroke: teal, opacity: 1, width: 2 },
  ],
  archFill: "M1180 1000 V540 A250 250 0 0 1 1680 540 V1000 Z",
};

const tall: Scene = {
  id: "tall",
  viewBox: "0 0 400 860",
  sheet: { x: 0, y: 660, width: 132, height: 220 },
  grid: { size: 32, opacity: 0.05 },
  node: { x: 127, y: 655, size: 10 },
  strokes: [
    {
      part: "walls",
      d: "M0 660 H132 V750 M132 810 V860",
      stroke: slate,
      opacity: 0.3,
      width: 1.25,
    },
    { part: "walls", d: "M0 670 H122 V750 M122 810 V860", stroke: teal, opacity: 0.4, width: 1 },
    { part: "jambs", d: "M122 750 H132 M122 810 H132", stroke: slate, opacity: 0.3, width: 1 },
    { part: "leaf", d: "M122 810 H62", stroke: teal, opacity: 0.45, width: 1 },
    {
      part: "swing",
      d: "M62 810 A60 60 0 0 1 122 750",
      stroke: terracotta,
      opacity: 0.5,
      width: 1,
    },
    { part: "sill", d: "M0 190 H100", stroke: slate, opacity: 0.18, width: 1 },
    {
      part: "arch",
      d: "M300 860 V660 A130 130 0 0 1 560 660",
      stroke: teal,
      opacity: 0.5,
      width: 1.25,
    },
    { part: "post", d: "M300 860 V660", stroke: teal, opacity: 1, width: 2 },
  ],
  archFill: "M300 860 V660 A130 130 0 0 1 560 660 V860 Z",
};

/** When each line starts drawing and how long it takes, in ms from mount. */
const drawing: Record<Part, { at: number; duration: number }> = {
  walls: { at: 300, duration: 1400 },
  jambs: { at: 1500, duration: 450 },
  glazing: { at: 1650, duration: 500 },
  leaf: { at: 1800, duration: 450 },
  swing: { at: 1950, duration: 700 },
  dims: { at: 2000, duration: 600 },
  ticks: { at: 2350, duration: 350 },
  sill: { at: 2000, duration: 900 },
  sillTick: { at: 2750, duration: 250 },
  arch: { at: 900, duration: 1800 },
  post: { at: 1450, duration: 1000 },
};

/** Adds one scene's choreography to the shared timeline. Both scenes animate; CSS shows one. */
function addScene(tl: Timeline, svg: SVGSVGElement) {
  const q = (part: string) => Array.from(svg.querySelectorAll<SVGElement>(`[data-part="${part}"]`));
  const fadeIn = { opacity: { to: 1, duration: 300 } };

  tl.add(
    q("sheet"),
    { opacity: 1, translateX: { from: -40, to: 0 }, duration: 1600, ease: animeEase.out },
    300
  );
  tl.add(
    q("archFill"),
    { opacity: 1, translateX: { from: 40, to: 0 }, duration: 1600, ease: animeEase.out },
    600
  );
  tl.add(q("grid"), { opacity: 1, duration: 1200, ease: animeEase.out }, 900);

  for (const [part, { at, duration }] of Object.entries(drawing)) {
    const lines = q(part);
    if (lines.length === 0) continue;
    tl.add(createDrawable(lines), { draw: "0 1", ...fadeIn, duration, delay: stagger(140) }, at);
  }

  tl.add(
    q("node"),
    { opacity: 1, scale: { from: 0.6, to: 1 }, duration: 450, ease: animeEase.out },
    2450
  );
}

export function OpeningScene() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Reduced motion: nothing draws, the finished drawing is simply there.
    if (window.matchMedia(motionQueries.reduce).matches) {
      root.querySelectorAll<SVGElement>("[data-part]").forEach((el) => {
        el.style.opacity = "";
      });
      return;
    }

    const tl = createTimeline({ defaults: { ease: animeEase.inOut } });
    root.querySelectorAll("svg").forEach((svg) => addScene(tl, svg));
    return () => {
      tl.revert();
    };
  }, []);

  const render = (scene: Scene, className: string) => {
    const gridId = `hero-grid-${scene.id}`;
    const hidden = { opacity: 0 } as const;
    return (
      <svg
        viewBox={scene.viewBox}
        preserveAspectRatio="xMidYMid slice"
        className={`absolute inset-0 h-full w-full ${className}`}
        aria-hidden
      >
        <defs>
          <pattern
            id={gridId}
            width={scene.grid.size}
            height={scene.grid.size}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M${scene.grid.size} 0 H0 V${scene.grid.size}`}
              fill="none"
              stroke={slate}
              strokeOpacity={scene.grid.opacity}
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* The sheet: a faint plane with a drafting grid, sitting behind the plan */}
        <g data-drift="plane">
          <rect
            data-part="sheet"
            {...scene.sheet}
            fill={palette.linen}
            fillOpacity="0.55"
            style={hidden}
          />
          <rect data-part="grid" {...scene.sheet} fill={`url(#${gridId})`} style={hidden} />
        </g>

        {/* Archway wall, its outline and the teal post */}
        <g data-drift="arch">
          <path data-part="archFill" d={scene.archFill} fill={palette.stone} style={hidden} />
          {scene.strokes
            .filter((s) => s.part === "arch" || s.part === "post")
            .map((s) => (
              <path
                key={s.part}
                data-part={s.part}
                d={s.d}
                fill="none"
                stroke={s.stroke}
                strokeOpacity={s.opacity}
                strokeWidth={s.width}
                style={hidden}
              />
            ))}
        </g>

        {/* The plan itself: walls, openings, dimension string, sill, and the corner column */}
        <g data-drift="lines">
          {scene.strokes
            .filter((s) => s.part !== "arch" && s.part !== "post")
            .map((s, i) => (
              <path
                key={`${s.part}-${i}`}
                data-part={s.part}
                d={s.d}
                fill="none"
                stroke={s.stroke}
                strokeOpacity={s.opacity}
                strokeWidth={s.width}
                style={hidden}
              />
            ))}
          <rect
            data-part="node"
            x={scene.node.x}
            y={scene.node.y}
            width={scene.node.size}
            height={scene.node.size}
            fill={palette.brick}
            fillOpacity="0.45"
            style={{ ...hidden, transformBox: "fill-box", transformOrigin: "center" }}
          />
        </g>
      </svg>
    );
  };

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden>
      {render(wide, "hidden sm:block")}
      {render(tall, "sm:hidden")}
    </div>
  );
}
