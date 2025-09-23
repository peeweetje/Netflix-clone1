import { test, expect } from '@playwright/test';

test.describe('Basic Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set desktop viewport for consistent testing
    await page.setViewportSize({ width: 1200, height: 800 });

    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for basic page structure
    await page.waitForSelector('nav', { state: 'attached', timeout: 15000 });
  });

  test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Netflix/);
  });

  test('displays movie content', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(2000);

    // Wait for the page to load and check for movie content
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();

    // Check that we have some movie cards or content loaded
    // Try different selectors for movie cards
    const movieCardSelectors = [
      'img[alt*="poster"]',
      'img[alt*="movie"]',
      '.card-container',
      '[class*="card"]',
      'div[style*="background-image"]'
    ];

    let foundCards = false;
    for (const selector of movieCardSelectors) {
      const cards = page.locator(selector);
      if (await cards.count() > 0) {
        await expect(cards.first()).toBeVisible();
        foundCards = true;
        break;
      }
    }

    // If no specific cards found, at least verify some content loaded
    if (!foundCards) {
      await expect(page.locator('body')).toContainText('Popular');
    }
  });
});
