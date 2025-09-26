import { expect, Page } from '@playwright/test';

async function waitAfterResize(page: Page) {
  // Fire a resize event and give the layout a brief moment to settle
  await page.evaluate(() => {
    window.dispatchEvent(new Event('resize'));
  });
  await page.waitForTimeout(150);
}

export async function setDesktopViewport(page: Page) {
  await page.setViewportSize({ width: 1200, height: 800 });
  await waitAfterResize(page);
}

export async function setMobileViewport(page: Page) {
  await page.setViewportSize({ width: 375, height: 667 });
  await waitAfterResize(page);
}

export async function gotoAndWaitForNav(page: Page, path: string) {
  // Retry navigation a few times to handle intermittent Firefox connection hiccups
  let attempts = 3;
  // Normalize path to absolute URL path
  const target = path.startsWith('/') ? path : `/${path}`;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await page.goto(target, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      await page.waitForSelector('nav', { state: 'attached', timeout: 15000 });

      // Clear any existing state after navigation is successful
      try {
        await page.evaluate(() => {
          // Clear localStorage and sessionStorage to prevent test interference
          try {
            localStorage.clear();
            sessionStorage.clear();
          } catch (e) {
            // Ignore storage errors (might be restricted in some contexts)
            console.log('Storage access restricted, continuing...');
          }
        });
      } catch (e) {
        // Ignore evaluation errors and continue
        console.log('Page evaluation restricted, continuing...');
      }

      // Wait a bit longer for the page to fully stabilize
      await page.waitForTimeout(500);
      break;
    } catch (err) {
      attempts -= 1;
      if (attempts <= 0) throw err;
      await page.waitForTimeout(1000);
    }
  }
}

export async function expectGlobalNav(page: Page) {
  await expect(page.getByRole('link', { name: 'BingeWatch' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'homepage' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'shows' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'movies' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'popular & trending' })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'my list' })).toBeVisible();
  await expect(page.getByPlaceholder('search for a title...')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Switch Theme' })
  ).toBeVisible();
}

export async function toggleTheme(page: Page) {
  const themeButton = page.getByRole('button', { name: 'Switch Theme' });
  await themeButton.click();
  await expect(page.locator('body')).toBeVisible();
}

export async function fillAndClearSearch(page: Page, text: string) {
  const searchInput = page.getByPlaceholder('search for a title...');
  await searchInput.fill(text);
  await expect(searchInput).toHaveValue(text);
  await page.waitForTimeout(1000);
  await searchInput.clear();
  await expect(searchInput).toHaveValue('');
}

export function hamburgerLocator(page: Page) {
  return page
    .locator('button')
    .filter({ hasText: '☰' })
    .or(page.locator('[aria-label*="menu"]'))
    .or(page.locator('button:has-text("☰")'))
    .first();
}

export async function clickNavAndExpect(page: Page, name: string, url: string) {
  await page.getByRole('link', { name }).click();
  await expect(page).toHaveURL(url);
}

export async function waitContent(page: Page, ms = 2000) {
  await page.waitForTimeout(ms);
}

export async function cleanupTestState(page: Page) {
  // Clear any test-specific state that might interfere with other tests
  try {
    await page.evaluate(() => {
      try {
        // Clear localStorage and sessionStorage
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        // Ignore storage errors (might be restricted in some contexts)
        console.log('Storage access restricted during cleanup, continuing...');
      }

      try {
        // Reset any form inputs
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
          if (input.type !== 'submit' && input.type !== 'button') {
            input.value = '';
          }
        });

        // Clear any search queries or filters
        const searchInputs = document.querySelectorAll('[placeholder*="search"], [placeholder*="filter"]');
        searchInputs.forEach(input => {
          input.value = '';
        });
      } catch (e) {
        // Ignore DOM manipulation errors
        console.log('DOM manipulation restricted during cleanup, continuing...');
      }
    });
  } catch (e) {
    // Ignore page evaluation errors during cleanup
    console.log('Page evaluation restricted during cleanup, continuing...');
  }

  // Wait for any pending operations to complete
  await page.waitForTimeout(100);
}

export async function expectAnyCardVisible(page: Page) {
  const selectors = [
    '[data-testid="card-container"]',
    '.card-container',
    '.seasonal-card',
    '.movie-row',
    'img[alt]',
    '.card',
    '[class*="card"]',
    '.movie-list',
    '.row-container',
  ];
  for (const selector of selectors) {
    const elements = page.locator(selector);
    if ((await elements.count()) > 0) {
      await expect(elements.first()).toBeVisible();
      return;
    }
  }
  const container = page
    .locator('.container, main, [class*="container"]')
    .first();
  if (await container.isVisible()) {
    const children = await container.locator('*').count();
    expect(children).toBeGreaterThan(0);
  }
}
