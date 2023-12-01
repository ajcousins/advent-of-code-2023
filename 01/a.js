import data from './real_a.txt'
const arr = data.split('\n');

const res = arr
  .map(ln => ln.match(/\d/g).join(''))
  .reduce((p, c) => p + Number(c.charAt(0) + c.charAt(c.length - 1)), 0)

console.log("res:", res);
