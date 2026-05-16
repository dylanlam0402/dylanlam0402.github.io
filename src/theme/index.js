import { icons } from '../icons/index.js';

const STORAGE_KEY = 'color-theme';

function setToggleState(toggle, isDark) {
    toggle.innerHTML = isDark ? icons.sun : icons.moon;
    toggle.setAttribute('aria-pressed', String(isDark));
}

function updateThemeIcon() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        setToggleState(toggle, document.documentElement.classList.contains('dark'));
    }
}

export function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
        setToggleState(toggle, isDark);
    });

    // Set initial icon and aria-pressed state
    setToggleState(toggle, document.documentElement.classList.contains('dark'));
}
