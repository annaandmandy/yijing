import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { PlumBlossomEngine as PB } from '../src/engine/PlumBlossomEngine.js';
import { loadLibrary } from './library.js';

const library = loadLibrary();
const trigram = (name) => PB.TRIGRAMS.find(t => t.name === name);
const reverse = (b) => b.split('').reverse().join('');

describe('trigrams', () => {
  it.each([
    [1, '乾', '111'], [2, '兌', '011'], [3, '離', '101'], [4, '震', '001'],
    [5, '巽', '110'], [6, '坎', '010'], [7, '艮', '100'], [8, '坤', '000']
  ])('trigram %i %s is %s top to bottom', (id, name, binary) => {
    expect(PB.TRIGRAMS.find(t => t.id === id).name).toBe(name);
    expect(PB.getTrigramBinary(id)).toBe(binary);
  });

  it('round-trips every trigram through its bottom-to-top binary', () => {
    for (const t of PB.TRIGRAMS) {
      expect(PB.getTrigramByBinary(reverse(PB.getTrigramBinary(t.id)))).toBe(t);
    }
  });

  it('getHexBinary puts the lower trigram first, bottom to top', () => {
    expect(PB.getHexBinary(2, 3)).toBe('101110'); // 兌 over 離 = 革
    expect(PB.getHexBinary(8, 1)).toBe('111000'); // 坤 over 乾 = 泰
  });
});

describe('calculateFromNumbers: number reduction', () => {
  it('reduces numbers mod 8, with 0 meaning 坤', () => {
    expect(PB.calculateFromNumbers(8, 16, 1).upperTrigram.name).toBe('坤');
    expect(PB.calculateFromNumbers(8, 16, 1).lowerTrigram.name).toBe('坤');
    expect(PB.calculateFromNumbers(9, 9, 1).upperTrigram.name).toBe('乾');
  });

  it('reduces the sum mod 6, with 0 meaning the top line', () => {
    expect(PB.calculateFromNumbers(1, 2, 3).movingLine).toBe(6);
    expect(PB.calculateFromNumbers(1, 2, 4).movingLine).toBe(1);
  });
});

describe('邵雍 觀梅占 result, via the app three-number method', () => {
  // The textbook takes the moving line from 43 % 6; the app uses (n1 + n2 + n3) % 6,
  // so n3 = 2 is chosen to land on the same moving line (79 % 6 = 1).
  const r = PB.calculateFromNumbers(34, 43, 2);

  it('casts 革 with line 1 moving', () => {
    expect(r.upperTrigram.name).toBe('兌');
    expect(r.lowerTrigram.name).toBe('離');
    expect(r.movingLine).toBe(1);
    expect(r.binary).toBe('101110');
    expect(library.find(h => h.binary === r.binary).id).toBe(49);
  });

  it('takes 兌 as 體 and 離 as 用', () => {
    expect(r.analysis.isUpperBody).toBe(true);
    expect(r.analysis.bodyTrigram.name).toBe('兌');
    expect(r.analysis.origGuestTrigram.name).toBe('離');
  });

  it('has 巽 and 乾 as nuclear trigrams (姤)', () => {
    expect(r.analysis.nuclearLower.name).toBe('巽');
    expect(r.analysis.nuclearUpper.name).toBe('乾');
  });

  it('changes 離 to 艮 (革 to 咸)', () => {
    expect(r.analysis.futureGuestTrigram.name).toBe('艮');
  });

  it('reads 用剋體 as 大凶', () => {
    expect(r.analysis.interactions.original).toBe('用剋體');
    expect(r.analysis.result.startsWith('大凶')).toBe(true);
  });
});

describe('body/guest and changed trigram', () => {
  it('switches 體 to the lower trigram from line 4 up', () => {
    const upper = trigram('乾');
    const lower = trigram('坤');
    expect(PB.analyzeBodyGuest(upper, lower, 3).isUpperBody).toBe(true);
    expect(PB.analyzeBodyGuest(upper, lower, 3).bodyTrigram).toBe(upper);
    expect(PB.analyzeBodyGuest(upper, lower, 4).isUpperBody).toBe(false);
    expect(PB.analyzeBodyGuest(upper, lower, 4).bodyTrigram).toBe(lower);
  });

  it.each([
    [1, '巽'], [2, '離'], [3, '兌'], [4, '巽'], [5, '離'], [6, '兌']
  ])('乾 with line %i moving becomes %s', (line, name) => {
    expect(PB.getChangedTrigram(trigram('乾'), line).name).toBe(name);
  });
});

