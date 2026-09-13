"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { servicesCopy } from "@/content/copy";
import { sectionIds } from "@/content/navigation";
import { easeOut, viewportOnce } from "@/lib/motion";
import type { Photo as PhotoType, Service } from "@/types";
import { cn } from "@/lib/utils";

export interface ServiceGroup {
  title: string;
  services: (Service & { photo?: PhotoType })[];
}

/**
 * Services as a typographic index in three clusters. On desktop, pointing at a service
 * swaps the photograph in the pinned frame; on touch screens every line stays readable
 * with its description underneath.
 */
export function Services({ groups }: { groups: ServiceGroup[] }) {
  const all = groups.flatMap((g) => g.services);
  const firstWithPhoto = all.findIndex((s) => s.photo);
  const [active, setActive] = useState(firstWithPhoto === -1 ? 0 : firstWithPhoto);
  const activePhoto = all[active]?.photo ?? all.find((s) => s.photo)?.photo;

  return (
    <section
      id={sectionIds.services}
      aria-labelledby="services-heading"
      className="room-linen py-[clamp(5rem,12vh,9rem)]"
    >
      <div className="wrap">
        <Reveal family="wipeBottom">
          <h2
            id="services-heading"
            className="heading-mark font-display text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.02] text-slate"
          >
            {servicesCopy.heading}
          </h2>
        </Reveal>
        <Reveal family="fade" delay={0.15}>
          <p className="measure-narrow mt-5 text-[1.0625rem] text-slate-muted">
            {servicesCopy.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {groups.map((group, gi) => {
              const offset = groups.slice(0, gi).reduce((n, g) => n + g.services.length, 0);
              return (
                <motion.div
                  key={group.title}
                  className={cn(
                    "grid gap-6 border-t border-[var(--hairline-strong)] py-8 sm:grid-cols-[7rem_1fr] sm:gap-8 lg:py-10",
                    gi === groups.length - 1 && "border-b"
                  )}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
                >
                  <span className="text-label pt-2 text-teal-deep">{group.title}</span>
                  <ul className="flex flex-col gap-1">
                    {group.services.map((service, si) => {
                      const index = offset + si;
                      const isActive = index === active;
                      return (
                        <motion.li
                          key={service.id}
                          variants={{
                            hidden: { opacity: 0, x: -14 },
                            visible: {
                              opacity: 1,
                              x: 0,
                              transition: { duration: 0.7, ease: easeOut },
                            },
                          }}
                        >
                          <div
                            className="group cursor-default py-2.5 outline-none"
                            tabIndex={0}
                            onMouseEnter={() => setActive(index)}
                            onFocus={() => setActive(index)}
                            aria-current={isActive ? "true" : undefined}
                          >
                            <h3
                              className={cn(
                                "font-display text-[clamp(1.625rem,2.6vw,2.375rem)] leading-[1.1] transition-[color,transform] duration-500 ease-[var(--ease-out)]",
                                isActive
                                  ? "text-slate lg:translate-x-2 lg:text-teal-deep"
                                  : "text-slate/70"
                              )}
                            >
                              {service.title}
                            </h3>
                            <p
                              className={cn(
                                "measure-narrow mt-1.5 text-[0.9375rem] leading-relaxed text-slate-muted transition-opacity duration-500 lg:mt-2",
                                isActive ? "opacity-100" : "lg:opacity-55"
                              )}
                            >
                              {service.description}
                            </p>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="photo sticky top-[calc(var(--nav-height)+2rem)] aspect-[4/5] lg:ml-8">
              <AnimatePresence initial={false}>
                {activePhoto && (
                  <motion.div
                    key={activePhoto.src}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.35 } }}
                    transition={{ duration: 0.8, ease: easeOut }}
                  >
                    <Photo photo={activePhoto} sizes="(min-width: 1024px) 34vw, 0px" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
