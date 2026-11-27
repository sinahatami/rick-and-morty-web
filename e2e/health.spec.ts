import { expect, test } from './support/test';

const PAGES = [
  '/',
  '/locations/',
  '/episodes/',
  '/characters/1/',
  '/locations/3/',
  '/episodes/1/',
  '/?status=Alive&name=Rick',
  '/episodes/?season=S01',
];

// A hydration mismatch, a failed request or an uncaught exception shows up here long before a user reports it.
for (const path of PAGES) {
  test(`${path} loads without console errors, page errors or failed requests`, async ({ page }) => {
    const problems: string[] = [];
    page.on('console', message => {
      if (message.type() === 'error') problems.push(`console: ${message.text()}`);
    });
    page.on('pageerror', error => problems.push(`exception: ${error.message}`));
    page.on('requestfailed', request =>
      problems.push(`request failed: ${request.url()} (${request.failure()?.errorText})`),
    );
    page.on('response', response => {
      if (response.status() >= 400) problems.push(`${response.status()}: ${response.url()}`);
    });

    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // Give hydration, lazy chunks and the first client-side requests time to finish.
    await page.waitForLoadState('networkidle');

    expect(problems).toEqual([]);
  });
}
