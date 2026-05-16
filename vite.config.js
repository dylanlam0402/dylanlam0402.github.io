import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    plugins: [tailwindcss()],
    build: {
        outDir: 'dist',
        rollupOptions: {
            // Two separate HTML entry points: the main portfolio and a custom 404 page.
            // GitHub Pages serves 404.html for unmatched routes when Pages source is
            // set to "GitHub Actions" — required for the custom error page to work.
            input: {
                main: resolve(__dirname, 'index.html'),
                '404': resolve(__dirname, '404.html'),
            },
        },
    },
};
