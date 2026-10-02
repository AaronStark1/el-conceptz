/**
 * Anime.js helpers. Anime is used for a few precise instruments (the hero drafting lines,
 * the brand lockup timeline); GSAP remains the primary tool for scroll choreography.
 * Import easings from here so both libraries share the brand curves.
 */
import { cubicBezier } from "animejs";
import { easing } from "@/content/theme";

export const animeEase = {
  out: cubicBezier(...easing.out),
  inOut: cubicBezier(...easing.inOut),
  soft: cubicBezier(...easing.soft),
};

/** Anime durations are in milliseconds; these mirror the CSS duration tokens. */
export const animeDuration = {
  fast: 220,
  base: 600,
  slow: 1100,
  reveal: 1400,
} as const;
