export const undefObj = { x: undefined, a: undefined, b: undefined };

export const splitIntoParts = (
  firstSeed,
  lastSeed,
  destStart,
  srcStart,
  rangeLength
) => {
  const lastSeedInMap = srcStart + rangeLength - 1;

  if (lastSeedInMap < firstSeed || srcStart > lastSeed) {
    return null;
  }

  if (srcStart <= firstSeed) {
    if (lastSeedInMap >= firstSeed) {
      if (lastSeedInMap < lastSeed) {
        return {
          x: {
            firstSeed: destStart,
            lastSeed: destStart + lastSeedInMap - firstSeed,
          },
          b: {
            firstSeed: lastSeedInMap + 1,
            lastSeed: lastSeed,
          },
        };
      }
      return {
        x: {
          firstSeed: destStart,
          lastSeed: destStart + lastSeed - firstSeed,
        },
      };
    }
  }

  if (srcStart > firstSeed) {
    if (lastSeedInMap >= lastSeed) {
      const chunkLength = lastSeed - srcStart;
      return {
        a: {
          firstSeed,
          lastSeed: srcStart - 1,
        },
        x: {
          firstSeed: destStart,
          lastSeed: destStart + chunkLength,
        },
      };
    }
    return {
      x: {
        firstSeed: destStart,
        lastSeed: destStart + rangeLength - 1,
      },
      a: {
        firstSeed,
        lastSeed: srcStart - 1,
      },
      b: {
        firstSeed: srcStart + rangeLength,
        lastSeed,
      },
    };
  }
};

export const part_b = (arr) => {
  let groupId = -1;

  const seedGroups = arr
    .split('\n')[0]
    .split(': ')[1]
    .split(' ')
    .map((s, i, arr) => {
      if (i % 2 === 0) {
        groupId++;
        return {
          groupId,
          firstSeed: Number(s),
          lastSeed: Number(s) + Number(arr[i + 1] - 1),
          nextBlockToCheck: 0,
        };
      }
    })
    .filter((s) => !!s);

  const blocks = arr
    .split('\n\n')
    .slice(1)
    .map((block, i) => {
      const blockIndex = i;
      const lines = block
        .split('\n')
        .slice(1)
        .map((line) => {
          const [destStart, srcStart, rangeLength] = line
            .split(' ')
            .map((el) => Number(el));
          return { destStart, srcStart, rangeLength };
        });
      return {
        blockIndex,
        lines,
      };
    });

  const queue = [...seedGroups];
  const results = [];
  // console.log('queue:', queue);

  while (queue.length) {
    let currentSeedGroup = queue.shift();

    const currentBlock = blocks[currentSeedGroup.nextBlockToCheck];

    if (currentSeedGroup.nextBlockToCheck === null) {
      results.push(currentSeedGroup);
      continue;
    }

    for (const [i, line] of currentBlock.lines.entries()) {
      // console.log(
      //   `-- groupId: ${currentSeedGroup.groupId} -- block: ${currentBlock.blockIndex} -- lineOfBlock: ${i} --`
      // );

      const isLastLineInBlock = i === currentBlock.lines.length - 1;
      const isLastBlock = currentBlock.blockIndex === blocks.length - 1;

      const res = splitIntoParts(
        currentSeedGroup.firstSeed,
        currentSeedGroup.lastSeed,
        line.destStart,
        line.srcStart,
        line.rangeLength
      );

      if (res) {
        if (res.a) {
          groupId++;
          queue.push({
            ...res.a,
            groupId,
            nextBlockToCheck: currentSeedGroup.nextBlockToCheck,
          });
        }
        if (res.b) {
          groupId++;
          queue.push({
            ...res.b,
            groupId,
            nextBlockToCheck: currentSeedGroup.nextBlockToCheck,
          });
        }
        if (res.x) {
          groupId++;
          queue.push({
            ...res.x,
            groupId,
            nextBlockToCheck: isLastBlock
              ? null
              : currentSeedGroup.nextBlockToCheck + 1,
          });
        }
      }

      if (isLastLineInBlock && !isLastBlock) {
        const updatedSeedGroup = {
          ...currentSeedGroup,
          nextBlockToCheck: currentBlock.blockIndex + 1,
        };
        queue.push(updatedSeedGroup);
        continue;
      }
    }
  }

  console.log('results:', results);
};
