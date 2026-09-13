"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLightbox } from "@/components/gallery/LightboxProvider";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { storyCopy, workCopy } from "@/content/copy";
import { sectionIds } from "@/content/navigation";
import { easeOut } from "@/lib/motion";
import type { ResolvedProject, ResolvedStoryChapter } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Pinned storytelling. On desktop the photograph stays put while the chapters scroll
 * past it and swap the image; on small screens each chapter carries its own photograph.
 */
export function ProjectStory({ project }: { project: ResolvedProject }) {
  const story = project.story;
  const [active, setActive] = useState(0);
  const { open } = useLightbox();
  if (!story) return null;

  const chapters = story.chapters;
  const photos = [project.hero, ...project.gallery];
  const current = chapters[active] ?? chapters[0];

  return (
    <section
      id={sectionIds.story}
      aria-labelledby="story-heading"
      className="room-linen py-[clamp(5rem,12vh,9rem)]"
    >
      <div className="wrap">
        <div className="max-w-[60ch]">
          <Reveal family="wipeBottom">
            <h2
              id="story-heading"
              className="heading-mark font-display text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.02] text-slate"
            >
              {storyCopy.heading}
            </h2>
          </Reveal>
          <Reveal family="fade" delay={0.15}>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-muted">{story.intro}</p>
            <p className="text-meta mt-4">{project.title}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            {chapters.map((chapter, i) => (
              <Chapter
                key={chapter.title}
                chapter={chapter}
                index={i}
                active={active === i}
                onActive={setActive}
                onOpen={() =>
                  open({ photos: chapters.map((c) => c.photo), index: i, label: project.title })
                }
                last={i === chapters.length - 1}
              />
            ))}
          </div>

          <div className="order-1 hidden lg:order-2 lg:col-span-7 lg:block">
            <div className="sticky top-[calc(var(--nav-height)+1.5rem)]">
              <div className="photo aspect-[4/5] max-h-[calc(100dvh-var(--nav-height)-6rem)] w-full">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.photo.src}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.45 } }}
                    transition={{ duration: 0.9, ease: easeOut }}
                  >
                    <Photo photo={current.photo} sizes="(min-width: 1024px) 55vw, 100vw" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-4 flex items-center justify-between gap-6">
                <p className="text-meta">{current.title}</p>
                <button
                  type="button"
                  onClick={() => open({ photos, index: 0, label: project.title })}
                  className="group inline-flex items-center gap-2 text-[0.8125rem] font-bold tracking-[0.06em] text-teal-deep"
                >
                  <span className="link-line">{workCopy.viewProject}</span>
                  <span className="text-slate-muted">{photos.length}</span>
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.75}
                    className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter({
  chapter,
  index,
  active,
  onActive,
  onOpen,
  last,
}: {
  chapter: ResolvedStoryChapter;
  index: number;
  active: boolean;
  onActive: (i: number) => void;
  onOpen: () => void;
  last: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <article
      ref={ref}
      className={cn(
        "flex flex-col justify-center py-10 lg:min-h-[70vh] lg:py-0",
        !last && "border-b border-[var(--hairline)] lg:border-0"
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open photograph: ${chapter.title}`}
        className="photo mb-7 block aspect-[4/5] w-full lg:hidden"
      >
        <Photo photo={chapter.photo} sizes="100vw" />
      </button>
      <Reveal family="rise" amount={0.4}>
        <h3
          className={cn(
            "font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.1] transition-colors duration-700",
            active ? "text-slate lg:text-teal-deep" : "text-slate lg:text-slate/45"
          )}
        >
          {chapter.title}
        </h3>
        <p
          className={cn(
            "measure-narrow mt-4 text-[1.0625rem] leading-relaxed transition-colors duration-700",
            active ? "text-slate-muted" : "text-slate-muted lg:text-slate-muted/55"
          )}
        >
          {chapter.body}
        </p>
      </Reveal>
    </article>
  );
}
