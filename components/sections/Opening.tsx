"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { createTimeline } from "animejs";
import { AnimatedMark } from "@/components/brand/AnimatedMark";
import { Wordmark } from "@/components/brand/Logo";
import { OpeningScene } from "@/components/sections/OpeningScene";
import { ButtonLink } from "@/components/ui/Button";
import { WordReveal } from "@/components/ui/WordReveal";
import { openingCopy } from "@/content/copy";
import { contactCta, sectionIds } from "@/content/navigation";
import { animeEase } from "@/lib/anime";
import { gsap, motionQueries, useGSAP } from "@/lib/gsap";

/** One responsive measure sizes the mark, the wordmark and the rule beneath them. */
const lockupWidth = "clamp(228px, 27vw, 372px)";

/**
 * The lockup assembling, in ms from mount: teal bracket from the left, grey bracket from the
 * right, the orange square scales in last; then the wordmark wipes in from the left and a
 * hairline draws out from its centre, finished by a brick tick at the right end.
 * Elements start hidden in the markup (see AnimatedMark and the JSX below), so there is
 * nothing to flash before this runs. Under reduced motion the finished lockup is simply shown.
 */
function useLockupIntro(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const q = (selector: string) =>
      Array.from(root.querySelectorAll<HTMLElement | SVGElement>(selector));

    if (window.matchMedia(motionQueries.reduce).matches) {
      q("[data-piece], [data-lockup]").forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
        el.style.clipPath = "";
      });
      return;
    }

    const tl = createTimeline({ defaults: { ease: animeEase.out } })
      .add(
        q('[data-piece="teal"]'),
        { translateX: { from: -22, to: 0 }, opacity: { from: 0, to: 1 }, duration: 1100 },
        450
      )
      .add(
        q('[data-piece="gray"]'),
        {
          translateX: { from: 22, to: 0 },
          translateY: { from: 8, to: 0 },
          opacity: { from: 0, to: 1 },
          duration: 1100,
        },
        600
      )
      .add(
        q('[data-piece="orange"]'),
        { scale: { from: 0, to: 1 }, opacity: { from: 0, to: 1, duration: 300 }, duration: 700 },
        1200
      )
      .add(
        q('[data-lockup="wordmark"]'),
        {
          clipPath: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
          translateY: { from: 8, to: 0 },
          duration: 900,
          ease: animeEase.inOut,
        },
        2050
      )
      .add(q('[data-lockup="rule"]'), { scaleX: { from: 0, to: 1 }, duration: 800 }, 2450)
      .add(
        q('[data-lockup="tick"]'),
        { translateX: { from: -8, to: 0 }, opacity: { from: 0, to: 1 }, duration: 350 },
        3000
      );

    return () => {
      tl.revert();
    };
  }, [scope]);
}

/**
 * The entrance. The composition holds for a moment while the visitor scrolls, then
 * recedes as the studio section arrives over it.
 */
export function Opening() {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useLockupIntro(contentRef);

  // Recession on scroll: the content fades, settles back a touch, and the drawing behind it
  // drifts at three depths. Reduced motion keeps only the fade; phones get half the drift.
  useGSAP(
    () => {
      const mm = gsap.matchMedia(ref);
      mm.add(motionQueries, (context) => {
        const { reduce, mobile } = context.conditions ?? {};
        const drift = reduce ? 0 : mobile ? 0.5 : 1;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.5 },
        });
        tl.to(contentRef.current, { opacity: 0, duration: 0.55 }, 0);
        if (!reduce) tl.to(contentRef.current, { scale: 0.94, y: -40, duration: 0.7 }, 0);
        if (drift) {
          tl.to('[data-drift="plane"]', { y: -60 * drift, duration: 1 }, 0)
            .to('[data-drift="arch"]', { y: -90 * drift, duration: 1 }, 0)
            .to('[data-drift="lines"]', { y: -24 * drift, duration: 1 }, 0);
        }
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      id={sectionIds.top}
      ref={ref}
      aria-label="El Conceptz"
      className="relative h-[130dvh] room-ivory"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <OpeningScene />

        <div
          ref={contentRef}
          className="wrap relative flex h-full flex-col items-center justify-center pt-[var(--nav-height)] pb-16 text-center"
        >
          <h1 className="sr-only">El Conceptz, interior design studio</h1>

          {/* Lockup: mark, wordmark and rule share one width so they read as one brand */}
          <div
            className="flex w-[var(--lockup)] flex-col items-center"
            style={{ "--lockup": lockupWidth } as CSSProperties}
          >
            <AnimatedMark className="w-[60%]" />
            <div
              data-lockup="wordmark"
              className="mt-[7%] w-full"
              style={{ clipPath: "inset(0 100% 0 0)", transform: "translateY(8px)" }}
            >
              <Wordmark />
            </div>
            <div className="relative mt-[5.5%] h-[2px] w-[38%]" aria-hidden>
              <span
                data-lockup="rule"
                className="absolute inset-x-0 top-px h-px bg-slate/25"
                style={{ transform: "scaleX(0)" }}
              />
              <span
                data-lockup="tick"
                className="absolute top-0 right-0 h-[2px] w-[6px] bg-brick"
                style={{ opacity: 0 }}
              />
            </div>
          </div>

          <WordReveal
            immediate
            text={openingCopy.statement}
            as="p"
            delay={2.3}
            className="font-display mt-10 max-w-[20ch] text-[1.75rem] leading-[1.12] text-slate sm:mt-12 sm:text-[2.25rem] lg:text-[2.75rem]"
          />

          <motion.div
            className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9, duration: 0.8 }}
          >
            <ButtonLink href={openingCopy.primaryCta.href} className="justify-center">
              {openingCopy.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={contactCta.href}
              variant="quiet"
              arrow={false}
              className="justify-center"
            >
              {contactCta.label}
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
