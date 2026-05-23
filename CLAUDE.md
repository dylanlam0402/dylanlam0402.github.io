# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # Production build to dist/
npm run preview  # Preview the built dist/ locally
```

There is no JS test runner, linter, or formatter configured. Feature-level test cases live as markdown checklists under `tests/` and are verified by the `visual-qa` subagent via Playwright MCP (see Harness below).

## Vibe-coding harness — `/ship`

End-to-end automation with cost-optimized orchestrator/worker split. Input is a feature requirement, output is an open GitHub PR. Invoke via the `ship` skill (`.claude/skills/ship/SKILL.md`).

**Architecture:** Opus orchestrator (this main session) plans and decides. Sonnet workers do the verbose work. Handoff is via `.claude/plans/ship-<slug>/{plan.md, state.json, log/}` — never via re-explaining context.

| Role | Model | Job |
|---|---|---|
| Orchestrator | Opus 4.7 | Plan, sequence stages, read state, judge gates |
| `dev-worker` | Sonnet 4.6 | Implement code per plan; update state |
| `test-worker` | Sonnet 4.6 | Drive Playwright MCP per plan; update state |
| `code-reviewer` | Sonnet 4.6 | Audit diff against invariants in this file |

**Recommended hands-off invocation:**
```text
/goal Use the /ship skill to deliver "<requirement>". Goal is met when a GitHub PR URL has been reported and state.json shows stage=done. Stop after 25 turns.
```

Pair with auto mode for fully unattended runs.

**Pipeline:** plan (orchestrator) → isolate worktree → implement (dev-worker loop) → verify (test-worker, both themes) → review (code-reviewer) → ship (orchestrator). Per-gate 3-strike safety cap. `state.json` is the resume key.

**Token discipline:** orchestrator never reads full diffs (uses `git diff --stat`). Workers return ≤10-line summaries; detail goes to `log/*.md`. Worker prompts pass file paths, not contents.

Project-level permissions and the CNAME-protection hook live in `.claude/settings.json`.

## Architecture

Personal portfolio site (Kiet Lam — Senior Data Engineer) deployed to GitHub Pages at `kietlam.me`. Static site built with **React 19 + Vite + Tailwind CSS v4** — no backend. 3D visuals via **Three.js / @react-three/fiber**. Animations via **GSAP + ScrollTrigger**.

### Single-page app

`vite.config.js` has a single entry point:
- `index.html` → loads `src/main.jsx` (React root)

`404.html` is a standalone static error page (no React, no JS module).

### Content sources

- **`src/constants/index.js`** — all portfolio content used by sections (navLinks, words, counterItems, abilities, expCards, techStackIcons, socialImgs, projects, etc.)
- **`src/data/profile.js`** — `PROFILE_DATA` export (legacy reference; constants/index.js is the live source for React sections)

### Module map

| File | Responsibility |
|---|---|
| `src/main.jsx` | React 19 createRoot entry |
| `src/App.jsx` | Composes all section components |
| `src/index.css` | Tailwind v4 entry; `@theme` palette; component layers |
| `src/constants/index.js` | All content data (single source of truth for sections) |
| `src/components/NavBar.jsx` | Sticky navbar with scroll detection |
| `src/components/Button.jsx` | CTA button with animated arrow |
| `src/components/AnimatedCounter.jsx` | Scroll-triggered counting animation |
| `src/components/GlowCard.jsx` | Card with mouse-tracking glow border |
| `src/components/TitleHeader.jsx` | Section title + subtitle header |
| `src/components/ExpContent.jsx` | Experience content layout helper |
| `src/components/models/hero_models/` | Three.js Room, Lights, Particles, HeroExperience canvas |
| `src/components/models/contact/` | Three.js Computer model + ContactExperience canvas |
| `src/components/models/tech_logos/` | Three.js TechIconCardExperience canvas |
| `src/sections/Hero.jsx` | Hero section — word slider, 3D room, counters |
| `src/sections/ShowcaseSection.jsx` | Projects showcase (3 cards) |
| `src/sections/LogoShowcase.jsx` | Marquee of company/tech logos |
| `src/sections/FeatureCards.jsx` | 3 ability/feature cards |
| `src/sections/Experience.jsx` | Timeline of work experience with GlowCards |
| `src/sections/TechStack.jsx` | 5 tech stack 3D icon cards |
| `src/sections/Contact.jsx` | Contact form + 3D computer model |
| `src/sections/Footer.jsx` | Footer with social icons and copyright |

### Conventions

- **Content lives in `src/constants/index.js`** — do not hardcode content in section files. Add new data fields here first.
- **3D models** are `.glb` files in `public/models/` loaded via `@react-three/drei`'s `useGLTF`.
- **No React Router** — this is a single-page scroll site with anchor links only.
- **No theme toggle** — dark-only site; background is always black.
- **`null` for missing links** — `projects[].liveUrl` uses `null` for "no link". The renderer suppresses the link when null.

### Styling: Tailwind v4

- Imported via `@import "tailwindcss"` in `src/index.css` (build-time plugin `@tailwindcss/vite`, not CDN).
- Theme tokens defined in an `@theme` block in `index.css`.
- Dark mode is always on — no toggle, no `dark:` prefix needed for base styles.
- Reusable patterns in `@layer components`: `.card-border`, `.section-padding`, `.hero-layout`, etc.

### GSAP animations

- `ScrollTrigger` registered at the top of each section that uses scroll-based animations.
- `useGSAP` hook from `@gsap/react` manages cleanup automatically.

### Performance invariants (do not remove without measuring)

- **`<link rel="preconnect">`** to Google Fonts domains in `index.html`.
- **`<link rel="preload" as="image" href="/profile.webp">`** in `index.html` — LCP optimisation.
- **`loading="lazy"`** on below-the-fold images.

### `public/` assets

Files here are copied verbatim to `dist/` and served from the root path.

| File | Purpose |
|---|---|
| `CNAME` | Maps GitHub Pages to `kietlam.me` |
| `.nojekyll` | Bypasses Jekyll processing on GitHub Pages |
| `robots.txt` | Allows all crawlers; points at sitemap |
| `sitemap.xml` | **Hand-maintained** — bump `<lastmod>` dates whenever content changes |
| `favicon.ico` | Site icon |
| `profile.jpg` / `profile.webp` | Hero avatar |
| `images/` | All section images (projects, experience, logos, icons) |
| `models/` | All `.glb` 3D model files |

## Deployment

`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on push to `main`. Files in `public/` (including `CNAME` → `kietlam.me` and `.nojekyll`) are copied verbatim to `dist/`. The repo's Pages source must be set to "GitHub Actions".
