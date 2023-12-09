export const part_a = (arr) => {
  const seeds = arr
    .split('\n')[0]
    .split(': ')[1]
    .split(' ')
    .map((s) => Number(s));

  let blockIndex = 0;

  const mapDef = arr
    .split('\n')
    .slice(1)
    .filter((line) => !isNaN(line.charAt(0)))
    .map((line) => {
      if (line === '') {
        blockIndex++;
        return;
      }
      const [destinationStart, sourceStart, rangeLength] = line
        .split(' ')
        .map((el) => Number(el));
      return { destinationStart, sourceStart, rangeLength, blockIndex };
    })
    .filter((el) => !!el);

  const mapped = seeds.map((seed) => {
    let seedCursor = seed;
    let lastBlock = 0;

    for (const line of mapDef) {
      if (lastBlock === line.blockIndex) continue;
      if (
        seedCursor >= line.sourceStart &&
        seedCursor <= line.sourceStart + line.rangeLength
      ) {
        const difference = seedCursor - line.sourceStart;
        seedCursor = line.destinationStart + difference;
        lastBlock = line.blockIndex;
      }
    }
    return seedCursor;
  });

  return Math.min(...mapped);
};