describe('Five Elements interaction', () => {
  it.each([
    ['木', '比和'], ['水', '用生體'], ['火', '體生用'], ['金', '用剋體'], ['土', '體剋用']
  ])('體 木 with 用 %s is %s', (guest, label) => {
    expect(PB.getWuxingInteraction('木', guest)).toBe(label);
  });

  it('labels every element pair with a known relation', () => {
    const elements = ['金', '木', '水', '火', '土'];
    const labels = ['比和', '用生體', '體生用', '用剋體', '體剋用'];
    for (const body of elements) {
      for (const guest of elements) {
        expect(labels).toContain(PB.getWuxingInteraction(body, guest));
      }
    }
  });

  it.each([
    ['用生體', '大吉'], ['比和', '吉'], ['體剋用', '小吉'], ['體生用', '凶'], ['用剋體', '大凶']
  ])('%s reads as %s', (label, verdict) => {
    expect(PB.getInteractionResult(label).startsWith(`${verdict}：`)).toBe(true);
  });

  it('falls back for unknown labels', () => {
    expect(PB.getInteractionResult('?')).toBe('需結合同爻詳細分析。');
  });
});

// ---- 時間起卦 (issue #1) ----
// Book rule and example: 《梅花易數》卷一「年月日時起例」「觀梅占」
// source: https://zh.wikisource.org/wiki/梅花易數/卷一
// 「年月日為上卦。年月日加時總數為下卦。又以年月日時總數取爻。」
// 「辰年十二月十七日申時……辰年五數，十二月十二數，十七日十七數，共三十四數……餘二，屬兌，為上卦；
//   加申時九數，總得四十三數……餘得三數，為離，作下卦。……餘一為動爻，是為澤火革。初爻變咸，互見乾巽。」
// 「右兌金為體，離火克之。……幸變為艮土，兌金得生」
const HKO = (year) => `https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T${year}c.txt`;
const local = (y, m, d, h = 12, min = 0) => new Date(y, m - 1, d, h, min);

function expectGuanMei(r) {
  expect(r.upperTrigram.name).toBe('兌');
  expect(r.lowerTrigram.name).toBe('離');
  expect(r.movingLine).toBe(1);
  expect(r.binary).toBe('101110');
  expect(library.find(h => h.binary === r.binary).name).toBe('革');
  expect(library.find(h => h.binary === r.changedBinary).name).toBe('咸');
  expect([r.analysis.nuclearUpper.name, r.analysis.nuclearLower.name]).toEqual(['乾', '巽']);
  expect(r.analysis.bodyTrigram.name).toBe('兌');
  expect(r.analysis.origGuestTrigram.name).toBe('離');
  expect(r.analysis.interactions.original).toBe('用剋體');
  expect(r.analysis.futureGuestTrigram.name).toBe('艮');
  expect(r.analysis.interactions.future).toBe('用生體');
}

describe('觀梅占 by the book’s time numbers', () => {
  it('辰年(5) 十二月(12) 十七日(17) 申時(9) casts 革 之 咸 with 兌 as 體', () => {
    // source: https://zh.wikisource.org/wiki/梅花易數/卷一 (觀梅占)
    expectGuanMei(PB.calculateFromTimeNumbers(5, 12, 17, 9));
  });
});

describe('觀梅占 from a real date: 2025-01-16 15:30 is 甲辰年十二月十七日申時', () => {
  // source: https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T2024c.txt
  //   header 「2024(甲辰 - 肖龍)年」; row 「2024年12月31日 十二月」 (十二月初一)
  // source: https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T2025c.txt
  //   row 「2025年1月16日 十七」; 申時 15:00–17:00: https://zh.wikipedia.org/wiki/時辰
  const r = PB.calculateFromTime(local(2025, 1, 16, 15, 30));

  it('reads the lunar moment the book uses', () => {
    expect(r.timeCast).toMatchObject({
      lunarYear: 2024, yearBranch: '辰', yearNum: 5,
      month: 12, isLeapMonth: false, day: 17,
      hourBranch: '申', hourNum: 9
    });
  });

  it('gives the book’s hexagrams and 體/用', () => expectGuanMei(r));
});

