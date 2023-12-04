export const part_a = (arr) =>
  arr
    .map((line) => {
      const [winning, inHand] = line
        .split(': ')[1]
        .split(' | ')
        .map((numLists) =>
          numLists
            .split(' ')
            .filter((el) => el !== '')
            .map((el) => Number(el))
        );

      const count = winning.reduce(
        (a, c) => (inHand.includes(c) ? a + 1 : a),
        0
      );

      return count ? 2 ** (count - 1) : 0;
    })
    .reduce((a, c) => a + c, 0);
