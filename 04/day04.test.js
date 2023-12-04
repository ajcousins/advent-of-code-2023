import { describe, expect, it } from 'bun:test';
import { fileTextToArr } from '../helpers';
import { part_a } from './a';
import { part_b } from './b';
import test_a from './test_a.txt';
import real_a from './real_a.txt';

describe('day 04', () => {
  it('part a - test', () => {
    expect(part_a(fileTextToArr(test_a))).toEqual(13);
  });
  console.log('part a - real:', part_a(fileTextToArr(real_a)));

  it('part b - test', () => {
    expect(part_b(fileTextToArr(test_a))).toEqual(30);
  });
  console.log('part b - real:', part_b(fileTextToArr(real_a)));
});
