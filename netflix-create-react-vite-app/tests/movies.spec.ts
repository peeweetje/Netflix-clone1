import { test, expect } from '@playwright/test';
import {
  setDesktopViewport,
  setMobileViewport,
  gotoAndWaitForNav,
  expectGlobalNav,
  toggleTheme,
  fillAndClearSearch,
  hamburgerLocator,
} from './utils';

test.describe('Movies Page', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await setDesktopViewport(page);
    await gotoAndWaitForNav(page, '/movies');
  });

  test('displays navigation elements', async ({ page }) => {
    await expectGlobalNav(page);
  });

  test('search functionality works', async ({ page }) => {
    await fillAndClearSearch(page, 'test movie');
  });

  test('navigation from movies page', async ({ page }) => {
    await page.getByRole('link', { name: 'homepage' }).click();
    await expect(page).toHaveURL('/');
    await gotoAndWaitForNav(page, '/movies');
    await page.getByRole('link', { name: 'shows' }).click();
    await expect(page).toHaveURL('/shows');
  });

  test('theme toggle works on movies page', async ({ page }) => {
    await toggleTheme(page);
  });

  test('responsive design on movies page', async ({ page }) => {
    await setMobileViewport(page);
    await expect(hamburgerLocator(page)).toBeVisible();
    await setDesktopViewport(page);
    await expect(page.getByRole('link', { name: 'movies' })).toBeVisible();
  });
});
