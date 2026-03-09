import { icons } from '../icons/index.js';

const STORAGE_KEY = 'color-theme';

/**
 * Swap the sun / moon icon inside the theme-toggle button.
 */
export function updateThemeIcon() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.innerHTML = document.documentElement.classList.contains('dark')
            ? icons.sun
            : icons.moon;
    }
}

/**
 * Bind the click handler on #theme-toggle and set its initial icon.
 */
export function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
        updateThemeIcon();
    });

    updateThemeIcon();
}
