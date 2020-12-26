import { deepCopy } from "./utils";
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
    return undefined;
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
