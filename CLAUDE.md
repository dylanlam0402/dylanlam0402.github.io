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

Personal portfolio site (Kiet Lam — Senior Data Engineer) deployed to GitHub Pages at `kietlam.me`. Static site built with **Vite + Tailwind CSS v4 + React 18 + TypeScript** — no backend.

### Multi-page entry points

`vite.config.ts` declares two Rollup inputs:
- `index.html` → loads `src/main.tsx` (portfolio React app)
- `404.html` → loads `src/404.tsx` (error page React component)

### Single source of truth: `src/data/profile.ts`

All portfolio content lives in the `PROFILE_DATA` export (TypeScript-typed). Components read from this object — do not hardcode content in component files. Shape:

```ts
{ name, title, tagline, avatarUrl, contactEmail, about, aboutExtra, location,
  socials: [{ platform, url, displayText }],
  skills:  [{ category, items: string[] }],
  experience: [{ company, role, period, description: string[] }],
  projects:   [{ title, description, techStack: string[], imageUrl, repoUrl: string|null, liveUrl: string|null }],
  education:  [{ degree, institution, period }],
  certifications: [{ name, issuer, issued, expires, credentialId? }],
  achievements: [{ value, suffix, label }] }
```

### Rendering pattern

React 18 component tree rooted at `src/App.tsx`. Each `src/components/*.tsx` file exports a named component. `motion/react` handles all animations (scroll-triggered via `whileInView`, entrance via `initial`/`animate`).

To add a section: create `src/components/Foo.tsx`, add any new fields to `PROFILE_DATA` + `ProfileData` interface in `profile.ts`, import and render inside `App.tsx`.

### Module map

| File | Responsibility |
|---|---|
| `src/main.tsx` | React DOM root entry point |
| `src/404.tsx` | React 404 page entry point |
| `src/App.tsx` | Top-level component, renders all sections in order |
| `src/data/profile.ts` | `PROFILE_DATA` — single source of truth for all portfolio content |
| `src/components/Navigation.tsx` | Fixed glassmorphic nav, mobile slide-in menu, dark/light toggle |
| `src/components/Hero.tsx` | Canvas particle animation (80 particles + connecting lines), animated intro |
| `src/components/About.tsx` | Profile image, bio, focus area pills |
| `src/components/Skills.tsx` | Category cards with skill pill tags |
| `src/components/Experience.tsx` | Timeline layout with company/role/highlights |
| `src/components/Projects.tsx` | Image cards with tech tags and live links |
| `src/components/Education.tsx` | Degree and certification cards |
| `src/components/Achievements.tsx` | Animated countup stat cards (react-countup) |
| `src/components/Testimonials.tsx` | Coming soon placeholder |
| `src/components/Contact.tsx` | Email/LinkedIn/GitHub contact cards |
| `src/components/Footer.tsx` | Name, tagline, copyright |
| `src/styles/main.css` | Tailwind v4 entry, glassmorphism utilities (`.glass`, `.glass-strong`), dark/light CSS vars |

### Conventions

- **`null` for missing links:** `projects[].repoUrl` and `projects[].liveUrl` use `null` to mean "no link". Do not use `"#"`.
- **`experience[].description` is an array of strings**, not a single string. Each entry renders as a bullet point.
- **All asset URLs in `PROFILE_DATA`** are root-relative (resolved against `public/`). Example: `avatarUrl: "profile.webp"` maps to `public/profile.webp`.
- **`color-theme` storage key** appears in `src/components/Navigation.tsx` (`STORAGE_KEY`) and the FOUC scripts in both `index.html` and `404.html`. **If you rename it, update all three.**

### Styling: Tailwind v4 + Glassmorphism

- Imported via `@import "tailwindcss"` in `src/styles/main.css` (build-time plugin `@tailwindcss/vite`, not CDN).
- Design: dark background `#050814`, purple accent gradient `#7C3AED` → `#9333EA`.
- Theme vars (`--background`, `--foreground`, `--primary`, etc.) defined in `:root`, `.dark`, `.light` blocks in `main.css`. Toggled by adding `.dark` or `.light` class on `<html>`.
- Glassmorphism: `.glass` (70% opacity blur-20) and `.glass-strong` (90% opacity blur-30) utility classes defined in `main.css`. Light mode variants included.
- Persisted in `localStorage` under key `color-theme`. Default is dark.

### FOUC prevention (do not break this)

Both `index.html` and `404.html` have an inline IIFE `<script>` in `<head>` that reads `localStorage` and sets the `dark` or `light` class on `<html>` **before** React renders. This must stay inline and synchronous — ES modules are deferred, so moving it into `src/` would re-introduce the flash. The theme key is shared across both pages.

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
