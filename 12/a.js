import { decToBin } from '../helpers/binary';

const getBinaries = (binLength, freeBits) => {
  const binsToCheck = [];
  let count = 0;
  while (count < 2 ** binLength) {
    let binString = decToBin(count);
    while (binString.length !== binLength) {
      binString = `0${binString}`;
    }
    const matches = binString.match(/1/g)?.length ?? 0;
    if (matches === freeBits) {
      binsToCheck.push(binString);
    }
    count++;
  }
  return binsToCheck;
};

const getCombosToCheck = (line) => {
  const [state, report, expected] = line.split(' ');
  const brokenCount = state.match(/\#/g)?.length ?? 0;
  const unknownCount = state.match(/\?/g)?.length ?? 0;
  const totalUnits = report
    .split(',')
    .reduce((acc, cur) => Number(cur) + acc, 0);
  const freeUnits = totalUnits - brokenCount;

  return {
    query: state,
    report,
    expected,
    combos: getBinaries(unknownCount, freeUnits),
  };
};

const isValid = (report, combo) => {
  const reportArr = report
    .split(',')
    .map((val) => Number(val))
    .join(',');
  const comboArr = combo
    .split('.')
    .filter((val) => val !== '')
    .map((chunk) => chunk.length)
    .join(',');
  return reportArr === comboArr;
};

export const part_a = (input) => {
  const lines = input.split('\n');
  const allCombos = lines.map((line) => getCombosToCheck(line));

  return allCombos
    .map(
      (combos) =>
        combos.combos
          .map((c) => {
            let pattern = combos.query.split('');
            let cursor = 0;
            for (let i = 0; i < pattern.length; i++) {
              if (pattern[i] === '?') {
                pattern[i] = c.charAt(cursor) === '1' ? '#' : '.';
                cursor++;
              }
            }
            return pattern.join('');
          })
          .filter((c) => isValid(combos.report, c)).length
    )
    .reduce((acc, cur) => acc + cur, 0);
};
