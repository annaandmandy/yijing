import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JournalService } from '../src/services/JournalService.js';
import { MemoryStorage } from './memoryStorage.js';
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

describe('getCastDate: time-based Plum Blossom casts (issue #1)', () => {
  const saved = at(2026, 10, 3).toISOString();
  const picked = new Date(2026, 9, 2, 15, 0).toISOString(); // "yesterday at 3pm"

  it('prefers the picked castTime over the save date', () => {
    expect(JournalService.getCastDate({ id: '1', date: saved, castTime: picked }).toISOString()).toBe(picked);
  });

  it.each([
    ['no castTime', undefined],
    ['an invalid castTime', 'not a date']
  ])('falls back to the save date for %s', (_, castTime) => {
    expect(JournalService.getCastDate({ id: '1', date: saved, castTime }).toISOString()).toBe(saved);
  });
});

describe('app.js does not take GanZhi from the current time (issue #2)', () => {
  it('never calls TimeService.getGanZhi(new Date())', () => {
    const source = fs.readFileSync(path.resolve(import.meta.dirname, '../src/app.js'), 'utf8');
    expect(source).not.toMatch(/TimeService\.getGanZhi\(\s*new\s+Date(\(\s*\))?\s*\)/);
  });
});

describe('legacy numeric record ids (issue #8)', () => {
  // The first saveRecord (commit 3cd8544) stored `id: Date.now()` as a number.
  const LEGACY_ID = 1727942400000;
  // The current saveRecord stores `Date.now().toString()`.
  const STRING_ID = '1759464000000';
  const chat = [{ role: 'user', content: '請解卦' }, { role: 'assistant', content: '此卦...' }];

  // The History day modal builds onclick="…('${record.id}')", so every id reaches
  // JournalService as a string.
  const fromModal = id => `${id}`;

  const stored = () => JSON.parse(localStorage.getItem(JournalService.STORAGE_KEY));

  beforeEach(() => {
    vi.stubGlobal('localStorage', new MemoryStorage());
    localStorage.setItem(JournalService.STORAGE_KEY, JSON.stringify([
      { id: STRING_ID, date: '2025-10-03T04:00:00.000Z', type: 'iching', originalId: 1, messages: [] },
      { id: LEGACY_ID, date: '2024-10-03T08:00:00.000Z', originalId: 2, messages: chat }
    ]));
  });
  afterEach(() => vi.unstubAllGlobals());

  it('opens a numeric-id record from the History modal', () => {
    const record = JournalService.getRecord(fromModal(LEGACY_ID));
    expect(record?.originalId).toBe(2);
    expect(record.messages).toEqual(chat);
  });

  it('keeps chatting on a numeric-id record', () => {
    const more = [...chat, { role: 'user', content: '那時機呢' }];
    JournalService.updateMessages(fromModal(LEGACY_ID), more);
    JournalService.updateRecord(fromModal(LEGACY_ID), { quickInsight: '吉' });
    const legacy = stored().find(r => r.originalId === 2);
    expect(legacy.messages).toEqual(more);
    expect(legacy.quickInsight).toBe('吉');
    expect(legacy.id).toBe(LEGACY_ID);
  });

  it('deletes a numeric-id record from the History modal', () => {
    expect(JournalService.deleteRecord(fromModal(LEGACY_ID))).toBe(true);
    expect(stored().map(r => r.id)).toEqual([STRING_ID]);
  });

  it('leaves string-id records working as before', () => {
    expect(JournalService.getRecord(fromModal(STRING_ID))?.originalId).toBe(1);
    JournalService.updateMessages(fromModal(STRING_ID), chat);
    expect(stored()[0]).toMatchObject({ id: STRING_ID, messages: chat });
    expect(JournalService.deleteRecord('999')).toBe(false);
    expect(JournalService.deleteRecord(fromModal(STRING_ID))).toBe(true);
    expect(stored().map(r => r.id)).toEqual([LEGACY_ID]);
  });

  it('still finds a numeric-id record when given the number itself', () => {
    // app.js passes record.id straight through after getRecord (e.g. prepareAIMentorView)
    expect(JournalService.getRecord(LEGACY_ID)?.originalId).toBe(2);
    expect(JournalService.getRecord(Number(STRING_ID))?.originalId).toBe(1);
  });

  it('no source file compares record ids with ===, !==, includes, has or indexOf', () => {
    const srcDir = path.resolve(import.meta.dirname, '../src');
    const files = fs.readdirSync(srcDir, { recursive: true }).filter(f => f.endsWith('.js'));
    // A record id: recordId, currentRecordId, record.id, item.id (JournalService's history items)
    const rid = String.raw`(?:\b\w*[Rr]ecordId\b|\b(?:record|item)\.id\b)`;
    const patterns = [
      // rid ===/!== an expression; use JournalService.sameId instead. (comparing with a literal such as "null" is not an id match)
      new RegExp(String.raw`${rid}\s*[!=]==\s*(?!['"\d]|null\b|undefined\b)[\w$]`),
      new RegExp(String.raw`[\w$)\]]\s*[!=]==\s*${rid}`),
      new RegExp(String.raw`\.(?:includes|has|indexOf)\(\s*${rid}`)
    ];
    const hits = files.flatMap(f => fs.readFileSync(path.join(srcDir, f), 'utf8').split('\n')
      .map((line, i) => ({ where: `src/${f}:${i + 1}`, line: line.trim() }))
      .filter(({ line }) => patterns.some(p => p.test(line))));
    expect(hits).toEqual([]);
  });
});
