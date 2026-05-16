export function renderThemeToggle() {
    return `
    <button id="theme-toggle"
      class="fixed top-5 right-5 z-50 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:scale-110 transition-transform shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Toggle theme"
      aria-pressed="false">
    </button>`;
}
