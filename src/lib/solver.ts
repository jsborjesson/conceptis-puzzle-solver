import { deepCopy, difference } from "./utils";
import { Puzzle, Square, Color } from "./puzzles";

interface Position {
  row: number;
  col: number;
}

/*
* Returns a copy of the given puzzle a step closer to the solution (without
* touching the original) or undefined if no progress could be made.
*/
export const solveStep = (puzzle: Puzzle): Puzzle | undefined => {
  const solution = deepCopy(puzzle);
  const basicProgress = solveStepBasic(solution);

  if (basicProgress) {
    return solution;
  }

  const advancedProgress = solveStepAdvanced(solution);
  if (advancedProgress) {
    return solution;
  }

  return undefined;
};


/*
* Solves all visible basic clues of a puzzle.
*/
export const solveStepBasic = (puzzle: Puzzle): boolean => {
  let progress = false;

  puzzle.forEach((rows, row) =>  {
    rows.forEach((square, col) => {
      const solved = solveSquareBasic(puzzle, square, { row, col });

      if (solved) {
        progress = true;
      }
    })
  });

  return progress;
};

const solveSquareBasic = (puzzle: Puzzle, square: Square, pos: Position): boolean => {
  if (square.number === undefined) {
    return false;
  }

  const neighbors = squaresAround(puzzle, pos);
  const { filled, empty } = count(puzzle, neighbors);
  const toBeFilled = square.number - filled;

  if (toBeFilled === empty) {
    return fill(puzzle, neighbors, "filled");
  }

  if (toBeFilled === 0) {
    return fill(puzzle, neighbors, "crossed");
  }

  return false;
};

const solveStepAdvanced = (puzzle: Puzzle): boolean => {
  for (let row = 0; row < puzzle.length; row += 1) {
    for (let col = 0; col < puzzle[0].length; col += 1) {

      const neighbors = squaresAround(puzzle, { row, col });

      // For each pair of numbered squares which share neighbors, check if the
      // number of squares that **must** be filled in their shared squares lets us
      // fill in the non-shared squares.
      for (let aPos of neighbors) {
        const a = puzzle[aPos.row][aPos.col];

        if (a.number === undefined) {
          continue;
        }

        for (let bPos of neighbors) {
          if (aPos === bPos) {
            continue;
          }

          const b = puzzle[bPos.row][bPos.col];

          // Assume that a > b from here on, no need to check twice
          if (b.number === undefined || b.number > a.number) {
            continue;
          }

          const progress = solveSquaresAdvanced(puzzle, a, b, aPos, bPos);

          if (progress) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

// Considers a pair of squares
const solveSquaresAdvanced = (puzzle: Puzzle, a: Square, b: Square, aPos: Position, bPos: Position): boolean => {
  const neighborsOfA = squaresAround(puzzle, aPos);
  const neighborsOfB = squaresAround(puzzle, bPos);

  // Non-shared neighbors
  const aPrime = difference(neighborsOfA, neighborsOfB);
  const bPrime = difference(neighborsOfB, neighborsOfA);

  const { filled: aPrimeFilled, empty: aPrimeEmpty } = count(puzzle, aPrime);
  const { filled: bPrimeFilled } = count(puzzle, bPrime);

  // The minimum filled squares in the middle assuming that
  // all non-shared neighbors of A have been filled
  const minCommon = a.number - aPrimeFilled - aPrimeEmpty;

  // The maximum filled squares in the middle assuming that
  // we place as many filled squares as B allows there
  const maxCommon = b.number - bPrimeFilled;

  if (minCommon === maxCommon) {
    const aProg = fill(puzzle, aPrime, "filled");
    const bProg = fill(puzzle, bPrime, "crossed");

    return aProg || bProg;
  }
};

// Counts the number of squares filled/empty/crossed
const count = (puzzle: Puzzle, squares: Position[]): { filled: number, empty: number, crossed: number } => {
  const result = {
    filled: 0,
    empty: 0,
    crossed: 0,
  }

  squares.forEach(({ row, col }) => {
    result[puzzle[row][col].fill] += 1;
  });

  return result;
};

// Fills all empty squares given with a color, returns whether anything was filled.
const fill = (puzzle: Puzzle, squares: Position[], color: Color): boolean => {
  let progress = false;

  squares.forEach(({ row, col }) => {
    if (puzzle[row][col].fill === "empty") {
      puzzle[row][col].fill = color;
      progress = true;
    }
  });

  return progress;
};

// Returns the index pairs of the 4-9 available neighbors (including self) in a grid.
const squaresAround = (puzzle: Puzzle, pos: Position): Position[] => {
  const result: Position[] = [];
  const height = puzzle.length;
  const width = puzzle[0].length;

  const offsets = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 0], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  offsets.forEach(([offsetRow, offsetCol]) => {
    const p = { row: pos.row + offsetRow, col: pos.col + offsetCol };

    if (p.row >= 0 && p.row < height && p.col >= 0 && p.col < width) {
      result.push(p);
    }
  });

  return result;
};
