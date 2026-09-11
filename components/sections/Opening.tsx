"use client";

import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedMark } from "@/components/brand/AnimatedMark";
import { Wordmark } from "@/components/brand/Logo";
import { OpeningScene, useOpeningProgress } from "@/components/sections/OpeningScene";
import { ButtonLink } from "@/components/ui/Button";
import { WordReveal } from "@/components/ui/WordReveal";
import { openingCopy } from "@/content/copy";
import { contactCta, sectionIds } from "@/content/navigation";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { easeOut } from "@/lib/motion";

/**
 * The entrance. The composition holds for a moment while the visitor scrolls, then
 * recedes as the studio section arrives over it.
 */
export function Opening() {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLElement>(null);
  const progress = useOpeningProgress(ref);
  const contentOpacity = useTransform(progress, [0, 0.55], [1, 0]);
  const contentScale = useTransform(progress, [0, 0.7], [1, reduce ? 1 : 0.94]);
  const contentY = useTransform(progress, [0, 0.7], [0, reduce ? 0 : -40]);

  return (
    <section
      id={sectionIds.top}
      ref={ref}
      aria-label="El Conceptz"
      className="relative h-[130dvh] room-ivory"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <OpeningScene progress={progress} />

        <motion.div
          className="wrap relative flex h-full flex-col items-center justify-center pt-[var(--nav-height)] pb-16 text-center"
          style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
        >
          <h1 className="sr-only">El Conceptz, interior design studio</h1>

          <AnimatedMark className="w-[min(44vw,240px)] sm:w-[min(30vw,300px)] lg:w-[min(24vw,340px)]" />

          <motion.div
            className="mt-8 sm:mt-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.65, duration: 0.9, ease: easeOut }}
          >
            <Wordmark height={30} className="sm:!h-[38px] sm:!w-auto" />
          </motion.div>

          <WordReveal
            immediate
            text={openingCopy.statement}
            as="p"
            delay={2.05}
            className="font-display-light mt-10 max-w-[20ch] text-[1.75rem] leading-[1.15] text-slate sm:mt-12 sm:text-[2.25rem] lg:text-[2.75rem]"
          />

          <motion.div
            className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7, duration: 0.8 }}
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
        </motion.div>
      </div>
    </section>
  );
}
