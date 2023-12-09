import { describe, expect, it } from 'bun:test';
import { fileTextToArr } from '../helpers';
import { part_a } from './a';
import { part_b, splitIntoParts } from './b';
import test_a from './test_a.txt';
import real_a from './real_a.txt';
import { undefObj } from './b';

describe('day 05', () => {
  // it('part a - test', () => {
  //   expect(part_a(test_a)).toEqual(35);
  // });
  // console.log('part a - real:', part_a(real_a));
  it('part b - test', () => {
    expect(part_b(test_a)).toEqual(0);
  });
  // console.log('part b - real:', part_a(real_a));
});
/*
describe('splitIntoParts', () => {
  it('01', () => {
    expect(splitIntoParts(4, 6, 10, 0, 3)).toEqual(undefObj);
  });
  it('02', () => {
    expect(splitIntoParts(4, 6, 10, 2, 2)).toEqual(undefObj);
  });
  it('03', () => {
    expect(splitIntoParts(4, 6, 10, 2, 3)).toEqual({
      x: {
        firstSeed: 10,
        lastSeed: 10,
      },
      b: {
        firstSeed: 5,
        lastSeed: 6,
      },
    });
  });
  it('04', () => {
    expect(splitIntoParts(4, 6, 10, 2, 5)).toEqual({
      x: {
        firstSeed: 10,
        lastSeed: 12,
      },
    });
  });
  it('05', () => {
    expect(splitIntoParts(4, 6, 10, 2, 6)).toEqual({
      x: {
        firstSeed: 10,
        lastSeed: 12,
      },
    });
  });
  it('06', () => {
    expect(splitIntoParts(4, 6, 10, 4, 4)).toEqual({
      x: {
        firstSeed: 10,
        lastSeed: 12,
      },
    });
  });
  it('07', () => {
    expect(splitIntoParts(4, 6, 10, 6, 3)).toEqual({
      x: {
        firstSeed: 10,
        lastSeed: 10,
      },
      a: {
        firstSeed: 4,
        lastSeed: 5,
      },
    });
  });
  it('08', () => {
    expect(splitIntoParts(4, 6, 10, 7, 2)).toEqual(undefObj);
  });
  it('09', () => {
    expect(splitIntoParts(4, 6, 10, 5, 1)).toEqual({
      x: {
        firstSeed: 10,
        lastSeed: 10,
      },
      a: {
        firstSeed: 4,
        lastSeed: 4,
      },
      b: {
        firstSeed: 6,
        lastSeed: 6,
      },
    });
  });
  it('10', () => {
    expect(splitIntoParts(40, 69, 80, 0, 30)).toEqual(undefObj);
  });
  it('11', () => {
    expect(splitIntoParts(40, 69, 80, 10, 30)).toEqual(undefObj);
  });
  it('12', () => {
    expect(splitIntoParts(40, 69, 80, 10, 40)).toEqual({
      x: {
        firstSeed: 80,
        lastSeed: 89,
      },
      b: {
        firstSeed: 50,
        lastSeed: 69,
      },
    });
  });
  it('12', () => {
    expect(splitIntoParts(40, 69, 80, 10, 60)).toEqual({
      x: {
        firstSeed: 80,
        lastSeed: 109,
      },
    });
  });
  it('13', () => {
    expect(splitIntoParts(40, 69, 80, 10, 70)).toEqual({
      x: {
        firstSeed: 80,
        lastSeed: 109,
      },
    });
  });
  it('14', () => {
    expect(splitIntoParts(40, 69, 80, 40, 40)).toEqual({
      x: {
        firstSeed: 80,
        lastSeed: 109,
      },
    });
  });
  it('15', () => {
    expect(splitIntoParts(40, 69, 80, 60, 40)).toEqual({
      x: {
        firstSeed: 80,
        lastSeed: 89,
      },
      a: {
        firstSeed: 40,
        lastSeed: 59,
      },
    });
  });
  it('16', () => {
    expect(splitIntoParts(40, 69, 80, 70, 30)).toEqual(undefObj);
  });
  it('17', () => {
    expect(splitIntoParts(40, 69, 80, 50, 10)).toEqual({
      x: {
        firstSeed: 80,
        lastSeed: 89,
      },
      a: {
        firstSeed: 40,
        lastSeed: 49,
      },
      b: {
        firstSeed: 60,
        lastSeed: 69,
      },
    });
  });
});
*/