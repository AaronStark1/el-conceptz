import { logoColors } from "@/content/theme";
import { MARK_VIEWBOX, markPaths } from "@/components/brand/LogoMark";

/**
 * The mark as three loose pieces, rendered in their starting positions (hidden, offset) so
 * the page never flashes the assembled logo before the opening timeline runs. Opening.tsx
 * animates them by `data-piece`: the teal bracket arrives from the left, the grey bracket
 * from the right, and the orange square is the last piece to lock into place.
 * Geometry is identical to the static LogoMark.
 */
export function AnimatedMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role="img"
      aria-label="El Conceptz mark"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      <path
        data-piece="teal"
        d={markPaths.teal}
        fill={logoColors.teal}
        style={{ opacity: 0, transform: "translateX(-22px)" }}
      />
      <path
        data-piece="gray"
        d={markPaths.gray}
        fill={logoColors.gray}
        style={{ opacity: 0, transform: "translate(22px, 8px)" }}
      />
      <rect
        data-piece="orange"
        {...markPaths.orange}
        fill={logoColors.orange}
        style={{
          opacity: 0,
          transform: "scale(0)",
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      />
    </svg>
  );
}
