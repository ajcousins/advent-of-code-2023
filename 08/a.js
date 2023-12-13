const hash = {};
let directionString;

const getStepCount = (dirArr, currentKey, targetKey, count = 0) => {
  if (currentKey === targetKey) return count;
  if (dirArr.length === 0) dirArr = directionString.split('');
  const currentDir = dirArr.shift();
  const nextKey = hash[currentKey][currentDir];

  return getStepCount(dirArr, nextKey, targetKey, count + 1);
};

export const part_a = (input) => {
  directionString = input.split('\n\n')[0];
  input
    .split('\n\n')[1]
    .split('\n')
    .map((line) => {
      const [key, L, R] = line.match(/\w{3}/g);
      hash[key] = { L, R };
    });

  return getStepCount(directionString.split(''), 'AAA', 'ZZZ');
};
