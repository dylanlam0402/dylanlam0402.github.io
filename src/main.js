import './styles/main.css';
import { PROFILE_DATA } from './data/profile.js';
import { setupThemeToggle } from './theme/index.js';
import { renderHero } from './sections/hero.js';
import { renderAbout } from './sections/about.js';
import { renderExperience } from './sections/experience.js';
import { renderProjects } from './sections/projects.js';
import { renderFooter } from './sections/footer.js';

function renderPortfolio() {
    const root = document.getElementById('root');
    if (!root) return;

    root.innerHTML = `
    ${renderHero(PROFILE_DATA)}
    <main>
      ${renderAbout(PROFILE_DATA)}
      ${renderExperience(PROFILE_DATA)}
      ${renderProjects(PROFILE_DATA)}
    </main>
    ${renderFooter(PROFILE_DATA)}
  `;

    setupThemeToggle();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPortfolio);
} else {
    renderPortfolio();
}
