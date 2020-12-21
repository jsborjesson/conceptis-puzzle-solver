export type Digit = number | undefined;

interface Position {
  row: number;
  col: number;
}

interface Size {
  height: number;
  width: number;
}

type Puzzle = Square[][];

interface Square {
  number: number;
  fill: Color;
}

enum Color {
  Filled,
  Crossed,
  Unfilled,
}

export const blankPuzzle = (height: number, width: number): Puzzle => {
  const puzzle: Puzzle = generateGrid(width, height, () => ({ number: undefined, fill: Color.Unfilled }));
  return puzzle;
};

export const createPuzzle = (grid: number[][]): Puzzle => {
  const { width, height } = size(grid);
  const puzzle: Puzzle = generateGrid(width, height, ({ row, col }) => ({ number: grid[row][col], fill: Color.Unfilled }));
  return puzzle;
};

export const solve = (puzzle: Puzzle): boolean => {
  const { height, width } = size(puzzle);

  for (let row = 0; row < height; row += 1) {
    for (let col = 0; col < width; col += 1) {
      solveSquare(puzzle, { row, col });
    }
  }
};

export const solveSquare = (puzzle: Puzzle, pos: Position): void => {
  const square = puzzle[pos.row][pos.col];

  if (square.number === undefined) {
    return;
  }

  const neighbors = neighborIndices(puzzle, pos);
  const { filled, unfilled } = count(puzzle, neighbors);
  const toBeFilled = square.number - filled;

  if (toBeFilled === unfilled) {
    fill(puzzle, Color.Filled, neighbors);
  }

  if (toBeFilled === 0) {
    fill(puzzle, Color.Crossed, neighbors);
  }
};

const count = (puzzle: Puzzle, squares: Position[]): { filled: number, unfilled: number, crossed: number } => {
  const result = {
    filled: 0,
    unfilled: 0,
    crossed: 0,
  }

  squares.forEach(({ row, col }) => {
    switch (puzzle[row][col].fill) {
      case Color.Filled:
        result.filled++;
        break;

      case Color.Crossed:
        result.crossed++;
        break;

      case Color.Unfilled:
        result.unfilled++;
        break;
    }
  });

  return result;
};

export const generateGrid = <T>(height: number, width: number, cell: (pos: Position) => T): T[][] => {
  const grid: T[][] = [];

  for (let row = 0; row < height; row += 1) {
    const cells: T[] = [];

    for (let col = 0; col < width; col += 1) {
      cells.push(cell({ row, col }));
    }

    grid.push(cells);
  }

  return grid;
}

const fill = (puzzle: Puzzle, color: Color, squares: Position[]): void => {
  squares.forEach(({ row, col }) => {
    if (puzzle[row][col].fill === Color.Unfilled) {
      puzzle[row][col].fill = color;
    }
  });
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
