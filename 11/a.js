import { addressToCoords } from '../helpers/grid';

const galaxies = {};
const pairs = [];

export const part_a = (input) => {
  let grid = input.split('\n').map((line) => line.split(''));

  // expand rows
  for (let y = 0; y < grid.length; y++) {
    if (!grid[y].includes('#')) {
      const rowCopy = [...grid[y]];
      grid.splice(y, 0, rowCopy);
      y++;
    }
  }

  // expand columns
  for (let x = 0; x < grid[0].length; x++) {
    let columnIsClear = true;
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] === '#') {
        columnIsClear = false;
      }
    }
    if (columnIsClear) {
      grid = grid.map((row) => row.toSpliced(x, 0, '.'));
      x++;
    }
  }

  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === '#') {
        galaxies[count] = { address: `y:${y}_x:${x}` };
        count++;
      }
    }
  }

  // initiate pairs
  Object.values(galaxies).forEach((galaxy, i) => {
    let idx = i + 1;
    while (idx < Object.values(galaxies).length) {
      pairs.push({ addresses: [galaxy.address, galaxies[idx].address] });
      idx++;
    }
  });

  return pairs
    .map((pair) => {
      const [a, b] = pair.addresses.map((addr) => addressToCoords(addr));
      const yDist = Math.abs(a[0] - b[0]);
      const xDist = Math.abs(a[1] - b[1]);
      return yDist + xDist;
    })
    .reduce((acc, cur) => acc + cur, 0);
};
