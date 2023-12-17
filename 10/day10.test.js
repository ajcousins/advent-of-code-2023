import { describe, expect, it } from 'bun:test';
import { part_a } from './a';
import { part_b } from './b';
import test from './test.txt';
import test_b1 from './test_b1.txt';
import real from './real.txt';

describe('day 10', () => {
  it('part a - test', () => {
    expect(part_a(test)).toEqual(4);
  });
  // console.log('part a - real:', part_a(real));

  it('part b - test', () => {
    expect(part_b(test_b1)).toEqual(4);
  });
  // console.log('part b - real:', part_b(real));
});
