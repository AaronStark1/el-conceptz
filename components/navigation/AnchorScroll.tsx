"use client";

import { useEffect } from "react";
import { brandEase, gsap } from "@/lib/gsap";

/** Breathing room between the compact header and the section it points at. */
const HEADER_GAP = 20;

/**
 * Where an in-page anchor should land. By the time we arrive the header is always in its
 * compact, scrolled state, so the offset is measured against that height rather than the
 * taller unscrolled one.
 */
function headerOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--nav-height-scrolled");
  const parsed = parseFloat(raw);
  return (Number.isFinite(parsed) ? parsed : 64) + HEADER_GAP;
}

/** Scroll to a hash target with the header offset applied. Instant under reduced motion. */
export function scrollToHash(hash: string): boolean {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return false;
  const target = id === "top" ? document.body : document.getElementById(id);
  if (!target) return false;

  const y =
    id === "top"
      ? 0
      : Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset());

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.killTweensOf(window);
    window.scrollTo({ top: y, behavior: "auto" });
    return true;
  }

  const distance = Math.abs(y - window.scrollY);
  const duration = gsap.utils.clamp(0.6, 1.4, 0.45 + distance / 2600);
  gsap.to(window, {
    duration,
    ease: brandEase.inOut,
    overwrite: true,
    // autoKill hands control back the moment the visitor scrolls themselves.
    scrollTo: { y, autoKill: true },
  });
  return true;
}

/**
 * One listener for every in-page anchor on the site (header, mobile menu, hero buttons,
 * footer). It runs in the capture phase and calls preventDefault, which next/link honours
 * by stepping aside, while React onClick handlers on the same anchor still run. The hash is
 * pushed to history so links stay shareable.
 */
export function AnchorScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href.startsWith("#") || href.length < 2) return;

      const handled = scrollToHash(href);
      if (!handled) return;
      e.preventDefault();
      if (window.location.hash !== href) window.history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
