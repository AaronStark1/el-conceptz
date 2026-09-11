import { LightboxProvider } from "@/components/gallery/LightboxProvider";
import { Contact } from "@/components/sections/Contact";
import { Gallery } from "@/components/sections/Gallery";
import { Opening } from "@/components/sections/Opening";
import { Philosophy } from "@/components/sections/Philosophy";
import { ProjectStory } from "@/components/sections/ProjectStory";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { Studio } from "@/components/sections/Studio";
import { Transformation } from "@/components/sections/Transformation";
import { beforeAfterPairs } from "@/content/beforeAfter";
import { galleryItems } from "@/content/gallery";
import { featuredProjects, getProject, storyProjectId } from "@/content/projects";
import { serviceClusters } from "@/content/services";
import { resolveGalleryItem, resolvePair, resolvePhoto, resolveProject } from "@/lib/images";

/**
 * The single page, composed as a sequence of rooms:
 * entrance, introduction, work, one project in depth, transformations, gallery,
 * services, a pause, and finally the way to get in touch.
 */
export default function HomePage() {
  const featured = featuredProjects.map(resolveProject);
  const storyProject = getProject(storyProjectId);
  const story = storyProject ? resolveProject(storyProject) : null;
  const pairs = beforeAfterPairs.map((pair) =>
    resolvePair(pair, pair.projectId ? getProject(pair.projectId)?.title : undefined)
  );
  const gallery = galleryItems.map((item) =>
    resolveGalleryItem(item, item.projectId ? getProject(item.projectId)?.title : undefined)
  );
  const serviceGroups = serviceClusters.map((cluster) => ({
    title: cluster.title,
    services: cluster.services.map((service) => ({
      ...service,
      photo: service.image ? resolvePhoto(service.image) : undefined,
    })),
  }));

  return (
    <LightboxProvider>
      <Opening />
      <Studio />
      <SelectedWork projects={featured} />
      {story && <ProjectStory project={story} />}
      <Transformation pairs={pairs} />
      <Gallery items={gallery} />
      <Services groups={serviceGroups} />
      <Philosophy />
      <Contact />
    </LightboxProvider>
  );
}
