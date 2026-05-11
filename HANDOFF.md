# Northland Studios — website · Phase 4 handoff

> *Read this on a fresh Terminal at `~/projects/northland-website-source/`.*

**Status (updated 2026-05-11):**
- ✅ Empty GitHub repo created at https://github.com/DD-1600/DD-1600.github.io (public; canonical user-page repo)
- ✅ Pages source set to **GitHub Actions** in repo settings
- ⏳ **Code not yet pushed** — single command below
- ⏳ Domain purchase + DNS — deferred until Daniel buys `northland.studio`

Why this repo + URL pattern instead of the original `northlandstudios/northlandstudios.github.io` plan: the `northlandstudios` GitHub org doesn't exist on Daniel's account (verified by inspecting his org list — owns `Daniel-Davis-Creations`, `DD16-Creations`, member of `ProctorU`). The original `gh repo create` failed silently on the missing owner. Rather than create a new org now (extra setup), the site lands on the personal canonical user-page at `DD-1600.github.io` for an equivalent free-hosting URL. Eventually invisible behind `northland.studio` via CNAME.

---

## 0. Quick verify the site builds on your Mac

The build was verified in a Linux sandbox, but the canonical first build belongs on your machine. From `~/projects/northland-website-source/`:

```sh
npm install
npm run dev          # → http://localhost:4321 — pages should render with hero, app grid, etc.
# Ctrl-C, then a one-shot production build:
npm run build:local  # builds dist/ and mirrors to ~/Library/.../Claude projects/northland-website/dist/
```

If anything explodes, the most likely culprit is the shiki / sitemap version pin in package.json — those are intentional and shouldn't be bumped without re-testing. (Astro 4.16 + @astrojs/sitemap 3.7.x throws `reduce of undefined` at build:done; pinned to 3.2.1 fixes that. Shiki 1.29.x is missing `dist/index.mjs`; overridden to 1.24.2.)

---

## 1. Push the code — single command sequence

The empty repo and Pages config are already set up for you. From your terminal:

```sh
cd ~/projects/northland-website-source
git init -b main
git add .
git commit -m "Initial commit — Northland Studios website"
git remote add origin git@github.com:DD-1600/DD-1600.github.io.git
git push -u origin main
```

