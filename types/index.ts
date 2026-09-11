/**
 * Content types for the El Conceptz portfolio.
 * Everything visible on the page is described by these shapes and lives in `content/`.
 */

export type ProjectCategory = "villa" | "apartment" | "renovation" | "commercial" | "bathrooms";

export type ImageOrientation = "landscape" | "portrait" | "square";

/** A photograph referenced by its path under `public/`. Dimensions are resolved from the image manifest. */
export interface PhotoRef {
  src: string;
  alt: string;
  caption?: string;
}

/** A photograph with resolved intrinsic dimensions and blur placeholder. */
export interface Photo extends PhotoRef {
  width: number;
  height: number;
  blurDataURL?: string;
  orientation: ImageOrientation;
}

export interface ProjectStoryChapter {
  title: string;
  body: string;
  image: PhotoRef;
}

export interface Project {
  id: string;
  /** Display title. Descriptive, never a client name. */
  title: string;
  category: ProjectCategory;
  /** Optional short line shown next to the title. */
  tagline?: string;
  /** Location as far as it is known. Leave undefined rather than guessing. */
  location?: string;
  /** Year of completion if known. */
  year?: number | string;
  description: string;
  /** Concrete details worth pointing out. Keep factual. */
  details?: string[];
  hero: PhotoRef;
  gallery: PhotoRef[];
  /** Show in the Selected Work sequence. */
  featured: boolean;
  /** Lower numbers appear first. */
  order: number;
  /** Optional long-form story, used by the pinned Project Story section. */
  story?: {
    intro: string;
    chapters: ProjectStoryChapter[];
  };
}

export interface BeforeAfterPair {
  id: string;
  projectId?: string;
  title: string;
  /** Where the camera stands. Helps visitors read the comparison. */
  viewpoint?: string;
  description?: string;
  before: PhotoRef;
  after: PhotoRef;
  /** 0 to 100, initial divider position. */
  initialPosition?: number;
}

export interface GalleryItem {
  photo: PhotoRef;
  projectId?: string;
  /** Overrides the orientation-based span. "wide" spans two columns on desktop. */
  emphasis?: "wide" | "tall" | "default";
}

export interface Service {
  id: string;
  title: string;
  description: string;
  /** Optional photograph shown when the service is hovered or focused. */
  image?: PhotoRef;
}

export type ContactKind = "email" | "whatsapp" | "phone" | "location";

export interface ContactAction {
  kind: ContactKind;
  label: string;
  /** Text shown to the visitor. */
  value: string;
  /** Fully formed href: mailto:, tel:, https://wa.me/..., or a Google Maps URL. */
  href: string;
  /** Short helper line shown under the value. */
  note?: string;
}

export interface NavItem {
  label: string;
  href: `#${string}`;
  /** Section id this item tracks for the active indicator. */
  sectionId: string;
}

export interface SocialLink {
  platform: "Instagram" | "Facebook" | "LinkedIn" | "Pinterest" | "YouTube";
  url: string;
  handle?: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  /** Short line used for the browser title and social cards. */
  tagline: string;
  description: string;
  siteUrl: string;
  locale: string;
  /** Region the studio works in. Kept general unless confirmed. */
  region: string;
  experienceYears: number;
  foundedYear?: number;
  socialLinks: SocialLink[];
}
