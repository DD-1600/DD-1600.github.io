#!/usr/bin/env node
/**
 * sync-icloud.mjs
 *
 * After a local `astro build`, mirror dist/ into the iCloud-synced
 * Claude projects folder so Daniel can inspect built output there.
 * GH Actions does NOT run this — it deploys straight from dist/.
 */
import { cp, rm, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, '..', 'dist');
const target =
  process.env.NORTHLAND_ICLOUD_DIST ||
  path.join(
    process.env.HOME || '',
    'Library/Mobile Documents/com~apple~CloudDocs/Claude projects/northland-website/dist'
  );

if (!existsSync(source)) {
  console.error(`[sync-icloud] dist/ not found at ${source} — run 'astro build' first.`);
  process.exit(1);
}

await rm(target, { recursive: true, force: true });
await mkdir(path.dirname(target), { recursive: true });
await cp(source, target, { recursive: true });

console.log(`[sync-icloud] mirrored dist/ → ${target}`);
