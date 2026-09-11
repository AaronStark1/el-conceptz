import type { Project } from "@/types";

/**
 * Real projects, described only from what the photography shows.
 * Titles are descriptive rather than client names. Years are the years the
 * finished spaces were photographed. Locations are given only where known.
 *
 * To add a project: export its photographs with `npm run photos`, then add an entry here.
 * Set `featured: true` to include it in the Selected Work sequence; the sequence assigns
 * a different layout to each position, so order matters.
 */
const p = (slug: string, file: string) => `/images/projects/${slug}/${file}.jpg`;

export const projects: Project[] = [
  {
    id: "skylit-courtyard-villa",
    title: "Skylit Courtyard Villa",
    category: "villa",
    year: 2022,
    description:
      "A family villa arranged around a double-height courtyard. A pitched skylight throws moving light across a rosewood swing, and warm oak, teak and walnut run through the dining room, kitchen and bedrooms against white gloss and grey granite.",
    details: [
      "Rosewood swing beneath a pitched skylight",
      "Teak coffered dining ceiling with amber glass pendants",
      "Granite island with a raised walnut breakfast bar",
    ],
    hero: {
      src: p("skylit-courtyard-villa", "01-courtyard-swing"),
      alt: "Double-height courtyard with a rosewood swing under a pitched skylight",
      caption: "The courtyard, mid-morning",
    },
    gallery: [
      {
        src: p("skylit-courtyard-villa", "04-kitchen-island"),
        alt: "Grey granite kitchen island with a raised walnut breakfast bar and stools",
        caption: "Kitchen island and breakfast bar",
      },
      {
        src: p("skylit-courtyard-villa", "03-dining"),
        alt: "Dining room with a teak ceiling coffer and amber glass pendants",
        caption: "Dining room",
      },
      {
        src: p("skylit-courtyard-villa", "05-living-tv-wall"),
        alt: "Living room television wall with fluted oak slats and lit niches",
        caption: "Living room",
      },
      {
        src: p("skylit-courtyard-villa", "07-wash-counter"),
        alt: "Wash counter under the stair beside an indoor pond",
        caption: "Under-stair wash counter",
      },
      {
        src: p("skylit-courtyard-villa", "08-curio-shelf"),
        alt: "Lit oak curio shelf against textured wallpaper",
        caption: "Curio shelf",
      },
      {
        src: p("skylit-courtyard-villa", "02-courtyard-seating"),
        alt: "Courtyard seating with a rosewood swing and built-in bench",
        caption: "Courtyard seating",
      },
      {
        src: p("skylit-courtyard-villa", "06-bedroom-partition"),
        alt: "Bedroom with a frosted glass television partition opening to the dressing area",
        caption: "Bedroom and dressing area",
      },
      {
        src: p("skylit-courtyard-villa", "09-crockery-cabinet"),
        alt: "Glass-fronted oak crockery cabinet with a lit display shelf",
        caption: "Crockery cabinet",
      },
      {
        src: p("skylit-courtyard-villa", "10-bathroom-vanity"),
        alt: "Bathroom vanity with a backlit mirror and granite counter",
        caption: "Bathroom",
      },
    ],
    featured: true,
    order: 1,
  },
  {
    id: "terracotta-jali-villa",
    title: "Terracotta Jali Villa",
    category: "villa",
    location: "Karunagappally, Kerala",
    year: 2023,
    description:
      "A two-storey house with steep timber-clad gables and a double-height terracotta jali screen that filters light onto an open-riser staircase. Inside, walnut laminate and white gloss joinery sit on grey vitrified floors with warm cove lighting.",
    details: [
      "Double-height terracotta jali behind the stair",
      "Open-plan dining and kitchen with a walnut breakfast counter",
      "Backlit wash niche off the dining room",
    ],
    hero: {
      src: p("terracotta-jali-villa", "01-dining-wide"),
      alt: "Open-plan dining room and kitchen with a walnut table and grey vitrified floor",
      caption: "Dining room looking toward the kitchen",
    },
    gallery: [
      {
        src: p("terracotta-jali-villa", "02-upper-landing"),
        alt: "Upper landing under exposed terracotta roof tiles with pendant lanterns and a jali wall",
        caption: "Upper landing",
      },
      {
        src: p("terracotta-jali-villa", "05-staircase-jali"),
        alt: "Open-riser timber staircase against a double-height terracotta jali screen",
        caption: "Staircase and jali",
      },
      {
        src: p("terracotta-jali-villa", "04-kitchen-counter"),
        alt: "Open kitchen with a walnut breakfast counter and black pendant lights",
        caption: "Kitchen and breakfast counter",
      },
      {
        src: p("terracotta-jali-villa", "06-bedroom-balcony"),
        alt: "Bedroom with a floating walnut bed and upholstered headboard opening to a balcony",
        caption: "Bedroom and balcony",
      },
      {
        src: p("terracotta-jali-villa", "07-wash-niche"),
        alt: "Backlit mirror and subway-tiled wash niche off the dining room",
        caption: "Wash niche",
      },
      {
        src: p("terracotta-jali-villa", "08-living-tv-wall"),
        alt: "Walnut television panel with edge lighting and a white gloss console",
        caption: "Living room",
      },
      {
        src: p("terracotta-jali-villa", "03-exterior"),
        alt: "White gabled house with timber roof soffits and terracotta jali panels",
        caption: "From the street",
      },
      {
        src: p("terracotta-jali-villa", "09-jali-stair-top"),
        alt: "Top of the staircase with the terracotta jali wall above",
        caption: "Stair head",
      },
      {
        src: p("terracotta-jali-villa", "10-courtyard-slate"),
        alt: "Covered patio with a slate feature wall, pebbles and stepping stones",
        caption: "Patio",
      },
      {
        src: p("terracotta-jali-villa", "13-kitchen-sink"),
        alt: "Kitchen sink run with walnut and white gloss units under a window",
        caption: "Kitchen",
      },
    ],
    featured: true,
    order: 2,
  },
  {
    id: "walnut-apartment",
    title: "Walnut and Taupe Gloss Apartment",
    category: "renovation",
    year: 2024,
    description:
      "A complete renovation of an existing apartment. Dated tiled bathrooms and a dark teak kitchen made way for an L-shaped kitchen in taupe high gloss and white quartz, a walnut wash-counter alcove, a plank-ceilinged foyer with a teak pooja cabinet, and three bathrooms in large-format stone-effect tiles.",
    details: [
      "Taupe gloss kitchen with rose-gold profile handles",
      "Passage ceiling with circular light cut-outs",
      "Three bathrooms with backlit mirrors and LED ceiling slots",
    ],
    hero: {
      src: p("walnut-apartment", "01-kitchen-wide"),
      alt: "L-shaped kitchen in taupe high gloss with white quartz counters and under-cabinet lighting",
      caption: "The new kitchen",
    },
    gallery: [
      {
        src: p("walnut-apartment", "02-foyer"),
        alt: "Entry foyer with a wood plank ceiling, teak pooja cabinet and gold wallpaper",
        caption: "Foyer",
      },
      {
        src: p("walnut-apartment", "03-dining-crockery"),
        alt: "Glass-fronted crockery cabinet, walnut sideboard and slatted partition",
        caption: "Dining room",
      },
      {
        src: p("walnut-apartment", "04-kitchen-sink-run"),
        alt: "Kitchen sink run with a white quartz counter and under-cabinet lighting",
        caption: "Kitchen",
      },
      {
        src: p("walnut-apartment", "05-passage-ceiling"),
        alt: "Passage ceiling with circular cut-outs and a textured wallpaper wall",
        caption: "Passage",
      },
      {
        src: p("walnut-apartment", "06-wash-counter"),
        alt: "Wash counter in a walnut alcove with a backlit mirror and vessel basin",
        caption: "Wash counter",
      },
      {
        src: p("walnut-apartment", "07-green-shower"),
        alt: "Shower area with a green stone-effect wall and linear ceiling lights",
        caption: "Master bathroom",
      },
      {
        src: p("walnut-apartment", "08-pooja-cabinet"),
        alt: "Wall-mounted teak pooja cabinet with petal cut-outs",
        caption: "Pooja cabinet",
      },
      {
        src: p("walnut-apartment", "10-bathroom-grey"),
        alt: "Bathroom in grey marble-effect tiles with a backlit mirror",
        caption: "Bathroom",
      },
      {
        src: p("walnut-apartment", "11-bathroom-teal"),
        alt: "Bathroom in teal stone-effect tiles with a backlit mirror",
        caption: "Second bathroom",
      },
    ],
    featured: true,
    order: 3,
  },
  {
    id: "brick-walnut-residence",
    title: "Brick and Walnut Residence",
    category: "villa",
    year: 2026,
    description:
      "An exposed-brick upper volume over grey render, with a vertical louvre screen and a slot-lit compound wall. Inside, a walnut island with fluted panelling anchors the open kitchen and dining room, bedrooms pair timber beds with block-print textiles and printed roman blinds, and the master bathroom holds a freestanding tub.",
    details: [
      "Cantilevered teak staircase against cement-textured walls",
      "Copper-effect powder room with teal fittings",
      "Side garden with a rockery water feature",
    ],
    hero: {
      src: p("brick-walnut-residence", "01-entrance"),
      alt: "Entrance with a walnut door, floral wallpaper panel, granite steps and a potted plant",
      caption: "The entrance",
    },
    gallery: [
      {
        src: p("brick-walnut-residence", "07-island-detail"),
        alt: "Walnut kitchen island with a fluted panel and pale quartz top",
        caption: "Kitchen island",
      },
      {
        src: p("brick-walnut-residence", "04-facade-twilight"),
        alt: "Brick and render facade with a louvre screen at twilight",
        caption: "The house at dusk",
      },
      {
        src: p("brick-walnut-residence", "06-dining-kitchen"),
        alt: "Dining room opening to a walnut and black gloss kitchen",
        caption: "Dining and kitchen",
      },
      {
        src: p("brick-walnut-residence", "08-bedroom"),
        alt: "Bedroom with an oak spindle headboard and printed roman blinds",
        caption: "Bedroom",
      },
      {
        src: p("brick-walnut-residence", "09-staircase"),
        alt: "Open-riser teak staircase framed by a teak portal",
        caption: "Staircase",
      },
      {
        src: p("brick-walnut-residence", "10-bathtub"),
        alt: "Freestanding bathtub against grey marble-effect tiles",
        caption: "Master bathroom",
      },
      {
        src: p("brick-walnut-residence", "05-side-garden"),
        alt: "Side garden with stepping stones beneath the brick upper storey",
        caption: "Side garden",
      },
      {
        src: p("brick-walnut-residence", "11-study-wardrobe"),
        alt: "Study desk with a lit bookshelf beside a mirrored wardrobe",
        caption: "Study corner",
      },
      {
        src: p("brick-walnut-residence", "14-balcony"),
        alt: "First-floor balcony with a timber ceiling and patterned floor tiles",
        caption: "Balcony",
      },
      {
        src: p("brick-walnut-residence", "16-double-vanity"),
        alt: "Master bathroom double vanity with backlit mirrors",
        caption: "Double vanity",
      },
      {
        src: p("brick-walnut-residence", "13-porch-plant"),
        alt: "Entrance porch with a fluted wall, granite step and a potted plant",
        caption: "Porch",
      },
      {
        src: p("brick-walnut-residence", "15-louvre-screen"),
        alt: "Vertical louvre screen on the first-floor terrace",
        caption: "Louvre screen",
      },
    ],
    featured: true,
    order: 4,
  },
  {
    id: "cement-timber-villa",
    title: "Cement and Timber Villa",
    category: "villa",
    year: 2023,
    description:
      "A double-height living space with a grey cement-textured wall and rough-sawn timber beams over red terracotta floor tiles. A covered side passage with a whitewashed brick wall connects the house to the garden.",
    details: [
      "Cement-textured double-height feature wall",
      "Covered passage with whitewashed brick and mesh screens",
      "Teak-framed sliding wardrobe with back-painted glass",
    ],
    hero: {
      src: p("cement-timber-villa", "01-passage"),
      alt: "Covered side passage with a whitewashed brick wall, mesh screens and grey floor tiles",
      caption: "Side passage",
    },
    gallery: [
      {
        src: p("cement-timber-villa", "02-double-height-wall"),
        alt: "Double-height living space with a cement-textured wall and timber beams",
        caption: "Living space",
      },
      {
        src: p("cement-timber-villa", "07-passage-plants"),
        alt: "Side passage furnished with plants and a seating nook",
        caption: "Passage, a year on",
      },
      {
        src: p("cement-timber-villa", "06-wardrobe"),
        alt: "Teak-framed sliding wardrobe with white back-painted glass panels",
        caption: "Wardrobe",
      },
      {
        src: p("cement-timber-villa", "05-bathroom"),
        alt: "Beige tiled bathroom with cove lighting and a glass shower",
        caption: "Bathroom",
      },
      {
        src: p("cement-timber-villa", "08-veranda-lawn"),
        alt: "Veranda with granite steps opening onto a lawn",
        caption: "Veranda",
      },
      {
        src: p("cement-timber-villa", "03-exterior"),
        alt: "Two-storey villa with terracotta tile roofs and a slatted compound wall",
        caption: "From the street",
      },
    ],
    featured: true,
    order: 5,
  },
  {
    id: "teak-stone-villa",
    title: "Teak and Grey Stone Villa",
    category: "villa",
    year: 2022,
    description:
      "Teak joinery, plank ceilings and honey timber floors against large grey stone tiles and textured plaster. Linen upholstery, teal accents and brass lighting complete a palette that stays consistent from the passage to the master bathroom.",
    hero: {
      src: p("teak-stone-villa", "01-master-bedroom"),
      alt: "Master bedroom with a stepped teak ceiling, concealed cove lighting and grey stone floor",
      caption: "Master bedroom",
    },
    gallery: [
      {
        src: p("teak-stone-villa", "03-dining"),
        alt: "Dining room under a dark timber plank ceiling with a cage pendant",
        caption: "Dining room",
      },
      {
        src: p("teak-stone-villa", "02-formal-living"),
        alt: "Formal living room with linen sofas and a teak display divider",
        caption: "Formal living room",
      },
      {
        src: p("teak-stone-villa", "04-home-theatre"),
        alt: "Home theatre with a coffered teak acoustic ceiling and fabric screen wall",
        caption: "Home theatre",
      },
      {
        src: p("teak-stone-villa", "07-divider"),
        alt: "Teak and patinated metal display divider between living and dining",
        caption: "Display divider",
      },
      {
        src: p("teak-stone-villa", "08-passage-art-wall"),
        alt: "Passage wall in textured plaster with three lit sculpture niches",
        caption: "Passage",
      },
      {
        src: p("teak-stone-villa", "06-bathroom-vanity"),
        alt: "Bathroom vanity with a backlit teak mirror on grooved stone cladding",
        caption: "Bathroom",
      },
      {
        src: p("teak-stone-villa", "05-wardrobes"),
        alt: "Grey gloss wardrobes with a teak-framed dresser and mirror niche",
        caption: "Wardrobes",
      },
      {
        src: p("teak-stone-villa", "10-stair-hall"),
        alt: "Double-height stair hall with a teak staircase",
        caption: "Stair hall",
      },
      {
        src: p("teak-stone-villa", "12-coffee-table"),
        alt: "Stone-topped coffee table on a honey timber floor",
        caption: "Coffee table",
      },
    ],
    featured: false,
    order: 6,
    story: {
      intro:
        "One palette carried through an entire house: teak, grey stone, textured plaster and linen. Scroll through it the way you would walk it.",
      chapters: [
        {
          title: "The passage",
          body: "Textured grey plaster and three lit niches turn a circulation wall into the first thing you notice. Honey timber floors carry the warmth through.",
          image: {
            src: p("teak-stone-villa", "08-passage-art-wall"),
            alt: "Passage wall in textured plaster with three lit sculpture niches",
          },
        },
        {
          title: "Living and dining",
          body: "A dark timber plank ceiling and a cage pendant bring the dining room down to a comfortable scale. A teak display divider separates it from the living room without closing it off.",
          image: {
            src: p("teak-stone-villa", "03-dining"),
            alt: "Dining room under a dark timber plank ceiling with a cage pendant",
          },
        },
        {
          title: "The theatre",
          body: "A coffered teak acoustic ceiling and a fabric-clad screen wall make the room quiet in every sense.",
          image: {
            src: p("teak-stone-villa", "04-home-theatre"),
            alt: "Home theatre with a coffered teak acoustic ceiling and fabric screen wall",
          },
        },
        {
          title: "Rest",
          body: "The teak ceiling steps down over the bed with a concealed cove. Large grey stone tiles keep the room cool underfoot.",
          image: {
            src: p("teak-stone-villa", "01-master-bedroom"),
            alt: "Master bedroom with a stepped teak ceiling and concealed cove lighting",
          },
        },
        {
          title: "The bathroom",
          body: "A backlit teak-framed mirror on grooved stone cladding, with the vanity drawn in the same timber as the rest of the house.",
          image: {
            src: p("teak-stone-villa", "06-bathroom-vanity"),
            alt: "Bathroom vanity with a backlit teak mirror on grooved stone cladding",
          },
        },
      ],
    },
  },
];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.order - b.order);

/** The project told room by room in the pinned story section. */
export const storyProjectId = "teak-stone-villa";

export function getProject(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export const categoryLabels: Record<Project["category"], string> = {
  villa: "Villa",
  apartment: "Apartment",
  renovation: "Renovation",
  commercial: "Commercial",
  bathrooms: "Bathrooms",
};
