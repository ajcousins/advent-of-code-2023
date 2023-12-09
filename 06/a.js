const numberOfWaysToWin = (time, recordDist) => {
  let chargeTime = time;
  let winningTimes = 0;

  while (chargeTime > 0) {
    const timeRemaining = time - chargeTime;
    const curRaceDist = chargeTime * timeRemaining;
    if (curRaceDist > recordDist) winningTimes++;
    chargeTime--;
  }
  return winningTimes;
};

export const part_a = (input) => {
  const data = input.split('\n').map((line) =>
    line
      .split(' ')
      .filter((el) => el)
      .slice(1)
      .map((el) => Number(el))
  );

  return data[0]
    .map((time, i) => numberOfWaysToWin(time, data[1][i]))
    .reduce((a, c) => a * c, 1);
};
