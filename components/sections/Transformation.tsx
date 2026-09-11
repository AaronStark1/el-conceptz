"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BeforeAfterSlider } from "@/components/before-after/BeforeAfterSlider";
import { Reveal } from "@/components/ui/Reveal";
import { transformationCopy } from "@/content/copy";
import { sectionIds } from "@/content/navigation";
import type { ResolvedPair } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Before and after. One large comparison, with the other viewpoints listed beside it.
 * The orange rule glides to whichever viewpoint is showing.
 */
export function Transformation({ pairs }: { pairs: ResolvedPair[] }) {
  const [activeId, setActiveId] = useState(pairs[0]?.id);
  const active = pairs.find((pair) => pair.id === activeId) ?? pairs[0];
  if (!active) return null;

  return (
    <section
      id={sectionIds.transformations}
      aria-labelledby="transformations-heading"
      className="room-white py-[clamp(5rem,12vh,9rem)]"
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-10">
        <div className="lg:col-span-4">
          <Reveal family="wipeBottom">
            <h2
              id="transformations-heading"
              className="font-display text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.02] text-slate"
            >
              {transformationCopy.heading}
            </h2>
          </Reveal>
          <Reveal family="fade" delay={0.15}>
            <p className="measure-narrow mt-5 text-[1.0625rem] text-slate-muted">
              {transformationCopy.intro}
            </p>
          </Reveal>
        </div>

        <Reveal
          family="fade"
          amount={0.2}
          className="lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:min-h-[min(76vh,820px)]"
        >
          <BeforeAfterSlider pair={active} />
        </Reveal>

        <div className="lg:col-span-4 lg:col-start-1 lg:row-start-2">
          {pairs.length > 1 && (
            <Reveal family="fade" delay={0.25}>
              <ul role="list" aria-label="Viewpoints" className="border-t border-[var(--hairline)]">
                {pairs.map((pair) => {
                  const isActive = pair.id === active.id;
                  return (
                    <li key={pair.id} className="relative border-b border-[var(--hairline)]">
                      {isActive && (
                        <motion.span
                          layoutId="pair-marker"
                          aria-hidden
                          className="absolute -left-px top-3 bottom-3 w-0.5 bg-brick"
                          transition={{ type: "spring", stiffness: 320, damping: 34 }}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveId(pair.id)}
                        aria-pressed={isActive}
                        className={cn(
                          "flex w-full items-baseline justify-between gap-4 py-4 pl-5 text-left transition-colors duration-300 focus-visible:outline-offset-[-3px]",
                          isActive ? "text-slate" : "text-slate-muted hover:text-slate"
                        )}
                      >
                        <span className="font-display text-[1.375rem] leading-tight">
                          {pair.title}
                        </span>
                        {pair.projectTitle && (
                          <span className="text-meta hidden text-right sm:inline">
                            {pair.projectTitle}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              {active.viewpoint && <p className="text-meta">{active.viewpoint}</p>}
              {active.description && (
                <p className="measure-narrow mt-2 text-[0.9375rem] leading-relaxed text-slate-muted">
                  {active.description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
