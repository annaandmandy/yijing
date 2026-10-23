import { test, expect, MOCK_AI_REPLY } from './fixtures.js';
import { castIChing, drawTarot, expectOverlayHidden, openNav, reopenFromHistory, reopenTarotFromHistory } from './helpers.js';

test('export a journal backup and import it into an empty journal', async ({ page }, testInfo) => {
  const castName = await castIChing(page, '搬家是否順利？');
  await page.locator('#close-result-overlay').click();
  await expectOverlayHidden(page);

  const drawnCards = await drawTarot(page, '這份工作適合我嗎？');
  // The quick analysis starts right after the reading is saved
  await expect(page.locator('#tarot-analysis-text')).toHaveText(MOCK_AI_REPLY, { timeout: 10_000 });

  await openNav(page, 'settings');
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#backup-export').click();
  const download = await downloadPromise;
  await expect(page.locator('#backup-status')).toHaveText('備份已匯出。');
  const backupPath = testInfo.outputPath(download.suggestedFilename());
  await download.saveAs(backupPath);

  // Empty the journal: the page keeps its context (and fixture checks), only the stored records go
  await page.evaluate(() => localStorage.clear());
  await page.goto('/');
  await openNav(page, 'history');
  await expect(page.locator('#calendar-grid .calendar-day.has-record')).toHaveCount(0);
  // The calendar shows one mode at a time, so also check the tarot calendar, then go back to 易經
  await openNav(page, 'settings');
  await page.locator('#settings-mode-switcher [data-mode="tarot"]').click();
  await openNav(page, 'history');
  await expect(page.locator('#calendar-grid .calendar-day.has-record')).toHaveCount(0);
  await openNav(page, 'settings');
  await page.locator('#settings-mode-switcher [data-mode="iching"]').click();

  await openNav(page, 'settings');
  const chooserPromise = page.waitForEvent('filechooser');
  await page.locator('#backup-import').click();
  const chooser = await chooserPromise;
  await chooser.setFiles(backupPath);
  await expect(page.locator('#backup-status')).toHaveText('已匯入 2 筆，更新 0 筆，略過 0 筆（已存在）。');

  expect(await reopenFromHistory(page)).toBe(castName);
  await page.locator('#close-result-overlay').click();
  await expectOverlayHidden(page);
  expect(await reopenTarotFromHistory(page)).toEqual(drawnCards);
});
