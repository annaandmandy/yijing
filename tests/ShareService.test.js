import { describe, it, expect, afterEach, vi } from 'vitest';
import { ShareService } from '../src/services/ShareService.js';
import { JournalService } from '../src/services/JournalService.js';

afterEach(() => vi.useRealTimers());

// Noon in Boston on 2026-10-03; the copy text always formats in America/New_York.
const castDate = new Date('2026-10-03T16:00:00Z');
const qian = { name: '乾', summary: '元亨利貞' };
const kun = { name: '坤', summary: '元亨，利牝馬之貞' };
// ICU puts a locale-dependent space (e.g. U+2009) between date and time, so match any whitespace.
const BOSTON_NOON_OCT_3 = /^2026\/10\/3\s下午12:00:00 \(波士頓真太陽時\)$/;

describe('buildCopyText: copying a saved reading', () => {
  it("stamps the reading's cast date, not today", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-21T16:00:00Z'));

    const record = { question: '工作會順利嗎？', date: castDate.toISOString() };
    const text = ShareService.buildCopyText({
      question: record.question,
      date: JournalService.getCastDate(record),
      original: qian
    });

    expect(text).toMatch(/時間：2026\/10\/3\s/);
    expect(text).not.toContain('2026/10/21');
    expect(text).toContain('問題：工作會順利嗎？');
  });

  it('formats the time as Boston solar time', () => {
    expect(ShareService.formatSolarTime(castDate)).toMatch(BOSTON_NOON_OCT_3);
  });

  it('builds the full text, including a changed hexagram', () => {
    expect(ShareService.buildCopyText({
      question: '工作會順利嗎？', date: castDate, original: qian, future: kun, hasChange: true
    })).toBe(`【I-Ching Lab】\n問題：工作會順利嗎？\n時間：${ShareService.formatSolarTime(castDate)}\n本卦：乾 之 坤\n解義：元亨利貞`);
  });

  it('falls back to 隨喜求卦 without a question and skips a missing future', () => {
    const text = ShareService.buildCopyText({ question: '', date: castDate, original: qian, hasChange: true });
    expect(text).toContain('問題：隨喜求卦');
    expect(text).toContain('本卦：乾\n');
  });
});
