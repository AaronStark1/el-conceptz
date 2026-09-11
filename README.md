# El Conceptz

Single-page portfolio for El Conceptz, an interior design studio with more than twenty years of practice. Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Framer Motion, using the studio's own project photography.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run type-check   # TypeScript
npm run lint         # ESLint
npm run build        # production build (also generates the Open Graph image)
```

## Where things live

| Path | What it holds |
| --- | --- |
| `content/site.ts` | Studio name, description, region, social links, site URL |
| `content/navigation.ts` | Header links, the single contact call to action, section ids |
| `content/copy.ts` | Editorial copy for every section |
| `content/projects.ts` | Projects: titles, descriptions, photographs, the room-by-room story |
| `content/beforeAfter.ts` | Before and after pairs for the comparison slider |
| `content/gallery.ts` | Gallery sequence (references photos declared in projects) |
| `content/services.ts` | Services in three clusters, with optional hover photographs |
| `content/contact.ts` | Email, WhatsApp, phone and location actions |
| `content/theme.ts` | Palette, radius rule and motion constants for JavaScript |
| `app/globals.css` | Design tokens, typography primitives, room surfaces, icon keyframes |
| `components/sections/*` | One component per room of the page |
| `components/before-after/BeforeAfterSlider.tsx` | Pointer, touch and keyboard comparison slider |
| `components/gallery/*` | Lightbox and the provider shared by every photo grid |
| `lib/images.ts` | Resolves content photo references to sizes and blur placeholders |
| `scripts/` | Photo export and image manifest generation |

Components never contain project text or image paths. Change content in `content/`, and the sections follow.

## Photographs

Masters live in `public/images/projects/<project>/`. They are exported from the studio's photo library by `scripts/photo-selection.json`, which maps source files to web names.

```bash
npm run photos:import   # export new or changed selections (macOS, uses sips for HEIC)
npm run photos:manifest # rebuild lib/image-manifest.ts (sizes + blur placeholders)
npm run photos          # both
```

To add a project: add its photographs to the selection, run `npm run photos`, then describe the project in `content/projects.ts`. Set `featured: true` to include it in the Selected Work sequence, which assigns a different layout family to each position.

## Before launch

Placeholders that must be replaced are marked `TODO(owner)` in `content/`:

- Contact details in `content/contact.ts` (email, phone, WhatsApp number, map query). Placeholder numbers are all zeros so nothing invented can ship by accident, and the structured data omits them until they are real.
- Site URL, region and social links in `content/site.ts`.
- Project titles are descriptive rather than client names; adjust wording, years and locations as the studio prefers.

## Design notes

- Palette: warm ivory, warm white, soft linen and light stone surfaces; deep slate text; muted teal as the working accent; brick orange reserved for small emphasis (active navigation, the slider handle ring, the logo).
- Type: Cormorant Garamond for display, Manrope for text and interface.
- Radius rule: rectangles 6px, circular controls full radius.
- Motion: transforms and opacity only. `prefers-reduced-motion` makes transforms instant while opacity still eases.
