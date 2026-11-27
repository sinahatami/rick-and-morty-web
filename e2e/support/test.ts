import { expect, test as base } from '@playwright/test';

import { mockApi } from './mock-api';

interface Fixtures {
  /** URLs requested from the public API during the test. The API is always mocked. */
  apiRequests: string[];
  /**
   * Opens a page and waits until React has hydrated it. Clicking server-rendered buttons earlier
   * can silently do nothing, because their handlers are not attached yet.
   */
  openApp: (path: string) => Promise<void>;
}

export const test = base.extend<Fixtures>({
  apiRequests: [
    async ({ page }, provide) => {
      await provide(await mockApi(page));
    },
    { auto: true },
  ],

  openApp: async ({ page }, provide) => {
    await provide(async path => {
      await page.goto(path);
      // ThemeScope sets this attribute from an effect, so it only appears after hydration.
      await page.locator('html[data-theme]').waitFor({ state: 'attached' });
    });
  },
});

export { expect };
