const cellsToCheck = [];
const groupStarts = {};

const isAsterik = (char) => char.match(/\*/);

const isCellOutOfBounds = (y, x, arr) =>
  y > arr.length || y < 0 || x > arr[0].length || x < 0;

const checkNeighbours = (y, x, arr) => {
  for (let ySub = -1; ySub < 2; ySub++) {
    for (let xSub = -1; xSub < 2; xSub++) {
      if (
        (xSub === 0 && ySub === 0) ||
        y + ySub >= arr.length ||
        x + xSub >= arr[0].length
      )
        continue;
      const cell = arr[y + ySub][x + xSub];

      if (!isNaN(cell)) {
        cellsToCheck.push({
          cellCheck: `y:${y + ySub}_x:${x + xSub}`,
          asterikOrigin: `y:${y}_x:${x}`,
        });
      }
    }
  }
};

const checkGroup = (y, x, arr, origin) => {
  let cursorX = x;
  let isNotStartOfGroup = true;
  while (cursorX > 0 && cursorX < arr[0].length - 1 && isNotStartOfGroup) {
    if (y > arr.length) break;
    if (isNaN(arr[y][cursorX - 1])) {
      isNotStartOfGroup = false;
      break;
    }
    cursorX--;
  }
  groupStarts[`y:${y}_x:${cursorX}`] = {
    val: 0,
    origin,
  };
};

const coordsFromAddress = (cellAddress) =>
  cellAddress
    .split('_')
    .map((str) => str.split(':')[1])
    .map((i) => Number(i));

const getPartNumsFromAddress = (address, arr) => {
  const [y, x] = coordsFromAddress(address.checkStart);
  let cursorX = x;
  let isLastDigit = false;
  let digit = [];
  while (!isLastDigit) {
    if (isCellOutOfBounds(y, cursorX, arr)) continue;
    if (isNaN(arr[y][cursorX + 1])) {
      isLastDigit = true;
    }
    digit.push(arr[y][cursorX]);
    cursorX++;
  }
  return {
    ...address,
    val: Number(digit.join('')),
  };
};

export const get2dArr = (input) =>
  input.split('\n').map((line) => line.split(''));

export const part_b = (grid) => {
  const arr = grid.split('\n').map((line) => line.split(''));
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[0].length; col++) {
      if (isAsterik(arr[row][col])) {
        checkNeighbours(row, col, arr);
      }
    }
  }
  cellsToCheck.forEach((cell) => {
    const [y, x] = coordsFromAddress(cell.cellCheck);
    checkGroup(y, x, arr, cell.asterikOrigin);
  });

  const filteredGroupStarts = Object.entries(groupStarts)
    .filter((start, i, arr) => {
      const [_, curVal] = start;
      const count = arr.reduce((acc, cur) => {
        const [_, val] = cur;
        return val.origin === curVal.origin ? acc + 1 : acc;
      }, 0);

      return count === 2;
    })
    .map((start) => {
      const [address, val] = start;
      return { checkStart: address, origin: val.origin };
    });

  return filteredGroupStarts
    .map((address) => getPartNumsFromAddress(address, arr))
    .sort((a, b) => (a.origin < b.origin ? -1 : 1))
    .reduce(
      (acc, cur, i, arr) =>
        i % 2 === 0 ? acc + cur.val * arr[i + 1].val : acc,
      0
    );
};
