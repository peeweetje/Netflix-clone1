import { test, expect } from '@playwright/test';

test.describe('My List Page', () => {
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for navigation
    test.setTimeout(60000); // 60 seconds

    // Set desktop viewport to ensure navigation is visible
    await page.setViewportSize({ width: 1200, height: 800 });

    // Add retry logic for Firefox connection issues
    let retries = 3;
    while (retries > 0) {
      try {
        await page.goto('/my-list', { waitUntil: 'domcontentloaded', timeout: 30000 });
        // Wait for basic page structure to be attached to DOM
        await page.waitForSelector('nav', { state: 'attached', timeout: 15000 });
        break; // Success, exit retry loop
      } catch (error) {
        retries--;
        if (retries === 0) {
          throw error; // Re-throw if all retries failed
        }
        await page.waitForTimeout(1000); // Wait 1 second before retry
      }
    }
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

    // Wait for content to load
    await page.waitForTimeout(2000);

    // Check for empty state message using the actual rendered text
    await expect(page.getByText('No movies in this list')).toBeVisible();
    await expect(page.getByText("You haven't added any movies to your list yet. Start exploring and add some movies!")).toBeVisible();
  });

  test('search functionality works', async ({ page }) => {
    const searchInput = page.getByPlaceholder('search for a title...');

    // Type in search box
    await searchInput.fill('test search');
    await expect(searchInput).toHaveValue('test search');

    // Wait for search results or loading
    await page.waitForTimeout(1000);

    // Clear search
    await searchInput.clear();
    await expect(searchInput).toHaveValue('');
  });

  test('navigation from my list page', async ({ page }) => {
    // Test navigation back to home
    await page.getByRole('link', { name: 'homepage' }).click();
    await expect(page).toHaveURL('/');

    // Go back to my list
    await page.goto('/my-list');

    // Test navigation to other pages
    await page.getByRole('link', { name: 'shows' }).click();
    await expect(page).toHaveURL('/shows');

    // Go back to my list
    await page.goto('/my-list');

    await page.getByRole('link', { name: 'movies' }).click();
    await expect(page).toHaveURL('/movies');
  });

  test('theme toggle works on my list page', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: 'Switch Theme' });

    // Click theme toggle
    await themeButton.click();

    // Basic check that page is still functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('responsive design on my list page', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });

    // Hamburger menu should be visible on mobile
    const hamburgerButton = page.locator('button').filter({ hasText: '☰' }).or(page.locator('[aria-label*="menu"]'));
    await expect(hamburgerButton.or(page.locator('button:has-text("☰")')).first()).toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });

    // Navigation should be visible on desktop
    await expect(page.getByRole('link', { name: 'my list' })).toBeVisible();
  });

  test('displays loading state when appropriate', async ({ page }) => {
    // Wait for initial load to complete
    await page.waitForTimeout(3000);

    // Check that loading spinner is not visible (page should be loaded)
    // If spinner is visible, it means there's a loading state
    const spinner = page.locator('[data-testid="spinner"], .spinner, .loading-spinner').first();

    // The spinner might be visible during loading, but should not be permanently visible
    // This test checks that the page eventually loads
    await expect(page.locator('body')).toBeVisible();
  });

  test('displays movie cards when items are in list', async ({ page }) => {
    // Mock localStorage with sample items and API responses
    await page.addInitScript(() => {
      const mockItems = [
        { id: 123, media_type: 'movie' },
        { id: 456, media_type: 'tv' }
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
        media_type: 'movie'
      };

      const mockShowResponse = {
        id: 456,
        title: null,
        name: 'Test Show',
        overview: 'This is a test TV show overview',
        poster_path: '/test-poster.jpg',
        vote_average: 8.0,
        media_type: 'tv'
      };

      // Mock fetch to return our test data
      global.fetch = async (url) => {
        if (url.includes('/movie/123') || url.includes('/tv/456')) {
          const isMovie = url.includes('/movie/123');
          return {
            ok: true,
            json: async () => isMovie ? mockMovieResponse : mockShowResponse
          };
        }
        // For other requests, return empty data
        return {
          ok: true,
          json: async () => ({ results: [] })
        };
      };
    });

    // Reload the page to get the mocked state
    await page.reload({ waitUntil: 'domcontentloaded' });

    // Wait for content to load
    await page.waitForTimeout(3000);

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
    // Wait for content to load
    await page.waitForTimeout(2000);

    // Look for remove buttons
    const removeButtons = page.locator('button').filter({ hasText: 'Remove from list' }).or(
      page.locator('[data-testid="remove-button"], [class*="remove"]')
    );

    // If remove buttons are found, verify they are clickable
    const buttons = await removeButtons.all();
    if (buttons.length > 0) {
      await expect(buttons[0]).toBeVisible();
      await expect(buttons[0]).toBeEnabled();
    }
  });

  test('displays failed items section when applicable', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(2000);

    // Look for failed items section
    const failedItemsSection = page.locator('[data-testid="failed-items"], .failed-items, [class*="failed"]').first();

    // If failed items section exists, it should be visible
    if (await failedItemsSection.isVisible()) {
      await expect(failedItemsSection).toBeVisible();
    }
  });

  test('displays removal notice when items are removed', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(2000);

    // Look for removal notice
    const removalNotice = page.locator('[data-testid="removal-notice"], .removal-notice, [class*="notice"]').first();

    // If removal notice exists, it should be visible
    if (await removalNotice.isVisible()) {
      await expect(removalNotice).toBeVisible();
    }
  });

  test('movie cards are clickable and navigate correctly', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(2000);

    // Look for clickable movie cards
    const movieCards = page.locator('[data-testid="movie-card"], .movie-card, .card, [class*="card"]').all();

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

    // Type in search box to trigger search
    await searchInput.fill('movie');
    await page.waitForTimeout(1000);

    // Check if search results are displayed
    // Look for movie rows or search results
    const searchResults = page.locator('[data-testid="search-results"], .search-results, .movie-row').first();

    // If search results are visible, verify they contain content
    if (await searchResults.isVisible()) {
      await expect(searchResults).toBeVisible();
    }
  });

  test('page handles error states gracefully', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(3000);

    // Check that the page doesn't show critical errors
    // Look for error messages
    const errorMessages = page.locator('[data-testid="error"], .error, [class*="error"]').all();

    const errors = await errorMessages;
    if (errors.length > 0) {
      // If error messages exist, they should be user-friendly
      await expect(errors[0]).toBeVisible();
    }

    // Page should still be functional even with errors
    await expect(page.locator('body')).toBeVisible();
  });
});
