import { createPuzzle } from "./solver";

const U = undefined;

export const tenByTen = createPuzzle([
  [U, 2, 3, U, U, 0, U, U, U, U],
  [U, U, U, U, 3, U, 2, U, U, 6],
  [U, U, 5, U, 5, 3, U, 5, 7, 4],
  [U, 4, U, 5, U, 5, U, 6, U, 3],
  [U, U, 4, U, 5, U, 6, U, U, 3],
  [U, U, U, 2, U, 5, U, U, U, U],
  [4, U, 1, U, U, U, 1, 1, U, U],
  [4, U, 1, U, U, U, 1, U, 4, U],
  [U, U, U, U, 6, U, U, U, U, 4],
  [U, 4, 4, U, U, U, U, 4, U, U],
]);

export const tenByFifteen = createPuzzle([
  [0, U, U, U, U, U, 5, 6, U, U],
  [U, 2, U, 3, U, U, U, 8, 9, U],
  [U, U, 3, U, 2, 2, U, 7, 8, 6],
  [0, U, U, 3, 2, U, 3, 4, U, 5],
  [U, 1, 2, U, U, 3, U, U, U, 3],
  [U, U, U, 5, 5, 5, U, U, U, U],
  [3, U, 3, 4, U, 4, 3, 4, 3, U],
  [4, U, 6, U, U, U, 6, U, U, U],
  [U, U, 5, 6, U, 5, 4, U, U, 1],
  [U, U, 6, 7, U, U, 5, U, U, U],
  [0, U, U, U, 5, 4, U, U, 0, U],
  [U, 0, U, 3, 4, U, U, U, U, U],
  [U, 0, U, U, 3, 3, 0, U, U, U],
  [U, U, U, U, 5, U, U, U, 0, U],
  [0, 1, U, U, U, 4, U, U, U, U],
]);

export const examples = [
  tenByTen,
  tenByFifteen,
];