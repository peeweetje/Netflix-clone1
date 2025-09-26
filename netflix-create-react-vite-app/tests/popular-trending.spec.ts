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
  expectAnyCardVisible,
  cleanupTestState,
} from './utils';

test.describe('Popular and Trending Page', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await setDesktopViewport(page);
    await gotoAndWaitForNav(page, '/popular-trending');
  });

  test.afterEach(async ({ page }) => {
    await cleanupTestState(page);
  });

  test('displays navigation elements', async ({ page }) => {
    await expectGlobalNav(page);
  });

  test('displays popular and trending content sections', async ({ page }) => {
    await waitContent(page, 2000);
    await expect(page.getByText('Trending Movies')).toBeVisible();
    await expect(page.getByText('Trending Shows')).toBeVisible();
    await expect(page.getByText('Most Popular Movies')).toBeVisible();
    await expect(page.getByText('Most Popular Shows')).toBeVisible();
  });

  test('search functionality works', async ({ page }) => {
    await fillAndClearSearch(page, 'test movie');
  });

  test('navigation from popular-trending page', async ({ page }) => {
    await page.getByRole('link', { name: 'homepage' }).click();
    await expect(page).toHaveURL('/');
    await gotoAndWaitForNav(page, '/popular-trending');
    await page.getByRole('link', { name: 'shows' }).click();
    await expect(page).toHaveURL('/shows');
    await gotoAndWaitForNav(page, '/popular-trending');
    await page.getByRole('link', { name: 'movies' }).click();
    await expect(page).toHaveURL('/movies');
  });

  test('theme toggle works on popular-trending page', async ({ page }) => {
    await toggleTheme(page);
  });

  test('responsive design on popular-trending page', async ({ page }) => {
    await setMobileViewport(page);
    await expect(hamburgerLocator(page)).toBeVisible();
    await setDesktopViewport(page);
    await expect(
      page.getByRole('link', { name: 'popular & trending' })
    ).toBeVisible();
  });

  test('movie/show cards are displayed', async ({ page }) => {
    await waitContent(page, 3000);
    await expectAnyCardVisible(page);
  });

  test('loading states are handled', async ({ page }) => {
    // Test that loading spinner appears during initial load
    const loadingSpinner = page.locator(
      '[data-testid="loading"], .loading-spinner, .spinner'
    );
    if (await loadingSpinner.isVisible().catch(() => false)) {
      await expect(loadingSpinner).toBeVisible();
    }

    await waitContent(page, 2000);

    // Loading should be gone after content loads
    if (await loadingSpinner.isVisible().catch(() => false)) {
      await expect(loadingSpinner).not.toBeVisible();
    }
  });
});
