"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which page section currently occupies the reading band of the viewport.
 * Uses IntersectionObserver only; no scroll listeners.
 */
export function useActiveSection(ids: readonly string[], initial = ""): string {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        if (visible.size === 0) return;
        // Prefer the section that comes first in document order among those in the band.
        const ordered = elements.filter((el) => visible.has(el.id));
        if (ordered[0]) setActive(ordered[0].id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.01, 0.2, 0.5] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
