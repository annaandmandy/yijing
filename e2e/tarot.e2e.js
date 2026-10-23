import { test, expect, MOCK_AI_REPLY } from './fixtures.js';
import { drawTarot } from './helpers.js';

test('draw a three-card tarot reading', async ({ page, aiCalls }) => {
  await page.goto('/');
  await drawTarot(page, '這份工作適合我嗎？');

  await expect(page.locator('#tarot-actions')).toBeVisible();
  await expect(page.locator('#tarot-analysis-text')).toHaveText(MOCK_AI_REPLY, { timeout: 10_000 });
  expect(aiCalls.count).toBe(1);
});
