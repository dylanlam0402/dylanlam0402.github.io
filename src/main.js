import './styles/main.css';
import { PROFILE_DATA } from './data/profile.js';
import { setupThemeToggle } from './theme/index.js';
import { renderHero } from './sections/hero.js';
import { renderAbout } from './sections/about.js';
import { renderExperience } from './sections/experience.js';
import { renderProjects } from './sections/projects.js';
import { renderFooter } from './sections/footer.js';

function setupScrollToTop() {
    const btn = document.getElementById('scroll-to-top');
    if (btn) {
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}

function renderPortfolio() {
    const root = document.getElementById('root');
    if (!root) return;

    root.innerHTML = `
    ${renderHero(PROFILE_DATA)}
    <main id="main-content">
      ${renderAbout(PROFILE_DATA)}
      ${renderExperience(PROFILE_DATA)}
      ${renderProjects(PROFILE_DATA)}
    </main>
    ${renderFooter(PROFILE_DATA)}
  `;

    setupThemeToggle();
    setupScrollToTop();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPortfolio);
} else {
    renderPortfolio();
}
