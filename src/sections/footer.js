import { icons } from '../icons/index.js';

/**
 * Render the footer / contact section.
 * @param {object} data - PROFILE_DATA
 * @returns {string} HTML string
 */
export function renderFooter(data) {
    const { name, contactEmail } = data;
    const year = new Date().getFullYear();

    return `
    <footer id="contact" class="bg-slate-900 text-white pt-20 pb-10 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6">Let's Connect</h2>
        <p class="text-slate-400 mb-10 max-w-xl mx-auto">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you.
        </p>
        <a href="mailto:${contactEmail}"
          class="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-lg">
          ${icons.email}
          Say Hello
        </a>
        <div class="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-slate-500 text-sm">&copy; ${year} ${name}. All rights reserved.</div>
          <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})"
            class="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 transition-colors"
            aria-label="Scroll to top">
            ${icons.arrowUp}
          </button>
        </div>
      </div>
    </footer>`;
}
