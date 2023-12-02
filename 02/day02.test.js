import { describe, expect, it } from 'bun:test';
import { fileTextToArr } from '../helpers';
import { part_a } from './a';
import { part_b } from './b';
import test_a from './test_a.txt';
import real_a from './real_a.txt';
import test_b from './test_b.txt';
import real_b from './real_b.txt';

describe('day 02', () => {
  it('part a - test', () => {
    expect(part_a(fileTextToArr(test_a))).toEqual(8);
  });
  console.log('part a - real:', part_a(fileTextToArr(real_a)));

  it('part b - test', () => {
    expect(part_b(fileTextToArr(test_b))).toEqual(2286);
  });
  console.log('part b - real:', part_b(fileTextToArr(real_b)));
});
