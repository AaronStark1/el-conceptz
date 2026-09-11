import { logoColors } from "@/content/theme";

/**
 * Vector version of the El Conceptz mark, traced from the supplied logo artwork.
 * Geometry lives in one place so the favicon, footer and animated opening agree.
 */
export const MARK_VIEWBOX = "0 0 112.8 89.7";

export const markPaths = {
  teal: "M6 0H65A6 6 0 0 1 71 6V13H24.6V46H71V65A6 6 0 0 1 65 71H6A6 6 0 0 1 0 65V6A6 6 0 0 1 6 0Z",
  gray: "M75.3 16.4H106.8A6 6 0 0 1 112.8 22.4V83.7A6 6 0 0 1 106.8 89.7H49.1V76.7H87.3V40H75.3Z",
  orange: { x: 49.1, y: 16.4, width: 21.9, height: 23.6 },
} as const;

export function LogoMark({
  className,
  title = "El Conceptz",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={markPaths.teal} fill={logoColors.teal} />
      <path d={markPaths.gray} fill={logoColors.gray} />
      <rect {...markPaths.orange} fill={logoColors.orange} />
    </svg>
  );
}
