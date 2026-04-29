import { test, expect } from '@playwright/test';
import path from 'path';

const SCREENSHOT_DIR = path.join(process.cwd(), 'tests', 'screenshots');

test.describe('Hero Section Visual Verification', () => {

  test('desktop (1280px) - hero layout and theme toggle', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    // Wait for hero content to be fully rendered
    await page.waitForSelector('h1');

    // ---- Content assertions ----
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kiet Lam');

    // Scope h2 search inside the hero section to avoid strict-mode multi-match
    const heroSection = page.locator('section').first();
    await expect(heroSection.getByRole('heading', { level: 2 })).toContainText('Senior Data Engineer');

    await expect(page.getByText('Turn your data into actionable insights!')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get in Touch' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();

    // Avatar image container
    const avatarImg = page.locator('img[alt*="Kiet Lam"]');
    await expect(avatarImg).toBeVisible();

    // Social links
    await expect(page.getByRole('link', { name: /linkedin/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /github/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /email/i })).toBeVisible();

    // ---- Centering check: hero inner div should be horizontally centered ----
    const heroBbox = await heroSection.boundingBox();
    const contentDiv = heroSection.locator('.max-w-4xl').first();
    const contentBbox = await contentDiv.boundingBox();

    // Content left edge + content width/2 should be close to viewport center (1280/2 = 640)
    const contentCenter = contentBbox.x + contentBbox.width / 2;
    const viewportCenter = 1280 / 2;
    expect(Math.abs(contentCenter - viewportCenter)).toBeLessThan(10);

    // ---- Stacked layout: avatar should be above the text block ----
    const avatarDiv = heroSection.locator('.rounded-full').first();
    const textDiv = heroSection.locator('.text-center').first();
    const avatarDivBbox = await avatarDiv.boundingBox();
    const textDivBbox = await textDiv.boundingBox();
    // Avatar top < text block top means avatar is above text
    expect(avatarDivBbox.y).toBeLessThan(textDivBbox.y);

    // ---- Full-page screenshot ----
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/hero-desktop-1280.png`,
      fullPage: true,
    });
  });

  test('mobile (375px) - hero layout and centering', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    await page.waitForSelector('h1');

    const heroSection = page.locator('section').first();

    // Content still present
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kiet Lam');
    await expect(page.getByText('Turn your data into actionable insights!')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get in Touch' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();

    // ---- Centering check at 375px ----
    const contentDiv = heroSection.locator('.max-w-4xl').first();
    const contentBbox = await contentDiv.boundingBox();
    const contentCenter = contentBbox.x + contentBbox.width / 2;
    const viewportCenter = 375 / 2;
    expect(Math.abs(contentCenter - viewportCenter)).toBeLessThan(10);

    // ---- Stacked layout still applies on mobile ----
    const avatarDiv = heroSection.locator('.rounded-full').first();
    const textDiv = heroSection.locator('.text-center').first();
    const avatarDivBbox = await avatarDiv.boundingBox();
    const textDivBbox = await textDiv.boundingBox();
    expect(avatarDivBbox.y).toBeLessThan(textDivBbox.y);

    // ---- Full-page screenshot ----
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/hero-mobile-375.png`,
      fullPage: true,
    });
  });

  test('theme toggle is visible and switches dark class', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await page.waitForSelector('#theme-toggle');

    const html = page.locator('html');
    const toggle = page.getByRole('button', { name: 'Toggle theme' });

    // Record initial state
    const initiallyDark = await html.evaluate(el => el.classList.contains('dark'));

    // Click toggle — class should flip
    await toggle.click();
    const afterFirstClick = await html.evaluate(el => el.classList.contains('dark'));
    expect(afterFirstClick).toBe(!initiallyDark);

    // Click again — should revert
    await toggle.click();
    const afterSecondClick = await html.evaluate(el => el.classList.contains('dark'));
    expect(afterSecondClick).toBe(initiallyDark);
  });
});
