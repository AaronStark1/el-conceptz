"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Lightbox } from "@/components/gallery/Lightbox";
import type { Photo } from "@/types";

export interface LightboxRequest {
  photos: Photo[];
  index: number;
  /** Announced to screen readers and shown above the caption, e.g. the project title. */
  label?: string;
}

interface LightboxApi {
  open: (request: LightboxRequest) => void;
}

const LightboxContext = createContext<LightboxApi | null>(null);

/** One lightbox for the whole page; the gallery and project sequences share it. */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<LightboxRequest | null>(null);
  const open = useCallback((next: LightboxRequest) => setRequest(next), []);
  const api = useMemo(() => ({ open }), [open]);

  return (
    <LightboxContext.Provider value={api}>
      {children}
      <Lightbox
        request={request}
        onClose={() => setRequest(null)}
        onIndexChange={(index) => setRequest((r) => (r ? { ...r, index } : r))}
      />
    </LightboxContext.Provider>
  );
}

export function useLightbox(): LightboxApi {
  const api = useContext(LightboxContext);
  if (!api) throw new Error("useLightbox must be used inside LightboxProvider");
  return api;
}
