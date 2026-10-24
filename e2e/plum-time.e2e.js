import { test, expect } from './fixtures.js';
import { expectOverlayHidden, expectOverlayShown, openNav, reopenFromHistory } from './helpers.js';

// 觀梅占: 辰年十二月十七日申時 → 澤火革, 初爻變咸, 兌金為體, 離火為用
// source: https://zh.wikisource.org/wiki/梅花易數/卷一
// 2025-01-16 is 甲辰年十二月十七 (HKO): https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T2025c.txt
//   「2025年1月16日 十七」; 十二月初一 is 「2024年12月31日 十二月」 in …/T2024c.txt; 申時 is 15:00–17:00
const GUAN_MEI = '2025-01-16T15:30';

const modeBtn = (page, mode) => page.locator(`.casting-mode-switcher .mode-btn[data-mode="${mode}"]`);

async function castAt(page, value) {
  await modeBtn(page, 'plum-time').click();
  await page.locator('input[name="plum-time-when"][value="at"]').check();
  await page.locator('#plum-time-at').fill(value);
  await page.locator('#plum-time-submit').click();
}

async function expectPlumZonesHidden(page) {
  await expect(page.locator('#plum-blossom-input')).toBeHidden();
  await expect(page.locator('#plum-time-input')).toBeHidden();
}

async function expectGuanMei(page) {
  const overlay = await expectOverlayShown(page);
  await expect(overlay.locator('.hex-name-main')).toHaveText('革 之 咸');

  const tab = (name) => overlay.locator('.analysis-tab', { hasText: name });
  const content = page.locator('#analysis-content-area');
  await tab('梅花心易').click();
  await expect(content.locator('.plum-time-basis')).toContainText('辰年(5) 十二月(12) 十七日(17) 申時(9)');
  const original = content.locator('.plum-step').first();
  await expect(original.locator('.plum-trigram-item', { hasText: '體' }).locator('.trigram-name')).toHaveText('兌');
  await expect(original.locator('.plum-trigram-item', { hasText: '用' }).locator('.trigram-name')).toHaveText('離');

  // Switching tabs rebuilds the overlay from the saved record; it must stay 革 之 咸
  await tab('經典義理').click();
  await expect(content.locator('.hex-block.future .hex-name-text')).toHaveText('咸');
  await expect(overlay.locator('.hex-name-main')).toHaveText('革 之 咸');
  await tab('梅花心易').click();
  await expect(overlay.locator('.hex-name-main')).toHaveText('革 之 咸');
  await expect(content.locator('.plum-time-basis')).toContainText('申時(9)');
}

test('time cast for a picked moment reproduces 觀梅占 and reopens from History', async ({ page }) => {
  await page.goto('/');
  await castAt(page, GUAN_MEI);
  await expectGuanMei(page);
  await expectPlumZonesHidden(page);

  await page.locator('#close-result-overlay').click();
  await expectOverlayHidden(page);

  expect(await reopenFromHistory(page)).toBe('革 之 咸');
  await expectGuanMei(page);
  await expectPlumZonesHidden(page);

  await page.locator('#close-result-overlay').click();
  await expectOverlayHidden(page);
  await openNav(page, 'tabletop');
  await modeBtn(page, 'plum').click();
  await expect(page.locator('#plum-blossom-input')).toBeVisible();
  await modeBtn(page, 'plum-time').click();
  await expect(page.locator('#plum-time-input')).toBeVisible();
  await expect(page.locator('#plum-blossom-input')).toBeHidden();
  await expect(page.locator('#canvas-container')).toBeHidden();
});

test('the time zone shows again after a number cast is closed', async ({ page }) => {
  await page.goto('/');
  await modeBtn(page, 'plum').click();
  await page.locator('#plum-n1').fill('34');
  await page.locator('#plum-n2').fill('43');
  await page.locator('#plum-n3').fill('2');
  await page.locator('#plum-submit').click();
  // A number cast also shows its changed hexagram: 初爻變咸 (source: the Wikisource URL above)
  const overlay = await expectOverlayShown(page);
  await expect(overlay.locator('.hex-name-main')).toHaveText('革 之 咸');
  await expectPlumZonesHidden(page);

  await page.locator('#close-result-overlay').click();
  await expectOverlayHidden(page);
  await modeBtn(page, 'plum-time').click();
  await expect(page.locator('#plum-time-input')).toBeVisible();
  await expect(page.locator('#canvas-container')).toBeHidden();
});

