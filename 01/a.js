export const part_a = (arr) => {
  return arr
    .map((ln) => ln.match(/\d/g).join(''))
    .reduce((p, c) => p + Number(c.charAt(0) + c.charAt(c.length - 1)), 0);
};
