import type {
  BeforeAfterPair,
  GalleryItem,
  ImageOrientation,
  Photo,
  PhotoRef,
  Project,
  ProjectStoryChapter,
} from "@/types";
import { imageManifest } from "./image-manifest";

/**
 * Resolves content photo references to renderable Photos using the generated manifest
 * (`npm run photos:manifest`). Server-side only: keeps the manifest out of client bundles.
 */
export function resolvePhoto(ref: PhotoRef): Photo {
  const meta = imageManifest[ref.src];
  if (!meta) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[images] ${ref.src} is missing from lib/image-manifest.ts. Run "npm run photos".`
      );
    }
    return { ...ref, width: 1600, height: 2000, orientation: "portrait" };
  }
  return {
    ...ref,
    width: meta.width,
    height: meta.height,
    blurDataURL: meta.blurDataURL,
    orientation: orientationOf(meta.width, meta.height),
  };
}

export function resolvePhotos(refs: PhotoRef[]): Photo[] {
  return refs.map(resolvePhoto);
}

export function orientationOf(width: number, height: number): ImageOrientation {
  const ratio = width / height;
  if (ratio > 1.15) return "landscape";
  if (ratio < 0.87) return "portrait";
  return "square";
}

export interface ResolvedStoryChapter extends Omit<ProjectStoryChapter, "image"> {
  photo: Photo;
}

export interface ResolvedProject extends Omit<Project, "hero" | "gallery" | "story"> {
  hero: Photo;
  gallery: Photo[];
  story?: { intro: string; chapters: ResolvedStoryChapter[] };
}

export function resolveProject(project: Project): ResolvedProject {
  return {
    ...project,
    hero: resolvePhoto(project.hero),
    gallery: resolvePhotos(project.gallery),
    story: project.story
      ? {
          intro: project.story.intro,
          chapters: project.story.chapters.map(({ image, ...chapter }) => ({
            ...chapter,
            photo: resolvePhoto(image),
          })),
        }
      : undefined,
  };
}

export interface ResolvedPair extends Omit<BeforeAfterPair, "before" | "after"> {
  before: Photo;
  after: Photo;
  projectTitle?: string;
}

export function resolvePair(pair: BeforeAfterPair, projectTitle?: string): ResolvedPair {
  return {
    ...pair,
    before: resolvePhoto(pair.before),
    after: resolvePhoto(pair.after),
    projectTitle,
  };
}

export interface ResolvedGalleryItem extends Omit<GalleryItem, "photo"> {
  photo: Photo;
  projectTitle?: string;
}

export function resolveGalleryItem(item: GalleryItem, projectTitle?: string): ResolvedGalleryItem {
  return { ...item, photo: resolvePhoto(item.photo), projectTitle };
}
