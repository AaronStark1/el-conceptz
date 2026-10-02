/**
 * Single GSAP entry point for the site. Import `gsap`, `useGSAP` and `ScrollTrigger` from
 * here rather than from the packages directly, so plugins are registered exactly once and
 * every tween can reach the brand easing curves by name.
 *
 * GSAP is only ever *run* on the client (inside useGSAP / effects); importing and
 * registering at module level is safe during server rendering.
 */
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easing } from "@/content/theme";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, CustomEase);

/** Named eases matching the CSS tokens (`--ease-out`, `--ease-in-out`) and `easing` in the theme. */
export const brandEase = {
  out: "brand.out",
  inOut: "brand.inOut",
  soft: "brand.soft",
} as const;

if (!CustomEase.get(brandEase.out)) CustomEase.create(brandEase.out, easing.out.join(","));
if (!CustomEase.get(brandEase.inOut)) CustomEase.create(brandEase.inOut, easing.inOut.join(","));
if (!CustomEase.get(brandEase.soft)) CustomEase.create(brandEase.soft, easing.soft.join(","));

gsap.defaults({ ease: brandEase.out });

// The address bar showing and hiding on phones is not a layout change worth a refresh.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Conditions for gsap.matchMedia(). Use the object form so one handler can read
 * `conditions.reduce` / `conditions.mobile` and scale motion accordingly.
 */
export const motionQueries = {
  reduce: "(prefers-reduced-motion: reduce)",
  mobile: "(max-width: 767px)",
  desktop: "(min-width: 768px)",
} as const;

export { gsap, useGSAP, ScrollTrigger, ScrollToPlugin };
