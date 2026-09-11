"use client";

import { motion } from "framer-motion";
import { useLightbox } from "@/components/gallery/LightboxProvider";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { galleryCopy } from "@/content/copy";
import { sectionIds } from "@/content/navigation";
import { easeOut, viewportOnce } from "@/lib/motion";
import type { ResolvedGalleryItem } from "@/lib/images";

type Block =
  | { kind: "columns"; items: (ResolvedGalleryItem & { index: number })[] }
  | { kind: "wide"; item: ResolvedGalleryItem & { index: number } };

function toBlocks(items: ResolvedGalleryItem[]): Block[] {
  const blocks: Block[] = [];
  let current: (ResolvedGalleryItem & { index: number })[] = [];
  items.forEach((item, index) => {
    if (item.emphasis === "wide") {
      if (current.length) blocks.push({ kind: "columns", items: current });
      current = [];
      blocks.push({ kind: "wide", item: { ...item, index } });
    } else {
      current.push({ ...item, index });
    }
  });
  if (current.length) blocks.push({ kind: "columns", items: current });
  return blocks;
}

/**
 * Editorial masonry. Photographs keep their own proportions in flowing columns, and a
 * wide photograph occasionally interrupts the columns to run the full width.
 */
export function Gallery({ items }: { items: ResolvedGalleryItem[] }) {
  const { open } = useLightbox();
  const photos = items.map((item) => item.photo);
  const blocks = toBlocks(items);

  return (
    <section
      id={sectionIds.gallery}
      aria-labelledby="gallery-heading"
      className="room-ivory py-[clamp(5rem,12vh,9rem)]"
    >
      <div className="wrap">
        <div className="max-w-[60ch]">
          <Reveal family="wipeBottom">
            <h2
              id="gallery-heading"
              className="font-display text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.02] text-slate"
            >
              {galleryCopy.heading}
            </h2>
          </Reveal>
          <Reveal family="fade" delay={0.15}>
            <p className="mt-5 text-[1.0625rem] text-slate-muted">{galleryCopy.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 lg:mt-20">
          {blocks.map((block, bi) =>
            block.kind === "wide" ? (
              <button
                key={`wide-${block.item.index}`}
                type="button"
                onClick={() =>
                  open({ photos, index: block.item.index, label: block.item.projectTitle })
                }
                aria-label={`Open photograph: ${block.item.photo.alt}`}
                className="group my-4 block w-full focus-visible:outline-offset-4 md:my-5 lg:my-6"
              >
                <ParallaxFrame
                  photo={block.item.photo}
                  sizes="100vw"
                  className="aspect-[16/10] lg:aspect-[21/9]"
                  enter="zoomOut"
                  amount={5}
                />
              </button>
            ) : (
              <div key={`columns-${bi}`} className="columns-2 gap-4 md:columns-3 md:gap-5 lg:gap-6">
                {block.items.map((item, i) => (
                  <motion.button
                    key={item.photo.src}
                    type="button"
                    onClick={() => open({ photos, index: item.index, label: item.projectTitle })}
                    aria-label={`Open photograph: ${item.photo.alt}`}
                    className="photo group mb-4 block w-full break-inside-avoid focus-visible:outline-offset-4 md:mb-5 lg:mb-6"
                    style={{ aspectRatio: `${item.photo.width} / ${item.photo.height}` }}
                    initial={{ opacity: 0, scale: 0.965 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ ...viewportOnce, amount: 0.2 }}
                    transition={{ duration: 0.9, ease: easeOut, delay: (i % 3) * 0.08 }}
                  >
                    <Photo
                      photo={item.photo}
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 50vw"
                      className="transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
                    />
                  </motion.button>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
