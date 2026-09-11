import type { PhotoRef } from "@/types";

/** Photographs used outside the project sequences. */
export const studioImages: { portrait: PhotoRef; detail: PhotoRef } = {
  portrait: {
    src: "/images/projects/terracotta-jali-villa/02-upper-landing.jpg",
    alt: "Upper landing under exposed terracotta roof tiles with pendant lanterns and a jali wall",
  },
  detail: {
    src: "/images/projects/skylit-courtyard-villa/08-curio-shelf.jpg",
    alt: "Lit oak curio shelf against textured wallpaper",
  },
};

export const siteImages: { social: PhotoRef } = {
  social: {
    src: "/images/projects/skylit-courtyard-villa/01-courtyard-swing.jpg",
    alt: "Double-height courtyard with a rosewood swing under a pitched skylight",
  },
};
