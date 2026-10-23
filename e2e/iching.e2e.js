import { test, expect } from './fixtures.js';
import { castIChing, expectOverlayHidden, reopenFromHistory } from './helpers.js';

test('cast an I Ching reading and open it again from History', async ({ page }) => {
  // The hexagram is random, so compare the cast's name with the reopened one instead of a fixed value
  const castName = await castIChing(page, '今日運勢如何？');

  await page.locator('#close-result-overlay').click();
  await expectOverlayHidden(page);

  const reopenedName = await reopenFromHistory(page);
  expect(reopenedName).toBe(castName);
});
