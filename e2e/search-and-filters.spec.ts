import { expect, test } from './support/test';

test('typing in the search box filters the list and updates the URL', async ({ openApp, page }) => {
  await openApp('/');

  await page.getByRole('textbox', { name: 'Filter by name...' }).fill('Morty');

  await expect(page).toHaveURL(/\?name=Morty/);
  await expect(page.getByRole('link', { name: 'Morty Smith' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Rick Sanchez' })).toHaveCount(0);
});

test('a search without results explains what happened and can be cleared', async ({
  openApp,
  page,
}) => {
  await openApp('/');

  await page.getByRole('textbox', { name: 'Filter by name...' }).fill('zzzzzz');

  await expect(page.getByText('Character Not Found')).toBeVisible();

  await page.getByRole('button', { name: 'Remove filter name' }).click();
  await expect(page).not.toHaveURL(/name=/);
  await expect(page.getByRole('link', { name: 'Rick Sanchez' })).toBeVisible();
});

test('filters in the URL are applied on first load (deep link)', async ({ openApp, page }) => {
  await openApp('/?status=Dead');

  await expect(page.getByRole('button', { name: /Filters \(1\)/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Remove filter status' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Rick Sanchez' })).toHaveCount(0);
});

test('the filter panel applies a filter', async ({ openApp, page }) => {
  await openApp('/');

  await page.getByRole('button', { name: 'Filter', exact: true }).click();
  await page.getByRole('combobox', { name: 'Status' }).click();
  await page.getByRole('option', { name: 'Dead' }).click();
  await page.getByRole('button', { name: 'Apply' }).click();

  await expect(page).toHaveURL(/status=Dead/);
  await expect(page.getByRole('link', { name: 'Rick Sanchez' })).toHaveCount(0);
});

test('the filter panel can be reset', async ({ openApp, page }) => {
  await openApp('/?status=Dead&name=Rick');

  await page.getByRole('button', { name: /Filters \(1\)/ }).click();
  await page.getByRole('button', { name: 'Reset' }).click();

  await expect(page).not.toHaveURL(/status=/);
  await expect(page.getByRole('button', { name: 'Filter', exact: true })).toBeVisible();
});

test('the filter panel fits a short window and its buttons stay reachable', async ({
  openApp,
  page,
}) => {
  // Shorter than the panel itself: it can only fit if it shrinks and scrolls inside.
  const windowHeight = 480;
  await page.setViewportSize({ width: 1280, height: windowHeight });
  await openApp('/');

  await page.getByRole('button', { name: 'Filter', exact: true }).click();

  const panel = page.getByRole('dialog', { name: 'Refine search' });
  await expect(panel).toBeVisible();
  // The popover zooms in for a moment: wait until it has settled inside the window.
  await expect
    .poll(async () => {
      const box = await panel.boundingBox();
      return box !== null && box.y >= 0 && box.y + box.height <= windowHeight;
    })
    .toBe(true);

  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(panel).toBeHidden();
});

test('locations can be searched too', async ({ openApp, page }) => {
  await openApp('/locations/');

  await page.getByRole('textbox', { name: /Search star systems/ }).fill('Citadel');

  await expect(page).toHaveURL(/\?name=Citadel/);
  await expect(page.getByRole('link', { name: 'Citadel of Ricks' })).toBeVisible();
});

test('episodes can be filtered by season', async ({ openApp, page }) => {
  await openApp('/episodes/?season=S01');

  await expect(page.getByRole('button', { name: 'Remove filter season' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Pilot' })).toBeVisible();
});

test('"Load more" adds the next page of results', async ({ openApp, page, apiRequests }) => {
  await openApp('/');

  await page.getByRole('button', { name: 'Load More Results' }).click();

  await expect(page.getByText(/^(\d+) Displayed$/)).toContainText('40');
  expect(apiRequests.some(url => url.includes('page=2'))).toBe(true);
});
