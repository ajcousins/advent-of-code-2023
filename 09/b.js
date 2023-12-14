export const part_b = (input) => {
  const arrOfNums = input
    .split('\n')
    .map((ln) => ln.split(' ').map((el) => Number(el)));

  return arrOfNums
    .map((arr) => {
      let currentLevel = arr;
      let isAllZero;
      const firstNums = [arr[0]];
      while (!isAllZero) {
        const arrOfDiffs = currentLevel
          .map((num, i, arr) => num - arr[i + 1])
          .filter((num) => !isNaN(num));
        firstNums.push(arrOfDiffs[0]);
        currentLevel = arrOfDiffs;
        isAllZero = arrOfDiffs.every((diff) => diff === 0);
      }
      return firstNums.reduce((a, c) => a + c);
    })
    .reduce((a, c) => a + c);
};
