import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JournalService, BackupError } from '../src/services/JournalService.js';
import { MemoryStorage } from './memoryStorage.js';

const KEY = JournalService.STORAGE_KEY;

// Local noon, so the month never shifts with the time zone.
const at = (y, m, d) => new Date(y, m - 1, d, 12, 0, 0);

const chat = (...pairs) => pairs.flatMap(([q, a]) => [
  { role: 'user', content: q },
  { role: 'assistant', content: a }
]);

/** Saves records through the same JournalService calls app.js makes. */
function buildJournal() {
  vi.setSystemTime(at(2026, 9, 3));
  const iching = JournalService.saveRecord({
    question: '換工作好嗎',
    originalId: 1,
    originalBinary: '111111',
    originalName: '乾為天',
    futureId: 44,
    futureName: '天風姤',
    changingLines: [1],
    hasChange: true,
    isPlum: false,
    advancedTheory: { relations: { nuclear: '乾為天' }, chronoEnergy: { ganzhi: '甲子日 乙酉月' } }
  });
  JournalService.updateMessages(iching, chat(['請解卦', '此卦...'], ['那時機呢', '時機在...']));

  vi.setSystemTime(at(2026, 10, 7));
  const plum = JournalService.saveRecord({
    question: '梅花易數求卦',
    originalId: 2,
    originalBinary: '000000',
    originalName: '坤為地',
    movingLine: 3,
    isPlum: true,
    plumResult: { binary: '000000', movingLine: 3, ti: '坤', yong: '坤' },
    advancedTheory: { plum: { binary: '000000', movingLine: 3 } }
  });
  JournalService.updateMessages(plum, chat(['體用如何', '體用比和']));

  vi.setSystemTime(at(2026, 10, 12));
  const tarot = JournalService.saveRecord({
    type: 'tarot',
    question: '塔羅占卜',
    spread: [{ id: 0, isReversed: false }, { id: 22, isReversed: true }, { id: 77, isReversed: false }],
    spreadType: 'three-card'
  });
  JournalService.updateRecord(tarot, { quickInsight: '過去的愚者...' });
  JournalService.updateMessages(tarot, chat(['未來呢', '金幣十...'], ['謝謝', '不客氣']));

  // Shape written by the first saveRecord (commit 3cd8544): numeric id, no type, no messages.
  const legacy = {
    id: 1700000000000,
    date: '2023-11-14T22:13:20.000Z',
    question: '舊紀錄',
    originalId: 3,
    futureId: null,
    changingLines: []
  };
  const history = JSON.parse(localStorage.getItem(KEY));
  history.push(legacy);
  localStorage.setItem(KEY, JSON.stringify(history));

  return { iching, plum, tarot, legacy };
}

/** Asserts importing `text` throws a BackupError and leaves storage byte-identical. */
function expectRejected(text, message) {
  const before = localStorage.getItem(KEY);
  let error;
  try {
    JournalService.importBackup(text);
  } catch (e) {
    error = e;
  }
  expect(error).toBeInstanceOf(BackupError);
  expect(error.message).toMatch(message);
  expect(localStorage.getItem(KEY)).toBe(before);
}

