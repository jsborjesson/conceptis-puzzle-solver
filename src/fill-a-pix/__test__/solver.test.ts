import { createPuzzle } from "../puzzles";
import { solveStep } from "../solver";

const U = undefined;
const F = "filled";
const X = "crossed";
const E = "empty";

describe("solveStep", () => {
  test("does not alter input puzzle", () => {
    const p = createPuzzle([
      [U, 2, 3],
      [U, U, U],
      [7, U, 4],
    ]);
    solveStep(p);

    p.forEach((rows) => {
      rows.forEach((square) => {
        expect(square.fill).toEqual("empty");
      });
    });
  });

  test("returns undefined when no progress was made", () => {
    const p = createPuzzle([
      [U, U, 4],
      [U, U, U],
      [U, U, 2],
    ]);
    const s1 = solveStep(p);
    const s2 = solveStep(s1);

    expect(s2).toBeUndefined();
  });

  test("solves basic clues", () => {
    const p = createPuzzle([
      [U, U, 4],
      [U, U, U],
      [U, U, 2],
    ]);
    const s = solveStep(p);

    const expected = [
      [E, F, F],
      [E, F, F],
      [E, X, X],
    ];

    s.forEach((rows, row) => {
      rows.forEach((square, col) => {
        expect(square.fill).toEqual(expected[row][col]);
      });
    });
  });

  test("solves advanced clues", () => {
    const p = createPuzzle([
      [0, U, 4, 4, U],
      [U, 4, U, 6, U],
      [3, U, 7, 6, U],
      [U, 6, U, 6, 5],
      [U, U, U, U, 3],
    ]);
    const basicStep = solveStep(p);
    const advancedStep = solveStep(basicStep);

    const expected = [
      [X, X, F, F, X],
      [X, X, F, F, X],
      [E, E, E, F, F], // These 2 filled based on the 3 below the 5
      [E, E, E, E, E],
      [E, E, E, E, E],
    ];

    advancedStep.forEach((rows, row) => {
      rows.forEach((square, col) => {
        expect(square.fill).toEqual(expected[row][col]);
      });
    });
  });

  test("solves advanced equal neighbors", () => {
    const p = createPuzzle([
      [U, U, U],
      [U, 5, U],
      [U, 5, U],
    ]);
    const s = solveStep(p);

    const expected = [
      [X, X, X],
      [E, E, E],
      [E, E, E],
    ];

    s.forEach((rows, row) => {
      rows.forEach((square, col) => {
        expect(square.fill).toEqual(expected[row][col]);
      });
    });
  });

  test("solves advanced neighbors", () => {
    const p = createPuzzle([
      [U, U, U, U],
      [U, 1, 4, U],
      [U, U, U, U],
    ]);
    const s = solveStep(p);

    const expected = [
      [X, E, E, F],
      [X, E, E, F],
      [X, E, E, F],
    ];

    s.forEach((rows, row) => {
      rows.forEach((square, col) => {
        expect(square.fill).toEqual(expected[row][col]);
      });
    });
  });

  test("solves advanced neighbors with filled neighbors", () => {
    const p = createPuzzle([
      [U, U, U, U],
      [U, 1, 3, U],
      [U, U, U, U],
    ]);
    p[1][3].fill = "crossed"

    const s = solveStep(p);

    const expected = [
      [X, E, E, F],
      [X, E, E, X],
      [X, E, E, F],
    ];

    s.forEach((rows, row) => {
      rows.forEach((square, col) => {
        expect(square.fill).toEqual(expected[row][col]);
      });
    });
  });
});
