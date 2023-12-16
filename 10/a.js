import {
  addressToCoords,
  coordsToAddress,
  combineCoords,
  isNotOutOfBounds
} from '../helpers/grid'

const cells = {};
const visited = {};
const neighbours = {
  'S': [[1, 0], [-1, 0], [0, 1], [0, -1]],
  'F': [[1, 0], [0, 1]],
  '-': [[0, 1], [0, -1]],
  '7': [[1, 0], [0, -1]],
  '|': [[1, 0], [-1, 0]],
  'L': [[0, 1], [-1, 0]],
  'J': [[0, -1], [-1, 0]],
  '.': [],
};
const queue = [];

export const part_a = (input) => {
  const grid = input.split('\n').map((line) => line.split(''));

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      cells[coordsToAddress([y, x])] = {
        value: grid[y][x],
        dist: grid[y][x] === 'S' ? 0 : undefined,
      };

      if (grid[y][x] === 'S') {
        queue.push(`y:${y}_x:${x}`);
      }
    }
  }

  while (queue.length) {
    const current = queue.shift();
    const cellValue = cells[current].value;
    const curCoords = addressToCoords(current);
    const toCheck = neighbours[cellValue]
      .map((coord) => combineCoords(coord, curCoords))
      .filter(isNotOutOfBounds);

    const isValid = toCheck.some((coord) => !!visited[coordsToAddress(coord)]);
    if (!isValid && cellValue !== 'S') continue;

    toCheck.forEach((check) => {
      const checkAddress = coordsToAddress(check);
      if (!visited[checkAddress]) {
        queue.push(checkAddress);
      } else {
        cells[current].dist = cells[checkAddress].dist + 1;
      }
    });
    visited[current] = true;
  }

  return Object.values(cells)
    .filter((obj) => obj.dist)
    .sort((a, b) => (a.dist > b.dist ? -1 : 1))[0].dist;
};
