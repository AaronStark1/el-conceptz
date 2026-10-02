/**
 * The single branded call to action, shared by the header and the mobile menu. A teal-outlined
 * pill that fills with deep teal on hover; deliberately quieter than the hero buttons.
 */
export const ctaPill =
  "group inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full border border-teal bg-ivory/50 px-5 text-sm font-semibold tracking-[0.01em] text-teal-ink transition-[background-color,color,border-color,scale] duration-300 ease-[var(--ease-out)] hover:border-teal-deep hover:bg-teal-deep hover:text-ivory active:scale-[0.98]";

/** Arrow inside the pill. Nudges forward on hover, nothing more. */
export const ctaPillArrow =
  "h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5";
