import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './support/test';

const PAGES = [
  { name: 'characters', path: '/', heading: 'Characters' },
  { name: 'locations', path: '/locations/', heading: 'Multiverse Locations' },
  { name: 'episodes', path: '/episodes/', heading: 'Episodes' },
  { name: 'a character', path: '/characters/1/', heading: 'Rick Sanchez' },
  { name: 'a location', path: '/locations/1/', heading: 'Earth (C-137)' },
  { name: 'an episode', path: '/episodes/1/', heading: 'Pilot' },
];

for (const { name, path, heading } of PAGES) {
  test(`${name} page has no detectable accessibility violations`, async ({ openApp, page }) => {
    await openApp(path);
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    // Let the staggered entry animations finish, otherwise colors are measured mid-fade.
    await page.waitForTimeout(1_000);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
