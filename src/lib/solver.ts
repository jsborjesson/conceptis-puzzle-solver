export type Digit = number | undefined;

export const solve = (grid: Digit[][]): boolean[][] => {
  const solution: boolean[][] = generateGrid(grid.length, grid[0].length, () => false);

  return solution;
}

export const generateGrid = <T>(height: number, width: number, cell: () => T): T[][] => {
  const grid: T[][] = [];

  for (let row = 0; row < height; row += 1) {
    const cells: T[] = [];

    for (let col = 0; col < width; col += 1) {
      cells.push(cell());
    }

    grid.push(cells);
  }

  return grid;
}
