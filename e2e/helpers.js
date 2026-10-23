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
