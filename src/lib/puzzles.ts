export type Puzzle = Square[][];

export interface Square {
  number: number | undefined;
  fill: Color;
}

export type Color = "filled" | "crossed" | "empty";


// Generate an empty puzzle with the given size
export const blankPuzzle = (height: number, width: number): Puzzle => {
  const puzzle: Puzzle = [];

  for (let row = 0; row < height; row += 1) {
    const cells: Square[] = [];

    for (let col = 0; col < width; col += 1) {
      cells.push({ number: undefined, fill: "empty" });
    }

    puzzle.push(cells);
  }

  return puzzle;
};

// Create a Puzzle type from a grid of numbers
export const createPuzzle = (grid: number[][]): Puzzle => {
  return grid.map((rows) => {
    return rows.map((number) => ({ number, fill: "empty" }));
  });
};

const U = undefined;

export const examples: { [name: string]: Puzzle } = {
  "Basic 10x10": createPuzzle([
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
  ]),

  "Basic 10x15": createPuzzle([
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
  ]),

  "Advanced 5x5": createPuzzle([
      [0, U, 4, 4, U],
      [U, 4, U, 6, U],
      [3, U, 7, 6, U],
      [U, 6, U, 6, 5],
      [U, U, U, U, 3],
    ]),

  "Advanced 10x10": createPuzzle([
    [U, U, 3, 3, U, U, U, U, U, U],
    [3, U, U, U, U, U, 0, U, 0, U],
    [U, U, 3, 4, U, 3, U, U, U, U],
    [3, U, 4, U, U, U, U, 3, U, U],
    [2, 3, U, 5, U, 4, 4, U, U, 4],
    [U, U, 5, 4, 6, 6, U, 4, U, 4],
    [U, U, U, U, U, 3, 3, U, U, 4],
    [U, 3, U, U, 5, 6, 5, U, U, 4],
    [U, U, U, 7, U, U, U, 7, U, 5],
    [U, 4, U, U, 6, U, 6, U, 5, U],
  ]),
};
