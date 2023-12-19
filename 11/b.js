import { addressToCoords } from '../helpers/grid';
import real from './real.txt';

const LARGE_DISTANCE = 1_000_000;

const galaxies = [];
const expansionsY = [];
const expansionsX = [];
const pairs = [];

export const part_b = (input, largeDistance = LARGE_DISTANCE) => {
  const grid = input.split('\n').map((line) => line.split(''));

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === '#') {
        galaxies.push({ address: `y:${y}_x:${x}` });
      }
    }
  }

  // rows
  for (let y = 0; y < grid.length; y++) {
    if (!grid[y].includes('#')) {
      expansionsY.push(y);
    }
  }

  // columns
  for (let x = 0; x < grid[0].length; x++) {
    let columnIsClear = true;
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] === '#') {
        columnIsClear = false;
      }
    }
    if (columnIsClear) {
      expansionsX.push(x);
    }
  }

  galaxies.forEach((galaxy, i) => {
    let idx = i + 1;
    while (idx < galaxies.length) {
      pairs.push({ addresses: [galaxy.address, galaxies[idx].address] });
      idx++;
    }
  });

  return pairs
    .map((pair) => {
      const [a, b] = pair.addresses.map((addr) => addressToCoords(addr));
      const crossingsY = expansionsY.reduce((acc, y) => {
        const [start, end] = [Number(a[0]), Number(b[0])].sort((a, b) => a - b);
        return y > start && y < end ? acc + 1 : acc;
      }, 0);

      const crossingsX = expansionsX.reduce((acc, x) => {
        const [start, end] = [Number(a[1]), Number(b[1])].sort((a, b) => a - b);
        return x > start && x < end ? acc + 1 : acc;
      }, 0);

      const yDist = Math.abs(a[0] - b[0]) + crossingsY * (largeDistance - 1);
      const xDist = Math.abs(a[1] - b[1]) + crossingsX * (largeDistance - 1);
      return yDist + xDist;
    })
    .reduce((acc, cur) => acc + cur, 0);
};
