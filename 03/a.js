const cellsToCheck = [];
const groupStarts = {};

const isSymbol = (char) => !char.match(/\d|\./);

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
        cellsToCheck.push(`y:${y + ySub}_x:${x + xSub}`);
      }
    }
  }
};

const checkGroup = (y, x, arr) => {
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
  groupStarts[`y:${y}_x:${cursorX}`] = 0;
};

const coordsFromAddress = (cellAddress) =>
  cellAddress
    .split('_')
    .map((str) => str.split(':')[1])
    .map((i) => Number(i));

const getPartNumsFromAddress = (address, arr) => {
  const [y, x] = coordsFromAddress(address);
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
  return Number(digit.join(''));
};

export const get2dArr = (input) => input.split('\n').map((line) => line.split(''));

export const part_a = (grid) => {
  const arr = grid.split('\n').map((line) => line.split(''));
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[0].length; col++) {
      if (isSymbol(arr[row][col])) {
        checkNeighbours(row, col, arr);
      }
    }
  }
  cellsToCheck.forEach((cell) => {
    const [y, x] = coordsFromAddress(cell);
    checkGroup(y, x, arr);
  });

  return Object.keys(groupStarts)
    .map((address) => getPartNumsFromAddress(address, arr))
    .reduce((acc, cur) => acc + cur, 0);
};
