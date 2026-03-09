/**
 * Render the Featured Projects grid section.
 * @param {object} data - PROFILE_DATA
 * @returns {string} HTML string
 */
export function renderProjects(data) {
    const { projects } = data;

    return `
    <section id="projects" class="py-20 px-4 sm:px-8 bg-white dark:bg-slate-800/50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Featured Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${projects
            .map(
                (proj) => `
            <div class="group h-full bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-700 flex flex-col">
              <div class="relative overflow-hidden h-48 bg-slate-200 dark:bg-slate-700">
                <img src="${proj.imageUrl}" alt="${proj.title} project screenshot"
                  class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onerror="this.style.opacity='0.3'" />
              </div>
              <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">${proj.title}</h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">${proj.description}</p>
                <div class="flex flex-wrap gap-2 mt-auto">
                  ${proj.techStack
                        .map(
                            (tech) =>
                                `<span class="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-md font-medium">${tech}</span>`,
                        )
                        .join('')}
                </div>
                ${(proj.repoUrl && proj.repoUrl !== '#') ||
                        (proj.liveUrl && proj.liveUrl !== '#')
                        ? `
                <div class="flex gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  ${proj.repoUrl && proj.repoUrl !== '#' ? `<a href="${proj.repoUrl}" target="_blank" rel="noreferrer" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">View Code &rarr;</a>` : ''}
                  ${proj.liveUrl && proj.liveUrl !== '#' ? `<a href="${proj.liveUrl}" target="_blank" rel="noreferrer" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">Live Demo &rarr;</a>` : ''}
                </div>`
                        : ''
                    }
              </div>
            </div>`,
            )
            .join('')}
        </div>
      </div>
    </section>`;
}
