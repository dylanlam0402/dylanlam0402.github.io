# React Migration & 3D Animated Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fully migrate the portfolio from vanilla JS to React 18 + TypeScript, matching the "3D Animated Portfolio Website (Community)" template in UI and functionality with Kiet Lam's real content.

**Architecture:** Single-page React 18 app with TypeScript. All content sourced from `src/data/profile.ts`. Components in `src/components/`. Glassmorphism dark theme (`#050814` bg, `#7C3AED`→`#9333EA` purple accents). Canvas particle animation in Hero. GitHub Pages deployment unchanged.

**Tech Stack:** React 18, TypeScript, Vite 6, Tailwind CSS v4, motion/react, lucide-react, react-countup

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/main.tsx` | React DOM root mount |
| Create | `src/App.tsx` | Top-level component, renders all sections |
| Create | `src/data/profile.ts` | PROFILE_DATA — single source of truth |
| Create | `src/styles/main.css` | Tailwind v4 + glassmorphism utilities + theme CSS vars |
| Create | `src/components/Navigation.tsx` | Fixed nav, glassmorphic scroll, mobile menu, theme toggle |
| Create | `src/components/Hero.tsx` | Canvas particle network (3D banner), animated intro |
| Create | `src/components/About.tsx` | Profile image, bio, focus pills |
| Create | `src/components/Skills.tsx` | Category cards with skill pill tags |
| Create | `src/components/Experience.tsx` | Timeline layout, company/role/highlights |
| Create | `src/components/Projects.tsx` | Image cards, tech tags, live link buttons |
| Create | `src/components/Education.tsx` | Degree + certification cards |
| Create | `src/components/Achievements.tsx` | Animated countup stat cards |
| Create | `src/components/Testimonials.tsx` | "Coming Soon" placeholder |
| Create | `src/components/Contact.tsx` | Email/LinkedIn/GitHub info cards |
| Create | `src/components/Footer.tsx` | Name, tagline, copyright |
| Create | `tsconfig.json` | TypeScript compiler config |
| Modify | `vite.config.js` → `vite.config.ts` | Add React plugin, keep dual HTML entry |
| Modify | `package.json` | Add React, TypeScript, motion, lucide-react deps |
| Modify | `index.html` | Update FOUC script, keep meta, point to main.tsx |
| Modify | `404.html` | Simple React 404 shell |
| Delete | `src/main.js`, `src/404.js` | Replaced by .tsx equivalents |
| Delete | `src/data/profile.js` | Replaced by profile.ts |
| Delete | `src/sections/` | Replaced by src/components/ |
| Delete | `src/icons/`, `src/theme/`, `src/utils/` | No longer needed |
| Delete | `vite.config.js` | Replaced by vite.config.ts |
| Modify | `CLAUDE.md` | Update architecture docs |

---

## Task 1: Install Dependencies & TypeScript Config

**Files:**
- Modify: `package.json`
- Create: `tsconfig.json`

- [ ] **Step 1: Update package.json**

Replace the full file content with:

```json
{
  "name": "kietlam-portfolio",
  "version": "1.0.0",
  "description": "Personal portfolio for Kiet Lam, Senior Data Engineer — deployed at kietlam.me",
  "homepage": "https://kietlam.me",
  "author": "Kiet Lam <dylanlam0402@gmail.com>",
  "license": "MIT",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.487.0",
    "motion": "^12.0.0",
    "react": "^18.3.1",
    "react-countup": "^6.5.3",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.2.1",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.2.1",
    "typescript": "^5.7.3",
    "vite": "^6.4.1"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Install dependencies**

```bash
npm install
```

Expected: no errors, `node_modules/react`, `node_modules/motion`, `node_modules/lucide-react` present.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json tsconfig.json
git commit -m "chore: add React 18 + TypeScript + motion + lucide-react dependencies"
```

---

## Task 2: Update Vite Config

**Files:**
- Create: `vite.config.ts`
- Delete: `vite.config.js`

- [ ] **Step 1: Create vite.config.ts**

```typescript
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        '404': resolve(__dirname, '404.html'),
      },
    },
  },
};
```

- [ ] **Step 2: Delete old vite config**

```bash
rm vite.config.js
```

- [ ] **Step 3: Commit**

```bash
git add vite.config.ts
git rm vite.config.js
git commit -m "chore: migrate vite config to TypeScript, add React plugin"
```

---

## Task 3: CSS Foundation — Glassmorphism + Theme

**Files:**
- Modify: `src/styles/main.css` (full replacement)

- [ ] **Step 1: Replace src/styles/main.css**

```css
@import "tailwindcss";
@import "tw-animate-css";

