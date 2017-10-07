# Minesweeper
A re-creation of the classic game on the web
Draft: 9/28/17 - Dillon

---

## Abstract
High-level ideas about the Minesweeper game

### Rules
- `m` width of grid
- `n` height of grid
- `p` number of mines
- (m x n) grid of cells
- p number of mines
  - less than (m x n)
- *GOAL:* uncover the entire grid, without uncovering a mine

### Setup
1. a grid is created with (`m` x `n`) dimensions, seeded with `p` mines
  - `p < m*n`
1. mines are randomly assigned coordinates on the grid
1. player is allotted `f` number of "flags" to assist in marking mines
  - `f === p`

### Gameplay
1. user clicks on a covered cell
  - if cell is a "mine":
    - *GAME OVER*
  - else: "uncover" the cell
    1. figure out how many adjacent cells are mines `a`
      - if `a` = 0:
        - "uncover" each of the current cell's covered neighbors (recursive?)
      - if `a` > 0:
        - "mark" cell with the value `a`
    1. test how many covered cells are remaining `r`
      - if `r` === `p` (no more non-mine cells remain)
        - *WIN*
1. user right-clicks a covered cell
  - if `f` > 0:
    - covered cell is "flagged"
    - number of flags is decremented by 1
1. user right-clicks a "flagged" cell
  - cell is "unflagged" and remains covered
  - number of flags is incremented by 1
1. user clicks an uncovered cell
  - *NOOP*
1. user right-clicks an uncovered cell
  - *NOOP*
---

## Implementation
I'd like to use React here.

It seems like there would be some sort of `Game` object that has properties
that can be reflected in the React App. I think that the `Game` object should
be able to run on its own (unit tests)


```js
interface Coords {
  x: number,
  y: number
}
```

```js
class Game {

  // m - width of grid
  // n - height of grid
  // p - number of mines
  Game(m: number, n: number, p: number);

  // grid generator instance
  _generator: GridGenerator;

  // grid instance
  _grid: Grid;

  // generates a Grid that maintains state of the mine grid
  _generateAnswer(m: number, n: number, mines: Coords[]): Grid;

  // uncovers a cell at a set of coordinates
  //  - updates the grid accordingly
  //  - getCellDisplay() will return different values
  //  - should increment the number of flags available after uncovering a flagged cell
  uncoverCell(c: Coords): boolean;

  // flags a cell as a possible mine
  //  - should flag the cell at c if it is unflagged
  //  - should unflag the cell at c if it is flagged
  //  - should do nothing if the cell at C is uncovered
  flagCell(c: Coords): boolean;

  // returns a value to help determine what the current "player view" is
  getCellDisplay(c: Coords): CellDisplay;
}
```


```js
class Grid {

  Grid(states: CellState[][], values: CellValue[][]): Grid;

  // returns the "answer" for a given cell
  //  - 'MINE' denotes a mine
  //  - any other value can be parsed into a number equalling the number of adjacent mines
  getCellValue(c: Coords): CellValue;

  // returns the state for a given cell
  getCellState(c: Coords): CellState;

  // sets the state for a given cell
  setCellState(c: Coords, state: CellState)

  // returns true if cell at c is flagged
  isCellFlagged(c: Coords): boolean

  // returns true if cell at c is covered
  isCellCovered(c: Coords): boolean

  // returns true if cell at c is a mine
  isCellMine(c: Coords): boolean

  // generates a new Grid
  static generate(m: number, n: number, p: number): Grid

  // generates an array of coordinates representing where mines are on an (m x n) grid
  //  - should throw error if (p >= m*n)
  //  - should return unique coordinates
  //    -  no two coords should have same x and y value
  //  - should return an array of length equal to p
  static generateMines(m: number, n: number, p: number): Coords[];

  _generateCoords(m: number, n: number, exclude: Coord[]): Coords

  // calculates the number of adjacent mines for all non-mine cells
  //  - should correctly label
  _calculateCellValues(m: number, n: number, mines: Coords[]): CellValue[][]
}

```

```

type CellDisplay = 'FLAG' | 'COVERED' | CellValue

type CellValue = 'M' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

//  - 0: cell has been uncovered or "swept"
//  - 1: cell is covered
//  - 2: cell is covered, has been flagged as a potential mine
enum CellState {
  0: "covered",
  1: "swept",  
  2: "flagged"
}
```










```js
class GraphicalGridGenerator {

  GraphicalGridGenerator(): GraphicalGridGenerator;

  // generates a Grid given an (m x n) size array
  // NOTE: any expression that evaluates to 'true' in grid will generate a mine
  generate(graphic: any[][]): Grid;
}
```
