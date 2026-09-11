import type { GalleryItem } from "@/types";
import { getProject } from "./projects";

/**
 * Gallery sequence. Items flow into masonry columns in this order; an item marked
 * `emphasis: "wide"` breaks the columns and runs full width before the next group.
 * Photos are referenced by project id and file so alt text stays in one place.
 */
function fromProject(
  projectId: string,
  file: string,
  emphasis?: GalleryItem["emphasis"]
): GalleryItem {
  const project = getProject(projectId);
  const photo = [project?.hero, ...(project?.gallery ?? [])].find(
    (candidate) => candidate && candidate.src.endsWith(`/${file}.jpg`)
  );
  if (!photo)
    throw new Error(`Gallery: ${projectId}/${file} is not declared in content/projects.ts`);
  return { photo, projectId, emphasis };
}

export const galleryItems: GalleryItem[] = [
  fromProject("teak-stone-villa", "07-divider"),
  fromProject("skylit-courtyard-villa", "03-dining"),
  fromProject("brick-walnut-residence", "01-entrance"),
  fromProject("terracotta-jali-villa", "05-staircase-jali"),
  fromProject("walnut-apartment", "05-passage-ceiling"),
  fromProject("brick-walnut-residence", "10-bathtub"),
  fromProject("skylit-courtyard-villa", "08-curio-shelf"),
  fromProject("teak-stone-villa", "12-coffee-table"),
  fromProject("terracotta-jali-villa", "06-bedroom-balcony", "wide"),
  fromProject("brick-walnut-residence", "09-staircase"),
  fromProject("walnut-apartment", "06-wash-counter"),
  fromProject("teak-stone-villa", "02-formal-living"),
  fromProject("cement-timber-villa", "01-passage"),
  fromProject("brick-walnut-residence", "07-island-detail"),
  fromProject("terracotta-jali-villa", "07-wash-niche"),
  fromProject("skylit-courtyard-villa", "07-wash-counter"),
  fromProject("walnut-apartment", "08-pooja-cabinet"),
  fromProject("walnut-apartment", "07-green-shower", "wide"),
  fromProject("teak-stone-villa", "10-stair-hall"),
  fromProject("brick-walnut-residence", "14-balcony"),
  fromProject("terracotta-jali-villa", "09-jali-stair-top"),
  fromProject("cement-timber-villa", "02-double-height-wall"),
  fromProject("brick-walnut-residence", "05-side-garden"),
  fromProject("teak-stone-villa", "05-wardrobes"),
];
