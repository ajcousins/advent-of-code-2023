import { describe, expect, it } from 'bun:test';
import { fileTextToArr } from '../helpers';
import { part_a } from './a';
import { part_b } from './b';
import test_a from './test_a.txt';
import real_a from './real_a.txt';

describe('day 07', () => {
  it('part a - test', () => {
    expect(part_a(test_a)).toEqual(6440);
  });
  console.log('part a - real:', part_a(real_a));

  it('part b - test', () => {
    expect(part_b(test_a)).toEqual(5905);
  });
  console.log('part b - real:', part_b(real_a));
});
