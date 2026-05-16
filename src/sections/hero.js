import { getIconSvg } from '../icons/index.js';
import { escapeHtml, safeUrl } from '../utils/escape.js';

export function renderHero(data) {
    const { name, title, tagline, avatarUrl, socials } = data;

    return `
    <button id="theme-toggle"
      class="fixed top-5 right-5 z-50 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:scale-110 transition-transform shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Toggle theme"
      aria-pressed="false">
    </button>

    <section class="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-8">
      <div class="max-w-4xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div class="flex-shrink-0">
          <div class="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-700 shadow-2xl">
            <img src="${safeUrl(avatarUrl)}" alt="${escapeHtml(name)} - ${escapeHtml(title)}"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              fetchpriority="high" width="256" height="256" />
          </div>
        </div>
        <div class="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h1 class="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white tracking-tight">${escapeHtml(name)}</h1>
          <h2 class="text-xl md:text-2xl font-semibold text-primary-600 dark:text-primary-400">${escapeHtml(title)}</h2>
          <p class="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">${escapeHtml(tagline)}</p>
          <div class="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
            ${socials
            .map(
                (s) =>
                    `<a href="${safeUrl(s.url)}" ${s.platform !== 'email' && s.platform !== 'phone' ? 'target="_blank" rel="noopener noreferrer"' : ''}
                    class="p-3 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-md hover:shadow-lg hover:text-primary-600 dark:hover:text-primary-400 hover:-translate-y-1 transition-all duration-300"
                    aria-label="${escapeHtml(s.displayText)}">${getIconSvg(s.platform)}</a>`,
            )
            .join('')}
          </div>
          <div class="pt-6">
            <a href="#contact"
              class="px-8 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-full shadow-lg hover:opacity-90 transition-opacity">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>`;
}
