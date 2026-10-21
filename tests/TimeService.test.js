import { describe, it, expect } from 'vitest';
import { TimeService } from '../src/services/TimeService.js';

// Local noon, so the date never shifts with the time zone.
const at = (y, m, d, h = 12, min = 0) => new Date(y, m - 1, d, h, min);
const addDays = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n, 12);
const S = TimeService.STEMS;
const B = TimeService.BRANCHES;

describe('day GanZhi (reference dates)', () => {
  it.each([
    [1900, 1, 1, '甲戌'],
    [1949, 10, 1, '甲子'],
    [2000, 1, 1, '戊午']
  ])('%i-%i-%i is %s', (y, m, d, expected) => {
    expect(TimeService.getGanZhi(at(y, m, d)).day).toBe(expected);
  });

  it('handles dates before the 1900 epoch', () => {
    expect(TimeService.getGanZhi(at(1899, 12, 31)).day).toBe('癸酉');
  });

  it('repeats every 60 days and advances one step per day, across a leap day', () => {
    const start = at(2024, 2, 28);
    const g = TimeService.getGanZhi(start);
    expect(TimeService.getGanZhi(addDays(start, 60)).day).toBe(g.day);

    const next = TimeService.getGanZhi(addDays(start, 2)); // 2024-03-01
    expect(next.dayStem).toBe(S[(S.indexOf(g.dayStem) + 2) % 10]);
    expect(next.dayBranch).toBe(B[(B.indexOf(g.dayBranch) + 2) % 12]);
  });

  it('does not depend on the time of day (DST)', () => {
    const early = TimeService.getGanZhi(at(2024, 7, 15, 0, 30)).day;
    const late = TimeService.getGanZhi(at(2024, 7, 15, 23, 30)).day;
    expect(early).toBe(late);
  });
});

describe('year GanZhi (mid-year dates)', () => {
  it.each([
    [1984, '甲子'], [2024, '甲辰'], [2026, '丙午'], [1983, '癸亥']
  ])('%i is %s', (year, expected) => {
    expect(TimeService.getGanZhi(at(year, 6, 15)).year).toBe(expected);
  });
});

describe('month branch (the 15th, past each 節)', () => {
  it.each([
    [1, '丑'], [2, '寅'], [3, '卯'], [4, '辰'], [5, '巳'], [6, '午'],
    [7, '未'], [8, '申'], [9, '酉'], [10, '戌'], [11, '亥'], [12, '子']
  ])('month %i is %s', (month, branch) => {
    const g = TimeService.getGanZhi(at(2024, month, 15));
    expect(g.monthBranch).toBe(branch);
    expect(g.month).toBe(branch);
  });
});

describe('getWuxingStrength', () => {
  // 囚/死 are not asserted yet: see the TODO in TimeService.getWuxingStrength.
  it.each([
    ['寅', '木', '火', '水'],
    ['午', '火', '土', '木'],
    ['申', '金', '水', '土'],
    ['子', '水', '木', '金'],
    ['辰', '土', '金', '火']
  ])('in %s month: %s 旺, %s 相, %s 休', (branch, wang, xiang, xiu) => {
    const s = TimeService.getWuxingStrength(branch);
    expect(s[wang]).toBe('旺');
    expect(s[xiang]).toBe('相');
    expect(s[xiu]).toBe('休');
  });
});
