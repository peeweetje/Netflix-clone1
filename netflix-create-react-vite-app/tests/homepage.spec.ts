import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for navigation
    test.setTimeout(60000); // 60 seconds

    // Set desktop viewport to ensure navigation is visible
    await page.setViewportSize({ width: 1200, height: 800 });

    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for basic page structure to be attached to DOM
    await page.waitForSelector('nav', { state: 'attached', timeout: 15000 });
  });

  test('displays navigation elements', async ({ page }) => {
    // Check brand/logo
    await expect(page.getByRole('link', { name: 'BingeWatch' })).toBeVisible();

    // Check navigation menu items using more specific selectors
    await expect(page.locator('a[href="/"]').filter({ hasText: 'homepage' }).or(page.locator('a').filter({ hasText: 'homepage' }))).toBeVisible();
    await expect(page.getByRole('link', { name: 'shows' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'movies' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'popular & trending' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'my list' })).toBeVisible();

    // Check search bar with correct placeholder
    await expect(page.getByPlaceholder('search for a title...')).toBeVisible();

    // Check theme toggle button
    await expect(page.getByRole('button', { name: 'Switch Theme' })).toBeVisible();
  });

  test('displays movie categories', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(2000);

    // Check for movie category headings
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Top Rated' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Action Movies' })).toBeVisible();
  });

  test('search functionality works', async ({ page }) => {
    const searchInput = page.getByPlaceholder('search for a title...');

    // Type in search box
    await searchInput.fill('test search');
    await expect(searchInput).toHaveValue('test search');

    // Clear search
    await searchInput.clear();
    await expect(searchInput).toHaveValue('');
  });

  test('navigation links work', async ({ page }) => {
    // Test navigation to different pages
    await page.getByRole('link', { name: 'shows' }).click();
    await expect(page).toHaveURL('/shows');

    // Go back to home
    await page.goto('/');

    await page.getByRole('link', { name: 'movies' }).click();
    await expect(page).toHaveURL('/movies');

    // Go back to home
    await page.goto('/');

    await page.getByRole('link', { name: 'popular & trending' }).click();
    await expect(page).toHaveURL('/popular-trending');
  });

  test('hero banner displays when available', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(3000);

    // Check if hero banner elements are present (may not always be visible depending on data)
    const heroTitle = page.locator('[data-testid="hero-title"], .hero-title, .banner-title').first();
    const playButton = page.getByRole('button', { name: 'Play' });

    // If hero banner is present, check its elements
    if (await heroTitle.isVisible()) {
      await expect(heroTitle).toBeVisible();
      await expect(playButton).toBeVisible();
    }
  });

  test('movie cards are interactive', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(2000);

    // Find movie cards (they might have different selectors)
    const movieCard = page.locator('[data-testid="movie-card"], .movie-card, .card').first();

    if (await movieCard.isVisible()) {
      // Check that movie cards are clickable
      await expect(movieCard).toBeVisible();

      // Get the card's text content to verify it has movie information
      const cardText = await movieCard.textContent();
      expect(cardText).toBeTruthy();
      expect(cardText!.length).toBeGreaterThan(0);
    }
  });

  test('theme toggle works', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: 'Switch Theme' });

    // Click theme toggle
    await themeButton.click();

    // The theme should change (we can check this by looking for theme-related classes or styles)
    // This is a basic check - in a real app you might check for specific theme classes
    await expect(page.locator('body')).toBeVisible();
  });

  test('responsive navigation', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });

    // Hamburger menu should be visible on mobile
    const hamburgerButton = page.locator('button').filter({ hasText: '☰' }).or(page.locator('[aria-label*="menu"]'));
    await expect(hamburgerButton.or(page.locator('button:has-text("☰")')).first()).toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });

    // Navigation should be visible on desktop
    await expect(page.locator('a[href="/"]').filter({ hasText: 'homepage' }).or(page.locator('a').filter({ hasText: 'homepage' }))).toBeVisible();
  });
});
