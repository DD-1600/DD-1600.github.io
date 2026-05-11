# Northland Studios — website

> *A small studio in the north woods of the internet.*

Marketing site for Northland Studios. Astro + GitHub Pages.

## Local dev

```sh
npm install
npm run dev          # → http://localhost:4321
```

## Build

```sh
npm run build        # produces ./dist
npm run build:local  # also mirrors dist/ → ~/Library/.../Claude projects/northland-website/dist/ (iCloud)
```

## Deploy

Push to `main`. The `.github/workflows/deploy.yml` action builds + publishes via the official Pages action. GitHub Pages serves it at https://dd-1600.github.io (canonical user-page for the `DD-1600/DD-1600.github.io` repo).

## Domain bind (later)

When `northland.studio` is purchased:

1. Add a `CNAME` file to `public/` containing the single line `northland.studio`.
2. In repo Settings → Pages → Custom domain, enter `northland.studio`.
3. At the DNS provider, add these records for the apex domain:
   - `ALIAS` or `ANAME` `@` → `dd-1600.github.io` (preferred — works with Cloudflare, Namecheap, etc.)
   - OR four `A` records to GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` `www` → `dd-1600.github.io`
4. Wait for HTTPS auto-issue (Let's Encrypt via GitHub Pages, ~10 minutes).
5. Update `NORTHLAND_SITE_URL` env in the GH Actions workflow to `https://northland.studio` so sitemap/OG canonicalize.

## Source-of-truth

App data: `src/data/apps.ts` — single file, all 14 apps. Edit there to update copy or add new apps.

## Notes

- Source lives on local disk; build output mirrors to iCloud for inspection (avoids the iCloud + `.git/` + `node_modules/` thrash that bit Cascadia).
- App Store badges + ratings degrade gracefully to "Coming soon" until each app is live in the Store.
- Brand source: Notion · *Northland Studios — Brand & Business Plan*.
