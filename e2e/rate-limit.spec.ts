import { type Page, type Route } from '@playwright/test';

import { expect, test } from './support/test';

/**
 * What the public API and its image host do to a visitor who asks for too much too fast: a 429 with a
 * plain-text body, `Retry-After: 10` and no CORS headers. The browser reports it as a broken image, or
 * as a network error for `fetch`. The tests move the clock of the page forward instead of waiting.
 */
function refuse(route: Route) {
  return route.fulfill({
    status: 429,
    contentType: 'text/plain; charset=UTF-8',
    headers: { 'retry-after': '10' },
    body: 'error code: 1015',
  });
}

/** Moves the clock forward until `done` holds: the timers that have to fire may not exist yet. */
async function fastForwardUntil(page: Page, step: number, done: () => Promise<void> | void) {
  await expect(async () => {
    await page.clock.fastForward(step);
    await done();
  }).toPass({ timeout: 15_000 });
}

test.describe('when the API host refuses a visitor who asks for too much', () => {
  test('a refused avatar is requested again once the block is over', async ({ page, openApp }) => {
    await page.clock.install();

    let requests = 0;
    await page.route('**/api/character/avatar/1.jpeg', route => {
      requests += 1;
      return requests === 1 ? refuse(route) : route.fallback();
    });

    await openApp('/');

    const firstCard = page.getByRole('article').first();
    // A placeholder holds the place until the next attempt, instead of a broken image.
    await expect(firstCard.locator('[data-state="waiting"]')).toBeVisible();

    // Ten seconds of block, plus up to three that keep the retries of many images apart.
    await fastForwardUntil(page, 15_000, () =>
      expect(firstCard.locator('[data-state]')).toHaveCount(0, { timeout: 1_000 }),
    );

    // The mocked avatar is a 1x1 image.
    await expect(firstCard.locator('img')).toHaveJSProperty('naturalWidth', 1);
    expect(requests).toBe(2);
  });

  // How long the retries wait is covered by the unit tests: a fast-forwarded clock cannot tell. This one
  // checks that a refusal, which the browser reports as a network error, is retried and recovered from.
  test('"Load more" recovers when the first attempts are refused', async ({ page, openApp }) => {
    await page.clock.install();

    let attempts = 0;
    await page.route(
      url => url.pathname === '/api/character' && url.searchParams.get('page') === '2',
      route => {
        attempts += 1;
        return attempts <= 2 ? refuse(route) : route.fallback();
      },
    );

    await openApp('/');
    const cards = page.getByRole('article');
    await expect(cards).toHaveCount(20);

    await page.getByRole('button', { name: /load more/i }).click();

    // The first retry is refused again, the second one goes through.
    await fastForwardUntil(page, 3_000, () => expect(attempts).toBeGreaterThanOrEqual(2));
    await fastForwardUntil(page, 10_000, () => expect(cards).toHaveCount(40, { timeout: 1_000 }));

    expect(attempts).toBe(3);
  });
});
