import { escapeHtml, safeUrl } from '../utils/escape.js';

export function renderExperience(data) {
    const { experience } = data;

    return `
    <section id="experience" class="section bg-slate-50 dark:bg-slate-900">
      <div class="max-w-4xl mx-auto">
        <h2 class="section-heading">Work Experience</h2>
        <div class="space-y-12">
          ${experience
            .map(
                (job, idx) => `
            <div class="relative pl-8 md:pl-0">
              <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-700 transform -translate-x-1/2"></div>
              <!-- alternate card alignment left/right on md+ to create a zig-zag timeline -->
              <div class="flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8">
                <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-4 border-primary-500 shadow-lg z-10 overflow-hidden">
                  <img src="${safeUrl(job.logoUrl)}" alt="${escapeHtml(job.company)} logo" class="w-full h-full object-cover" loading="lazy" decoding="async" width="48" height="48" />
                </div>
                <div class="card w-full md:w-5/12 p-6">
                  <div class="flex items-center gap-3 mb-2 md:mb-1">
                    <img src="${safeUrl(job.logoUrl)}" alt="${escapeHtml(job.company)} logo"
                      class="w-10 h-10 rounded-full object-cover md:hidden border border-slate-200 dark:border-slate-600"
                      loading="lazy" decoding="async" width="40" height="40" />
                    <div>
                      <div class="text-sm text-primary-600 dark:text-primary-400 font-semibold">${escapeHtml(job.period)}</div>
                      <h3 class="text-xl font-bold text-slate-800 dark:text-white">${escapeHtml(job.role)}</h3>
                    </div>
                  </div>
                  <h4 class="text-lg text-slate-600 dark:text-slate-300 mb-4 font-medium">${escapeHtml(job.company)}</h4>
                  <ul class="space-y-2">
                    ${job.description
                        .map(
                            (desc) =>
                                `<li class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed list-disc list-outside ml-4">${escapeHtml(desc)}</li>`,
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
