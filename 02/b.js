const getPowerSum = (line) => {
  const dict = {
    blue: 0,
    red: 0,
    green: 0,
  };

  line
    .split(': ')[1]
    .split('; ')
    .forEach((show) => {
      show.split(', ').forEach((col) => {
        const [qty, colour] = col.split(' ');
        dict[colour] = Math.max(dict[colour], qty);
      });
    });

  return Object.values(dict).reduce((p, c) => p * c);
};

export const part_b = (lines) => lines.reduce((p, c) => getPowerSum(c) + p, 0);
