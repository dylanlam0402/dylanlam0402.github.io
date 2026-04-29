import { defineConfig } from '@playwright/test';

const CHROMIUM_PATH = '/Users/kietlam/Library/Caches/ms-playwright/chromium-1217/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:5174',
    // headless: false uses the full Chrome binary (headless shell not needed)
    headless: false,
    executablePath: CHROMIUM_PATH,
    launchOptions: {
      args: ['--headless=new', '--no-sandbox', '--disable-setuid-sandbox'],
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