/* ─── Portfolio theme vars ─────────────────────────────────────────────── */
:root {
  --font-size: 16px;
  --background: #050814;
  --foreground: #F9FAFB;
  --card: #111827;
  --primary: #7C3AED;
  --primary-foreground: #F9FAFB;
  --muted-foreground: #9CA3AF;
  --border: #1F2937;
  --radius: 1rem;
}

.dark {
  --background: #050814;
  --foreground: #F9FAFB;
  --card: #111827;
  --primary: #7C3AED;
  --muted-foreground: #9CA3AF;
  --border: #1F2937;
}

.light {
  --background: #F9FAFB;
  --foreground: #050814;
  --card: #ffffff;
  --primary: #7C3AED;
  --muted-foreground: #6B7280;
  --border: #E5E7EB;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --radius-lg: var(--radius);
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
  html { font-size: var(--font-size); scroll-behavior: smooth; }
}

/* ─── Glassmorphism ─────────────────────────────────────────────────────── */
.glass {
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-strong {
  background: rgba(17, 24, 39, 0.9);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.light .glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.light .glass-strong {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* ─── Scrollbar ─────────────────────────────────────────────────────────── */
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #050814; }
::-webkit-scrollbar-thumb { background: #7C3AED; border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: #9333EA; }
.light ::-webkit-scrollbar-track { background: #F9FAFB; }
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/main.css
git commit -m "feat: glassmorphism CSS foundation with dark/light theme vars"
```

---

## Task 4: Data Layer — profile.ts

**Files:**
- Create: `src/data/profile.ts`
- Delete: `src/data/profile.js`

- [ ] **Step 1: Create src/data/profile.ts**

```typescript
export interface SocialLink {
  platform: 'linkedin' | 'github' | 'email';
  url: string;
  displayText: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  repoUrl: string | null;
  liveUrl: string | null;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string;
  expires: string;
  credentialId?: string;
}

export interface Achievement {
  value: number;
  suffix: string;
  label: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  avatarUrl: string;
  contactEmail: string;
  about: string;
  aboutExtra: string;
  location: string;
  socials: SocialLink[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: Project[];
  education: EducationItem[];
  certifications: Certification[];
  achievements: Achievement[];
}

export const PROFILE_DATA: ProfileData = {
  name: "Kiet Lam",
  title: "Senior Data Engineer",
  tagline: "Turn your data into actionable insights!",
  avatarUrl: "profile.webp",
  contactEmail: "dylanlam0402@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  about:
    "With a background in software engineering and a passion for data analytics, I design and deploy scalable end-to-end data solutions that drive measurable value for clients.",
  aboutExtra:
    "I believe in the power of continuous learning and staying updated with the latest industry trends. My approach combines technical expertise with a keen eye for design, ensuring every product I build is not only functional but also delightful to use.",
  socials: [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/kietlam96",
      displayText: "LinkedIn",
    },
    {
      platform: "github",
      url: "https://github.com/dylanlam0402",
      displayText: "GitHub",
    },
    {
      platform: "email",
      url: "mailto:dylanlam0402@gmail.com",
      displayText: "dylanlam0402@gmail.com",
    },
  ],
  skills: [
    {
      category: "Data Engineering & Architecture",
      items: [
        "Data Engineering",
        "Data Modeling",
        "Data Architecture",
        "Data Lakehouse",
        "Data Warehousing",
        "ETL",
        "Data Migration",
      ],
    },
    {
      category: "Cloud & Platforms",
      items: [
        "Snowflake",
        "Azure Databricks",
        "Microsoft Azure",
        "AWS",
        "Apache Airflow",
      ],
    },
    {
      category: "Databases",
      items: ["SQL", "SQL Server", "PostgreSQL", "MySQL", "Vertica"],
    },
    {
      category: "Programming Languages",
      items: ["Python", "Java", "Ruby", "JavaScript", "SQL"],
    },
    {
      category: "BI & Analytics",
      items: ["Power BI", "Sisense", "GoodData", "Pentaho", "SSRS", "Data Analysis"],
    },
  ],
  experience: [
    {
      company: "Seven Peaks",
      role: "Senior Data Engineer",
      period: "Jul 2023 – Present",
      description: [
        "Served as a Data Architect, providing consultation and implementing Data Warehouse, Data Lake, and Data Lakehouse solutions for Thai SMEs.",
        "Designed and deployed a Data Lakehouse solution for Thailand's largest telecommunications provider.",
        "Consulted and executed data migration involving over 50,000 clients and 100 million transactions in the financial services industry.",
      ],
    },
    {
      company: "KMS Solutions, Inc.",
      role: "Senior Data Engineer",
      period: "Jun 2019 – Apr 2023",
      description: [
        "Consulted, built, and maintained end-to-end data solutions and robust, scalable data pipelines.",
        "Participated in data warehouse design and contributed to report/dashboard ideation to support business decisions.",
        "Provided customer support, communicating directly with US and EU customers about technical solutions.",
      ],
    },
    {
      company: "KMS Solutions, Inc.",
      role: "Software Engineer",
      period: "Jul 2017 – Jun 2019",
      description: [
        "Built and maintained data migration tools to move data and reports from legacy systems to new platforms.",
        "Provided Application Integration solutions including SSO connections and embedded reports.",
        "Tech stack: Java, SQL Server, PostgreSQL, SSRS, and Pentaho.",
      ],
    },
  ],
  projects: [
    {
      title: "Visa Destination Insights",
      description:
        "A comprehensive analytics dashboard for tracking spending with VisaVue products.",
      techStack: ["GoodData", "Vertica", "Ruby", "SQL"],
      imageUrl:
        "https://placehold.co/800x500/0a0a1a/7C3AED?text=Visa+Destination+Insights",
      repoUrl: null,
      liveUrl:
        "https://corporate.visa.com/en/products/visa-destination-insights.html",
    },
    {
      title: "Fraud Detection Data Solution",
      description: "End-to-end data solution for credit-card fraud detection.",
      techStack: ["Vertica", "Python", "TensorFlow"],
      imageUrl: "https://placehold.co/800x500/0a0a1a/7C3AED?text=Fraud+Detection",
      repoUrl: null,
      liveUrl: null,
    },
    {
      title: "AI For Inventory",
      description:
        "Datamart for an AI-powered supply chain management (SCM) solution.",
      techStack: ["BigQuery", "Dataform", "GCP", "KubeFlow"],
      imageUrl: "https://placehold.co/800x500/0a0a1a/7C3AED?text=AI+For+Inventory",
      repoUrl: null,
      liveUrl: null,
    },
  ],
  education: [
    {
      degree: "Bachelor's Degree, Computer Software Engineering",
      institution: "HCM Education University",
      period: "2014 – 2018",
    },
  ],
  certifications: [
    {
      name: "SnowPro Core Certification",
      issuer: "Snowflake",
      issued: "Jun 2025",
      expires: "Jun 2027",
    },
    {
      name: "Microsoft Certified: Fabric Data Engineer Associate",
      issuer: "Microsoft",
      issued: "Feb 2025",
      expires: "Feb 2027",
      credentialId: "716BE394B8C2043B",
    },
  ],
  achievements: [
    { value: 8, suffix: "+", label: "Years of Experience" },
    { value: 100, suffix: "M+", label: "Transactions Migrated" },
    { value: 50, suffix: "K+", label: "Clients Migrated" },
  ],
};
```

- [ ] **Step 2: Delete old profile.js**

```bash
git rm src/data/profile.js
```

- [ ] **Step 3: Commit**

```bash
git add src/data/profile.ts
git commit -m "feat: migrate PROFILE_DATA to TypeScript, add education/certifications/achievements"
```

---

## Task 5: React Entry Point — index.html + main.tsx + App skeleton

**Files:**
- Modify: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`

- [ ] **Step 1: Update index.html**

Replace the full file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kiet Lam | Senior Data Engineer</title>
  <meta name="description" content="Senior Data Engineer specializing in data warehousing, ETL pipelines, and cloud analytics solutions. Portfolio of projects showcasing expertise in Snowflake, Databricks, and Azure." />
  <link rel="canonical" href="https://kietlam.me/">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://kietlam.me/">
  <meta property="og:title" content="Kiet Lam | Senior Data Engineer">
  <meta property="og:description" content="Senior Data Engineer specializing in data warehousing, ETL pipelines, and cloud analytics solutions.">
  <meta property="og:image" content="https://kietlam.me/profile.webp">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Kiet Lam | Senior Data Engineer">
  <meta name="twitter:description" content="Senior Data Engineer specializing in data warehousing, ETL pipelines, and cloud analytics solutions.">
  <meta name="twitter:image" content="https://kietlam.me/profile.webp">

  <meta name="theme-color" content="#050814">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preload" as="image" href="profile.webp">

  <!-- FOUC prevention: set dark class before React renders -->
  <script>
    (function () {
      var stored = localStorage.getItem('color-theme');
      if (stored === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    })();
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

- [ ] **Step 2: Create src/main.tsx**

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 3: Create src/App.tsx (skeleton — all sections wired in Task 16)**

```typescript
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        <section className="min-h-screen flex items-center justify-center">
          <p className="text-white text-2xl">Portfolio loading…</p>
        </section>
      </main>
    </div>
  );
}
```

- [ ] **Step 4: Run dev server to verify React mounts**

```bash
npm run dev
```

Expected: browser shows "Portfolio loading…" on dark background at `http://localhost:5173`.

- [ ] **Step 5: Commit**

```bash
git add index.html src/main.tsx src/App.tsx
git commit -m "feat: React 18 entry point, FOUC-safe dark theme init"
```

---

## Task 6: Navigation Component

**Files:**
- Create: `src/components/Navigation.tsx`

- [ ] **Step 1: Create src/components/Navigation.tsx**

```typescript
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const STORAGE_KEY = 'color-theme';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem(STORAGE_KEY) as 'dark' | 'light') ?? 'dark';
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Desktop nav items */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-foreground"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Theme toggle — desktop */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="hidden lg:flex p-2 rounded-lg hover:bg-[#7C3AED]/10 transition-colors border border-[#1F2937]"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun className="w-5 h-5 text-[#9333EA]" />
                : <Moon className="w-5 h-5 text-[#9333EA]" />}
            </motion.button>

            {/* Mobile buttons */}
            <div className="lg:hidden flex items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-[#7C3AED]/10 border border-[#1F2937]"
                aria-label="Toggle theme"
              >
                {theme === 'dark'
                  ? <Sun className="w-5 h-5 text-[#9333EA]" />
                  : <Moon className="w-5 h-5 text-[#9333EA]" />}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(o => !o)}
                className="p-2 rounded-lg hover:bg-[#7C3AED]/10 border border-[#1F2937]"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile slide-in menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed top-20 right-0 bottom-0 w-64 glass-strong z-40 lg:hidden"
      >
        <div className="flex flex-col p-6 gap-2">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : 50 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 10 }}
              className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-left text-foreground"
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "feat: Navigation — fixed glassmorphic nav with mobile menu and theme toggle"
```

---

## Task 7: Hero Component — Particle Canvas (3D Banner)

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create src/components/Hero.tsx**

```typescript
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { PROFILE_DATA } from '../data/profile';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let rafId: number;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.fillStyle = `rgba(123, 69, 189, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(123, 69, 189, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#7C3AED] opacity-20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#9333EA] opacity-20 blur-[120px] rounded-full" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-block mb-6 px-6 py-2 glass rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-sm tracking-wider text-[#9333EA]">
              {PROFILE_DATA.title}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 px-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-foreground via-[#9333EA] to-foreground bg-clip-text text-transparent">
              {PROFILE_DATA.name}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-[#9CA3AF] mb-4 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {PROFILE_DATA.tagline}
          </motion.p>

          <motion.button
            onClick={scrollToProjects}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2 text-white">
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>

        {/* Floating shapes — desktop only */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-[#7C3AED] rounded-lg opacity-20 hidden md:block"
          animate={{ y: [0, -20, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 border border-[#9333EA] rounded-full opacity-20 hidden md:block"
          animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: Hero — particle canvas 3D banner with animated text and glow blobs"
```

---

## Task 8: About Component

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1: Create src/components/About.tsx**

```typescript
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../data/profile';

export function About() {
  const focusAreas = PROFILE_DATA.skills[0].items.slice(0, 5);

  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group order-2 md:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative glass-strong rounded-2xl p-2 overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-xl"
              >
                <img
                  src={PROFILE_DATA.avatarUrl}
                  alt={PROFILE_DATA.name}
                  className="w-full h-auto rounded-xl"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bio cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 md:space-y-6 order-1 md:order-2"
          >
            <div className="glass-strong rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-4 text-[#9333EA]">Senior Data Engineer</h3>
              <p className="text-[#9CA3AF] leading-relaxed text-sm md:text-base">
                {PROFILE_DATA.about}
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-4 text-[#9333EA]">Location</h3>
              <p className="text-[#9CA3AF] text-sm md:text-base">
                📍 {PROFILE_DATA.location}
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-4 text-[#9333EA]">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[#7C3AED]/20 to-[#9333EA]/20 border border-[#7C3AED]/30 rounded-full text-xs md:text-sm text-foreground"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: About — profile image, bio, and focus area pills"
```

---

## Task 9: Skills Component

**Files:**
- Create: `src/components/Skills.tsx`

Note: Kiet's skills are lists of items (no percentages), so we use pill-tag cards instead of progress bars.

- [ ] **Step 1: Create src/components/Skills.tsx**

```typescript
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../data/profile';

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROFILE_DATA.skills.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="glass-strong rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg md:text-xl mb-6 text-[#9333EA]">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.05 + skillIdx * 0.04 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="px-3 py-1.5 bg-gradient-to-r from-[#7C3AED]/20 to-[#9333EA]/20 border border-[#7C3AED]/30 rounded-full text-xs text-foreground cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Skills.tsx
git commit -m "feat: Skills — category cards with animated pill tags"
```

---

## Task 10: Experience Component

**Files:**
- Create: `src/components/Experience.tsx`

- [ ] **Step 1: Create src/components/Experience.tsx**

```typescript
import { motion } from 'motion/react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7C3AED] to-[#9333EA] hidden md:block" />

          <div className="space-y-12">
            {PROFILE_DATA.experience.map((exp, idx) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative md:ml-20"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.2 + 0.2 }}
                  className="absolute -left-[82px] top-8 w-5 h-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#9333EA] border-4 border-background hidden md:block z-10"
                />

                <div className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-xl w-fit"
                      >
                        <Briefcase className="w-6 h-6 text-[#9333EA]" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl md:text-2xl mb-1 text-foreground">{exp.role}</h3>
                        <p className="text-[#9333EA]">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>

                    <div className="space-y-3">
                      {exp.description.map((point, hIdx) => (
                        <motion.div
                          key={hIdx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 + hIdx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#9333EA] mt-0.5 flex-shrink-0" />
                          <p className="text-[#9CA3AF] text-sm leading-relaxed">{point}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "feat: Experience — timeline layout with animated entry cards"
```

---

## Task 11: Projects Component

**Files:**
- Create: `src/components/Projects.tsx`

- [ ] **Step 1: Create src/components/Projects.tsx**

```typescript
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROFILE_DATA.projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-strong rounded-2xl overflow-hidden group"
            >
              {/* Project image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/60 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-lg mb-2 text-foreground">{project.title}</h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gradient-to-r from-[#7C3AED]/20 to-[#9333EA]/20 border border-[#7C3AED]/30 rounded-full text-xs text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Live link */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-xl text-white text-sm hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: Projects — image cards with tech tags and live link buttons"
```

---

## Task 12: Education & Certifications Component

**Files:**
- Create: `src/components/Education.tsx`

- [ ] **Step 1: Create src/components/Education.tsx**

```typescript
import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Education() {
  return (
    <section id="education" className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">
            Education & Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        {/* Degree cards */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {PROFILE_DATA.education.map((item, idx) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="glass-strong rounded-2xl p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7C3AED]/20 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex p-4 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-2xl flex-shrink-0"
                >
                  <GraduationCap className="w-8 h-8 text-[#9333EA]" />
                </motion.div>
                <div>
                  <h3 className="text-xl md:text-2xl mb-1 text-foreground">{item.degree}</h3>
                  <p className="text-[#9333EA] mb-2">{item.institution}</p>
                  <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <Calendar className="w-4 h-4" />
                    {item.period}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification cards */}
        <h3 className="text-xl mb-6 text-[#9333EA] text-center">Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROFILE_DATA.certifications.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-strong rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C3AED]/20 to-transparent rounded-bl-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-xl flex-shrink-0"
                >
                  <Award className="w-6 h-6 text-[#9333EA]" />
                </motion.div>
                <div>
                  <h4 className="text-base md:text-lg mb-1 text-foreground">{cert.name}</h4>
                  <p className="text-[#9333EA] text-sm mb-2">{cert.issuer}</p>
                  <p className="text-[#9CA3AF] text-xs">
                    Issued {cert.issued} · Expires {cert.expires}
                  </p>
                  {cert.credentialId && (
                    <p className="text-[#9CA3AF] text-xs mt-1">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Education.tsx
git commit -m "feat: Education — degree card and certification cards"
```

---

## Task 13: Achievements Component

**Files:**
- Create: `src/components/Achievements.tsx`

- [ ] **Step 1: Create src/components/Achievements.tsx**

```typescript
import { motion } from 'motion/react';
import { useState } from 'react';
import CountUp from 'react-countup';
import { Clock, Database, Users } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import type { LucideIcon } from 'lucide-react';

const ICONS: LucideIcon[] = [Clock, Database, Users];

export function Achievements() {
  const [inView, setInView] = useState(false);

  return (
    <section id="achievements" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setInView(true)}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">Achievements</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {PROFILE_DATA.achievements.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-strong rounded-2xl p-8 text-center relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(124,58,237,0.1), transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(147,51,234,0.1), transparent 50%)',
                      'radial-gradient(circle at 0% 0%, rgba(124,58,237,0.1), transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                  whileHover={{ rotate: 360 }}
                  className="inline-flex p-6 bg-gradient-to-br from-[#7C3AED] to-[#9333EA] rounded-2xl mb-6 relative z-10"
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.5 }}
                  className="text-5xl mb-4 bg-gradient-to-r from-white to-[#9333EA] bg-clip-text text-transparent relative z-10 font-medium"
                >
                  {inView && (
                    <CountUp
                      start={0}
                      end={item.value}
                      duration={2}
                      suffix={item.suffix}
                    />
                  )}
                </motion.div>

                <p className="text-[#9CA3AF] relative z-10">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Achievements.tsx
git commit -m "feat: Achievements — animated countup stat cards"
```

---

## Task 14: Testimonials — "Coming Soon"

**Files:**
- Create: `src/components/Testimonials.tsx`

- [ ] **Step 1: Create src/components/Testimonials.tsx**

```typescript
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">Testimonials</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-2xl p-12 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="inline-flex p-6 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-full mb-6"
          >
            <Clock className="w-10 h-10 text-[#9333EA]" />
          </motion.div>

          <h3 className="text-2xl mb-4 text-[#9333EA]">Coming Soon</h3>
          <p className="text-[#9CA3AF] max-w-md mx-auto text-sm leading-relaxed">
            Testimonials from colleagues and clients will be featured here. Check back soon!
          </p>

          {/* Placeholder dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                className="h-2 w-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#9333EA]"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Testimonials.tsx
git commit -m "feat: Testimonials — coming soon placeholder"
```

---

## Task 15: Contact Component

**Files:**
- Create: `src/components/Contact.tsx`

- [ ] **Step 1: Create src/components/Contact.tsx**

```typescript
import { motion } from 'motion/react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    href: `mailto:${PROFILE_DATA.contactEmail}`,
    display: PROFILE_DATA.contactEmail,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: PROFILE_DATA.socials.find(s => s.platform === 'linkedin')!.url,
    display: 'linkedin.com/in/kietlam96',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: PROFILE_DATA.socials.find(s => s.platform === 'github')!.url,
    display: 'github.com/dylanlam0402',
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-foreground">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] mx-auto mb-4" />
          <p className="text-[#9CA3AF] max-w-2xl mx-auto text-sm sm:text-base">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONTACT_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.label !== 'Email' ? '_blank' : undefined}
                rel={item.label !== 'Email' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="glass-strong rounded-2xl p-8 text-center group hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex p-4 bg-gradient-to-br from-[#7C3AED]/20 to-[#9333EA]/20 rounded-2xl mb-4 group-hover:from-[#7C3AED]/40 group-hover:to-[#9333EA]/40 transition-all"
                >
                  <Icon className="w-8 h-8 text-[#9333EA]" />
                </motion.div>
                <h3 className="text-lg mb-2 text-[#9333EA]">{item.label}</h3>
                <p className="text-[#9CA3AF] text-sm break-all">{item.display}</p>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass-strong rounded-2xl p-8 text-center"
        >
          <h3 className="text-xl mb-3 text-[#9333EA]">Let's Create Something Amazing</h3>
          <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: Contact — email/LinkedIn/GitHub info cards with mailto link"
```

---

## Task 16: Footer + Wire Up App.tsx

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/Footer.tsx**

```typescript
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="text-2xl bg-gradient-to-r from-white to-[#9333EA] bg-clip-text text-transparent">
            {PROFILE_DATA.name}
          </span>
          <p className="text-[#9CA3AF] text-sm">{PROFILE_DATA.title}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-[#9CA3AF]">
            <span>© {new Date().getFullYear()} Built with</span>
            <Heart className="w-4 h-4 text-[#7C3AED] fill-[#7C3AED]" />
            <span>by {PROFILE_DATA.name}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Replace src/App.tsx with full wired-up version**

```typescript
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Achievements } from './components/Achievements';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Run dev server and verify all sections render**

```bash
npm run dev
```

Expected: full portfolio renders in browser, particle canvas visible in hero, all 11 sections visible when scrolling, theme toggle works, mobile menu works.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx src/App.tsx
git commit -m "feat: Footer component and wire up complete App with all sections"
```

---

## Task 17: 404 Page

**Files:**
- Modify: `404.html`

- [ ] **Step 1: Update 404.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 — Page Not Found | Kiet Lam</title>
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script>
    (function () {
      var stored = localStorage.getItem('color-theme');
      if (stored === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    })();
  </script>
</head>
<body>
  <div id="root-404"></div>
  <script type="module" src="/src/404.tsx"></script>
</body>
</html>
```

- [ ] **Step 2: Create src/404.tsx**

```typescript
import { createRoot } from 'react-dom/client';
import './styles/main.css';

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-medium bg-gradient-to-r from-white via-[#9333EA] to-white bg-clip-text text-transparent mb-4">
          404
        </h1>
        <p className="text-[#9CA3AF] text-lg mb-8">Page not found</p>
        <a
          href="/"
          className="px-8 py-3 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-full text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root-404')!).render(<NotFound />);
```

- [ ] **Step 3: Commit**

```bash
git add 404.html src/404.tsx
git commit -m "feat: 404 page React component with themed styling"
```

---

## Task 18: Cleanup, Build Verification & CLAUDE.md Update

**Files:**
- Delete: `src/main.js`, `src/404.js`, `src/data/profile.js`, `src/sections/`, `src/icons/`, `src/theme/`, `src/utils/`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Remove old vanilla JS files**

```bash
git rm src/main.js src/404.js src/data/profile.js
git rm -r src/sections src/icons src/theme src/utils
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: `dist/` built successfully, no TypeScript errors, no Vite errors.  
If TypeScript errors appear, fix them before proceeding — common fixes:
- Missing `import type` for type-only imports
- `as const` for icon arrays
- Explicit return types where inference fails

- [ ] **Step 3: Verify build output looks correct**

```bash
npm run preview
```

Open `http://localhost:4173` in browser. Verify:
- Particle canvas animates in hero ✓
- Dark/light toggle persists across refresh ✓
- All 11 sections visible ✓
- Mobile menu works at narrow viewport ✓
- Education + Achievements + Testimonials sections present ✓
- Contact cards link to email/LinkedIn/GitHub ✓

- [ ] **Step 4: Update CLAUDE.md**

Replace the "Architecture" section module map table with:

```markdown
| File | Responsibility |
|---|---|
| `src/main.tsx` | React DOM root entry point |
| `src/404.tsx` | React 404 page entry point |
| `src/App.tsx` | Top-level component, renders all sections in order |
| `src/data/profile.ts` | `PROFILE_DATA` — single source of truth for all portfolio content |
| `src/components/Navigation.tsx` | Fixed glassmorphic nav, mobile menu, theme toggle |
| `src/components/Hero.tsx` | Canvas particle animation, animated intro text |
| `src/components/About.tsx` | Profile image, bio, focus area pills |
| `src/components/Skills.tsx` | Category cards with skill pill tags |
| `src/components/Experience.tsx` | Timeline layout with company/role/highlights |
| `src/components/Projects.tsx` | Image cards with tech tags and live links |
| `src/components/Education.tsx` | Degree and certification cards |
| `src/components/Achievements.tsx` | Animated countup stat cards |
| `src/components/Testimonials.tsx` | Coming soon placeholder |
| `src/components/Contact.tsx` | Email/LinkedIn/GitHub contact cards |
| `src/components/Footer.tsx` | Name, tagline, copyright |
| `src/styles/main.css` | Tailwind v4 entry, glassmorphism utilities, dark/light CSS vars |
```

Also update the tech stack line:

```markdown
Pure static site built with **Vite + Tailwind CSS v4 + React 18 + TypeScript** — no backend.
```

And update the FOUC note to reflect the new default (dark):

```markdown
> **FOUC key:** `color-theme` in `localStorage`. Default is dark. Inline IIFE in both HTML files sets `dark` or `light` class on `<html>` before React renders.
```

- [ ] **Step 5: Update sitemap.xml lastmod**

Edit `public/sitemap.xml`, set `<lastmod>` to `2026-06-11`.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete React 18 + TypeScript migration with 3D animated portfolio template"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** All 11 sections have tasks (Navigation ✓, Hero ✓, About ✓, Skills ✓, Experience ✓, Projects ✓, Education ✓, Achievements ✓, Testimonials ✓, Contact ✓, Footer ✓)
- [x] **PROFILE_DATA types match usage:** All components import from `src/data/profile.ts` and use typed fields
- [x] **3D banner (particle canvas):** Hero Task 7 implements full canvas particle network with requestAnimationFrame loop
- [x] **FOUC prevention:** Both `index.html` and `404.html` have inline IIFE that sets `dark`/`light` class
- [x] **Dual Vite entry:** `vite.config.ts` keeps `main` + `404` Rollup inputs
- [x] **Cleanup:** Old vanilla JS files deleted in Task 18
- [x] **No TBDs or placeholders:** All steps contain complete code
