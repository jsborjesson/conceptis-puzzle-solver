import { deepCopy, difference } from "./utils";
import { Puzzle, Color } from "./puzzles";

interface Position {
  row: number;
  col: number;
}

/*
* Makes a single pass over the entire puzzle, filling in all basic clues.
*
* Returns a copy of the solution, or undefined if no progress was made.
* It does not alter the parameter.
*/
export const solveStep = (puzzle: Puzzle): Puzzle | undefined => {
  const solution = deepCopy(puzzle);
  let progress = false;

  solution.forEach((rows, row) =>  {
    rows.forEach((_, col) => {
      const solved = solveSquare(solution, { row, col });

      if (solved) {
        progress = true;
      }
    })
  });

  if (!progress) {
    return solveStepAdvanced(puzzle);
  }

  return solution;
};

const solveSquare = (puzzle: Puzzle, pos: Position): boolean => {
  const square = puzzle[pos.row][pos.col];

  if (square.number === undefined) {
    return false;
  }

  const neighbors = neighborIndices(puzzle, pos);
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

const solveStepAdvanced = (puzzle: Puzzle): Puzzle | undefined => {
  const solution = deepCopy(puzzle);
  let progress = false;

  solution.forEach((rows, row) =>  {
    rows.forEach((_, col) => {
      const neighbors = neighborIndices(solution, { row, col });
      const numberedNeighbors = neighbors.filter(({ row, col }) => solution[row][col].number !== undefined);

      // forEachPair
      for (let aPos of numberedNeighbors) {
        for (let bPos of numberedNeighbors) {
          if (aPos === bPos) {
            continue;
          }

          const a = solution[aPos.row][aPos.col];
          const b = solution[bPos.row][bPos.col];

          const neighborsOfA = neighborIndices(solution, aPos);
          const neighborsOfB = neighborIndices(solution, bPos);

          const aPrime = difference(neighborsOfA, neighborsOfB);
          const bPrime = difference(neighborsOfB, neighborsOfA);

          const { filled: aF, empty: aE } = count(solution, aPrime);
          const { filled: bF } = count(solution, bPrime);

          const minCommon = a.number - aF - aE;
          const maxCommon = b.number - bF;

          if (minCommon === maxCommon) {
            const aProg = fill(solution, aPrime, "filled");
            const bProg = fill(solution, bPrime, "crossed");
            if (!progress) {
              progress = aProg || bProg;
            }
          }
        }
      }
    })
  });

  if (progress) {
    return solution;
  }
  return undefined;
}

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
const neighborIndices = (puzzle: Puzzle, pos: Position): Position[] => {
  const offsets = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 0], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  const result: Position[] = [];

  offsets.forEach(([offsetRow, offsetCol]) => {
    const [row, col] = [pos.row + offsetRow, pos.col + offsetCol];

    if (row >= 0 && row < puzzle.length && col >= 0 && col < puzzle[row].length) {
      result.push({ row, col });
    }
  });

  return result;
};
