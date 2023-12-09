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

export const part_b = (input) => {
  const [time, recordDist] = input.split('\n').map((line) =>
    Number(
      line
        .split(' ')
        .filter((el) => el)
        .slice(1)
        .join('')
    )
  );

  return numberOfWaysToWin(time, recordDist);
};
