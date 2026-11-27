import { expect, test } from './support/test';

test('a character card opens the character page and back returns to the list', async ({
  openApp,
  page,
}) => {
  await openApp('/');

  await page.getByRole('link', { name: 'Rick Sanchez' }).first().click();

  await expect(page).toHaveURL(/\/characters\/1\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Rick Sanchez' })).toBeVisible();
  await expect(page.getByText('Biometrics')).toBeVisible();
  await expect(page.getByText('Episode Appearances')).toBeVisible();

  await page.getByRole('button', { name: /go back/i }).click();
  await expect(page).toHaveURL(/\/$/);
});

test('detail pages are complete HTML: the content does not depend on JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/characters/1/');

  await expect(page.getByRole('heading', { level: 1, name: 'Rick Sanchez' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Pilot' })).toBeVisible();
  await expect(page).toHaveTitle('Rick Sanchez | Rick and Morty');

  await context.close();
});

test('a location page shows its residents', async ({ openApp, page }) => {
  await openApp('/locations/3/');

  await expect(page.getByRole('heading', { level: 1, name: 'Citadel of Ricks' })).toBeVisible();
  await expect(page.getByText('Known Residents')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Adjudicator Rick' })).toBeVisible();
});

test('an episode page shows its cast', async ({ openApp, page }) => {
  await openApp('/episodes/1/');

  await expect(page.getByRole('heading', { level: 1, name: 'Pilot' })).toBeVisible();
  await expect(page.getByText('Featured Cast')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Rick Sanchez' })).toBeVisible();
});

test('the origin of a character links to its location page', async ({ openApp, page }) => {
  await openApp('/characters/1/');

  await page.getByRole('link', { name: /Origin Point/ }).click();

  await expect(page).toHaveURL(/\/locations\/1\/$/);
});

test('"Load more" appends the next episodes on a character page', async ({ openApp, page }) => {
  await openApp('/characters/1/');
  const cards = page.getByRole('article');
  await expect(cards).toHaveCount(12);

  await page.getByRole('button', { name: 'Load More Results' }).click();

  await expect(cards).toHaveCount(20); // the mock API only knows the first 20 episodes
});
