import type { NavItem } from "@/types";

/**
 * Primary navigation. Contact is deliberately not listed here: the single
 * "Start a project" action in the header and footer carries that intent.
 */
export const primaryNav: NavItem[] = [
  { label: "Studio", href: "#studio", sectionId: "studio" },
  { label: "Work", href: "#work", sectionId: "work" },
  { label: "Transformations", href: "#transformations", sectionId: "transformations" },
  { label: "Gallery", href: "#gallery", sectionId: "gallery" },
  { label: "Services", href: "#services", sectionId: "services" },
];

export const contactCta = {
  label: "Start a project",
  href: "#contact" as const,
};

export const sectionIds = {
  top: "top",
  studio: "studio",
  work: "work",
  story: "story",
  transformations: "transformations",
  gallery: "gallery",
  services: "services",
  philosophy: "philosophy",
  contact: "contact",
} as const;
