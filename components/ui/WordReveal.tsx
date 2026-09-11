"use client";

import { motion } from "framer-motion";
import { easeOut, viewportOnce } from "@/lib/motion";
import { cn, splitWords } from "@/lib/utils";

const tags = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
} as const;
export type WordRevealTag = keyof typeof tags;

interface WordRevealProps {
  text: string;
  as?: WordRevealTag;
  className?: string;
  /** Seconds between words. */
  stagger?: number;
  delay?: number;
  /** Start immediately on mount instead of waiting for the viewport. */
  immediate?: boolean;
}

/**
 * Typography that arrives word by word, each word rising out of a clipped line box.
 * Screen readers get the whole sentence in one accessible label.
 */
export function WordReveal({
  text,
  as = "p",
  className,
  stagger = 0.045,
  delay = 0,
  immediate = false,
}: WordRevealProps) {
  const Component = tags[as];
  const words = splitWords(text);

  return (
    <Component
      className={cn(className)}
      aria-label={text}
      initial="hidden"
      {...(immediate ? { animate: "visible" } : { whileInView: "visible", viewport: viewportOnce })}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
          aria-hidden
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "105%", opacity: 0 },
              visible: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: easeOut } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Component>
  );
}
