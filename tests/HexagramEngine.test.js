import { describe, it, expect } from 'vitest';
import { HexagramEngine } from '../src/engine/HexagramEngine.js';
import { loadLibrary } from './library.js';

const library = loadLibrary();
const byBinary = (binary) => library.find(h => h.binary === binary);
const flip = (b) => b.replace(/[01]/g, c => (c === '1' ? '0' : '1'));
const reverse = (b) => b.split('').reverse().join('');

describe('calculateHexagram: line values', () => {
  it('all 7s (young yang) are stable yang', () => {
    expect(HexagramEngine.calculateHexagram([7, 7, 7, 7, 7, 7])).toEqual({
      originalBinary: '111111', futureBinary: '111111', changingLines: [], hasChange: false
    });
  });

  it('all 8s (young yin) are stable yin', () => {
    expect(HexagramEngine.calculateHexagram([8, 8, 8, 8, 8, 8])).toEqual({
      originalBinary: '000000', futureBinary: '000000', changingLines: [], hasChange: false
    });
  });

  it('all 9s (old yang) change to yin', () => {
    expect(HexagramEngine.calculateHexagram([9, 9, 9, 9, 9, 9])).toEqual({
      originalBinary: '111111', futureBinary: '000000', changingLines: [1, 2, 3, 4, 5, 6], hasChange: true
    });
  });

  it('all 6s (old yin) change to yang', () => {
    expect(HexagramEngine.calculateHexagram([6, 6, 6, 6, 6, 6])).toEqual({
      originalBinary: '000000', futureBinary: '111111', changingLines: [1, 2, 3, 4, 5, 6], hasChange: true
    });
  });

  it.each([
    [6, '0', '1', true],
    [7, '1', '1', false],
    [8, '0', '0', false],
    [9, '1', '0', true]
  ])('line value %i -> original %s, future %s, changing %s', (value, orig, fut, changing) => {
    const r = HexagramEngine.calculateHexagram([value, 7, 7, 7, 7, 7]);
    expect(r.originalBinary[0]).toBe(orig);
    expect(r.futureBinary[0]).toBe(fut);
    expect(r.changingLines.includes(1)).toBe(changing);
    expect(r.hasChange).toBe(changing);
  });
});

describe('calculateHexagram: changing lines and ordering', () => {
  it('reports 1-based changing lines, bottom to top', () => {
    expect(HexagramEngine.calculateHexagram([6, 7, 8, 9, 7, 8])).toEqual({
      originalBinary: '010110', futureBinary: '110010', changingLines: [1, 4], hasChange: true
    });
  });

  it('handles a change on the top line only', () => {
    const r = HexagramEngine.calculateHexagram([7, 7, 7, 7, 7, 9]);
    expect(r.changingLines).toEqual([6]);
    expect(r.futureBinary).toBe('111110');
  });

  it('writes the first toss as the leftmost (bottom) bit', () => {
    expect(HexagramEngine.calculateHexagram([9, 8, 8, 8, 8, 8]).originalBinary).toBe('100000');
    expect(HexagramEngine.calculateHexagram([8, 8, 8, 8, 8, 9]).originalBinary).toBe('000001');
  });
});

describe('calculateHexagram: errors', () => {
  it('requires exactly 6 tosses', () => {
    expect(() => HexagramEngine.calculateHexagram([7, 7, 7, 7, 7])).toThrow('6 tosses are required');
    expect(() => HexagramEngine.calculateHexagram([7, 7, 7, 7, 7, 7, 7])).toThrow('6 tosses are required');
  });

  it.each([5, 10])('rejects coin sum %i', (sum) => {
    expect(() => HexagramEngine.calculateHexagram([sum, 7, 7, 7, 7, 7])).toThrow('Invalid coin sum');
  });
});

