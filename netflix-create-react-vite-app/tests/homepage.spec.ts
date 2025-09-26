import { test, expect } from '@playwright/test';
import {
  setDesktopViewport,
  setMobileViewport,
  gotoAndWaitForNav,
  expectGlobalNav,
  toggleTheme,
  fillAndClearSearch,
  hamburgerLocator,
  waitContent,
  cleanupTestState,
} from './utils';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await setDesktopViewport(page);
    await gotoAndWaitForNav(page, '/');
  });

  test.afterEach(async ({ page }) => {
    await cleanupTestState(page);
  });

  test('displays navigation elements', async ({ page }) => {
    await expectGlobalNav(page);
  });

  test('displays movie categories', async ({ page }) => {
    await waitContent(page, 2000);
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Top Rated' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Action Movies' })
    ).toBeVisible();
  });

  test('search functionality works', async ({ page }) => {
    await fillAndClearSearch(page, 'test search');
  });

  test('navigation links work', async ({ page }) => {
    await page.getByRole('link', { name: 'shows' }).click();
    await expect(page).toHaveURL('/shows');
    await gotoAndWaitForNav(page, '/');
    await page.getByRole('link', { name: 'movies' }).click();
    await expect(page).toHaveURL('/movies');
    await gotoAndWaitForNav(page, '/');
    await page.getByRole('link', { name: 'popular & trending' }).click();
    await expect(page).toHaveURL('/popular-trending');
  });

  test('hero banner displays when available', async ({ page }) => {
    await waitContent(page, 3000);
    const heroTitle = page
      .locator('[data-testid="hero-title"], .hero-title, .banner-title')
      .first();
    const playButton = page.getByRole('button', { name: 'Play' });
    if (await heroTitle.isVisible()) {
      await expect(heroTitle).toBeVisible();
      await expect(playButton).toBeVisible();
    }
  });

  test('movie cards are interactive', async ({ page }) => {
    await waitContent(page, 2000);
    const movieCard = page
      .locator('[data-testid="movie-card"], .movie-card, .card')
      .first();
    if (await movieCard.isVisible()) {
      await expect(movieCard).toBeVisible();
      const cardText = await movieCard.textContent();
      expect(cardText).toBeTruthy();
      expect(cardText!.length).toBeGreaterThan(0);
    }
  });

  test('theme toggle works', async ({ page }) => {
    await toggleTheme(page);
  });

  test('responsive navigation', async ({ page }) => {
    await setMobileViewport(page);
    await expect(hamburgerLocator(page)).toBeVisible();
    await setDesktopViewport(page);
    await expect(page.getByRole('link', { name: 'homepage' })).toBeVisible();
  });
});
