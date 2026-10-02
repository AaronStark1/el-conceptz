"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ctaPill, ctaPillArrow } from "@/components/navigation/cta-pill";
import { contactActions } from "@/content/contact";
import { contactCta, primaryNav } from "@/content/navigation";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { easeInOut, easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  active: string;
}

/**
 * Full-screen menu for small screens. The ivory surface drops in like a blind,
 * links follow one after another, and everything reverses on close.
 */
export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const firstLink = useRef<HTMLAnchorElement>(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => firstLink.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [open, onClose]);

  const email = contactActions.find((a) => a.kind === "email");
  const phone = contactActions.find((a) => a.kind === "phone");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col room-ivory lg:hidden"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: easeInOut, opacity: { duration: 0.35 } }}
        >
          <div className="wrap flex h-[var(--nav-height)] items-center justify-between">
            <Logo height={34} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate transition-colors duration-300 hover:bg-teal/10"
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <nav aria-label="Primary" className="wrap flex flex-1 flex-col justify-center pb-10">
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="overflow-hidden"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: easeOut }}
                >
                  <Link
                    ref={i === 0 ? firstLink : undefined}
                    href={item.href}
                    onClick={onClose}
                    aria-current={active === item.sectionId ? "true" : undefined}
                    className={cn(
                      "font-display block py-2 text-[2.75rem] leading-[1.05] transition-colors",
                      active === item.sectionId
                        ? "text-teal-deep"
                        : "text-slate-muted hover:text-teal-deep"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-10 border-t border-[var(--hairline)] pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <Link href={contactCta.href} onClick={onClose} className={ctaPill}>
                {contactCta.label}
                <ArrowRight className={ctaPillArrow} strokeWidth={1.75} aria-hidden />
              </Link>
              <div className="text-meta mt-6 flex flex-col gap-1.5">
                {email && (
                  <a href={email.href} className="transition-colors hover:text-teal-deep">
                    {email.value}
                  </a>
                )}
                {phone && (
                  <a href={phone.href} className="transition-colors hover:text-teal-deep">
                    {phone.value}
                  </a>
                )}
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
