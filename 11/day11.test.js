import { describe, expect, it } from 'bun:test';
import { part_a } from './a';
import { part_b } from './b';
import test from './test.txt';
import real from './real.txt';

describe('day 11', () => {
  it('part a - test', () => {
    expect(part_a(test)).toEqual(374);
  });
  // console.log('part a - real:', part_a(real));

  it('part b - test', () => {
    expect(part_b(test, 100)).toEqual(8410);
  });
  // console.log('part b - real:', part_b(real));
});
