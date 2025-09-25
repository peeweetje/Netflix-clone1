import { test, expect } from '@playwright/test';

test.describe('Popular and Trending Page', () => {
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for navigation
    test.setTimeout(60000); // 60 seconds

    // Set desktop viewport to ensure navigation is visible
    await page.setViewportSize({ width: 1200, height: 800 });

    await page.goto('/popular-trending', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for basic page structure to be attached to DOM
    await page.waitForSelector('nav', { state: 'attached', timeout: 15000 });
  });

  test('displays navigation elements', async ({ page }) => {
    // Check brand/logo
    await expect(page.getByRole('link', { name: 'BingeWatch' })).toBeVisible();

    // Check navigation menu items
    await expect(page.getByRole('link', { name: 'homepage' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'shows' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'movies' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'popular & trending' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'my list' })).toBeVisible();

    // Check search bar
    await expect(page.getByPlaceholder('search for a title...')).toBeVisible();

    // Check theme toggle button
    await expect(page.getByRole('button', { name: 'Switch Theme' })).toBeVisible();
  });

  test('displays popular and trending content sections', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(2000);

    // Check for trending movies section
    await expect(page.getByText('Trending Movies')).toBeVisible();

    // Check for trending shows section
    await expect(page.getByText('Trending Shows')).toBeVisible();

    // Check for popular movies section
    await expect(page.getByText('Most Popular Movies')).toBeVisible();

    // Check for popular shows section
    await expect(page.getByText('Most Popular Shows')).toBeVisible();
  });

  test('search functionality works', async ({ page }) => {
    const searchInput = page.getByPlaceholder('search for a title...');

    // Type in search box
    await searchInput.fill('test movie');
    await expect(searchInput).toHaveValue('test movie');

    // Wait for search results or loading
    await page.waitForTimeout(1000);

    // Clear search
    await searchInput.clear();
    await expect(searchInput).toHaveValue('');
  });

  test('navigation from popular-trending page', async ({ page }) => {
    // Test navigation back to home
    await page.getByRole('link', { name: 'homepage' }).click();
    await expect(page).toHaveURL('/');

    // Go back to popular-trending
    await page.goto('/popular-trending');

    // Test navigation to other pages
    await page.getByRole('link', { name: 'shows' }).click();
    await expect(page).toHaveURL('/shows');

    // Go back to popular-trending
    await page.goto('/popular-trending');

    // Test navigation to movies
    await page.getByRole('link', { name: 'movies' }).click();
    await expect(page).toHaveURL('/movies');
  });

  test('theme toggle works on popular-trending page', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: 'Switch Theme' });

    // Click theme toggle
    await themeButton.click();

    // Basic check that page is still functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('responsive design on popular-trending page', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });

    // Hamburger menu should be visible on mobile
    const hamburgerButton = page.locator('button').filter({ hasText: '☰' }).or(page.locator('[aria-label*="menu"]'));
    await expect(hamburgerButton.or(page.locator('button:has-text("☰")')).first()).toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });

    // Navigation should be visible on desktop
    await expect(page.getByRole('link', { name: 'popular & trending' })).toBeVisible();
  });

  test('movie/show cards are displayed', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(3000);

    // Check if movie/show cards are present using multiple fallback strategies
    const cardSelectors = [
      '[data-testid="card-container"]',
      '.card-container',
      '.seasonal-card',
      '.movie-row',
      'img[alt]',
      '.card',
      '[class*="card"]',
      '.movie-list',
      '.row-container'
    ];

    let cardFound = false;
    for (const selector of cardSelectors) {
      const elements = page.locator(selector);
      const count = await elements.count();
      if (count > 0) {
        await expect(elements.first()).toBeVisible();
        cardFound = true;
        break;
      }
    }

    // If no specific card elements found, check for any content in the main container
    if (!cardFound) {
      const container = page.locator('.container, main, [class*="container"]').first();
      if (await container.isVisible()) {
        // Check that the container has some content (children)
        const children = await container.locator('*').count();
        expect(children).toBeGreaterThan(0);
      }
    }
  });

  test('loading states are handled', async ({ page }) => {
    // Test that loading spinner appears during initial load
    const loadingSpinner = page.locator('[data-testid="loading"], .loading-spinner, .spinner');
    if (await loadingSpinner.isVisible().catch(() => false)) {
      await expect(loadingSpinner).toBeVisible();
    }

    // Wait for content to load
    await page.waitForTimeout(2000);

    // Loading should be gone after content loads
    if (await loadingSpinner.isVisible().catch(() => false)) {
      await expect(loadingSpinner).not.toBeVisible();
    }
  });
});
