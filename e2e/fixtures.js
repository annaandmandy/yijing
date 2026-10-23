import { test as base, expect } from '@playwright/test';
import { BACKEND_URL } from './constants.js';

// CI has no GOOGLE_API_KEY and no backend, so every POST /chat gets this reply instead
export const MOCK_AI_REPLY = '（測試用導師回覆）星象平穩，宜靜觀其變。';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const test = base.extend({
  // Number of POST /chat requests the page made
  aiCalls: async ({}, use) => {
    await use({ count: 0 });
  },

  page: async ({ page, aiCalls }, use) => {
    const pageErrors = await preparePage(page, aiCalls);
    await use(page);
    expect(pageErrors.map(e => e.message), 'uncaught errors in the page').toEqual([]);
  },
});

/**
 * Mocks the backend, collects uncaught page errors and makes goto() wait for the app.
 * Every test page goes through here.
 */
async function preparePage(page, aiCalls) {
  // The app (PORT) calls the backend, another origin, so answer the CORS preflight too
  await page.route(`${BACKEND_URL}/chat`, async route => {
    if (route.request().method() === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: CORS_HEADERS });
      return;
    }
    aiCalls.count++;
    await route.fulfill({
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' },
      body: MOCK_AI_REPLY,
    });
  });
  // Any other backend call is unexpected: fail it fast instead of waiting on a server that isn't there
  await page.route(url => url.href.startsWith(`${BACKEND_URL}/`) && url.pathname !== '/chat', route => route.abort());

  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error));

  // App.init() wires the click handlers only after the 64 hexagram files load, and sets isReady last
  const goto = page.goto.bind(page);
  page.goto = async (...args) => {
    const response = await goto(...args);
    await page.waitForFunction(() => window.app?.isReady === true, null, { timeout: 15_000 })
      .catch(error => {
        throw new Error(`App did not finish init() within 15 s. Page errors: ${pageErrors.map(e => e.message).join(' | ') || 'none'}`, { cause: error });
      });
    return response;
  };

  return pageErrors;
}

export { expect };
