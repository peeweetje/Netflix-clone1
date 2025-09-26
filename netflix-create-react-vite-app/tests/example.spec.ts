import { test, expect } from '@playwright/test';
import {
  setDesktopViewport,
  gotoAndWaitForNav,
  waitContent,
  expectAnyCardVisible,
} from './utils';

test.describe('Basic Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setDesktopViewport(page);
    await gotoAndWaitForNav(page, '/');
  });

  test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Netflix/);
  });

  test('displays movie content', async ({ page }) => {
    await waitContent(page, 2000);
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
    await expectAnyCardVisible(page);
  });
});
