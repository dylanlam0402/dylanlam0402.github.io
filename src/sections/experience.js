/**
 * Render the Work Experience timeline section.
 * @param {object} data - PROFILE_DATA
 * @returns {string} HTML string
 */
export function renderExperience(data) {
    const { experience } = data;

    return `
    <section id="experience" class="py-20 px-4 sm:px-8 bg-slate-50 dark:bg-slate-900">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Work Experience</h2>
        <div class="space-y-12">
          ${experience
            .map(
                (job, idx) => `
            <div class="relative pl-8 md:pl-0">
              <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-700 transform -translate-x-1/2"></div>
              <div class="flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8">
                <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-4 border-primary-500 shadow-lg z-10 overflow-hidden">
                  <img src="${job.logoUrl}" alt="${job.company} logo" class="w-full h-full object-cover" onerror="this.style.display='none'" />
                </div>
                <div class="w-full md:w-5/12 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all">
                  <div class="flex items-center gap-3 mb-2 md:mb-1">
                    <img src="${job.logoUrl}" alt="${job.company} logo"
                      class="w-10 h-10 rounded-full object-cover md:hidden border border-slate-200 dark:border-slate-600"
                      onerror="this.style.display='none'" />
                    <div>
                      <div class="md:hidden text-sm text-primary-600 dark:text-primary-400 font-semibold">${job.period}</div>
                      <h3 class="text-xl font-bold text-slate-800 dark:text-white">${job.role}</h3>
                    </div>
                  </div>
                  <h4 class="text-lg text-slate-600 dark:text-slate-300 mb-4 font-medium">${job.company}</h4>
                  <ul class="space-y-2">
                    ${job.description
                        .map(
                            (desc) =>
                                `<li class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed list-disc list-outside ml-4">${desc}</li>`,
                        )
                        .join('')}
                  </ul>
                </div>
              </div>
            </div>`,
            )
            .join('')}
        </div>
      </div>
    </section>`;
}
