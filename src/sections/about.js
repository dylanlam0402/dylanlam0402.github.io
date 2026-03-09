/**
 * Render the About Me section (left column: text, right column: skills).
 * @param {object} data - PROFILE_DATA
 * @returns {string} HTML string
 */
export function renderAbout(data) {
    const { about, aboutExtra, skills } = data;

    return `
    <section id="about" class="py-20 px-4 sm:px-8 bg-white dark:bg-slate-800/50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">About Me</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-10">
          <div class="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
            <p>${about}</p>
            <p>${aboutExtra}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            ${skills
            .map(
                (group) => `
              <div class="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                <h3 class="font-bold text-lg mb-3 text-primary-700 dark:text-primary-400 border-b border-slate-200 dark:border-slate-700 pb-2">${group.category}</h3>
                <ul class="space-y-2">
                  ${group.items
                        .map(
                            (skill) =>
                                `<li class="flex items-center text-slate-600 dark:text-slate-300 text-sm"><span class="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>${skill}</li>`,
                        )
                        .join('')}
                </ul>
              </div>`,
            )
            .join('')}
          </div>
        </div>
      </div>
    </section>`;
}
