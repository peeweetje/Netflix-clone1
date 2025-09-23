import { test, expect } from '@playwright/test';

test.describe('Movies Page', () => {
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for navigation
    test.setTimeout(60000); // 60 seconds

    // Set desktop viewport to ensure navigation is visible
    await page.setViewportSize({ width: 1200, height: 800 });

    await page.goto('/movies', { waitUntil: 'domcontentloaded', timeout: 30000 });

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

  test('navigation from movies page', async ({ page }) => {
    // Test navigation back to home
    await page.getByRole('link', { name: 'homepage' }).click();
    await expect(page).toHaveURL('/');

    // Go back to movies
    await page.goto('/movies');

    // Test navigation to other pages
    await page.getByRole('link', { name: 'shows' }).click();
    await expect(page).toHaveURL('/shows');
  });

  test('theme toggle works on movies page', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: 'Switch Theme' });

    // Click theme toggle
    await themeButton.click();

    // Basic check that page is still functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('responsive design on movies page', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });

    // Hamburger menu should be visible on mobile
    const hamburgerButton = page.locator('button').filter({ hasText: '☰' }).or(page.locator('[aria-label*="menu"]'));
    await expect(hamburgerButton.or(page.locator('button:has-text("☰")')).first()).toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });

    // Navigation should be visible on desktop
    await expect(page.getByRole('link', { name: 'movies' })).toBeVisible();
  });
});
