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
}

export const createPuzzle = (grid: number[][]): Puzzle => {
  const { width, height } = size(grid);
  const puzzle: Puzzle = generateGrid(width, height, ({ row, col }) => ({ number: grid[row][col], fill: Color.Unfilled }));
  return puzzle;
}

export const solve = (puzzle: Puzzle): Puzzle => {
  const n = neighbors(puzzle, { row: 1, col: 2 });
  fill(puzzle, Color.Filled, n);
  const n2 = neighbors(puzzle, { row: 2, col: 3 });
  fill(puzzle, Color.Crossed, n2);
  return puzzle;
}

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
  console.log(puzzle);
};

// Returns the index pairs of the 4-9 available neighbors (including self) in a grid.
const neighbors = (puzzle: Puzzle, pos: Position): Position[] => {
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
}
