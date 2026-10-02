"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ctaPill, ctaPillArrow } from "@/components/navigation/cta-pill";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { contactCta, primaryNav } from "@/content/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

const sectionIds = primaryNav.map((item) => item.sectionId);

/**
 * The logo is rendered once at its unscrolled size and scaled down with a transform when the
 * header compacts, so next/image never re-renders and the layout never jumps.
 */
const LOGO_HEIGHT = 38;
const LOGO_HEIGHT_SCROLLED = 31;
const logoScrolledScale = LOGO_HEIGHT_SCROLLED / LOGO_HEIGHT;

/** The active-section indicator glides between links on a tween, never a spring. */
const indicatorTransition = { type: "tween", duration: 0.5, ease: easeOut } as const;

/**
 * Fixed header. Transparent over the opening, then a translucent ivory surface once the
 * page is scrolled. The active-section indicator glides between links.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(sectionIds);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    if (next !== scrolled) setScrolled(next);
  });

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-[var(--ease-out)]",
          scrolled
            ? "border-b border-[var(--hairline)] bg-[rgb(247_244_239/0.84)] shadow-[0_1px_0_rgb(var(--shadow-tint)/0.02),0_12px_32px_-24px_rgb(var(--shadow-tint)/0.35)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9, ease: easeOut }}
      >
        <div
          className={cn(
            "wrap flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-out)]",
            scrolled ? "h-16" : "h-[var(--nav-height)]"
          )}
        >
          <Link href="#top" aria-label="El Conceptz, back to top" className="flex items-center">
            <span
              // The link carries the name; hide the inner image so it is not announced twice.
              aria-hidden
              className="flex origin-left transition-transform duration-500 ease-[var(--ease-out)]"
              style={{ transform: scrolled ? `scale(${logoScrolledScale})` : "scale(1)" }}
            >
              <Logo height={LOGO_HEIGHT} priority />
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {primaryNav.map((item) => {
                const isActive = active === item.sectionId;
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "block py-2 text-[0.9375rem] leading-6 font-semibold tracking-[0.01em] transition-colors duration-300 ease-[var(--ease-out)]",
                        isActive ? "text-teal-ink" : "text-slate/80 hover:text-teal-ink"
                      )}
                    >
                      {item.label}
                    </Link>
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        aria-hidden
                        className="absolute inset-x-0 bottom-1 h-0.5 bg-brick"
                        transition={indicatorTransition}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href={contactCta.href} className={cn(ctaPill, "hidden lg:inline-flex")}>
              {contactCta.label}
              <ArrowRight className={ctaPillArrow} strokeWidth={1.75} aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label="Open menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate transition-colors duration-300 hover:bg-teal/10 lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </>
  );
}
