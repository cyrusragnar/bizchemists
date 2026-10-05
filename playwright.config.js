// @ts-check
import { defineConfig, devices } from '@playwright/test'

/**
 * Two suites:
 *   seo.spec.js          reads dist/ directly — no browser, no server
 *   interaction.spec.js  drives the built site in a browser, the way a person does
 *
 * Run both with `npm test`, which builds first.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  /* Serves the production build, which is what the container ships. Reused if
     something is already serving on the port. */
  webServer: {
    command: 'npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173/',
    reuseExistingServer: true,
    timeout: 60000,
  },
})
