const dict = {
  red: 12,
  green: 13,
  blue: 14,
};

const isValid = (line) => {
  const showings = line.split(': ')[1].split('; ');
  const anyInvalids = showings.find((showing) => {
    const parts = showing.split(', ');
    let isInvalid = false;
    parts.forEach((part) => {
      const [qty, colour] = part.split(' ');
      if (qty > dict[colour]) {
        isInvalid = true;
      }
    });
    return isInvalid;
  });
  return !anyInvalids;
};

export const part_a = (lines) =>
  lines.reduce((p, c, i) => (isValid(c) ? p + i + 1 : p), 0);
