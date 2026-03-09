# AI Copilot Instructions for dylanlam0402.github.io

## Project Overview

This is a **personal portfolio website** deployed to GitHub Pages via Vite. The site showcases Kiet Lam's professional profile as a Senior Data Engineer, featuring work experience, skills, projects, and contact information.

**Key Architecture:**
- **Build Tool:** Vite with `@tailwindcss/vite` plugin
- **Entry Points:** `index.html` (portfolio) and `404.html` (error page) — both slim HTML shells
- **Content Source:** `src/data/profile.js` — structured `PROFILE_DATA` export (single source of truth)
- **Rendering:** Modular vanilla JS section renderers under `src/sections/`
- **Styling:** Tailwind CSS v4 (build-time, not CDN) configured in `src/styles/main.css`
- **Theme:** Dark mode via `dark:` classes, localStorage key `color-theme`, shared logic in `src/theme/`
- **Deploy:** GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys `dist/` to Pages

## File Structure

```
├── index.html                  # Main HTML shell (loads src/main.js)
├── 404.html                    # Error page HTML shell (loads src/404.js)
├── vite.config.js              # Vite config (multi-page, Tailwind plugin)
├── package.json                # Dependencies & scripts (dev, build, preview)
├── public/                     # Static assets copied as-is to dist/
│   ├── .nojekyll               # Prevents Jekyll processing on GitHub Pages
│   ├── CNAME                   # Custom domain: kietlam.me
│   ├── favicon.ico
│   ├── profile.webp
│   ├── profile.jpg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.js                 # Entry: imports CSS, renders all sections, boots theme
│   ├── 404.js                  # Entry for 404: imports CSS, sets year, boots theme
│   ├── styles/
│   │   └── main.css            # Tailwind imports, @theme config, critical CSS
│   ├── data/
│   │   └── profile.js          # PROFILE_DATA export (all portfolio content)
│   ├── icons/
│   │   └── index.js            # SVG icon strings + getIconSvg() helper
│   ├── theme/
│   │   └── index.js            # initTheme(), setupThemeToggle(), updateThemeIcon()
│   └── sections/
│       ├── hero.js             # renderHero() — avatar, name, socials, theme toggle
│       ├── about.js            # renderAbout() — about text + skills grid
│       ├── experience.js       # renderExperience() — work timeline
│       ├── projects.js         # renderProjects() — project cards
│       └── footer.js           # renderFooter() — contact CTA, year, scroll-to-top
└── .github/
    └── workflows/
        └── deploy.yml          # Build + deploy to GitHub Pages on push to main
```

## Critical Patterns & Conventions

### Data Structure
All portfolio content lives in `src/data/profile.js` as `PROFILE_DATA`:
```javascript
export const PROFILE_DATA = {
  name, title, tagline, avatarUrl, contactEmail, about, aboutExtra,
  socials: [{ platform, url, displayText }],
  skills: [{ category, items }],
  experience: [{ id, company, role, period, description, logoUrl }],
  projects: [{ id, title, description, techStack, imageUrl, repoUrl, liveUrl }]
};
```
**Keep this structure intact** — it's the single source of truth for all profile content.

### Rendering Pattern
Each page section has its own renderer in `src/sections/`:
1. Each exports a function like `renderHero(data)` that returns an HTML string
2. `src/main.js` composes them: `root.innerHTML = renderHero(data) + renderAbout(data) + ...`
3. Template strings with `.map()` handle repeating elements
4. Icons are imported from `src/icons/index.js`

### Styling Approach
- **Tailwind CSS v4** (build-time via `@tailwindcss/vite` plugin)
- **Theme config** in `src/styles/main.css` using `@theme` block (colors, fonts)
- **Dark mode** via `@custom-variant dark` and Tailwind's `dark:` prefix
- **Responsive design**: Mobile-first with `md:` breakpoints
- **Color palette**: Primary blue defined in `@theme` (`--color-primary-500: #0ea5e9`)

### Theme Toggle
Shared module at `src/theme/index.js` used by both pages:
- `setupThemeToggle()` — Binds click handler to `#theme-toggle` button
- `updateThemeIcon()` — Swaps sun/moon SVG
- **FOUC prevention**: Both HTML files have an inline `<script>` IIFE in `<head>` that sets the `dark` class before any rendering — this must stay inline (not in a module) because ES modules are deferred.

## Development Workflow

### Local Development
```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
```

### Updating Portfolio Content
1. Edit `PROFILE_DATA` in `src/data/profile.js`
2. HMR updates the page instantly during `npm run dev`

### Adding a New Section
1. Add any new data fields to `PROFILE_DATA` in `src/data/profile.js`
2. Create `src/sections/newsection.js` exporting `renderNewSection(data)`
3. Import and compose in `src/main.js`

### Adding a New Project
- Add object to `projects` array in `src/data/profile.js`
- Use unique `id` (e.g., `proj-4`)

### Adding Icons
1. Add SVG string to `icons` object in `src/icons/index.js`
2. Use via `getIconSvg('name')` or direct import

### Modifying Styles
- **Tailwind utilities**: Edit class strings in the relevant `src/sections/*.js` file
- **Theme colors/fonts**: Edit `@theme` block in `src/styles/main.css`
- **Critical CSS**: Edit rules below `@theme` in `src/styles/main.css`

## Deployment

Automated via GitHub Actions on push to `main`:
1. `npm ci` → `npm run build` → `dist/` deployed to GitHub Pages
2. `CNAME` and `.nojekyll` in `public/` ensure correct domain and no Jekyll interference
3. **Repo Settings**: Pages source must be set to "GitHub Actions"

## Technical Notes

- **No backend/database**: Pure static site
- **Theme persistence**: `localStorage` key `color-theme` — shared between index and 404
- **Browser compatibility**: ES6+ modules, modern browsers required
- **Google Fonts**: Loaded asynchronously with print-media swap trick + noscript fallback
