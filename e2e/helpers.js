import { expect } from '@playwright/test';

// #result-overlay hides with opacity, not display (main.css), so toBeVisible() can't tell shown from hidden
export async function expectOverlayShown(page) {
  const overlay = page.locator('#result-overlay');
  await expect(overlay).not.toHaveClass(/\bhidden\b/);
  await expect(overlay).toHaveCSS('opacity', '1');
  return overlay;
}

export async function expectOverlayHidden(page) {
  const overlay = page.locator('#result-overlay');
  await expect(overlay).toHaveClass(/\bhidden\b/);
  await expect(overlay).toHaveCSS('opacity', '0');
}

/**
 * Casts a coin reading on the tabletop (six tosses) and returns the hexagram name shown in the result overlay.
 */
export async function castIChing(page, question) {
  await page.goto('/');
  await page.locator('#user-question').fill(question);

  const canvas = page.locator('#canvas-container');
  const lines = page.locator('#casting-progress .hex-line');
  for (let n = 1; n <= 6; n++) {
    await canvas.click();
    // Each toss settles within CastingManager's 3 s cap
    await expect(lines).toHaveCount(n, { timeout: 10_000 });
  }

  const overlay = await expectOverlayShown(page);
  const name = (await overlay.locator('.hex-name-main').innerText()).trim();
  expect(name).not.toBe('');
  return name;
}

export async function openNav(page, viewId) {
  await page.locator(`.nav-links a[href="#${viewId}"]`).click();
  await expect(page.locator(`section#${viewId}`)).toHaveClass(/active/);
}

/**
 * Opens the journal's only I Ching record from History and returns the hexagram name in the reopened overlay.
 * Finds the day by its record dot, not by .today, so a cast that crosses midnight still matches.
 * Known gap: the calendar month is fixed when the page loads, so a cast that crosses midnight at a month end won't show.
 */
export async function reopenFromHistory(page) {
  await openNav(page, 'history');
  const recordDay = page.locator('#calendar-grid .calendar-day.has-record');
  await expect(recordDay).toHaveCount(1);
  await recordDay.click();

  const modal = page.locator('#detail-modal');
  await expect(modal.locator('.selection-item')).toHaveCount(1);
  await modal.locator('.selection-item button[title="查看結果"]').click();

  const overlay = await expectOverlayShown(page);
  return (await overlay.locator('.hex-name-main').innerText()).trim();
}

/**
 * Switches to tarot in Settings, draws a three-card spread and returns each card's name and orientation as shown.
 */
export async function drawTarot(page, question) {
  await openNav(page, 'settings');
  await page.locator('#settings-mode-switcher [data-mode="tarot"]').click();
  await expect(page.locator('section#tarot')).toHaveClass(/active/);

  await page.locator('#tarot-question').fill(question);
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
  const cards = page.locator('#tarot-result-container .tarot-card-wrapper');
  await expect(cards).toHaveCount(3, { timeout: 10_000 });
  const drawn = await readCards(cards, '.tarot-card-name', '.tarot-card');
  // The name falls back to the raw id ("cups_14") when the card's data file didn't load
  for (const card of drawn) expect(card.name).toMatch(/\p{Script=Han}/u);
  return drawn;
}

/**
 * Opens the journal's only tarot record from History (tarot mode) and returns its cards as shown.
 * Same known gap as reopenFromHistory: a draw after a month boundary since page load won't show.
 */
export async function reopenTarotFromHistory(page) {
  await openNav(page, 'settings');
  await page.locator('#settings-mode-switcher [data-mode="tarot"]').click();
  await openNav(page, 'history');
  const recordDay = page.locator('#calendar-grid .calendar-day.has-record');
  await expect(recordDay).toHaveCount(1);
  await recordDay.click();

  const modal = page.locator('#detail-modal');
  await expect(modal.locator('.selection-item')).toHaveCount(1);
  await modal.locator('.selection-item button[title="查看解析"]').click();

  const cards = modal.locator('.tarot-history-detail .tarot-history-card');
  await expect(cards).toHaveCount(3);
  return readCards(cards, '.name', '.tarot-card-mini');
}

async function readCards(cards, nameSelector, faceSelector) {
  const result = [];
  for (const card of await cards.all()) {
    result.push({
      name: (await card.locator(nameSelector).innerText()).trim(),
      reversed: /\breversed\b/.test(await card.locator(faceSelector).getAttribute('class')),
    });
  }
  return result;
}
