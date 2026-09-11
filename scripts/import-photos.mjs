#!/usr/bin/env node
/**
 * Copies the curated selection of real photographs into public/images/projects,
 * converting HEIC to JPEG and resizing to a sensible web master size.
 *
 *   npm run photos:import            # skips files that already exist
 *   npm run photos:import -- --force # re-exports everything
 *
 * The selection lives in scripts/photo-selection.json:
 *   { "sourceRoot": "...", "maxEdge": 2000, "quality": 82,
 *     "projects": { "<slug>": [ { "src": "<folder>/<file>", "out": "01-living.jpg" } ] } }
 *
 * Uses macOS `sips` (built in) so no extra dependencies are needed for HEIC decoding.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = process.cwd();
const force = process.argv.includes("--force");
const selectionFile = path.join(root, "scripts", "photo-selection.json");
const selection = JSON.parse(await fs.readFile(selectionFile, "utf8"));

const sourceRoot = selection.sourceRoot.replace(/^~/, process.env.HOME ?? "");
const maxEdge = selection.maxEdge ?? 2000;
const quality = selection.quality ?? 82;
const outRoot = path.join(root, "public", "images", "projects");

let exported = 0;
let skipped = 0;
for (const [slug, photos] of Object.entries(selection.projects)) {
  const dir = path.join(outRoot, slug);
  await fs.mkdir(dir, { recursive: true });
  for (const photo of photos) {
    const src = path.join(sourceRoot, photo.src);
    const out = path.join(dir, photo.out);
    const edge = photo.maxEdge ?? maxEdge;
    if (!force && (await fs.stat(out).catch(() => null))) {
      skipped++;
      continue;
    }
    await fs.access(src);
    await run("sips", [
      "-s",
      "format",
      "jpeg",
      "-s",
      "formatOptions",
      String(quality),
      "-Z",
      String(edge),
      src,
      "--out",
      out,
    ]);
    exported++;
    console.log(`${slug}/${photo.out}`);
  }
}
console.log(`Exported ${exported} photographs, skipped ${skipped} existing.`);
