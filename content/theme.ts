/**
 * Brand theme constants for use in JavaScript (SVG fills, canvas, structured data).
 * CSS custom properties in `app/globals.css` are the source of truth for styling.
 */
export const palette = {
  ivory: "#F7F4EF",
  warmWhite: "#FCFBF8",
  linen: "#EFE9E1",
  stone: "#E8E2D9",
  slateDeep: "#2F3941",
  slateMuted: "#556772",
  grayMuted: "#7B858C",
  teal: "#2F8F8A",
  tealSoft: "#5DA39F",
  tealDeep: "#26736F",
  tealInk: "#1F5F5B",
  tealLight: "#7FC1BC",
  brick: "#F4510A",
  terracotta: "#C66B43",
} as const;

/** Colours sampled from the supplied logo artwork. Used only by the logo components. */
export const logoColors = {
  teal: "#2F8F8A",
  gray: "#B9C1C4",
  orange: "#F4510A",
} as const;

/**
 * Corner radius rule for the whole page:
 * rectangles (photos, buttons, inputs, menus) use 6px; circular controls (icon buttons,
 * the comparison handle) use a full radius. Nothing else.
 */
export const radius = {
  rect: 6,
  circle: 9999,
} as const;

export const easing = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  soft: [0.33, 1, 0.68, 1] as const,
};

export const duration = {
  fast: 0.22,
  base: 0.6,
  slow: 1.1,
  reveal: 1.4,
} as const;
