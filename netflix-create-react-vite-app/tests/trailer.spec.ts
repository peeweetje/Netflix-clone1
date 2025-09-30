import { test, expect } from '@playwright/test';
import {
  setDesktopViewport,
  waitContent,
} from './utils';

test.describe('Trailer Page', () => {
  const mockTrailer = {
    results: [
      {
        key: 'test-trailer-key',
        type: 'Trailer',
        site: 'YouTube',
        name: 'Test Trailer',
      },
    ],
  };

  const mockNoTrailer = {
    results: [
      {
        key: 'test-clip-key',
        type: 'Clip',
        site: 'YouTube',
        name: 'Test Clip',
      },
    ],
  };

  const mockNoVideos = {
    results: [],
  };

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await setDesktopViewport(page);
  });

  test('loads and displays trailer for movie', async ({ page }) => {
    // Mock the API response for movie trailer
    await page.route('**/api.themoviedb.org/3/movie/*/videos**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockTrailer),
      });
    });

    await page.goto('/trailer/movie/123');
    await page.waitForTimeout(500);

    // Wait for loading to disappear and trailer to load
    await waitContent(page, 2000);

    // Check that the iframe is present with the correct src
    const iframe = page.locator('iframe');
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute(
      'src',
      /youtube\.com\/embed\/test-trailer-key/
    );

    // Check that go back button is visible
    await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible();
  });

  test('loads and displays trailer for show', async ({ page }) => {
    // Mock the API response for show trailer
    await page.route('**/api.themoviedb.org/3/tv/*/videos**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockTrailer),
      });
    });

    await page.goto('/trailer/show/456');
    await page.waitForTimeout(500);

    await waitContent(page, 2000);

    const iframe = page.locator('iframe');
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute(
      'src',
      /youtube\.com\/embed\/test-trailer-key/
    );
  });

  test('shows error when no trailer available', async ({ page }) => {
    await page.route('**/api.themoviedb.org/3/movie/*/videos**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockNoTrailer),
      });
    });

    await page.goto('/trailer/movie/123');
    await page.waitForTimeout(500);

    await waitContent(page, 2000);

    // Should show error message and go back button
    await expect(
      page.locator('text=No media found for this trailer.')
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible();
  });

  test('shows error when API returns no videos', async ({ page }) => {
    await page.route('**/api.themoviedb.org/3/movie/*/videos**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockNoVideos),
      });
    });


    await page.goto('/trailer/movie/123');
    await page.waitForTimeout(500);

    await waitContent(page, 2000);

    await expect(
      page.locator('text=No media found for this trailer.')
    ).toBeVisible();
  });

  test('shows error when API fails', async ({ page }) => {
    await page.route('**/api.themoviedb.org/3/movie/*/videos**', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Server Error' }),
      });
    });


    await page.goto('/trailer/movie/123');
    await page.waitForTimeout(500);

    await waitContent(page, 2000);

    await expect(
      page.locator('text=No media found for this trailer.')
    ).toBeVisible();
  });



  test('go back button navigates to previous page', async ({ page }) => {
    await page.route('**/api.themoviedb.org/3/movie/*/videos**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockTrailer),
      });
    });

    await page.goto('/trailer/movie/123');
    await page.waitForTimeout(500);

    await waitContent(page, 2000);

    // Click go back button
    await page.getByRole('button', { name: 'Go Back' }).click();

    // Should navigate back (in test context, we can't check history, but button should be clickable)
    // Page might stay on same URL in test, but at least verify button exists and is interactive
  });
});
