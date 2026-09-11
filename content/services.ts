import type { Service } from "@/types";

/**
 * Services shown in the "What we do" index, in three clusters.
 * Only services evidenced by the studio's own project photography are listed.
 * Images are optional and reveal on hover or focus on desktop.
 */
export interface ServiceCluster {
  title: string;
  services: Service[];
}

export const serviceClusters: ServiceCluster[] = [
  {
    title: "Design",
    services: [
      {
        id: "residential",
        title: "Residential interiors",
        description: "Complete interiors for villas and apartments, from concept to handover.",
        image: {
          src: "/images/projects/teak-stone-villa/02-formal-living.jpg",
          alt: "Formal living room with linen sofas and a teak display divider",
        },
      },
      {
        id: "planning",
        title: "Space planning",
        description: "Layouts that make rooms work for the way a family lives.",
        image: {
          src: "/images/projects/brick-walnut-residence/06-dining-kitchen.jpg",
          alt: "Dining room opening to a walnut and black gloss kitchen",
        },
      },
    ],
  },
  {
    title: "Make",
    services: [
      {
        id: "joinery",
        title: "Custom furniture and joinery",
        description: "Wardrobes, shelving, beds and units drawn for each room and built to fit.",
        image: {
          src: "/images/projects/teak-stone-villa/07-divider.jpg",
          alt: "Teak and patinated metal display divider between living and dining",
        },
      },
      {
        id: "kitchens",
        title: "Kitchens and wardrobes",
        description:
          "Modular kitchens and storage planned around the hardware, not the other way around.",
        image: {
          src: "/images/projects/walnut-apartment/04-kitchen-sink-run.jpg",
          alt: "Kitchen sink run with a white quartz counter and under-cabinet lighting",
        },
      },
      {
        id: "ceilings-lighting",
        title: "False ceilings and lighting",
        description: "Ceiling profiles and layered light that shape how a room feels at night.",
        image: {
          src: "/images/projects/walnut-apartment/05-passage-ceiling.jpg",
          alt: "Passage ceiling with circular cut-outs and a textured wallpaper wall",
        },
      },
    ],
  },
  {
    title: "Build",
    services: [
      {
        id: "bathrooms",
        title: "Bathroom renovation",
        description: "Plumbing, waterproofing, tiling and fittings replanned as one job.",
        image: {
          src: "/images/projects/brick-walnut-residence/16-double-vanity.jpg",
          alt: "Master bathroom double vanity with backlit mirrors",
        },
      },
      {
        id: "turnkey",
        title: "Turnkey execution",
        description: "One team responsible for drawings, procurement, site work and finishing.",
        image: {
          src: "/images/projects/brick-walnut-residence/09-staircase.jpg",
          alt: "Open-riser teak staircase framed by a teak portal",
        },
      },
    ],
  },
];

export const services: Service[] = serviceClusters.flatMap((cluster) => cluster.services);
