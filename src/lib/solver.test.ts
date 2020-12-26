import { blankPuzzle, createPuzzle, solveStep } from "./solver";

const U = undefined;
const F = "filled";
const X = "crossed";
const E = "empty";

describe("blankPuzzle", () => {
  test("returns a grid of requested size", () => {
    const p = blankPuzzle(2, 3);

    expect(p.length).toEqual(2);
    expect(p[0].length).toEqual(3);
    expect(p[1].length).toEqual(3);
  });

  test("all squares empty", () => {
    const p = blankPuzzle(2, 3);

    p.forEach(row => {
      row.forEach(square => {
        expect(square.fill).toEqual("empty");
      });
    });
  });

  test("all squares empty", () => {
    const p = blankPuzzle(2, 3);

    p.forEach(rows => {
      rows.forEach(square => {
        expect(square.number).toBeUndefined();
      });
    });
  });
});

describe("createPuzzle", () => {
  test("returns a puzzle with the given numbers", () => {
    const grid = [
      [U, 2, 3],
      [U, U, U],
      [7, U, 9],
    ];
    const p = createPuzzle(grid);

    p.forEach((rows, row) => {
      rows.forEach((square, col) => {
        expect(square.number).toEqual(grid[row][col]);
      });
    });
  });

  test("returns an empty puzzle", () => {
    const p = createPuzzle([
      [U, 2, 3],
      [U, U, U],
      [7, U, 9],
    ]);

    p.forEach((rows) => {
      rows.forEach((square) => {
        expect(square.fill).toEqual("empty");
      });
    });
  });
});

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
});
