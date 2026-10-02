"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  type AnimationPlaybackControls,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { transformationCopy } from "@/content/copy";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { easeInOut } from "@/lib/motion";
import type { ResolvedPair } from "@/lib/images";
import { clamp, cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  pair: ResolvedPair;
  className?: string;
}

/**
 * Direct-manipulation comparison. The divider position lives in a motion value, so
 * dragging never re-renders React. When the slider first scrolls into view it eases
 * the divider once to show what it does, then stops the moment the visitor touches it.
 */
export function BeforeAfterSlider({ pair, className }: BeforeAfterSliderProps) {
  const reduce = useReducedMotionSafe();
  const frameRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLButtonElement>(null);
  const dragging = useRef(false);
  const intro = useRef<AnimationPlaybackControls | null>(null);
  const [interacted, setInteracted] = useState(false);
  const inView = useInView(frameRef, { once: true, amount: 0.55 });

  const initial = pair.initialPosition ?? 50;
  const position = useMotionValue(initial);
  const clip = useMotionTemplate`inset(0 0 0 ${position}%)`;
  const left = useMotionTemplate`${position}%`;

  // A new pair resets the divider.
  useEffect(() => {
    intro.current?.stop();
    position.set(initial);
  }, [pair.id, initial, position]);

  // Gentle demonstration once, unless the visitor has already taken over.
  useEffect(() => {
    if (!inView || interacted || reduce) return;
    intro.current = animate(position, [initial, initial - 14, initial], {
      duration: 2.4,
      delay: 0.35,
      ease: easeInOut,
    });
    return () => intro.current?.stop();
  }, [inView, interacted, reduce, initial, position]);

  useMotionValueEvent(position, "change", (v) => {
    knobRef.current?.setAttribute("aria-valuenow", String(Math.round(v)));
    knobRef.current?.setAttribute(
      "aria-valuetext",
      `${Math.round(v)} percent before, ${100 - Math.round(v)} percent after`
    );
  });

  const takeOver = () => {
    if (!interacted) setInteracted(true);
    intro.current?.stop();
  };

  const updateFromClientX = (clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    position.set(clamp(((clientX - rect.left) / rect.width) * 100, 0, 100));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging.current = true;
    // Pressed look is pure CSS off this attribute, so the drag never waits on a re-render.
    e.currentTarget.dataset.dragging = "true";
    takeOver();
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const endDrag = () => {
    dragging.current = false;
    frameRef.current?.removeAttribute("data-dragging");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const stepSize = e.shiftKey ? 10 : 3;
    const v = position.get();
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = v - stepSize;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = v + stepSize;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    takeOver();
    animate(position, clamp(next, 0, 100), { duration: 0.25, ease: easeInOut });
  };

  const aspectClass =
    pair.after.orientation === "landscape"
      ? "aspect-[3/2] w-full"
      : pair.after.orientation === "square"
        ? "aspect-square w-full lg:h-[min(76vh,800px)] lg:w-auto"
        : "aspect-[4/5] w-full lg:h-[min(76vh,820px)] lg:w-auto";

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        ref={frameRef}
        className={cn(
          "group relative max-w-full select-none overflow-hidden rounded-md bg-stone touch-pan-y",
          "cursor-ew-resize",
          aspectClass
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={pair.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6 }}
          >
            <Photo
              photo={pair.before}
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="pointer-events-none"
            />
            <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
              <Photo
                photo={pair.after}
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="pointer-events-none"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <span className="text-label pointer-events-none absolute left-4 top-4 rounded-md bg-[var(--slate-deep)]/80 px-2.5 py-2 text-ivory backdrop-blur-sm">
          {transformationCopy.beforeLabel}
        </span>
        <span className="text-label pointer-events-none absolute right-4 top-4 rounded-md bg-teal-deep/95 px-2.5 py-2 text-ivory backdrop-blur-sm">
          {transformationCopy.afterLabel}
        </span>

        <motion.div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-teal shadow-[0_0_0_1px_rgb(247_244_239/0.55)]"
          style={{ left }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-3 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brick shadow-[0_0_0_1px_rgb(247_244_239/0.55)]"
          />
          <button
            ref={knobRef}
            type="button"
            role="slider"
            aria-label={`${transformationCopy.beforeLabel} and ${transformationCopy.afterLabel}: ${pair.title}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={initial}
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            onFocus={takeOver}
            className={cn(
              // Centred with `transform` rather than Tailwind's `translate` so the knob-breathe
              // keyframes (which set transform) replace it instead of stacking a second offset.
              "pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 [transform:translate(-50%,-50%)] items-center justify-center rounded-full border-[1.5px] border-teal bg-ivory shadow-[0_8px_24px_-8px_rgb(47_57_65/0.5)] ring-brick transition-[box-shadow,transform] duration-200 ease-[var(--ease-out)] group-hover:ring-2 group-hover:ring-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick group-data-[dragging=true]:ring-2 group-data-[dragging=true]:ring-teal group-data-[dragging=true]:[transform:translate(-50%,-50%)_scale(1.06)] sm:h-12 sm:w-12",
              !interacted && !reduce && "knob-breathe"
            )}
          >
            <ChevronLeft className="-mr-0.5 h-4 w-4 text-teal-deep" strokeWidth={2} aria-hidden />
            <ChevronRight className="-ml-0.5 h-4 w-4 text-teal-deep" strokeWidth={2} aria-hidden />
          </button>
        </motion.div>
      </div>
      <p className="text-meta mt-4 self-start">{transformationCopy.hint}</p>
    </div>
  );
}
