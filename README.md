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

Game Public Properties
- num of cells wide
- num of cells high
- num of mines in grid
- num of flags remaining
- uncoverCell()
- flagCell()


```js


class Game {

  get width(): number;
  get height(): number;
  get numMines(): number;
  get flagsRemaining(): number;
  get display(): CellDisplay[][];

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

  // outputs a string that depicts the game as it appears to the user
  toString(): string;

  // returns a value to help determine what the current "player view" is
  getCell(x: number, y: number): CellDisplay;
}
```


```
// Cell Display is what is visible to the user
// 'M' - Mine / Triggered Mine
// 'F' - Flag
// 'O'- Covered
// '1-8' - Uncovered with a value
//  'X'- Uncovered without a value
type CellDisplay = 'M' | 'F' |

type CellValue = 'M' | [0-8]

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
