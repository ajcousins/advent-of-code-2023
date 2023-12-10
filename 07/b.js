const cardStrength = [
  'J', '2', '3', '4', '5',
  '6', '7', '8', '9', 'T',
  'Q', 'K', 'A',
];

const compareEachCard = (cardStrA, cardStrB) => {
  const cardsArrA = cardStrA.split('');
  const cardsArrB = cardStrB.split('');
  for (let i = 0; i < 5; i++) {
    if (cardStrength.indexOf(cardsArrA[i]) < cardStrength.indexOf(cardsArrB[i]))
      return 1;
    if (cardStrength.indexOf(cardsArrA[i]) > cardStrength.indexOf(cardsArrB[i]))
      return -1;
  }
  return 0;
};

const getJokerHandStrength = (hand) => cardStrength
  .reduce((highestStrength, card) => {
    const candidateHand = hand.replaceAll('J', card);
    const strength = getHandStrength(candidateHand);
    return strength > highestStrength ? strength : highestStrength
  }, 0)

const getHandStrength = (hand) => {
  const hash = {};
  const cards = hand.split('');
  cards.forEach((card) => {
    if (hash[card]) {
      hash[card].count = hash[card].count + 1;
    } else {
      hash[card] = { count: 1 };
    }
  });
  const counts = Object.values(hash)
    .map((c) => c.count)
    .sort((a, b) => (a < b ? 1 : -1));
  if (counts[0] === 5) return 6;                    // five of a kind
  if (counts[0] === 4) return 5;                    // four of a kind
  if (counts[0] === 3 && counts[1] === 2) return 4; // full-house
  if (counts[0] === 3) return 3;                    // three of a kind
  if (counts[0] === 2 && counts[1] === 2) return 2; // two pair
  if (counts[0] === 2) return 1;                    // pair
  return 0;                                         // high card
};

const compareHands = (a, b) => {
  if (a.strength < b.strength) return 1;
  if (a.strength > b.strength) return -1;
  return compareEachCard(a.hand, b.hand);
};

export const part_b = (input) =>
  input
    .split('\n')
    .map((ln) => {
      const [hand, bid] = ln.split(' ');
      return {
        hand,
        bid: Number(bid),
        strength: hand.includes('J')
          ? getJokerHandStrength(hand)
          : getHandStrength(hand),
      };
    })
    .sort(compareHands)
    .reduce((a, c, i, arr) => {
      const numberOfHands = arr.length;
      const rank = numberOfHands - i;
      return a + c.bid * rank;
    }, 0);
