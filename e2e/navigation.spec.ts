import { expect, test } from './support/test';

test('the home page lists characters', async ({ openApp, page }) => {
  await openApp('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Characters' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Rick Sanchez' })).toBeVisible();
});

test('the main navigation switches between the three sections', async ({ openApp, page }) => {
  await openApp('/');

  await page.getByTestId('nav-locations').click();
  await expect(page).toHaveURL(/\/locations\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Multiverse Locations' })).toBeVisible();

  await page.getByTestId('nav-episodes').click();
  await expect(page).toHaveURL(/\/episodes\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Episodes' })).toBeVisible();

  await page.getByTestId('nav-characters').click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Characters' })).toBeVisible();
});

test('the active section is marked in the navigation', async ({ openApp, page }) => {
  await openApp('/locations/');

  await expect(page.getByTestId('nav-locations')).toHaveAttribute('aria-current', 'page');
  await expect(page.getByTestId('nav-characters')).not.toHaveAttribute('aria-current', 'page');
});

test.describe('idle list pages', () => {
  // Regression: the URL sync hook used to push a new route on every render of the locations and
  // episodes lists (the path it built never matched the trailing-slash URL), flooding the router.
  for (const path of ['/', '/locations/', '/episodes/']) {
    test(`${path} does not rewrite the URL while nothing happens`, async ({ page }) => {
      await page.addInitScript(() => {
        const counter = { calls: 0 };
        Object.assign(window, { __historyWrites: counter });
        for (const method of ['pushState', 'replaceState'] as const) {
          const original = history[method].bind(history);
          history[method] = (...args: Parameters<History['pushState']>) => {
            counter.calls += 1;
            return original(...args);
          };
        }
      });

      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      // Negative assertion: give a runaway loop time to show up.
      await page.waitForTimeout(2_000);

      const writes = await page.evaluate(
        () => (window as unknown as { __historyWrites: { calls: number } }).__historyWrites.calls,
      );
      expect(writes).toBeLessThanOrEqual(2);
    });
  }
});

test('an unknown route shows the not-found page', async ({ page }) => {
  const response = await page.goto('/characters/999999/');

  expect(response?.status()).toBe(404);
});
