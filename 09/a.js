export const part_a = (input) => {
  const arrOfNums = input
    .split('\n')
    .map((ln) => ln.split(' ').map((el) => Number(el)));

  return arrOfNums
    .map((arr) => {
      let currentLevel = [...arr];
      let isAllZero;
      const lastNums = [arr[arr.length - 1]];
      while (!isAllZero) {
        const arrOfDiffs = currentLevel
          .map((num, i, arr) => arr[i + 1] - num)
          .filter((num) => !isNaN(num));
        lastNums.push(arrOfDiffs[arrOfDiffs.length - 1]);
        currentLevel = arrOfDiffs;
        isAllZero = arrOfDiffs.every((diff) => diff === 0);
      }

      return lastNums.reduce((a, c) => a + c);
    })
    .reduce((a, c) => a + c);
};
