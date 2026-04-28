# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Kiet Lam (kietlam.me), deployed via GitHub Pages. Static site built with vanilla JavaScript (no framework) and Vite + Tailwind CSS v4.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build locally

No test runner or linter is configured.

## Architecture

The site uses a component-like pattern with pure JS functions that return HTML template strings. There is no virtual DOM or framework — `main.js` concatenates section renderers and sets `innerHTML` on `#root`.

**Key paths:**

- `src/data/profile.js` — single `PROFILE_DATA` object that drives all content (experience, projects, skills, socials). Edit this file to update site content.
- `src/sections/` — render functions (`renderHero`, `renderAbout`, `renderExperience`, `renderProjects`, `renderFooter`), each takes `PROFILE_DATA` and returns an HTML string.
- `src/icons/index.js` — inline SVG icon strings keyed by platform name.
- `src/theme/index.js` — dark/light theme toggle using `localStorage` and `.dark` class on `<html>`.
- `src/styles/main.css` — Tailwind v4 import with custom theme (primary color palette, Inter font).

**Entry points (configured in `vite.config.js`):**

- `index.html` — main portfolio page
- `404.html` — custom GitHub Pages 404 page

## Styling

Tailwind CSS v4 via `@tailwindcss/vite` plugin. Dark mode uses the class strategy (`dark` class on `<html>`). The custom color palette is defined as CSS `@theme` variables in `src/styles/main.css`. An inline `<script>` in each HTML file prevents flash of wrong theme on load.

## Deployment

Hosted on GitHub Pages at custom domain `kietlam.me` (see `public/CNAME`). The `dist/` output is what gets served. `public/.nojekyll` disables Jekyll processing.
