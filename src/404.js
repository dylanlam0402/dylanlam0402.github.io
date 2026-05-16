import './styles/main.css';
import { setupThemeToggle } from './theme/index.js';
import { renderThemeToggle } from './sections/themeToggle.js';

const toggleRoot = document.getElementById('toggle-root');
if (toggleRoot) {
    toggleRoot.innerHTML = renderThemeToggle();
}

const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

setupThemeToggle();
