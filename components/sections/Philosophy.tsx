"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { philosophyCopy } from "@/content/copy";
import { sectionIds } from "@/content/navigation";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { splitWords } from "@/lib/utils";

/**
 * The pause. One sentence that the visitor reads at the pace they scroll:
 * each word darkens as it enters the reading band. Nothing else moves.
 */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const words = splitWords(philosophyCopy.statement);

  return (
    <section
      id={sectionIds.philosophy}
      ref={ref}
      aria-labelledby="philosophy-heading"
      className="room-stone py-[clamp(7rem,20vh,14rem)]"
    >
      <div className="wrap">
        <h2 id="philosophy-heading" className="sr-only">
          Design philosophy
        </h2>
        <p
          className="heading-mark font-display max-w-[21ch] text-[clamp(2.25rem,5.4vw,5rem)] leading-[1.06] text-slate"
          aria-label={philosophyCopy.statement}
        >
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              word={word}
              progress={scrollYProgress}
              start={i / words.length}
              end={Math.min(1, (i + 1.6) / words.length)}
              reduce={reduce}
            />
          ))}
        </p>
        <Reveal family="fade" className="mt-12 lg:ml-[35%]">
          <p className="measure-narrow text-[1.0625rem] leading-relaxed text-slate-muted">
            {philosophyCopy.support}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Word({
  word,
  progress,
  start,
  end,
  reduce,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span
      aria-hidden
      className="mr-[0.26em] inline-block"
      style={{ opacity: reduce ? 1 : opacity }}
    >
      {word}
    </motion.span>
  );
}
