const hash = {};
let directionString;

const getStepCount = (dirArr, currentKey, count = 0) => {
  const isTargetNode = currentKey.charAt(2) === 'Z'
  if (isTargetNode) return count;
  if (dirArr.length === 0) dirArr = directionString.split('');
  const currentDir = dirArr.shift();
  const nextKey = hash[currentKey][currentDir]
  return getStepCount(dirArr, nextKey, count + 1);
}

export const part_b = (input) => {
  directionString = input.split('\n\n')[0];
  input
    .split('\n\n')[1]
    .split('\n')
    .forEach((line) => {
      const [key, L, R] = line.match(/\w{3}/g);
      hash[key] = { L, R };
    });
  const startingNodes = Object.keys(hash).filter(node => node.charAt(2) === 'A')
  
  const countsToFirstZ = startingNodes.map(node => getStepCount(directionString.split(''), node))

  console.log("countsToFirstZ:", countsToFirstZ);
  
  /**
   * Need the common lowest multiple from this range.
   * https://www.calculatorsoup.com/calculators/math/lcm.php
   */

};
