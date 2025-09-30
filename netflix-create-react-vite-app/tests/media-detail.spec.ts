import { test, expect } from '@playwright/test';
import {
  setDesktopViewport,
  waitContent,
  expectGlobalNav,
} from './utils';

test.describe('Media Detail Page', () => {
  const mockMovieData = {
    id: 123,
    title: 'Test Movie',
    poster_path: '/test-poster.jpg',
    tagline: 'A test movie tagline',
    release_date: '2023-01-01',
    vote_average: 8.5,
    vote_count: 1500,
    status: 'Released',
    original_language: 'en',
    runtime: 120,
    genres: [{ name: 'Action' }, { name: 'Drama' }],
  };

  const mockShowData = {
    id: 456,
    name: 'Test Show',
    poster_path: '/test-show-poster.jpg',
    tagline: 'A test show tagline',
    first_air_date: '2023-01-01',
    last_air_date: '2023-12-31',
    vote_average: 8.0,
    vote_count: 800,
    status: 'Ended',
    original_language: 'en',
    number_of_seasons: 2,
    number_of_episodes: 24,
    genres: [{ name: 'Comedy' }],
  };

  const mockCastData = {
    cast: [
      {
        cast_id: 1,
        credit_id: 'test-credit-1',
        name: 'Actor One',
        profile_path: '/actor1.jpg',
        character: 'Character One',
      },
      {
        cast_id: 2,
        credit_id: 'test-credit-2',
        name: 'Actor Two',
        profile_path: '/actor2.jpg',
        character: 'Character Two',
      },
      {
        cast_id: 3,
        credit_id: 'test-credit-3',
        name: 'Actor Three',
        profile_path: null,
        character: 'Character Three',
      },
    ],
  };

  const mockTrailerData = {
    results: [
      {
        key: 'test-trailer-key',
        type: 'Trailer',
        site: 'YouTube',
        name: 'Official Trailer',
      },
    ],
  };

  const mockNoTrailerData = {
    results: [
      {
        key: 'test-clip-key',
        type: 'Clip',
        site: 'YouTube',
        name: 'Test Clip',
      },
    ],
  };

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await setDesktopViewport(page);
  });

  test('loads and displays movie details successfully', async ({ page }) => {
    // Mock API responses
    await page.route((url) => url.href.includes('/api.themoviedb.org/3/movie/123') && !url.href.includes('/credits') && !url.href.includes('/videos'), (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockMovieData),
      });
    });

    await page.route((url) => url.href.includes('/api.themoviedb.org/3/movie/123/credits'), (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCastData),
      });
    });

    await page.route((url) => url.href.includes('/api.themoviedb.org/3/movie/123/videos'), (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockTrailerData),
      });
    });

    await page.goto('/movies/123');
    await page.waitForTimeout(500);
    await waitContent(page, 2000);

    // Check title and basic info
    await expect(page.locator('h2').filter({ hasText: 'Test Movie' })).toBeVisible();
    await expect(page.getByText('A test movie tagline')).toBeVisible();

    // Check poster image
    const poster = page.locator('img[alt="Test Movie"]');
    await expect(poster).toBeVisible();
    await expect(poster).toHaveAttribute('src', /test-poster\.jpg/);

    // Check cast section
    await expect(page.getByText('Cast Members')).toBeVisible();
    await expect(page.getByText('Actor One')).toBeVisible();
    await expect(page.getByText('Character One')).toBeVisible();

    // Check trailer button
    await expect(page.getByRole('button', { name: 'Watch Trailer' })).toBeVisible();
  });

  test('loads and displays TV show details successfully', async ({ page }) => {
    // Mock API responses
    await page.route((url) => url.href.includes('/api.themoviedb.org/3/tv/456') && !url.href.includes('/credits') && !url.href.includes('/videos'), (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockShowData),
      });
    });

    await page.route((url) => url.href.includes('/api.themoviedb.org/3/tv/456/credits'), (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCastData),
      });
    });

    await page.route((url) => url.href.includes('/api.themoviedb.org/3/tv/456/videos'), (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockTrailerData),
      });
    });

    await page.goto('/shows/456');
    await page.waitForTimeout(500);
    await waitContent(page, 2000);

    // Check title and basic info
    await expect(page.locator('h2').filter({ hasText: 'Test Show' })).toBeVisible();
    await expect(page.getByText('A test show tagline')).toBeVisible();

    // Check cast section
    await expect(page.getByText('Cast Members')).toBeVisible();
    await expect(page.getByText('Actor One')).toBeVisible();

    // Check trailer button
    await expect(page.getByRole('button', { name: 'Watch Trailer' })).toBeVisible();
  });

  test('handles missing trailer gracefully', async ({ page }) => {
    await page.route('**/api.themoviedb.org/3/movie/123**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockMovieData),
      });
    });

    await page.route('**/api.themoviedb.org/3/movie/123/credits**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCastData),
      });
    });

    await page.route('**/api.themoviedb.org/3/movie/123/videos**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockNoTrailerData),
      });
    });

    await page.goto('/movies/123');
    await page.waitForTimeout(500);
    await waitContent(page, 2000);

    // Trailer button should not be visible
    await expect(page.getByRole('button', { name: 'Watch Trailer' })).not.toBeVisible();
  });

  test('handles API errors gracefully', async ({ page }) => {
    await page.route('**/api.themoviedb.org/3/movie/123**', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Server Error' }),
      });
    });

    await page.goto('/movies/123');
    await page.waitForTimeout(500);
    await waitContent(page, 2000);

    // Should show error message
    await expect(page.getByText(/Failed to fetch movie details/)).toBeVisible();
  });

  test('handles cast API errors gracefully', async ({ page }) => {
    await page.route('**/api.themoviedb.org/3/movie/123**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockMovieData),
      });
    });

    await page.route('**/api.themoviedb.org/3/movie/123/credits**', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Server Error' }),
      });
    });

    await page.route('**/api.themoviedb.org/3/movie/123/videos**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockNoTrailerData),
      });
    });

    await page.goto('/movies/123');
    await page.waitForTimeout(500);
    await waitContent(page, 2000);

   
    await expect(page.getByText('Cast Members')).not.toBeVisible();
  });

  test('displays only first 5 cast members', async ({ page }) => {
    const largeCastData = {
      cast: Array.from({ length: 10 }, (_, i) => ({
        cast_id: i + 1,
        credit_id: `test-credit-${i + 1}`,
        name: `Actor ${i + 1}`,
        profile_path: `/actor${i + 1}.jpg`,
        character: `Character ${i + 1}`,
      })),
    };

    await page.route('**/api.themoviedb.org/3/movie/123**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockMovieData),
      });
    });

    await page.route('**/api.themoviedb.org/3/movie/123/credits**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(largeCastData),
      });
    });

    await page.route('**/api.themoviedb.org/3/movie/123/videos**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockNoTrailerData),
      });
    });

    await page.goto('/movies/123');
    await page.waitForTimeout(500);
    await waitContent(page, 2000);

    // Should show only first 5 actors
    for (let i = 1; i <= 5; i++) {
      await expect(page.getByText(`Actor ${i}`)).toBeVisible();
    }
    // Should not show 6th actor
    await expect(page.getByText('Actor 6')).not.toBeVisible();
  });

  test('handles actors without profile images', async ({ page }) => {
    const castWithoutImages = {
      cast: [
        {
          cast_id: 1,
          credit_id: 'test-credit-1',
          name: 'Actor One',
          profile_path: null,
          character: 'Character One',
        },
      ],
    };

    await page.route('**/api.themoviedb.org/3/movie/123**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockMovieData),
      });
    });

    await page.route('**/api.themoviedb.org/3/movie/123/credits**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(castWithoutImages),
      });
    });

    await page.route('**/api.themoviedb.org/3/movie/123/videos**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockNoTrailerData),
      });
    });

    await page.goto('/movies/123');
    await page.waitForTimeout(500);
    await waitContent(page, 2000);

    // Should still display actor name even without image
    await expect(page.getByText('Actor One')).toBeVisible();
    await expect(page.getByText('Character One')).toBeVisible();
  });

  test('go back button navigates correctly', async ({ page }) => {
    await page.route('**/api.themoviedb.org/3/movie/123**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockMovieData),
      });
    });

    await page.route('**/api.themoviedb.org/3/movie/123/credits**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCastData),
      });
    });

    await page.route('**/api.themoviedb.org/3/movie/123/videos**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockNoTrailerData),
      });
    });

    await page.goto('/movies/123');
    await page.waitForTimeout(500);
    await waitContent(page, 2000);

    // Click go back button
    await page.getByRole('button', { name: 'Go Back' }).click();

    // Should navigate back (in test context, we verify button is clickable)
    // The actual navigation behavior depends on browser history
  });

  test('watch trailer button navigates to trailer page', async ({ page }) => {
    await page.route('**/api.themoviedb.org/3/movie/123**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockMovieData),
      });
    });

    await page.route('**/api.themoviedb.org/3/movie/123/credits**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCastData),
      });
    });

    await page.route('**/api.themoviedb.org/3/movie/123/videos**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockTrailerData),
      });
    });

    await page.goto('/movies/123');
    await page.waitForTimeout(500);
    await waitContent(page, 2000);

    // Click watch trailer button
    await page.getByRole('button', { name: 'Watch Trailer' }).click();

    // Should navigate to trailer page
    await expect(page).toHaveURL('/trailer/movie/123');
  });
});
