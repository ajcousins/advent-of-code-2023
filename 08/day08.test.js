import { describe, expect, it } from 'bun:test';
import { fileTextToArr } from '../helpers';
import { part_a } from './a';
import { part_b } from './b';
import test from './test.txt';
import real from './real.txt';

describe('day 08', () => {
  // it('part a - test', () => {
  //   expect(part_a(test)).toEqual(2);
  // });
  // console.log('part a - real:', part_a(real));

  it('part b - test', () => {
    expect(part_b(test)).toEqual(5905);
  });
  // console.log('part b - real:', part_b(real));
});
