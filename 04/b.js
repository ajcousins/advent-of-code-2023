export const part_b = (arr) => {
  const cards = arr.map((line, i) => {
    const [winning, inHand] = line
      .split(': ')[1]
      .split(' | ')
      .map((numLists) =>
        numLists
          .split(' ')
          .filter((el) => el !== '')
          .map((el) => Number(el))
      );
    return { cardNumber: i + 1, winning, inHand, qty: 1 };
  });

  cards.forEach((card, i) => {
    let count = card.winning.reduce(
      (a, c) => (card.inHand.includes(c) ? a + 1 : a),
      0
    );

    while (count > 0) {
      cards[i + count].qty += card.qty;
      count -= 1;
    }
  });

  return cards.reduce((a, c) => a + c.qty, 0);
};
