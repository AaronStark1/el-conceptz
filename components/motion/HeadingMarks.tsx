"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Draws every `.heading-mark` rule once as its heading enters the viewport. One batched
 * ScrollTrigger for the whole page; the drawing itself is a CSS transform transition in
 * globals.css, so nothing here runs per frame.
 */
export function HeadingMarks() {
  useEffect(() => {
    const marks = gsap.utils.toArray<HTMLElement>(".heading-mark");
    if (marks.length === 0) return;

    const triggers = ScrollTrigger.batch(marks, {
      start: "top 88%",
      once: true,
      onEnter: (elements) => elements.forEach((el) => el.classList.add("is-drawn")),
    });
    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  return null;
}
