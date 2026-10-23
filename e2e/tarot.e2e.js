import { test, expect, MOCK_AI_REPLY } from './fixtures.js';
import { openNav } from './helpers.js';

test('draw a three-card tarot reading', async ({ page, aiCalls }) => {
  await page.goto('/');
  await openNav(page, 'settings');
  await page.locator('#settings-mode-switcher [data-mode="tarot"]').click();
  await expect(page.locator('section#tarot')).toHaveClass(/active/);

  await page.locator('#tarot-question').fill('這份工作適合我嗎？');
  await page.locator('#start-tarot').click();

  // Hold the mouse on the deck until the shuffle ends by itself
  const deck = page.locator('#tarot-deck');
  await expect(deck).toBeVisible();
  await deck.hover();
  await page.mouse.down();
  await expect(page.locator('#tarot-selection-container')).toBeVisible();
  await page.mouse.up();

  // Fan cards overlap; the last unpicked one is on top, and picked cards stop taking clicks
  const toPick = page.locator('#cards-to-pick');
  await expect(toPick).toHaveText('3');
  for (const left of ['2', '1', '0']) {
    await page.locator('#tarot-fan .fan-card:not(.picked)').last().click();
    await expect(toPick).toHaveText(left);
  }

  // The spread shows after two 800 ms delays and staggered card flips
  await expect(page.locator('#tarot-result-container .tarot-card-wrapper')).toHaveCount(3, { timeout: 10_000 });
  await expect(page.locator('#tarot-actions')).toBeVisible();
  await expect(page.locator('#tarot-analysis-text')).toHaveText(MOCK_AI_REPLY, { timeout: 10_000 });
  expect(aiCalls.count).toBe(1);
});
