import { describe, expect, it } from 'bun:test';
import { part_a } from './a';
import { part_b } from './b';
import test_a from './test_a.txt';
import real_a from './real_a.txt';

describe('day 03', () => {
  it('part a - test', () => {
    expect(part_a(test_a)).toEqual(4361);
  });
  console.log('part a - real:', part_a(real_a));

  it('part b - test', () => {
    expect(part_b(test_a)).toEqual(467835);
  });
  console.log('part b - real:', part_b(real_a));
});
