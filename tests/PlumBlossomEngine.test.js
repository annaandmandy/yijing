import { describe, it, expect } from 'vitest';
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
