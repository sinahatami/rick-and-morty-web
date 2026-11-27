import { expect, test } from './support/test';

test('the mobile menu navigates between sections', async ({ openApp, page }) => {
  await openApp('/');

  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByTestId('nav-mobile-episodes').click();

  await expect(page).toHaveURL(/\/episodes\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Episodes' })).toBeVisible();
});

test('the character grid is usable on a small screen', async ({ openApp, page }) => {
  await openApp('/');

  await expect(page.getByRole('link', { name: 'Rick Sanchez' })).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test('search and filters are reachable on a small screen', async ({ openApp, page }) => {
  await openApp('/');

  await page.getByRole('button', { name: 'Filter', exact: true }).click();
  await page.getByRole('combobox', { name: 'Status' }).click();
  await page.getByRole('option', { name: 'Alive' }).click();
  await page.getByRole('button', { name: 'Apply' }).click();

  await expect(page).toHaveURL(/status=Alive/);
});
