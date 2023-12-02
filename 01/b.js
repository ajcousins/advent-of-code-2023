const sp = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const lineToNumber = (ln) => {
  let fwdCheck = ln;
  let first;
  while (fwdCheck.length && !first) {
    if (fwdCheck[0].match(/\d/)) {
      first = fwdCheck[0];
      break;
    }
    const nums = Object.keys(sp);
    nums.forEach((num) => {
      const st = fwdCheck.slice(0, num.length);
      if (!first && st === num) {
        first = sp[st].toString();
      }
    });

    if (first) break;
    fwdCheck = fwdCheck.slice(1);
  }

  let revCheck = ln;
  let last;
  while (revCheck.length && !last) {
    if (revCheck[revCheck.length - 1].match(/\d/)) {
      last = revCheck[revCheck.length - 1];
      break;
    }

    const nums = Object.keys(sp);
    nums.forEach((num) => {
      const ed = revCheck.slice(revCheck.length - num.length);
      if (!last && ed === num) {
        last = sp[ed].toString();
      }
    });
    if (last) break;
    revCheck = revCheck.slice(0, -1);
  }
  return Number(`${first}${last}`);
};

export const part_b = (arr) => {
  return arr.map(lineToNumber).reduce((p, c) => p + c, 0);
};
