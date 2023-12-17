import {
  addressToCoords,
  coordsToAddress,
  combineCoords,
  isNotOutOfBounds,
} from '../helpers/grid';

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

const isInside = (address) => {
  let [row, stepsFromLeft] = addressToCoords(address);
  stepsFromLeft--;
  let crossingsCount = 0;
  let ridingStart = null; // 7 || J

  while (stepsFromLeft > -1) {
    if (!visited[coordsToAddress([row, stepsFromLeft])]) {
      stepsFromLeft--;
      continue;
    }
    const curSymbol = cells[coordsToAddress([row, stepsFromLeft])].value;
    if (ridingStart) {
      if (
        (ridingStart === '7' && curSymbol === 'L') ||
        (ridingStart === 'J' && curSymbol === 'F')
      ) {
        ridingStart = null;
        crossingsCount++;
      } else if (
        (ridingStart === '7' && curSymbol === 'F') ||
        (ridingStart === 'J' && curSymbol === 'L')
      ) {
        ridingStart = null;
      }
    } else if (['7', 'J'].includes(curSymbol)) {
      ridingStart = curSymbol;
    }

    if (curSymbol === '|') {
      crossingsCount++;
    }
    stepsFromLeft--;
  }

  return crossingsCount % 2 !== 0;
};

export const part_b = (input) => {
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

  const startAddress = Object
    .entries(cells)
    .find((entry) => entry[1].value === 'S')[0];

  const interfacingCells = neighbours.S.filter((n) => {
    const neighbourCoord = combineCoords(n, addressToCoords(startAddress));
    const neighbourSymbol = cells[coordsToAddress(neighbourCoord)].value;
    return (n[0] === 1 && n[1] === 0 && ['|', 'J', 'L'].includes(neighbourSymbol))
    || (n[0] === -1 && n[1] === 0 && ['|', 'F', '7'].includes(neighbourSymbol))
    || (n[0] === 0 && n[1] === 1 && ['-', 'J', '7'].includes(neighbourSymbol))
    || (n[0] === 0 && n[1] === -1 && ['-', 'F', 'L'].includes(neighbourSymbol))

  }).map((dir) => JSON.stringify(dir));
  let startingSymbol;
  if (interfacingCells.includes('[1,0]')) {
    if (interfacingCells.includes('[0,1]')) startingSymbol = 'F';
    if (interfacingCells.includes('[0,-1]')) startingSymbol = '7';
    if (interfacingCells.includes('[-1,0]')) startingSymbol = '|';
  } else if (interfacingCells.includes('[-1,0]')) {
    if (interfacingCells.includes('[0,1]')) startingSymbol = 'L';
    if (interfacingCells.includes('[0,-1]')) startingSymbol = 'J';
  } else {
    startingSymbol = '-';
  }
  cells[startAddress].value = startingSymbol;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const curAddress = coordsToAddress([y, x]);
      if (!visited[curAddress] && isInside(curAddress)) {
        cells[curAddress].isInside = true;
      }
    }
  }

  return Object.values(cells).reduce((a, c) => (!!c.isInside ? 1 + a : a), 0);
};
