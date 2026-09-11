"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Photo as PhotoType } from "@/types";
import { cn } from "@/lib/utils";

interface PhotoProps {
  photo: PhotoType;
  sizes: string;
  /** Fill the parent (parent must be positioned). Default true. */
  fill?: boolean;
  className?: string;
  imgClassName?: string;
  /** Marks the LCP image: eager, high priority, rendered visible immediately. */
  priority?: boolean;
  style?: CSSProperties;
  quality?: number;
  objectPosition?: string;
}

/**
 * Photograph with a neutral stone loading surface and a soft fade into place.
 * No layout shift: the frame is sized by the parent (fill) or by intrinsic dimensions.
 */
export function Photo({
  photo,
  sizes,
  fill = true,
  className,
  imgClassName,
  priority = false,
  style,
  quality = 80,
  objectPosition,
}: PhotoProps) {
  const [loaded, setLoaded] = useState(priority);
  const ref = useRef<HTMLImageElement>(null);

  // A cached image can finish before React attaches onLoad; catch up after mount.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <Image
      ref={ref}
      src={photo.src}
      alt={photo.alt}
      sizes={sizes}
      quality={quality}
      {...(fill ? { fill: true } : { width: photo.width, height: photo.height })}
      placeholder={photo.blurDataURL ? "blur" : "empty"}
      blurDataURL={photo.blurDataURL}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      onLoad={() => setLoaded(true)}
      draggable={false}
      className={cn(
        "object-cover transition-opacity duration-700 ease-[var(--ease-out)]",
        loaded ? "opacity-100" : "opacity-0",
        fill && "h-full w-full",
        className,
        imgClassName
      )}
      style={{ objectPosition, ...style }}
    />
  );
}
