export const decToBin = (dec) => (dec >>> 0).toString(2);
export const binToDec = (bin) => Number(parseInt(bin, 2).toString(10));