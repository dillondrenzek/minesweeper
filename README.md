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

### Game

#### Properties
- **static** generate(c: GameConfig)
- **static** isValidGameConfig(c: GameConfig)
- **static** isValidGameState(s: GameState)
- new(GameState)
- uncover(x, y)
- flag(x, y)
- getDisplay(): Grid<CellDisplay>

#### Requirements

1. is constructed with a GameState object


  - should have a `width`
  - should have a `height`
  1. has a grid with display information for each cell
    - should be initialized `Covered` for each cell

1. validates `GameState`
  1. INVALID IF
    - `states.height !== values.height || states.width !== values.width`

1. validates `GameConfig`
  1. INVALID IF
    - `numMines > width * height`

1. allows user to uncover cells
  1. when the cell is already uncovered
    - should not update display grid
  1. when not uncovering mine:
    - should uncover appropriate cells
    - should update display grid
  1. when uncovering mine:
    - should set all states to `Uncovered`
    - should set triggered mine to `Triggered` state
    - should keep all flags as `Flagged`
    - should update display grid
    - should throw error(?) on mine

1. allows user to flag cells
  - should keep a count of remaining flags
  1. when a cell is not yet flagged:
    - should set cell state to `Flagged`
    - should decrement count of remaining flags
  1. when a cell is already flagged:
    - should set cell state to `Covered`
    - should increment count of remaining flags
  1. when a cell is uncovered:
    - should not throw
    - should not update display grid
    - should not change count of remaining flags

1. can be output as a string
  1. when provided an item separator and row separator
    - should separate the rows with the row separator
    - should separate the items with the item separator
    - should output the correct cell display values


---

### Grid

#### Requirements

1. is constructed with a two-dimensional array of rows
  - should all be the same length
  - should have a width equal to the length of a row
  - should have a height equal to the length of the array of rows

1. can get the value of a cell
  1. given an (x, y) within the bounds of the grid
    - should return the correct value
  1. given an (x, y) outside the bounds of the grid
    - should throw an error

1. can set the value of a cell
  1. given an (x, y) within the bounds of the grid
    - should set the value of the cell at (x, y) to the given value
  1. given an (x, y) outside the bounds of the grid
    - should throw an error

1. can be output as a string
  1. when provided an item separator and row separator
    - should separate the rows with the row separator
    - should separate the items with the item separator
    - should output the correct values

1. can be mapped to another grid
  1. given a function
    - should return a new grid
    - should return a grid with the same width
    - should return a grid with the same height
    - should return a grid with the correct values

#### Properties
- **static** generate(width: number, height: number, val: T)
- **static** equal(a: Grid, b: Grid): boolean
- **static** validMatrix(arr: T[][]): boolean
- new(T[][])
- toString(rowSeparator: string, itemSeparator: string)
- get width(): number
- get height(): number
- get(x, y)
- set(x, y, val)
- map((item, i, j, arr_i, arr_j) => Grid<any>)

---


GameConfig:
- width: number
- height: number
- mines: number | {x,y}[]

GameState:
- values: Grid<CellValue>
- states: Grid<CellState>

CellValue:
- 'M' | [0-8]

CellState:
- `Covered`
- `Uncovered`
- `Flagged`
- `Triggered`

CellDisplay:
- (CellValue | CellState) = (state === Uncovered) ? value : state;
- values:
  ```js
  'M' // Mine
  'X' // Triggered Mine
  'F' // Flag
  'O'// Covered
  '[1-8]' // Uncovered with a value
  '-' // Uncovered without a value
  ```
