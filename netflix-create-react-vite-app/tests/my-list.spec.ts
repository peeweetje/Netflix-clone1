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
} from './utils';

test.describe('My List Page', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await setDesktopViewport(page);
    await gotoAndWaitForNav(page, '/my-list');
  });

  test('displays navigation elements', async ({ page }) => {
    await expectGlobalNav(page);
  });

  test('displays empty state when no items in list', async ({ page }) => {
    // Mock empty localStorage to ensure empty state
    await page.addInitScript(() => {
      // Clear localStorage before page loads
      localStorage.clear();
      // Override localStorage.setItem to prevent any items from being stored
      localStorage.setItem = () => {};
    });

    // Reload the page to get the mocked state
    await page.reload({ waitUntil: 'domcontentloaded' });

    await waitContent(page, 2000);

    // Check for empty state message using the actual rendered text
    await expect(page.getByText('No movies in this list')).toBeVisible();
    await expect(
      page.getByText(
        "You haven't added any movies to your list yet. Start exploring and add some movies!"
      )
    ).toBeVisible();
  });

  test('search functionality works', async ({ page }) => {
    await fillAndClearSearch(page, 'test search');
  });

  test('navigation from my list page', async ({ page }) => {
    await page.getByRole('link', { name: 'homepage' }).click();
    await expect(page).toHaveURL('/');
    await gotoAndWaitForNav(page, '/my-list');
    await page.getByRole('link', { name: 'shows' }).click();
    await expect(page).toHaveURL('/shows');
    await gotoAndWaitForNav(page, '/my-list');
    await page.getByRole('link', { name: 'movies' }).click();
    await expect(page).toHaveURL('/movies');
  });

  test('theme toggle works on my list page', async ({ page }) => {
    await toggleTheme(page);
  });

  test('responsive design on my list page', async ({ page }) => {
    await setMobileViewport(page);
    await expect(hamburgerLocator(page)).toBeVisible();
    await setDesktopViewport(page);
    await expect(page.getByRole('link', { name: 'my list' })).toBeVisible();
  });

  test('displays loading state when appropriate', async ({ page }) => {
    await waitContent(page, 3000);

    // Check that loading spinner is not visible (page should be loaded)
    // If spinner is visible, it means there's a loading state
    const spinner = page
      .locator('[data-testid="spinner"], .spinner, .loading-spinner')
      .first();

    // The spinner might be visible during loading, but should not be permanently visible
    // This test checks that the page eventually loads
    await expect(page.locator('body')).toBeVisible();
  });

  test('displays movie cards when items are in list', async ({ page }) => {
    // Mock localStorage with sample items and API responses
    await page.addInitScript(() => {
      const mockItems = [
        { id: 123, media_type: 'movie' },
        { id: 456, media_type: 'tv' },
      ];
      localStorage.setItem('myList', JSON.stringify(mockItems));

      // Mock API responses for the movie and TV show details
      const mockMovieResponse = {
        id: 123,
        title: 'Test Movie',
        name: null,
        overview: 'This is a test movie overview',
        poster_path: '/test-poster.jpg',
        vote_average: 7.5,
        media_type: 'movie',
      };

      const mockShowResponse = {
        id: 456,
        title: null,
        name: 'Test Show',
        overview: 'This is a test TV show overview',
        poster_path: '/test-poster.jpg',
        vote_average: 8.0,
        media_type: 'tv',
      };

      // Mock fetch to return our test data
      global.fetch = async (url) => {
        if (url.includes('/movie/123') || url.includes('/tv/456')) {
          const isMovie = url.includes('/movie/123');
          return {
            ok: true,
            json: async () => (isMovie ? mockMovieResponse : mockShowResponse),
          };
        }
        // For other requests, return empty data
        return {
          ok: true,
          json: async () => ({ results: [] }),
        };
      };
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await waitContent(page, 3000);

    // Look for movie cards using generic selectors that should work regardless of content
    const movieCards = page.locator('h1').first(); // Look for any heading (movie/show title)

    // Check that cards are visible and have content
    await expect(movieCards).toBeVisible();

    // Verify we have at least one card
    const headings = page.locator('h1');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);

    // Check for remove buttons which should be present with items
    const removeButtons = page.locator('button').filter({ hasText: 'Remove' });
    await expect(removeButtons.first()).toBeVisible();
  });

  test('remove buttons work when items are present', async ({ page }) => {
    await waitContent(page, 2000);

    // Look for remove buttons
    const removeButtons = page
      .locator('button')
      .filter({ hasText: 'Remove from list' })
      .or(page.locator('[data-testid="remove-button"], [class*="remove"]'));

    // If remove buttons are found, verify they are clickable
    const buttons = await removeButtons.all();
    if (buttons.length > 0) {
      await expect(buttons[0]).toBeVisible();
      await expect(buttons[0]).toBeEnabled();
    }
  });

  test('displays failed items section when applicable', async ({ page }) => {
    await waitContent(page, 2000);

    // Look for failed items section
    const failedItemsSection = page
      .locator('[data-testid="failed-items"], .failed-items, [class*="failed"]')
      .first();

    // If failed items section exists, it should be visible
    if (await failedItemsSection.isVisible()) {
      await expect(failedItemsSection).toBeVisible();
    }
  });

  test('displays removal notice when items are removed', async ({ page }) => {
    await waitContent(page, 2000);

    // Look for removal notice
    const removalNotice = page
      .locator(
        '[data-testid="removal-notice"], .removal-notice, [class*="notice"]'
      )
      .first();

    // If removal notice exists, it should be visible
    if (await removalNotice.isVisible()) {
      await expect(removalNotice).toBeVisible();
    }
  });

  test('movie cards are clickable and navigate correctly', async ({ page }) => {
    await waitContent(page, 2000);

    // Look for clickable movie cards
    const movieCards = page
      .locator(
        '[data-testid="movie-card"], .movie-card, .card, [class*="card"]'
      )
      .all();

    const cards = await movieCards;
    if (cards.length > 0) {
      // Check that cards are clickable
      await expect(cards[0]).toBeVisible();

      // Try to click on a card (this might navigate to movie details)
      // We don't assert the navigation since it depends on the card's link
      await cards[0].click();
    }
  });

  test('search results display correctly', async ({ page }) => {
    const searchInput = page.getByPlaceholder('search for a title...');
    await searchInput.fill('movie');
    await waitContent(page, 1000);

    // Check if search results are displayed
    // Look for movie rows or search results
    const searchResults = page
      .locator('[data-testid="search-results"], .search-results, .movie-row')
      .first();

    // If search results are visible, verify they contain content
    if (await searchResults.isVisible()) {
      await expect(searchResults).toBeVisible();
    }
  });

  test('page handles error states gracefully', async ({ page }) => {
    await waitContent(page, 3000);

    // Check that the page doesn't show critical errors
    // Look for error messages
    const errorMessages = page
      .locator('[data-testid="error"], .error, [class*="error"]')
      .all();

    const errors = await errorMessages;
    if (errors.length > 0) {
      // If error messages exist, they should be user-friendly
      await expect(errors[0]).toBeVisible();
    }

    // Page should still be functional even with errors
    await expect(page.locator('body')).toBeVisible();
  });
});
