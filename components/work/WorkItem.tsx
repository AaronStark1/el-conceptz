"use client";

import { ArrowUpRight } from "lucide-react";
import { useLightbox } from "@/components/gallery/LightboxProvider";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Reveal } from "@/components/ui/Reveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { categoryLabels } from "@/content/projects";
import { workCopy } from "@/content/copy";
import type { ResolvedProject } from "@/lib/images";
import { cn } from "@/lib/utils";

export type WorkLayout = "portraitLead" | "fullBleed" | "textFirst" | "pair" | "quiet";

/** Layout families cycle through the sequence so no two neighbours share a composition. */
const layoutSequence: WorkLayout[] = ["portraitLead", "fullBleed", "textFirst", "pair", "quiet"];

interface WorkItemProps {
  project: ResolvedProject;
  /** Position in the sequence; decides the layout family. */
  index: number;
}

export function WorkItem({ project, index }: WorkItemProps) {
  const layout = layoutSequence[index % layoutSequence.length];
  const { open } = useLightbox();
  const photos = [project.hero, ...project.gallery];
  const view = (at = 0) => open({ photos, index: at, label: project.title });
  const headingId = `work-${project.id}`;

  const meta = (
    <p className="text-meta flex flex-wrap gap-x-5 gap-y-1">
      <span className="text-teal-deep">{categoryLabels[project.category]}</span>
      {project.location && <span>{project.location}</span>}
      {project.year && <span>{project.year}</span>}
    </p>
  );

  const title = (className?: string) => (
    <WordReveal
      as="h3"
      text={project.title}
      stagger={0.05}
      className={cn(
        "font-display mt-4 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.04] text-slate",
        className
      )}
    />
  );

  const body = (className?: string) => (
    <div className={cn("measure-narrow", className)}>
      <p className="text-[1.0625rem] leading-relaxed text-slate-muted">{project.description}</p>
      {project.details && project.details.length > 0 && (
        <ul className="mt-6 space-y-2 text-[0.9375rem] text-slate-muted">
          {project.details.map((detail) => (
            <li key={detail} className="flex items-baseline gap-3">
              <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-teal" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => view(0)}
        className="group mt-8 inline-flex items-center gap-2 text-[0.8125rem] font-bold tracking-[0.06em] text-teal-deep"
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
  );

  const frameButton = (child: React.ReactNode, at: number, className?: string) => (
    <button
      type="button"
      onClick={() => view(at)}
      aria-label={`Open photographs of ${project.title}`}
      className={cn("group block w-full text-left focus-visible:outline-offset-4", className)}
    >
      {child}
    </button>
  );

  const sizesWide = "(min-width: 1024px) 60vw, 100vw";
  const sizesHalf = "(min-width: 1024px) 40vw, 100vw";
  const sizesSmall = "(min-width: 1024px) 22vw, 50vw";

  switch (layout) {
    case "portraitLead":
      return (
        <article aria-labelledby={headingId} className="wrap">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
            {frameButton(
              <ParallaxFrame
                photo={project.hero}
                sizes={sizesWide}
                className="aspect-[4/5]"
                enter="settle"
                priority={index === 0}
              />,
              0,
              "lg:col-span-7"
            )}
            <div className="lg:col-span-5 lg:pb-4 lg:pl-6">
              <Reveal family="fade" delay={0.15}>
                {meta}
              </Reveal>
              <span id={headingId} className="sr-only">
                {project.title}
              </span>
              {title()}
              <Reveal family="fade" delay={0.25}>
                {body("mt-7")}
              </Reveal>
              {project.gallery[0] &&
                frameButton(
                  <ParallaxFrame
                    photo={project.gallery[0]}
                    sizes={sizesSmall}
                    className="aspect-[4/3]"
                    enter="wipeLeft"
                    amount={4}
                    delay={0.2}
                  />,
                  1,
                  "mt-12 hidden w-[62%] lg:block"
                )}
            </div>
          </div>
        </article>
      );

    case "fullBleed":
      return (
        <article aria-labelledby={headingId}>
          {frameButton(
            <ParallaxFrame
              photo={project.hero}
              sizes="100vw"
              className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
              enter="zoomOut"
              amount={5}
              bleed
            />,
            0
          )}
          <div className="wrap mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal family="fade">{meta}</Reveal>
              <span id={headingId} className="sr-only">
                {project.title}
              </span>
              {title()}
            </div>
            <Reveal family="fade" delay={0.2} className="lg:col-span-4 lg:col-start-7 lg:pt-3">
              {body()}
            </Reveal>
            {project.gallery[0] &&
              frameButton(
                <ParallaxFrame
                  photo={project.gallery[0]}
                  sizes={sizesSmall}
                  className="aspect-[4/5]"
                  enter="rise"
                  amount={4}
                />,
                1,
                "hidden lg:col-span-2 lg:col-start-11 lg:block"
              )}
          </div>
        </article>
      );

    case "textFirst":
      return (
        <article aria-labelledby={headingId} className="wrap">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4 lg:pt-8">
              <Reveal family="fade">{meta}</Reveal>
              <span id={headingId} className="sr-only">
                {project.title}
              </span>
              {title()}
              <Reveal family="fade" delay={0.2}>
                {body("mt-7")}
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              {frameButton(
                <ParallaxFrame
                  photo={project.hero}
                  sizes={sizesWide}
                  className="aspect-[3/2]"
                  enter="wipeLeft"
                  amount={5}
                />,
                0
              )}
              <div className="mt-6 grid grid-cols-2 gap-4 lg:gap-6">
                {project.gallery[0] &&
                  frameButton(
                    <ParallaxFrame
                      photo={project.gallery[0]}
                      sizes={sizesSmall}
                      className="aspect-[4/5]"
                      enter="rise"
                      amount={4}
                    />,
                    1
                  )}
                {project.gallery[4] &&
                  frameButton(
                    <ParallaxFrame
                      photo={project.gallery[4]}
                      sizes={sizesSmall}
                      className="aspect-[4/5]"
                      enter="rise"
                      amount={4}
                      delay={0.12}
                    />,
                    5,
                    "lg:mt-16"
                  )}
              </div>
            </div>
          </div>
        </article>
      );

    case "pair":
      return (
        <article aria-labelledby={headingId} className="wrap">
          <div className="grid grid-cols-2 items-start gap-4 lg:gap-8">
            {frameButton(
              <ParallaxFrame
                photo={project.hero}
                sizes={sizesHalf}
                className="aspect-square"
                enter="rise"
                amount={5}
              />,
              0,
              "lg:mt-24"
            )}
            {project.gallery[0] &&
              frameButton(
                <ParallaxFrame
                  photo={project.gallery[0]}
                  sizes={sizesHalf}
                  className="aspect-square"
                  enter="rise"
                  amount={5}
                  delay={0.15}
                />,
                1
              )}
          </div>
          <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12">
            <div className="lg:col-span-6 lg:col-start-4">
              <Reveal family="fade">{meta}</Reveal>
              <span id={headingId} className="sr-only">
                {project.title}
              </span>
              {title()}
              <Reveal family="fade" delay={0.2}>
                {body("mt-7")}
              </Reveal>
            </div>
          </div>
        </article>
      );

    case "quiet":
      return (
        <article aria-labelledby={headingId} className="wrap">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5 lg:col-start-2">
              <Reveal family="fade">{meta}</Reveal>
              <span id={headingId} className="sr-only">
                {project.title}
              </span>
              {title()}
              <Reveal family="fade" delay={0.2}>
                {body("mt-7")}
              </Reveal>
            </div>
            {frameButton(
              <ParallaxFrame
                photo={project.hero}
                sizes={sizesHalf}
                className="aspect-[3/4]"
                enter="fade"
                amount={3}
              />,
              0,
              "lg:col-span-4 lg:col-start-8"
            )}
          </div>
        </article>
      );
  }
}