beforeEach(() => {
  vi.stubGlobal('localStorage', new MemoryStorage());
  vi.useFakeTimers({ toFake: ['Date'] });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('export', () => {
  it('writes every reading, including chat history, into one file', () => {
    buildJournal();
    const file = JSON.parse(JournalService.serializeBackup());

    expect(file.format).toBe(JournalService.BACKUP_FORMAT);
    expect(file.version).toBe(1);
    expect(file.records).toEqual(JournalService.getHistory());
    expect(file.records).toHaveLength(4);
    expect(file.records.find(r => r.type === 'tarot').messages).toHaveLength(4);
  });

  it('exports an empty journal as an empty record list', () => {
    expect(JSON.parse(JournalService.serializeBackup()).records).toEqual([]);
  });
});

describe('restore', () => {
  it('restores every reading exactly as it was before export', () => {
    const ids = buildJournal();
    const before = JournalService.getHistory();
    const file = JournalService.serializeBackup();

    JournalService.clearHistory();
    const result = JournalService.importBackup(file);

    expect(result).toEqual({ added: 4, updated: 0, skipped: 0 });
    expect(JournalService.getHistory()).toEqual(before);
    for (const id of [ids.iching, ids.plum, ids.tarot]) {
      expect(JournalService.getRecord(id)).toEqual(before.find(r => r.id === id));
    }
    expect(JournalService.getHistory().at(-1).id).toBe(1700000000000);
  });

  it('lets a restored chat continue', () => {
    const { iching } = buildJournal();
    const file = JournalService.serializeBackup();
    JournalService.clearHistory();
    JournalService.importBackup(file);

    const messages = [...JournalService.getRecord(iching).messages, { role: 'user', content: '再問一次' }];
    JournalService.updateMessages(iching, messages);

    expect(JournalService.getRecord(iching).messages).toHaveLength(5);
  });

  it('puts restored readings back in the calendar month they were cast', () => {
    const { iching, plum, tarot } = buildJournal();
    const file = JournalService.serializeBackup();
    JournalService.clearHistory();
    JournalService.importBackup(file);

    expect(JournalService.getMonthlyHistory(2026, 8, 'iching').map(r => r.id)).toEqual([iching]);
    expect(JournalService.getMonthlyHistory(2026, 9, 'iching').map(r => r.id)).toEqual([plum]);
    expect(JournalService.getMonthlyHistory(2026, 9, 'tarot').map(r => r.id)).toEqual([tarot]);
  });
});

describe('merge into an existing journal', () => {
  it('keeps local readings and adds imported ones, newest first', () => {
    buildJournal();
    const file = JournalService.serializeBackup();
    JournalService.clearHistory();

    vi.setSystemTime(at(2026, 9, 20));
    const local = JournalService.saveRecord({ question: '本機', originalId: 5 });

    const result = JournalService.importBackup(file);
    const dates = JournalService.getHistory().map(r => r.date);

    expect(result).toEqual({ added: 4, updated: 0, skipped: 0 });
    expect(JournalService.getHistory()).toHaveLength(5);
    expect(JournalService.getRecord(local).question).toBe('本機');
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('takes the imported copy of a reading when it has the longer chat', () => {
    const { iching } = buildJournal();
    JournalService.updateMessages(iching, [...JournalService.getRecord(iching).messages, { role: 'user', content: '新問題' }]);
    const longer = JournalService.serializeBackup();
    JournalService.updateMessages(iching, []);

    const result = JournalService.importBackup(longer);

    expect(result).toEqual({ added: 0, updated: 1, skipped: 3 });
    expect(JournalService.getRecord(iching).messages).toHaveLength(5);
  });

  it('keeps the local copy when the imported chat is shorter or the same length', () => {
    const { iching } = buildJournal();
    const older = JournalService.serializeBackup();
    JournalService.updateMessages(iching, [...JournalService.getRecord(iching).messages, { role: 'user', content: '新問題' }]);

    const result = JournalService.importBackup(older);

    expect(result).toEqual({ added: 0, updated: 0, skipped: 4 });
    expect(JournalService.getRecord(iching).messages).toHaveLength(5);
  });

  it('matches a numeric local id with the same id as a string', () => {
    localStorage.setItem(KEY, JSON.stringify([{ id: 5, date: at(2026, 1, 1).toISOString(), originalId: 1 }]));
    const file = JSON.stringify({
      format: JournalService.BACKUP_FORMAT,
      version: 1,
      records: [{ id: '5', date: at(2026, 1, 1).toISOString(), originalId: 1, messages: [{ role: 'user', content: 'x' }] }]
    });

    const result = JournalService.importBackup(file);

    expect(result).toEqual({ added: 0, updated: 1, skipped: 0 });
    expect(JournalService.getHistory()).toHaveLength(1);
  });

  it('keeps the local id type and local-only fields when the imported copy wins', () => {
    const date = at(2026, 1, 1).toISOString();
    localStorage.setItem(KEY, JSON.stringify([
      { id: '7', date, type: 'tarot', spread: [], quickInsight: '本機解析', messages: [] }
    ]));
    const file = JSON.stringify({
      format: JournalService.BACKUP_FORMAT,
      version: 1,
      records: [{ id: 7, date, type: 'tarot', spread: [], messages: [{ role: 'user', content: 'x' }] }]
    });

    JournalService.importBackup(file);

    const record = JournalService.getRecord('7');
    expect(record.quickInsight).toBe('本機解析');
    expect(record.messages).toHaveLength(1);
  });

  it('keeps both copies when two local readings share an id', () => {
    const date = at(2026, 1, 1).toISOString();
    localStorage.setItem(KEY, JSON.stringify([
      { id: '42', date, question: 'A', originalId: 1, messages: [] },
      { id: '42', date, question: 'B', originalId: 2, messages: [] }
    ]));
    const file = JournalService.serializeBackup();

    JournalService.importBackup(file);

    expect(JournalService.getHistory().map(r => r.question).sort()).toEqual(['A', 'B']);
  });
});

describe('rejecting damaged or unrelated files', () => {
  let file;
  beforeEach(() => {
    buildJournal();
    file = JSON.parse(JournalService.serializeBackup());
  });

  const withRecords = records => JSON.stringify({ ...file, records });

  it('rejects a truncated file', () => {
    const text = JSON.stringify(file);
    expectRejected(text.slice(0, text.length / 2), /JSON/);
  });

  it('rejects an empty file', () => {
    expectRejected('', /JSON/);
  });

  it('rejects unrelated JSON', () => {
    expectRejected('{"name":"x"}', /不是/);
    expectRejected('[1,2,3]', /不是/);
  });

  it('rejects a hexagram data file', () => {
    const hexagram = fs.readFileSync(
      path.resolve(import.meta.dirname, '../public/yi_data_enhanced/hexagram_1.json'), 'utf8');
    expectRejected(hexagram, /不是/);
  });

  it('rejects a backup from a newer version', () => {
    expectRejected(JSON.stringify({ ...file, version: 99 }), /較新版本/);
  });

  it('rejects a missing or non-integer version', () => {
    const { version, ...noVersion } = file;
    expectRejected(JSON.stringify(noVersion), /版本/);
    expectRejected(JSON.stringify({ ...file, version: '1' }), /版本/);
    expectRejected(JSON.stringify({ ...file, version: 1.5 }), /版本/);
  });

  it('rejects a backup whose records are not a list', () => {
    expectRejected(JSON.stringify({ ...file, records: {} }), /紀錄/);
  });

  it('rejects a record without an id', () => {
    const { id, ...noId } = file.records[1];
    expectRejected(withRecords([file.records[0], noId]), /第 2 筆.*id/);
  });

  it('rejects an id that is not a saved timestamp', () => {
    const injected = "x');alert(1);('";
    expectRejected(withRecords([{ ...file.records[0], id: injected }]), /第 1 筆.*id/);
  });

  it('rejects a tarot spread the journal cannot read', () => {
    const tarot = file.records.find(r => r.type === 'tarot');
    expectRejected(withRecords([{ ...tarot, spread: 5 }]), /第 1 筆.*牌陣/);
    expectRejected(withRecords([{ ...tarot, spread: [{ id: '"><img>' }] }]), /第 1 筆.*牌陣/);
  });

  it('accepts the older comma-separated spread string', () => {
    const tarot = file.records.find(r => r.type === 'tarot');
    JournalService.clearHistory();
    JournalService.importBackup(withRecords([{ ...tarot, spread: '0,22,77' }]));
    expect(JournalService.getRecord(tarot.id).spread).toBe('0,22,77');
  });

  it('rejects a chat message without text', () => {
    expectRejected(withRecords([{ ...file.records[0], messages: [{ role: 'user' }] }]), /第 1 筆.*對話/);
  });

  it('rejects a record with an unreadable date', () => {
    expectRejected(withRecords([{ ...file.records[0], date: 'yesterday' }]), /第 1 筆.*日期/);
  });

  it('rejects a record that is not an object', () => {
    expectRejected(withRecords(['乾為天']), /第 1 筆/);
  });

  it('rejects a record whose chat is not a list', () => {
    expectRejected(withRecords([{ ...file.records[0], messages: 'hi' }]), /第 1 筆.*對話/);
  });

  it('leaves the journal untouched when storage is full', () => {
    const text = JSON.stringify(file);
    JournalService.clearHistory();
    localStorage.setItem(KEY, JSON.stringify([{ id: '1', date: at(2026, 1, 1).toISOString() }]));
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw Object.assign(new Error('quota'), { name: 'QuotaExceededError' });
    });

    expectRejected(text, /儲存空間不足/);
  });
});

describe('format versions', () => {
  it('runs each migration from the file version up to the current one', () => {
    buildJournal();
    const v1 = JournalService.serializeBackup();
    const migrations = {
      1: d => ({ ...d, version: 2, records: d.records.map(r => ({ ...r, migrated: true })) })
    };

    const records = JournalService.parseBackup(v1, { version: 2, migrations });

    expect(records).toHaveLength(4);
    expect(records.every(r => r.migrated)).toBe(true);
  });
});

describe('app.js escapes journal text before putting it into HTML (issue #3)', () => {
  // question and quickInsight can come from an imported file, so every ${...} that
  // outputs them must go through escapeHtml. Using them as a ternary condition is fine.
  const VALUE = /\b(?:\w+\.question|(?:\w+\.)?quickInsight)\b/g;

  /** Index just past the `}` that closes the `${` at `start`. */
  function closeOf(source, start) {
    let depth = 1, j = start + 2;
    while (j < source.length && depth) {
      if (source[j] === '{') depth++;
      else if (source[j] === '}') depth--;
      j++;
    }
    return j;
  }

  /** Every ${...} in the source, with nested ${...} blanked so each is checked once. */
  function interpolations(source) {
    const spans = [];
    for (let i = source.indexOf('${'); i !== -1; i = source.indexOf('${', i + 2)) {
      const inner = source.slice(i + 2, closeOf(source, i) - 1);
      let text = '';
      for (let k = 0; k < inner.length;) {
        if (inner.startsWith('${', k)) {
          const end = closeOf(inner, k);
          text += ' '.repeat(end - k);
          k = end;
        } else {
          text += inner[k++];
        }
      }
      spans.push({ line: source.slice(0, i).split('\n').length, text });
    }
    return spans;
  }

  it('never interpolates record.question or quickInsight without escapeHtml', () => {
    const source = fs.readFileSync(path.resolve(import.meta.dirname, '../src/app.js'), 'utf8');
    const unescaped = [];
    for (const { line, text } of interpolations(source)) {
      for (const m of text.matchAll(VALUE)) {
        const before = text.slice(0, m.index);
        const after = text.slice(m.index + m[0].length);
        const isCondition = /^\s*\?(?!\.)/.test(after);
        const isEscaped = /escapeHtml\([^()]*$/.test(before);
        if (!isCondition && !isEscaped) unescaped.push(`app.js:${line} ${m[0]}`);
      }
    }
    expect(unescaped).toEqual([]);
  });
});
