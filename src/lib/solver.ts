export type Puzzle = Square[][];

interface Position {
  row: number;
  col: number;
}

interface Size {
  height: number;
  width: number;
}


interface Square {
  number: number | undefined;
  fill: Color;
}

type Color = "filled" | "crossed" | "empty";

// Generate an empty puzzle with the given size
export const blankPuzzle = (height: number, width: number): Puzzle => {
  return generateGrid(
    { height, width },
    () => ({ number: undefined, fill: "empty" })
  );
};

// Create a Puzzle type from a grid of numbers
export const createPuzzle = (grid: number[][]): Puzzle => {
  return generateGrid(
    size(grid),
    ({ row, col }) => ({ number: grid[row][col], fill: "empty" })
  );
};

/*
* Makes a single pass over the entire puzzle, filling in all basic clues.
*
* Returns a copy of the solution, or undefined if no progress was made.
* It does not alter the parameter.
*/
export const solveStep = (puzzle: Puzzle): Puzzle | undefined => {
  const { height, width } = size(puzzle);
  const solution = deepCopy(puzzle);

  let progress = false;

  for (let row = 0; row < height; row += 1) {
    for (let col = 0; col < width; col += 1) {
      const solved = solveSquare(solution, { row, col });

      if (solved) {
        progress = true;
      }
    }
  }

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
    return fill(puzzle, "filled", neighbors);
  }

  if (toBeFilled === 0) {
    return fill(puzzle, "crossed", neighbors);
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

const generateGrid = <T>(size: Size, createSquare: (pos: Position) => T): T[][] => {
  const grid: T[][] = [];

  for (let row = 0; row < size.height; row += 1) {
    const cells: T[] = [];

    for (let col = 0; col < size.width; col += 1) {
      cells.push(createSquare({ row, col }));
    }

    grid.push(cells);
  }

  return grid;
}

const fill = (puzzle: Puzzle, color: Color, squares: Position[]): boolean => {
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

  const { width, height } = size(puzzle);

  const result: Position[] = [];

  offsets.forEach(([offsetRow, offsetCol]) => {
    const [row, col] = [pos.row + offsetRow, pos.col + offsetCol];

    if (row >= 0 && row < height && col >= 0 && col < width) {
      result.push({ row, col });
    }
  });

  return result;
};

const size = <T>(grid: T[][]): Size => {
  return {
    height: grid.length,
    width: grid[0]?.length || 0,
  }
};

const deepCopy = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
