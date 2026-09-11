import type { SiteConfig } from "@/types";

/**
 * Studio-level configuration.
 * TODO(owner): confirm siteUrl, region and social links before launch.
 */
export const siteConfig: SiteConfig = {
  name: "El Conceptz",
  legalName: "El Conceptz",
  tagline: "Interior design with more than twenty years of practice",
  description:
    "El Conceptz is an interior design studio with more than twenty years of experience across villas, apartments and renovations: space planning, custom joinery, lighting and turnkey execution.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://elconceptz.com",
  locale: "en_IN",
  // Project folders point to Kerala (Karunagappally, Kochi). Confirm the studio address separately.
  region: "Kerala, India",
  experienceYears: 20,
  // No social profiles have been confirmed. Add entries here and the footer will render them.
  socialLinks: [],
};
