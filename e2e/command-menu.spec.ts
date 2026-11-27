import { expect, test } from './support/test';

test('the universal search finds a character and navigates to it', async ({ openApp, page }) => {
  await openApp('/');

  await page.getByRole('button', { name: /Universal Search/ }).click();
  await page.getByPlaceholder(/Search for any character/).fill('Summer');
  await page.getByRole('option', { name: /Summer Smith/ }).click();

  await expect(page).toHaveURL(/\/characters\/3\/$/);
});

test('it opens with the keyboard shortcut and closes with Escape', async ({ openApp, page }) => {
  await openApp('/');

  await page.keyboard.press('Control+k');
  const input = page.getByPlaceholder(/Search for any character/);
  await expect(input).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(input).toBeHidden();
});

test('nothing is requested from the API until the search is opened', async ({
  openApp,
  page,
  apiRequests,
}) => {
  await openApp('/locations/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.waitForLoadState('networkidle');
  const before = apiRequests.length;

  await page.keyboard.press('Control+k');
  await expect(page.getByPlaceholder(/Search for any character/)).toBeVisible();

  await expect.poll(() => apiRequests.length).toBeGreaterThan(before);
  // On page load the locations list was already server-rendered: no request for characters or episodes.
  expect(apiRequests.slice(0, before).some(url => /character|episode/.test(url))).toBe(false);
});