(If SSH isn't set up, swap the remote URL for `https://github.com/DD-1600/DD-1600.github.io.git` — git will prompt for your token.)

That's it. Pushing to `main` triggers the deploy workflow at `.github/workflows/deploy.yml`. After ~90 seconds the site goes live at:

→ **https://dd-1600.github.io**

Watch the deploy at https://github.com/DD-1600/DD-1600.github.io/actions.

---

## 2. (Pages is already configured)

Done for you — repo Settings → Pages → Source is already set to **GitHub Actions**. Nothing further to click before the first push.

---

## 3. Verify the deploy

Visit https://dd-1600.github.io and click through:

- `/` — Home with hero + 14-app grid
- `/apps/cairn`, `/apps/the-roost`, `/apps/wagcast` — featured app pages
- `/apps/<any other slug>` — 11 more app pages (each dynamically generated)
- `/about` — studio mission + principles
- `/press` — logo lockups, palette, per-app press grid, bio copy-to-clipboard
- `/contact` — email addresses + social
- `/404` — off-the-trail page

If anything looks off, file an issue on the repo and re-build locally to debug before any Daniel-facing share.

---

## 4. Bind the custom domain (`northland.studio`) later

Daniel handles the purchase. **When ready:**

### 4a. Buy the domain

Recommended registrars (no affiliate): **Cloudflare Registrar** (at-cost pricing, free DNS), **Namecheap** (`.studio` is currently ~$30/yr there), **Porkbun** (similar pricing).

Avoid GoDaddy.

### 4b. Add the `CNAME` file to the repo

```sh
echo "northland.studio" > public/CNAME
git add public/CNAME
git commit -m "Bind northland.studio custom domain"
git push
```

### 4c. Set the custom domain in repo settings

**Repo Settings → Pages → Custom domain** → enter `northland.studio` → Save.
GitHub will run a DNS check; expect it to fail at first while DNS propagates.

### 4d. Set DNS at your registrar

For the apex domain (`northland.studio`), prefer an **ALIAS** or **ANAME** record if your registrar supports it:

```
Type   Name   Value
ALIAS  @      dd-1600.github.io
CNAME  www    dd-1600.github.io
```

If your registrar doesn't support ALIAS/ANAME at the apex, fall back to four A records:

```
Type  Name  Value
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   dd-1600.github.io
```

### 4e. Wait for HTTPS

After DNS resolves, GitHub Pages auto-issues a Let's Encrypt certificate (~10 minutes). Check the **Pages** tab for the green "Your site is live at https://northland.studio" badge.

### 4f. Update the Astro `site` URL

```sh
# In repo Settings → Secrets and variables → Actions → Variables
# Add: NORTHLAND_SITE_URL = https://northland.studio
```

The deploy workflow already reads `${{ vars.NORTHLAND_SITE_URL }}` and falls back to the .github.io URL — so the only thing you do on the website side is set the Variable. No code change, no rebuild.

The next push will rebuild with the new canonical URL baked into `<link rel="canonical">`, OG tags, and `sitemap-index.xml`.

---

## 5. Future workflow

### Edit copy

- App data: `src/data/apps.ts` — single file for all 14 apps. Edit there.
- Page-level copy: `src/pages/<name>.astro` for one-off pages.

### Add a new app

1. Add an entry to `apps` in `src/data/apps.ts`.
2. Drop the icon at `public/icons/<slug>.png` (1024×1024).
3. (Optional) Drop screenshots at `public/screenshots/<slug>/01.png` ... `0N.png`. Update the `hasRealScreenshots` flag if the data file (not yet implemented per-app — easy to add).
4. Commit + push. The dynamic `[slug].astro` page handles routing automatically.

### Add a blog (Field Notes)

The site is already RSS-stubbed (`<link rel="alternate" ...>` in BaseLayout, robots.txt sitemap pointer). To add the actual blog:

1. `npm install @astrojs/rss` (or use Astro's content collections directly).
2. Create `src/content/config.ts` declaring a `fieldNotes` collection with frontmatter schema.
3. Write posts in `src/content/fieldNotes/*.md`.
4. Add `src/pages/field-notes/index.astro` and `src/pages/field-notes/[slug].astro` listing + rendering them.
5. Add `src/pages/rss.xml.ts` to emit the feed.

This was deferred to keep the static site lean for launch.

### Replace placeholder screenshots

Currently each per-app page shows tall placeholder frames labeled with screen names. To swap in real screenshots:

1. Drop PNGs at `public/screenshots/<slug>/01.png`, `02.png`, etc.
2. In the per-app page (`src/pages/apps/[slug].astro`), the `ScreenshotStrip` component is hard-coded to `hasRealScreenshots={false}`. Flip to `true` per-app (or read from `app.hasRealScreenshots` if you add that field).

---

## 6. Decisions in the build (audit log)

| Decision                          | Choice                            | Why                                                                                   |
| --------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------- |
| Static-site generator             | Astro 4.16                        | Best-in-class static; blog-ready via content collections; deploys clean to GH Pages.  |
| CSS architecture                  | Single global.css + scoped styles | No Tailwind / no build chain beyond Astro. Locks in the brand palette as CSS vars.    |
| Fonts                             | Google Fonts (Geist + Instrument Serif + Geist Mono) | Free, no licensing. Can self-host later for perf if needed.       |
| Image optimization                | Astro `Image` + Sharp             | Built-in; will optimize on first build with real screenshots.                         |
| Routing                           | File-based, dynamic `[slug].astro` for apps | Add a new app by editing one data file.                                       |
| App Store ratings                 | iTunes Lookup API, client-side    | Free, no auth. Graceful degrade to "Coming soon" via the data file's `appStore.id`.   |
| Deployment                        | GitHub Pages via official Pages Action | Free. Custom domain bind is a single CNAME file + DNS records.                   |
| Repo name                         | `DD-1600/DD-1600.github.io`       | Canonical user-page repo for Daniel's personal account → free `dd-1600.github.io` URL until DNS binds. Original plan was `northlandstudios/northlandstudios.github.io` but that org didn't exist on Daniel's account; pivoted to personal per global guidance. |
| Theme                             | `data-theme` on `<html>`, system-pref aware, persisted to localStorage | Prevents flash-of-wrong-theme via inline boot script. |
| Source vs build                   | Source at `~/projects/northland-website-source/`, dist mirrored to iCloud | Avoids the iCloud + git + node_modules friction that bit Cascadia. |
| FitTrack / Cairn                  | One entry, "formerly FitTrack"    | Confirmed by Daniel at Phase 2 gate.                                                  |
| Domain                            | `northland.studio` (per brand plan), `.github.io` as no-DNS fallback | Brand plan strongly recommended; `.studio` TLD reads as on-brand. |

---

## 7. Known stubs (intentional)

1. **Real screenshots** — placeholders for now; drop real PNGs into `public/screenshots/<slug>/` when ready.
2. **Live App Store ratings** — code is wired (`StoreRating` component → iTunes Lookup); will activate when `appStore.id` is set on each app's entry in `src/data/apps.ts` after Store launch.
3. **Field Notes blog** — RSS link + sitemap pointer are stubbed; the actual blog scaffolding is one ~30-line PR away (Astro content collections).
4. **`favicon.png` + `apple-touch-icon.png`** — only the SVG favicon is committed. Drop PNG variants (32×32, 180×180) at `public/favicon.png` and `public/apple-touch-icon.png` for older browsers / Safari home-screen pinning.
5. **`og-image.png`** — referenced as default OG image; a 1200×630 PNG with the N-blaze + wordmark should land at `public/og-image.png`.
6. **Cairn-specific icon variants** — Cairn ships with 4+ icon variants (slate, ocean, midnight, ember) in `~/Workout/icon-previews/`. The site currently uses the default. Could surface variants in the per-app sidebar later.

---

## 8. Lighthouse target

The site is built to hit **≥95 Lighthouse** across performance / accessibility / best practices / SEO. Verify after deploy:

```sh
npx lighthouse https://northlandstudios.github.io --view --preset=desktop
```

Likely first-pass issues to budget for:
- Google Fonts request — drop a `font-display: swap` and preload to keep LCP tight (already done).
- Sharp icon outputs — Astro's image service will optimize on-the-fly; first build is the heaviest.

---

## 9. Don't auto-merge

Per Daniel's rule, this workflow does NOT push to `main` on its own. Every code change pushed to `main` triggers a deploy; every change to `main` should be a Daniel-reviewed commit.

For future iteration: use feature branches + PRs into `main`. The deploy action only runs on `main`, so previews are local-only (`npm run dev`).