describe('binary-to-hexagram mapping (public/yi_data_enhanced)', () => {
  it('has 64 hexagrams with ids 1-64 and unique 6-bit binaries', () => {
    expect(library).toHaveLength(64);
    library.forEach((h, i) => {
      expect(h.id).toBe(i + 1);
      expect(h.binary).toMatch(/^[01]{6}$/);
    });
    expect(new Set(library.map(h => h.binary)).size).toBe(64);
  });

  it.each([
    [1, '乾', '111111'],
    [2, '坤', '000000'],
    [3, '屯', '100010'],
    [4, '蒙', '010001'],
    [11, '泰', '111000'],
    [12, '否', '000111'],
    [49, '革', '101110'],
    [63, '既濟', '101010'],
    [64, '未濟', '010101']
  ])('hexagram %i %s is %s (bottom to top)', (id, name, binary) => {
    expect(library[id - 1].name).toBe(name);
    expect(library[id - 1].binary).toBe(binary);
  });

  it('follows King Wen pairing: each even hexagram inverts (or, if symmetric, flips) the odd one', () => {
    for (let i = 0; i < 64; i += 2) {
      const odd = library[i].binary;
      const expected = reverse(odd) === odd ? flip(odd) : reverse(odd);
      expect(library[i + 1].binary, `pair ${i + 1}/${i + 2}`).toBe(expected);
    }
  });

  it('findHexagramIdByBinary looks up ids', () => {
    expect(HexagramEngine.findHexagramIdByBinary('111111', library)).toBe(1);
    expect(HexagramEngine.findHexagramIdByBinary('101110', library)).toBe(49);
    expect(HexagramEngine.findHexagramIdByBinary('1111111', library)).toBeNull();
    expect(HexagramEngine.findHexagramIdByBinary('111111')).toBeNull();
  });

  it('maps coin tosses end to end to named hexagrams', () => {
    expect(byBinary(HexagramEngine.calculateHexagram([7, 7, 7, 8, 8, 8]).originalBinary).id).toBe(11);

    const r = HexagramEngine.calculateHexagram([9, 9, 9, 6, 6, 6]);
    expect(byBinary(r.originalBinary).name).toBe('泰');
    expect(byBinary(r.futureBinary).name).toBe('否');
  });
});

describe('getRelatedHexagrams', () => {
  it('derives nuclear, inverted and opposite of 革', () => {
    const r = HexagramEngine.getRelatedHexagrams('101110');
    expect(r).toEqual({ nuclearBinary: '011111', invertedBinary: '011101', oppositeBinary: '010001' });
    expect(byBinary(r.nuclearBinary).id).toBe(44);
    expect(byBinary(r.invertedBinary).id).toBe(50);
    expect(byBinary(r.oppositeBinary).id).toBe(4);
  });

  it('乾 is its own nuclear and inverse, and opposes 坤', () => {
    expect(HexagramEngine.getRelatedHexagrams('111111')).toEqual({
      nuclearBinary: '111111', invertedBinary: '111111', oppositeBinary: '000000'
    });
  });
});

describe('getRelation (六親)', () => {
  it.each([
    ['金', '兄弟'], ['水', '子孫'], ['木', '妻財'], ['火', '官鬼'], ['土', '父母']
  ])('金 palace with %s line is %s', (line, relation) => {
    expect(HexagramEngine.getRelation('金', line)).toBe(relation);
  });

  it.each([
    ['木', '金', '官鬼'], ['水', '火', '妻財'], ['火', '土', '子孫'], ['土', '火', '父母']
  ])('%s palace with %s line is %s', (palace, line, relation) => {
    expect(HexagramEngine.getRelation(palace, line)).toBe(relation);
  });

  it('returns 未知 for unknown elements', () => {
    expect(HexagramEngine.getRelation('金', '?')).toBe('未知');
    expect(HexagramEngine.getRelation('?', '金')).toBe('未知');
  });
});

describe('getSixBeasts (六神)', () => {
  it('starts at 青龍 on 甲 days, bottom to top', () => {
    expect(HexagramEngine.getSixBeasts('甲')).toEqual(['青龍', '朱雀', '勾陳', '騰蛇', '白虎', '玄武']);
  });

  it.each([
    ['丙', '朱雀'], ['戊', '勾陳'], ['己', '騰蛇'], ['庚', '白虎'], ['壬', '玄武']
  ])('starts %s days at %s', (stem, first) => {
    expect(HexagramEngine.getSixBeasts(stem)[0]).toBe(first);
  });

  it('wraps around after 玄武', () => {
    expect(HexagramEngine.getSixBeasts('壬')[1]).toBe('青龍');
  });
});
