# kietlam.me — Personal Portfolio

Personal portfolio for [Kiet Lam](https://kietlam.me), Senior Data Engineer. Built with Vite + Tailwind CSS v4 + vanilla JS, deployed to GitHub Pages.

## Tech Stack

- **Build:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (build-time plugin, not CDN)
- **JS:** Vanilla ES modules — no framework
- **Deploy:** GitHub Pages via GitHub Actions

## Local Development

```bash
npm install
npm run dev      # dev server at http://localhost:5173 with HMR
npm run build    # production build → dist/
npm run preview  # preview dist/ locally
```

## Editing Content

All portfolio content (name, socials, skills, experience, projects) lives in one file:

**`src/data/profile.js`** — edit this to update any displayed data.

- `projects[].repoUrl` / `liveUrl`: set to `null` to hide the link.
- `socials[].platform`: must match a key in `src/icons/index.js` (linkedin, github, email, phone).

## Adding a New Section

1. Create `src/sections/mySection.js` exporting `renderMySection(data)` returning an HTML string.
2. Add any new data fields to `PROFILE_DATA` in `src/data/profile.js`.
3. Import and concatenate inside `renderPortfolio()` in `src/main.js`.

## Deployment

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys `dist/` to GitHub Pages automatically.

The custom domain `kietlam.me` is set via `public/CNAME`.
