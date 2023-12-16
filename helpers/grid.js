export const addressToCoords = (address) =>
  address.split('_').map((el) => Number(el.split(':')[1]));

export const coordsToAddress = (coords) => `y:${coords[0]}_x:${coords[1]}`;

export const combineCoords = (coordA, coordB) => [
  coordA[0] + coordB[0],
  coordA[1] + coordB[1],
];

// TODO: This ought to also check right and bottom edges.
export const isNotOutOfBounds = (coord) => coord[0] >= 0 && coord[1] >= 0;
