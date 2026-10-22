import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { JournalService } from '../src/services/JournalService.js';
import { TimeService } from '../src/services/TimeService.js';
import { HexagramEngine } from '../src/engine/HexagramEngine.js';

// Local noon, so the date never shifts with the time zone.
const at = (y, m, d) => new Date(y, m - 1, d, 12);

afterEach(() => vi.useRealTimers());

describe('getCastDate: reopening a saved reading (issue #2)', () => {
  const record = { id: '1', date: at(2026, 10, 3).toISOString() };

  const openOn = (y, m, d) => {
    vi.useFakeTimers();
    vi.setSystemTime(at(y, m, d));
    const gZ = TimeService.getGanZhi(JournalService.getCastDate(record));
    return { day: gZ.day, monthBranch: gZ.monthBranch, beasts: HexagramEngine.getSixBeasts(gZ.dayStem) };
  };

  it('gives the same day, month branch and Six Beasts whichever day it is opened', () => {
    const [first, ...rest] = [openOn(2026, 10, 3), openOn(2026, 10, 21), openOn(2026, 10, 22), openOn(2026, 11, 15)];

    // 2026-10-03 is 庚戌日:
    // https://www.huangli.com/huangli/2026/10_03.html
    // https://wannianrili.bmcx.com/2026-10-03__wannianrili/
    expect(first.day).toBe('庚戌');
    // 黃宗羲《易學象數論·占課》: 「青龍、朱雀、勾陳、騰蛇、白虎、玄武六神……庚辛起白虎」
    // https://zh.wikisource.org/wiki/易學象數論/占課
    expect(first.beasts).toEqual(['白虎', '玄武', '青龍', '朱雀', '勾陳', '騰蛇']);
    // No fixed month branch: getGanZhi does not yet use the 節 boundary (see its TODO).
    rest.forEach(opened => expect(opened).toEqual(first));
  });

  it.each([
    ['no record', undefined],
    ['no date', { id: '1' }],
    ['an invalid date', { id: '1', date: 'not a date' }]
  ])('falls back to now for %s', (_, rec) => {
    vi.useFakeTimers();
    vi.setSystemTime(at(2026, 10, 21));
    expect(JournalService.getCastDate(rec).getTime()).toBe(at(2026, 10, 21).getTime());
  });
});

describe('app.js does not take GanZhi from the current time (issue #2)', () => {
  it('never calls TimeService.getGanZhi(new Date())', () => {
    const source = fs.readFileSync(path.resolve(import.meta.dirname, '../src/app.js'), 'utf8');
    expect(source).not.toMatch(/TimeService\.getGanZhi\(\s*new\s+Date(\(\s*\))?\s*\)/);
  });
});
