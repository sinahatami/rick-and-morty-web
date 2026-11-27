import { defineConfig, devices } from '@playwright/test';

// Not the port of `pnpm dev` and `pnpm start` (3000): the tests must never end up on a dev server that
// happens to be running, and they can run next to it.
const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;
const isCI = !!process.env.CI;

/**
 * End-to-end tests run against the static export in `out/` (run `pnpm build` first), the same
 * artifact that is deployed. The public API is mocked, see e2e/support/mock-api.ts.
 */
export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: /mobile\.spec\.ts/ },
    { name: 'mobile', use: { ...devices['Pixel 7'] }, testMatch: /mobile\.spec\.ts/ },
  ],
  webServer: {
    command: `pnpm exec serve out --listen ${PORT} --no-clipboard`,
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 60_000,
  },
});