test('casting "now" saves the click moment as the cast time', async ({ page }) => {
  await page.goto('/');
  await modeBtn(page, 'plum-time').click();
  await expect(page.locator('input[name="plum-time-when"][value="now"]')).toBeChecked();
  const before = Date.now();
  await page.locator('#plum-time-submit').click();
  await expectOverlayShown(page);
  const after = Date.now();

  const record = await page.evaluate(() => JSON.parse(localStorage.getItem('iching_journal_history'))[0]);
  expect(record.plumMethod).toBe('time');
  expect(record.isPlum).toBe(true);
  expect(record.changingLines).toEqual([record.movingLine]);
  const castTime = new Date(record.castTime).getTime();
  expect(castTime).toBeGreaterThanOrEqual(before - 1000);
  expect(castTime).toBeLessThanOrEqual(after + 1000);
});

test('a date outside 1901–2100 shows an inline error and casts nothing', async ({ page }) => {
  await page.goto('/');
  await castAt(page, '1800-01-01T12:00');
  await expect(page.locator('#plum-time-error')).toContainText('1901');
  await expectOverlayHidden(page);
  const history = await page.evaluate(() => localStorage.getItem('iching_journal_history'));
  expect(JSON.parse(history || '[]')).toEqual([]);

  // The range applies to the converted date: 2100-12-31 23:30 rolls over to 2101-01-01
  await page.locator('#plum-time-at').fill('2100-12-31T23:30');
  await page.locator('#plum-time-submit').click();
  await expect(page.locator('#plum-time-error')).toContainText('1901');
  await expectOverlayHidden(page);
});

test('plum fields from the journal (e.g. an imported backup) are shown as text, not HTML', async ({ page }) => {
  // 革 (101110) 之 咸 (31), line 1, 辰年(5) 十二月 十七日 申時(9): the 觀梅占 values,
  // source: https://zh.wikisource.org/wiki/梅花易數/卷一 「辰年十二月十七日申時」「是為澤火革。初爻變咸」
  const tag = (id) => `<img id="${id}" src="x">`;
  const trigram = (name, wuxing) => ({ name, wuxing });
  const record = {
    id: String(Date.now()), date: new Date().toISOString(), type: 'iching', messages: [],
    question: '匯入的紀錄', originalId: 49, originalBinary: '101110', originalName: '革',
    futureId: 31, futureName: '咸', hasChange: true, changingLines: [1], movingLine: 1, isPlum: true,
    plumResult: {
      movingLine: 1,
      timeCast: { yearBranch: tag('pwn-year'), yearNum: 5, month: 12, isLeapMonth: false, day: 17, hourBranch: '申', hourNum: 9 },
      analysis: {
        bodyTrigram: trigram(tag('pwn-body'), '金'),
        origGuestTrigram: trigram('離', tag('pwn-wuxing')),
        nuclearUpper: trigram('乾', '金'), nuclearLower: trigram('巽', '木'), futureGuestTrigram: trigram('艮', '土'),
        // A Markdown link: escaping alone would let marked turn this into a javascript: anchor
        result: `${tag('pwn-label')}：${tag('pwn-verdict')} [點此](javascript:void(window.pwned=1))`
      }
    }
  };
  await page.goto('/');
  await page.evaluate((r) => localStorage.setItem('iching_journal_history', JSON.stringify([r])), record);
  await page.goto('/');

  await reopenFromHistory(page);
  const overlay = await expectOverlayShown(page);
  await overlay.locator('.analysis-tab', { hasText: '梅花心易' }).click();
  const content = page.locator('#analysis-content-area');
  await expect(content.locator('.plum-time-basis')).toContainText(tag('pwn-year'));
  await expect(content).toContainText(tag('pwn-body'));
  await expect(content).toContainText(tag('pwn-verdict'));
  await expect(page.locator('[id^="pwn-"]')).toHaveCount(0);
  await expect(content.locator('a[href^="javascript:"]')).toHaveCount(0);
  await expect(content).toContainText('[點此](javascript:void(window.pwned=1))');
});

test('the incomplete-record fallback shows journal keys as text', async ({ page }) => {
  // A plum record without 體/用 trigrams takes the 「梅花格式不完整」 branch, which lists the record's keys
  const record = {
    id: String(Date.now()), date: new Date().toISOString(), type: 'iching', messages: [],
    originalId: 49, originalBinary: '101110', originalName: '革', isPlum: true,
    plumResult: { '<img id="pwn-key" src="x">': 1, analysis: { '<img id="pwn-inner" src="x">': 1 } }
  };
  await page.goto('/');
  await page.evaluate((r) => localStorage.setItem('iching_journal_history', JSON.stringify([r])), record);
  await page.goto('/');

  await reopenFromHistory(page);
  const overlay = await expectOverlayShown(page);
  await overlay.locator('.analysis-tab', { hasText: '梅花心易' }).click();
  const content = page.locator('#analysis-content-area');
  await expect(content).toContainText('梅花格式不完整');
  await expect(content).toContainText('<img id="pwn-key" src="x">');
  await expect(page.locator('[id^="pwn-"]')).toHaveCount(0);
});
