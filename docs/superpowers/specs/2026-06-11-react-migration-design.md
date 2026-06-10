# React Migration & 3D Animated Portfolio Design

**Date:** 2026-06-11  
**Status:** Approved

## Goal
Fully migrate the portfolio from vanilla JS to React 18 + TypeScript, replicating the "3D Animated Portfolio Website (Community)" template in UI and functionality with Kiet Lam's real content.

## Architecture

**Stack:** React 18, TypeScript, Vite 6, Tailwind CSS v4, motion/react, lucide-react, react-countup  
**Entry:** `index.html` → `src/main.tsx` → `<App />`  
**Data:** `src/data/profile.ts` — single source of truth (PROFILE_DATA), TypeScript-typed  
**Components:** `src/components/` — one file per section  
**Styles:** `src/styles/main.css` — Tailwind v4 + glassmorphism utilities + dark/light CSS vars  
**Deployment:** `.github/workflows/deploy.yml` → GitHub Pages (unchanged)

## Sections

| # | Component | Key Features |
|---|-----------|-------------|
| 1 | Navigation | Fixed, glassmorphic on scroll, mobile slide-in menu, dark/light toggle |
| 2 | Hero | Canvas particle network (3D banner) + purple glow blobs + animated text + CTA |
| 3 | About | Profile image + bio + focus area pills |
| 4 | Skills | Category cards with skill pill tags (no made-up percentages) |
| 5 | Experience | Left-side timeline with dots, company/role/bullet highlights |
| 6 | Projects | 2-col image cards (desktop), tech stack tags, live link buttons |
| 7 | Education | Degree card + 2 certification cards (SnowPro Core, MS Fabric) |
| 8 | Achievements | Animated countup: 8+ Years / 100M+ Transactions / 50K+ Clients |
| 9 | Testimonials | "Coming Soon" — carousel shell with placeholder state |
| 10 | Contact | Info cards: email mailto + LinkedIn + GitHub (no form) |
| 11 | Footer | Name, tagline, copyright |

## Design System

- **Background:** `#050814`  
- **Primary accent:** `#7C3AED` → `#9333EA` (purple gradient)  
- **Glass dark:** `rgba(17,24,39,0.9)` with `backdrop-filter: blur(30px)`  
- **Glass light:** `rgba(255,255,255,0.9)` with shadow  
- **Theme:** dark/light toggle, localStorage-persisted (`color-theme` key), FOUC-prevented via inline script

## PROFILE_DATA Additions

```
education:      [{ degree, institution, period, icon }]
certifications: [{ name, issuer, issued, expires, credentialId? }]
achievements:   [{ value, suffix, label, icon }]
```
All existing fields (name, title, tagline, avatarUrl, about, socials, skills, experience, projects) unchanged in shape.

## Content

**Education:** HCM Education University — Bachelor's Computer Software Engineering (2014–2018)  
**Certifications:** SnowPro Core (Snowflake, Jun 2025–Jun 2027), Microsoft Fabric Data Engineer Associate (Feb 2025–Feb 2027)  
**Achievements:** 8+ Years · 100M+ Transactions Migrated · 50K+ Clients Migrated  
**Testimonials:** "Coming Soon" placeholder  
**Contact:** mailto:dylanlam0402@gmail.com · LinkedIn · GitHub (no form)

## Dependencies to Add

`react`, `react-dom`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `motion`, `lucide-react`, `react-countup`

## Files Changed

**Created:** `src/main.tsx`, `src/App.tsx`, `src/components/*.tsx` (11 files), `src/data/profile.ts`, `src/styles/main.css` (replaced), `vite.config.ts` (replaced), `tsconfig.json`, `404.html` (updated)  
**Deleted:** `src/main.js`, `src/404.js`, `src/data/profile.js`, `src/sections/`, `src/icons/`, `src/theme/`, `src/utils/`, `vite.config.js`
