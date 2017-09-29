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


```
interface Coords {
  x: number,
  y: number
}
```

```
// m - width of grid
// n - height of grid
// p - number of mines

class Game(m: number, n: number, p: number)
- _generateMines(m: number, n: number, p: number): Coords[]
- _generateAnswer(m: number, n: number, mines: Coords[]): Grid
- answer: Grid
- uncoverCell(c: Coords): boolean
- flagCell(c: Coords): boolean
- getCellDisplay(c: Coords): CellDisplay
```

```
class GridGenerator()
- generate(m: number, n: number, mines: Coords[]): Grid
- _calculateCellValues(m: number, n: number, mines: Coords[]): CellValue[][]
```


```
class Grid(states: CellState[][], values: CellValue[][])
- getCellValue(c: Coords): CellValue
- getCellState(c: Coords): CellState
- setCellState(c: Coords, state: CellState)
```

```

type CellDisplay = 'FLAG' | 'COVERED' | CellValue

type CellValue = 'MINE' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

enum CellState {
  0: "covered",
  1: "swept",  
  2: "flagged"
}
```
