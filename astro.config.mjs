// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Northland Studios — Astro config.
//
// Hosting plan:
//   1. Free path: GitHub Pages at https://northlandstudios.github.io (canonical user page).
//   2. Once Daniel buys northland.studio, set the CNAME file in public/ and update `site`.
//
// The site URL drives canonical/OG/sitemap. Default to the .github.io URL today;
// flip to https://northland.studio once DNS binds — config change, no code change.

// Pre-DNS, the site lives at https://dd-1600.github.io (user-page; DD-1600/DD-1600.github.io repo).
// Post-DNS, after CNAME → northland.studio, it serves from / at the apex.
// Either way the path is /, so no `base` config needed.
const PROD_SITE =
  process.env.NORTHLAND_SITE_URL || 'https://dd-1600.github.io';

export default defineConfig({
  site: PROD_SITE,
  base: '/',

  trailingSlash: 'never',

  build: {
    // Inline tiny CSS to avoid a render-blocking request for the critical sliver.
    inlineStylesheets: 'auto',
    // Pretty asset paths under /_assets/ (Astro default is /_astro/ — we override for legibility).
    assets: '_assets',
  },

  image: {
    // Astro's built-in sharp service for icon + screenshot optimization.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],

  vite: {
    // Force a stable build hash filename so the CDN caches well.
    build: { cssMinify: 'lightningcss' },
  },
});