describe('toLunarMoment against the HKO tables', () => {
  it.each([
    // [y, m, d, lunarYear, yearBranch, month, isLeap, day, source]
    [2024, 2, 9, 2023, '卯', 12, false, 30, HKO(2024)],  // 「2024年2月9日 三十」 (癸卯年除夕)
    [2024, 2, 10, 2024, '辰', 1, false, 1, HKO(2024)],   // 「2024年2月10日 正月」, not 立春 (Feb 4) or Jan 1
    [2024, 2, 4, 2023, '卯', 12, false, 25, HKO(2024)],  // 立春 row 「2024年2月4日 廿五 立春」 is still 癸卯
    [2023, 3, 22, 2023, '卯', 2, true, 1, HKO(2023)],    // 「2023年3月22日 閏二月」
    [2025, 7, 25, 2025, '巳', 6, true, 1, HKO(2025)],    // 「2025年7月25日 閏六月」
    [2025, 8, 23, 2025, '巳', 7, false, 1, HKO(2025)]    // 「2025年8月23日 七月」
  ])('%i-%i-%i is lunar %i (%s年) month %i leap=%s day %i', (y, m, d, lunarYear, yearBranch, month, isLeapMonth, day, source) => {
    // source: see the HKO URL in each row (last column)
    expect(source).toMatch(/^https:\/\/www\.hko\.gov\.hk\//);
    expect(PB.toLunarMoment(local(y, m, d))).toMatchObject({ lunarYear, yearBranch, month, isLeapMonth, day });
  });
});

describe('hours (時辰)', () => {
  // source: https://zh.wikipedia.org/wiki/時辰 — 子時 23:00–01:00, 丑時 01:00–03:00, … 亥時 21:00–23:00.
  // From 23:00 the day counts as the next day (子初換日):
  // source: https://zh.wikipedia.org/wiki/子時 「目前術數家大多採用「子初換日」，即以「子初」（23時）作為一日之始，
  //   過了夜晚23時正，就計屬於新一日。」 (the article also records the 子正 (00:00) school; issue #1's PR names this choice)
  // Day numbers: source: https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T2025c.txt
  //   「2025年1月16日 十七」「2025年1月17日 十八」
  it.each([
    [22, 59, '亥', 12, 17],
    [23, 0, '子', 1, 18],
    [23, 59, '子', 1, 18],
    [0, 30, '子', 1, 17],
    [1, 0, '丑', 2, 17],
    [15, 0, '申', 9, 17],
    [16, 59, '申', 9, 17],
    [17, 0, '酉', 10, 17]
  ])('2025-01-16 %i:%i is %s時 (%i), lunar day %i', (h, min, hourBranch, hourNum, day) => {
    expect(PB.toLunarMoment(local(2025, 1, 16, h, min))).toMatchObject({ hourBranch, hourNum, month: 12, day });
  });

  it('除夕 23:30 rolls over to 正月初一 子時 of the next year', () => {
    // source: https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T2025c.txt
    //   「2025年1月28日 廿九」 (甲辰年最後一日), 「2025年1月29日 正月」
    expect(PB.toLunarMoment(local(2025, 1, 28, 23, 30))).toMatchObject({
      lunarYear: 2025, yearBranch: '巳', yearNum: 6, month: 1, isLeapMonth: false, day: 1, hourBranch: '子', hourNum: 1
    });
    expect(PB.toLunarMoment(local(2025, 1, 28, 22, 59))).toMatchObject({ lunarYear: 2024, month: 12, day: 29 });
  });
});

describe('supported range: the converted date (after the 23:00 roll-over) must be 1901-02-19 … 2100-12-31', () => {
  // source: https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T1901c.txt 「1901年2月19日 正月」
  // source: https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T2100c.txt (last table HKO publishes)
  it.each([
    [1901, 2, 18, 12, 0],
    [2101, 1, 1, 12, 0],
    [2100, 12, 31, 23, 30]
  ])('%i-%i-%i %i:%i throws RangeError', (y, m, d, h, min) => {
    expect(() => PB.toLunarMoment(local(y, m, d, h, min))).toThrow(RangeError);
    expect(() => PB.calculateFromTime(local(y, m, d, h, min))).toThrow(RangeError);
  });

  it.each([
    [1901, 2, 19, 12, 0],
    [2100, 12, 31, 12, 0],
    [1901, 2, 18, 23, 30]
  ])('%i-%i-%i %i:%i converts', (y, m, d, h, min) => {
    expect(() => PB.toLunarMoment(local(y, m, d, h, min))).not.toThrow();
  });

  it('1901-02-18 23:30 is lunar 1901 正月初一 子時', () => {
    // source: https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T1901c.txt 「1901年2月19日 正月」
    expect(PB.toLunarMoment(local(1901, 2, 18, 23, 30))).toMatchObject({ lunarYear: 1901, month: 1, day: 1, hourNum: 1 });
  });
});

describe('every lunar month start 1901–2100 matches the HKO tables', () => {
  // source: https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T{year}c.txt, every year 1901–2100,
  // extracted by scripts/fetch_hko_lunar_months.py into tests/fixtures/hko_lunar_months.json
  const fixture = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, 'fixtures/hko_lunar_months.json'), 'utf8'));
  const months = fixture.months;
  const parse = (iso) => { const [y, m, d] = iso.split('-').map(Number); return local(y, m, d); };
  const dayBefore = (iso) => { const t = parse(iso); return local(t.getFullYear(), t.getMonth() + 1, t.getDate() - 1); };

  it('covers lunar 1901 正月 to 2100 十二月', () => {
    expect(months[0]).toEqual({ date: '1901-02-19', lunarYear: 1901, month: 1, isLeap: false });
    expect(months.at(-1)).toMatchObject({ lunarYear: 2100, month: 12 });
    expect(months.length).toBeGreaterThan(2400);
  });

  it('each start date is day 1 of that month, and the day before ends the previous month', () => {
    const mismatches = [];
    months.forEach((e, i) => {
      const start = PB.toLunarMoment(parse(e.date));
      const want = { lunarYear: e.lunarYear, month: e.month, isLeapMonth: e.isLeap, day: 1 };
      const got = { lunarYear: start.lunarYear, month: start.month, isLeapMonth: start.isLeapMonth, day: start.day };
      if (JSON.stringify(got) !== JSON.stringify(want)) mismatches.push({ date: e.date, want, got });
      if (i === 0) return;
      const p = months[i - 1];
      const end = PB.toLunarMoment(dayBefore(e.date));
      const endOk = end.lunarYear === p.lunarYear && end.month === p.month && end.isLeapMonth === p.isLeap &&
        (end.day === 29 || end.day === 30);
      if (!endOk) mismatches.push({ date: `day before ${e.date}`, want: p, got: end });
    });
    expect(mismatches).toEqual([]);
  });
});

