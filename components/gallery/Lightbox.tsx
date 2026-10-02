"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import type { LightboxRequest } from "@/components/gallery/LightboxProvider";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface LightboxProps {
  request: LightboxRequest | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 400;

/* Controls warm to teal-light on hover and focus. The colour sits on the icon because the
   global button reset inherits colour over utilities. */
const controlIcon =
  "h-5 w-5 text-ivory/80 transition-colors duration-300 ease-[var(--ease-out)] group-hover:text-teal-light group-focus-visible:text-teal-light";
const stepButton =
  "group absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 transition-colors duration-300 ease-[var(--ease-out)] hover:border-teal-light focus-visible:border-teal-light sm:inline-flex";

/**
 * Full-screen viewer. Keyboard: Escape closes, arrows step. Touch: swipe to step.
 * The image fades and slides slightly in the direction of travel.
 */
export function Lightbox({ request, onClose, onIndexChange }: LightboxProps) {
  const open = request !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(1);
  useLockBodyScroll(open);

  const count = request?.photos.length ?? 0;
  const index = request?.index ?? 0;
  const photo = request?.photos[index];

  const step = useCallback(
    (delta: number) => {
      if (!request || count < 2) return;
      setDirection(delta);
      onIndexChange((index + delta + count) % count);
    },
    [request, count, index, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [open, onClose, step]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) step(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) step(-1);
  };

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={request.label ? `${request.label} photographs` : "Photograph viewer"}
          tabIndex={-1}
          className="fixed inset-0 z-[60] flex flex-col bg-[rgb(47_57_65/0.96)] text-ivory outline-none backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.35, ease: easeOut }}
          onClick={onClose}
        >
          <div
            className="wrap flex h-16 shrink-0 items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-meta text-ivory/60">
              {request.label && <span className="text-ivory/85">{request.label}</span>}
              {count > 1 && (
                <span className="ml-3 tabular-nums text-teal-light" aria-live="polite">
                  {index + 1} of {count}
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close viewer"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ease-[var(--ease-out)] hover:bg-teal-light/10 focus-visible:bg-teal-light/10"
            >
              <X className={controlIcon} strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              <motion.figure
                key={photo.src}
                className="relative flex h-full w-full max-w-[1400px] flex-col items-center justify-center"
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: 40 * d, scale: 0.985 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: -40 * d, scale: 0.985 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: easeOut }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={onDragEnd}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-full w-full">
                  <Photo
                    photo={photo}
                    sizes="100vw"
                    quality={90}
                    imgClassName="!object-contain"
                    className="select-none"
                  />
                </div>
                {(photo.caption || photo.alt) && (
                  <figcaption className="mt-3 max-w-[60ch] text-center text-[0.875rem] font-medium text-ivory/70">
                    {photo.caption ?? photo.alt}
                  </figcaption>
                )}
              </motion.figure>
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous photograph"
                  className={cn(stepButton, "left-3")}
                >
                  <ChevronLeft className={controlIcon} strokeWidth={1.75} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next photograph"
                  className={cn(stepButton, "right-3")}
                >
                  <ChevronRight className={controlIcon} strokeWidth={1.75} aria-hidden />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
