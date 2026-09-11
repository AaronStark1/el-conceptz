import type { BeforeAfterPair } from "@/types";

const p = (slug: string, file: string) => `/images/projects/${slug}/${file}.jpg`;

/**
 * Before and after pairs. Each pair is the same viewpoint photographed before work
 * began (or during construction) and after handover. Camera positions are close
 * rather than identical, as is usual for site photography.
 *
 * Order matters: the first pair is shown when the section loads.
 */
export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "apartment-kitchen",
    projectId: "walnut-apartment",
    title: "Kitchen",
    viewpoint: "From the entry, looking along the L",
    description:
      "A dark teak kitchen with a black granite counter became an L-shaped run in taupe high gloss and white quartz, lit from under the wall units.",
    before: {
      src: p("walnut-apartment", "before-kitchen"),
      alt: "Before: dark teak kitchen cabinets with a black granite counter and white wall tiles",
    },
    after: {
      src: p("walnut-apartment", "01-kitchen-wide"),
      alt: "After: L-shaped kitchen in taupe high gloss with white quartz and under-cabinet lighting",
    },
    initialPosition: 50,
  },
  {
    id: "apartment-wash-counter",
    projectId: "walnut-apartment",
    title: "Wash counter",
    viewpoint: "From the hallway toward the living room",
    description:
      "A mosaic splashback and scalloped mirror were replaced by a walnut alcove, a backlit mirror and a vessel basin.",
    before: {
      src: p("walnut-apartment", "before-wash-counter"),
      alt: "Before: wash basin with a mosaic splashback and scalloped mirror",
    },
    after: {
      src: p("walnut-apartment", "after-wash-counter"),
      alt: "After: wash counter in a walnut alcove with a backlit mirror and vessel basin",
    },
    initialPosition: 50,
  },
  {
    id: "apartment-foyer",
    projectId: "walnut-apartment",
    title: "Foyer",
    viewpoint: "Inside the main door",
    description:
      "A dim entrance under a striped ceiling panel is now a lit foyer with a plank ceiling and a teak pooja cabinet.",
    before: {
      src: p("walnut-apartment", "before-foyer"),
      alt: "Before: dim entrance foyer with a striped false ceiling panel",
    },
    after: {
      src: p("walnut-apartment", "02-foyer"),
      alt: "After: foyer with a wood plank ceiling, cove lighting and a teak pooja cabinet",
    },
    initialPosition: 50,
  },
  {
    id: "residence-facade",
    projectId: "brick-walnut-residence",
    title: "Street facade",
    viewpoint: "From the road",
    description:
      "The tiled-roof house that stood on the plot, and the brick and render facade with its louvre screen that replaced it.",
    before: {
      src: p("brick-walnut-residence", "before-facade"),
      alt: "Before: older two-storey house with a tiled roof and a metal gate",
    },
    after: {
      src: p("brick-walnut-residence", "04-facade-twilight"),
      alt: "After: brick and render facade with a louvre screen at twilight",
    },
    initialPosition: 50,
  },
  {
    id: "residence-shower",
    projectId: "brick-walnut-residence",
    title: "Master shower",
    viewpoint: "From the bathroom door",
    description:
      "Slab cladding with the mixer and body-jet stubs exposed, then the finished shower behind fluted glass.",
    before: {
      src: p("brick-walnut-residence", "before-shower"),
      alt: "Before: grey marble-effect slab wall with plumbing stubs and construction debris",
    },
    after: {
      src: p("brick-walnut-residence", "after-shower"),
      alt: "After: finished shower with rain head and body jets behind a fluted glass door",
    },
    initialPosition: 50,
  },
  {
    id: "residence-powder-room",
    projectId: "brick-walnut-residence",
    title: "Powder room",
    viewpoint: "From the vanity",
    description:
      "Fluted tiles being fixed above the cistern ledge, and the finished room with its teal wall-hung WC and backlit mirror.",
    before: {
      src: p("brick-walnut-residence", "before-powder-room"),
      alt: "Before: fluted tiles being fixed above a cistern ledge beside copper-effect slabs",
    },
    after: {
      src: p("brick-walnut-residence", "after-powder-room"),
      alt: "After: powder room with a teal wall-hung WC, copper-effect tiles and a backlit mirror",
    },
    initialPosition: 50,
  },
];