describe('changed hexagram (變卦)', () => {
  it('number casting 34, 43, 2 also gives 咸 as the changed hexagram', () => {
    // source: https://zh.wikisource.org/wiki/梅花易數/卷一 「初爻變咸」
    const r = PB.calculateFromNumbers(34, 43, 2);
    expect(library.find(h => h.binary === r.changedBinary).name).toBe('咸');
  });
});

describe('toLunarMoment uses the local civil date, not the UTC date', () => {
  // Guards against a date-shift bug: in UTC+8, local 00:30 is the previous UTC day; in UTC−8, local 22:59 is
  // the next UTC day. CI also runs this file with TZ=Asia/Taipei, and it was checked with TZ=America/Los_Angeles.
  // source: https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T2025c.txt
  //   「2025年1月28日 廿九」「2025年1月29日 正月」「2025年1月30日 初二」
  it.each([
    [1, 29, 0, 30, 2025, 1, 1],
    [1, 29, 12, 0, 2025, 1, 1],
    [1, 29, 22, 59, 2025, 1, 1],
    [1, 30, 0, 30, 2025, 1, 2],
    [1, 28, 0, 30, 2024, 12, 29]
  ])('2025-%i-%i %i:%i local is lunar %i month %i day %i', (m, d, h, min, lunarYear, month, day) => {
    expect(PB.toLunarMoment(local(2025, m, d, h, min))).toMatchObject({ lunarYear, month, day });
  });

  it('gives HKO’s 2027 正月初一 (Feb 6), where Intl’s Chinese calendar says Feb 7', () => {
    // source: https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T2027c.txt 「2027年2月6日 正月」
    expect(PB.toLunarMoment(local(2027, 2, 6))).toMatchObject({ lunarYear: 2027, month: 1, day: 1 });
    expect(PB.toLunarMoment(local(2027, 2, 5))).toMatchObject({ lunarYear: 2026, month: 12 });
  });
});

describe('years 0–99 are not read as 1900–1999', () => {
  // A picked datetime-local value like 0050-03-01T12:00 is year 50; Date.UTC(50, …) would give 1950.
  const year = (y, m, d, h = 12) => { const t = new Date(2000, m - 1, d, h); t.setFullYear(y); return t; };

  it.each([[50, 3, 1], [99, 12, 31], [1, 1, 1]])('%i-%i-%i is out of range', (y, m, d) => {
    expect(() => PB.toLunarMoment(year(y, m, d))).toThrow(RangeError);
  });

  it('the supported range is lunar 1901 正月初一 to the last day of HKO’s last table', () => {
    // source: https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T1901c.txt 「1901年2月19日 正月」
    // source: https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T2100c.txt 「2100年12月31日 十二月」 (last row)
    expect(PB.LUNAR_RANGE.first).toBe(Date.UTC(1901, 1, 19));
    expect(PB.LUNAR_RANGE.last).toBe(Date.UTC(2100, 11, 31));
  });
});
