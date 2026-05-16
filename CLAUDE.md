# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # Production build to dist/
npm run preview  # Preview the built dist/ locally
```

There is no test suite, linter, or formatter configured.

## Architecture

Personal portfolio site (Kiet Lam — Senior Data Engineer) deployed to GitHub Pages at `kietlam.me`. Pure static site built with **Vite + Tailwind CSS v4 + vanilla JS** — no framework, no backend.

### Multi-page entry points

`vite.config.js` declares two Rollup inputs:
- `index.html` → loads `src/main.js` (portfolio)
- `404.html` → loads `src/404.js` (error page)

Both HTML files are slim shells. The 404 page reuses the styles and theme module but has no section renderers.

### Single source of truth: `src/data/profile.js`

All portfolio content (name, socials, skills, experience, projects, etc.) lives in the `PROFILE_DATA` export. Sections read from this object — do not hardcode content in section files. Shape:

```js
{ name, title, tagline, avatarUrl, contactEmail, about, aboutExtra,
  socials: [{ platform, url, displayText }],
  skills:  [{ category, items }],
  experience: [{ company, role, period, description: string[], logoUrl }],
  projects:   [{ title, description, techStack: string[], imageUrl, repoUrl: string|null, liveUrl: string|null }] }
```

### Rendering pattern

Each file in `src/sections/` exports a `renderX(data)` function that returns an **HTML string** (template literal with `.map().join('')` for repeats). `src/main.js` concatenates them into `root.innerHTML`. There is no virtual DOM, no reactivity, no event delegation — interactivity is wired up manually after render (see `setupThemeToggle()`).

To add a section: create `src/sections/foo.js` exporting `renderFoo(data)`, add any new fields to `PROFILE_DATA`, then import and concatenate it inside `renderPortfolio()` in `src/main.js`.

### Module map

| File | Responsibility |
|---|---|
| `src/main.js` | Entry for `index.html`; calls all section renderers and wires up interactivity |
| `src/404.js` | Entry for `404.html`; renders theme toggle, sets footer year |
| `src/data/profile.js` | `PROFILE_DATA` — single source of truth for all portfolio content |
| `src/sections/hero.js` | `renderHero(data)` — avatar, name, title, socials, CTA |
| `src/sections/about.js` | `renderAbout(data)` — bio text and skills grid |
| `src/sections/experience.js` | `renderExperience(data)` — zig-zag timeline of jobs |
| `src/sections/projects.js` | `renderProjects(data)` — featured project cards |
| `src/sections/footer.js` | `renderFooter(data)` — contact section and scroll-to-top |
| `src/sections/themeToggle.js` | `renderThemeToggle()` — fixed theme-toggle button (used by both pages) |
| `src/icons/index.js` | SVG registry (`icons` map) + `getIconSvg(platform)`. **Add a new entry here when adding a new social platform.** |
| `src/theme/index.js` | `setupThemeToggle()` — wires click handler, manages `aria-pressed`, sets icon. Owns `STORAGE_KEY = 'color-theme'` (also hardcoded in both HTML FOUC scripts — **must be kept in sync**). |
| `src/utils/escape.js` | `escapeHtml(str)` and `safeUrl(url)` — used by all section renderers to prevent XSS |
| `src/styles/main.css` | Tailwind v4 entry; `@theme` palette tokens; `@custom-variant dark`; `@layer components` (`.card`, `.section`, `.section-heading`) |

### Conventions

- **`null` for missing links:** `projects[].repoUrl` and `projects[].liveUrl` use `null` to mean "no link". The renderer suppresses the action footer when both are `null`. Do not use `"#"` — it renders as a dead link.
- **`socials[].platform` coupling:** The value must match a key in `src/icons/index.js`. If you add a new social platform, register its SVG there first.
- **`experience[].description` is an array of strings**, not a single string. Each entry renders as a `<li>` bullet.
- **All asset URLs in `PROFILE_DATA`** are root-relative (resolved against `public/`). Example: `avatarUrl: "profile.webp"` maps to `public/profile.webp`.
- **`color-theme` storage key** appears in three places: `src/theme/index.js` (`STORAGE_KEY`), the FOUC script in `index.html`, and the FOUC script in `404.html`. **If you rename it, update all three.**

### Styling: Tailwind v4

- Imported via `@import "tailwindcss"` in `src/styles/main.css` (build-time plugin `@tailwindcss/vite`, not CDN).
- Theme tokens (`--color-primary-*`, `--font-sans`) defined in an `@theme` block in `main.css`.
- Dark mode uses `@custom-variant dark (&:where(.dark, .dark *))` with the `dark:` prefix on utilities. Toggled by adding/removing `dark` on `<html>`; persisted in `localStorage` under key `color-theme`.
- Reusable patterns extracted to `@layer components`: `.card`, `.section`, `.section-heading`.

### FOUC prevention (do not break this)

Both `index.html` and `404.html` have an inline IIFE `<script>` in `<head>` that reads `localStorage` and sets the `dark` class on `<html>` **before** any rendering. This must stay inline and synchronous — ES modules are deferred, so moving it into `src/` would re-introduce the flash. The theme key is shared across both pages.

### Performance invariants (do not remove without measuring)

- **Inline FOUC script** — must run before any section renderer reads `<html>.classList`.
- **`<link rel="preconnect">`** to Google Fonts domains — reduces DNS/TLS latency.
- **`<link rel="preload" as="image" href="profile.webp">`** — LCP optimisation for hero avatar.
- **Inter font via `media="print"` swap trick** — non-blocking font load; `<noscript>` fallback included.
- **`fetchpriority="high"`** on hero `<img>` — boosts avatar in browser fetch queue.
- **`loading="lazy" decoding="async"`** on all below-the-fold images — defers off-screen fetches.

### `public/` assets

Files here are copied verbatim to `dist/` and served from the root path.

| File | Purpose |
|---|---|
| `CNAME` | Maps GitHub Pages to `kietlam.me` |
| `.nojekyll` | Bypasses Jekyll processing on GitHub Pages |
| `robots.txt` | Allows all crawlers; points at sitemap |
| `sitemap.xml` | **Hand-maintained** — bump `<lastmod>` dates whenever content changes |
| `favicon.ico` | Site icon |
| `profile.jpg` / `profile.webp` | Hero avatar (webp preferred) |

## Deployment

`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on push to `main`. Files in `public/` (including `CNAME` → `kietlam.me` and `.nojekyll`) are copied verbatim to `dist/`. The repo's Pages source must be set to "GitHub Actions".
