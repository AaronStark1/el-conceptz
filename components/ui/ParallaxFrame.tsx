"use client";

import { useRef, type CSSProperties } from "react";
import { Photo } from "@/components/ui/Photo";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { brandEase, gsap, motionQueries, useGSAP } from "@/lib/gsap";
import type { Photo as PhotoType } from "@/types";
import { cn } from "@/lib/utils";

export type FrameEnter = "settle" | "wipeLeft" | "fade" | "rise" | "zoomOut" | "none";

/** The wipe is a clip-path mask on the frame: fully covered from the right, then released. */
const WIPE_HIDDEN = "inset(0 100% 0 0)";
const WIPE_SHOWN = "inset(0 0% 0 0)";

/** How far a priority (eagerly loaded) photograph settles from. It is never hidden. */
const PRIORITY_SCALE = 1.05;

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
 * Enter choreography is split in two: the frame handles opacity, position and the mask,
 * the scaler around the photograph handles scale. Scaling inside the clipped frame means
 * the animation never spills outside the layout. Everything is positioned at `delay`, so
 * the timeline itself carries the stagger and ScrollTrigger only has to press play.
 */
function addEnter(
  tl: gsap.core.Timeline,
  frame: HTMLElement,
  scaler: HTMLElement,
  enter: Exclude<FrameEnter, "none">,
  at: number
) {
  switch (enter) {
    case "settle":
      tl.to(frame, { autoAlpha: 1, duration: 1 }, at).fromTo(
        scaler,
        { scale: 1.08 },
        { scale: 1, duration: 1.6 },
        at
      );
      break;
    case "zoomOut":
      tl.to(frame, { autoAlpha: 1, duration: 1.2 }, at).fromTo(
        scaler,
        { scale: 1.14 },
        { scale: 1, duration: 2, ease: brandEase.inOut },
        at
      );
      break;
    case "wipeLeft":
      tl.fromTo(
        frame,
        { clipPath: WIPE_HIDDEN },
        { clipPath: WIPE_SHOWN, duration: 1.3, ease: brandEase.inOut, clearProps: "clipPath" },
        at
      ).fromTo(scaler, { scale: 1.06 }, { scale: 1, duration: 1.6 }, at);
      break;
    case "fade":
      tl.to(frame, { autoAlpha: 1, duration: 1.2 }, at);
      break;
    case "rise":
      tl.fromTo(frame, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1 }, at).fromTo(
        scaler,
        { scale: 1.03 },
        { scale: 1, duration: 1.2 },
        at
      );
      break;
  }
}

/**
 * A photograph in a frame. The image is slightly taller than the frame and drifts
 * against the scroll, so the room seems to move as you walk past it. Drift is a smoothed
 * ScrollTrigger scrub; the entrance plays once as the frame reaches the lower fifth of
 * the viewport.
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
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const still = reduce || amount === 0;
  const animated = enter !== "none";
  // The LCP image must paint at once, so it only settles in scale; every other animated
  // frame is hidden in the server markup and GSAP brings it to its visible state.
  const hidden = animated && !priority;

  useGSAP(
    () => {
      const frame = frameRef.current;
      const inner = frame?.querySelector<HTMLElement>("[data-frame-inner]");
      const scaler = frame?.querySelector<HTMLElement>("[data-frame-scale]");
      if (!frame || !inner || !scaler) return;

      const mm = gsap.matchMedia(frameRef);
      mm.add(motionQueries, (context) => {
        const { reduce: reduceMotion, mobile } = context.conditions ?? {};

        if (reduceMotion) {
          // Show the photograph where it belongs, with nothing more than a short fade.
          gsap.set([inner, scaler], { clearProps: "transform" });
          gsap.set(frame, { clearProps: "clipPath,transform" });
          if (hidden) gsap.to(frame, { autoAlpha: 1, duration: 0.4 });
          return;
        }

        if (amount > 0) {
          // Travel is measured in pixels of frame height rather than yPercent: GSAP cannot
          // read a percentage translate back off an element inside a display:none ancestor
          // (several frames are lg-only), and the misreading would stick as an offset after
          // a breakpoint change. invalidateOnRefresh keeps the pixels honest on resize; the
          // drift is the only transform on this element, so re-initialising it is safe.
          const travel = () => (frame.offsetHeight * (mobile ? amount / 2 : amount)) / 100;
          gsap.fromTo(
            inner,
            { y: () => -travel() },
            {
              y: travel,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        if (!animated) return;

        const tl = gsap.timeline({
          defaults: { ease: brandEase.out },
          scrollTrigger: { trigger: frame, start: "top 80%", once: true },
        });
        if (priority) {
          tl.fromTo(scaler, { scale: PRIORITY_SCALE }, { scale: 1, duration: 1.6 }, delay);
        } else {
          addEnter(tl, frame, scaler, enter, delay);
        }
      });

      return () => mm.revert();
    },
    { scope: frameRef, dependencies: [amount, enter, delay, priority], revertOnUpdate: true }
  );

  // Initial states live in the markup so hydration never flashes the finished picture.
  let frameStyle: CSSProperties | undefined;
  if (hidden) frameStyle = enter === "wipeLeft" ? { clipPath: WIPE_HIDDEN } : { opacity: 0 };
  const scalerStyle: CSSProperties | undefined =
    animated && priority ? { transform: `scale(${PRIORITY_SCALE})` } : undefined;

  return (
    <div
      ref={frameRef}
      className={cn(bleed ? "photo-bleed" : "photo", className)}
      style={frameStyle}
    >
      <div
        data-frame-inner
        className={cn(
          "absolute inset-x-0 will-change-transform",
          still ? "inset-y-0" : "-inset-y-[10%]"
        )}
      >
        {/* Drift and scale live on separate elements so neither tween can disturb the other. */}
        <div data-frame-scale className="absolute inset-0" style={scalerStyle}>
          <Photo photo={photo} sizes={sizes} priority={priority} objectPosition={objectPosition} />
        </div>
      </div>
    </div>
  );
}
