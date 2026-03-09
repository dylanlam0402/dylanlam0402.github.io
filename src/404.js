import './styles/main.css';
import { setupThemeToggle } from './theme/index.js';

// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Initialize theme toggle button (if present on 404 page)
setupThemeToggle();
