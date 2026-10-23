import { defineConfig, devices } from '@playwright/test';
import { BACKEND_URL, OUT_DIR, PORT } from './e2e/constants.js';

export default defineConfig({
  testDir: 'e2e',
  // *.e2e.js so Vitest's default *.test.* / *.spec.* include never picks these up
  testMatch: '**/*.e2e.js',
  // Six coin tosses alone can take up to ~20 s (CastingManager waits up to 3 s per toss)
  timeout: 90_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    viewport: { width: 1280, height: 720 },
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        // The coin toss needs WebGL; headless CI runners only have it through SwiftShader
        launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] },
      },
    },
  ],
  webServer: {
    // Always a fresh build of this checkout, with BACKEND_URL baked in (about 2 s).
    // preview.open inherits server.open: true from vite.config.js, so turn it off.
    command: `npx vite build --outDir ${OUT_DIR} && npx vite preview --outDir ${OUT_DIR} --port ${PORT} --strictPort --no-open`,
    url: `http://localhost:${PORT}`,
    // Never test whatever happens to be on the port (it may be an old build)
    reuseExistingServer: false,
    env: { ...process.env, VITE_BACKEND_URL: BACKEND_URL },
    timeout: 120_000,
  },
});
