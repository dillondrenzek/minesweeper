const {Grid, seedMatrix} = require('./Grid');
const {Coords} = require('./Coords');

const MINE = 'M';

const CellDisplay = {
  Covered: 'O',
  Flagged: 'F',
  Uncovered: '-',
  Mine: 'M',
  Triggered: 'X',
  value: (x) => x.toString()
}

const CellState = {
  Covered: 'O',
  Uncovered: '-',
  Flagged: 'F',
  Triggered: 'X'
}

// @return { CellDisplay }
const getCellDisplay = (val, state) => {
  if (state === CellState.Uncovered) {
    if (val === MINE)
      return CellDisplay.Mine;
    if (val === 0)
      return CellDisplay.Uncovered;
    else
      return CellDisplay.value(val);
  } else {
    if (state === CellState.Flagged)
      return CellDisplay.Flagged;
    if (state === CellState.Covered)
      return CellDisplay.Covered;
    if (state === CellState.Triggered)
      return CellDisplay.Triggered;
    else
      return CellDisplay.value(val);
  }
}

// Calculates a value for each cell equal to the number
// of mines are immediately adjacent to each cell
// @param {width, height} size - size of the cell matrix
// @param {Coords[]} mines - an array of coordinate locaitons
//                           for each mine

const calculateCellValues = (size, mines) => {
  let values = seedMatrix(size, 0);

  // determines if cell at (x,y) should be marked as a mine
  const shouldBeMine = (x, y) => {
    return mines.find((e) => (e.x === x && e.y === y));
  };

  // for each mine, increment its adjacent non-mine cells
  for (let mine of mines) {

    // increment each cell around the mine
    for(let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let i2 = mine.y + i;
        let j2 = mine.x + j;

        if (!(i === 0 && j === 0)) {
          // skip any coordinates
          //  - that have negative coords
          //  - that have out of bounds coords
          if ((i2 < 0 || j2 < 0) ||
            (i2 >= values.length || j2 >= values[i2].length))
            continue;
          // increment if not a mine
          if (!shouldBeMine(j2, i2)) values[i2][j2] += 1;
        } else {
          // mark as mine
          values[mine.y][mine.x] = MINE;
        }
      }
    }
  }

  return values;
};


class Game {

  // @param { {values: Grid, states: Grid} }
  constructor({values, states}) {
    this._values = values;
    this._states = states;
  }

  get width() {
    return this._values.width;
  }
  get height() {
    return this._values.height;
  }
  get displayGrid() {
    return Grid.reduce(this._values, this._states,
      (val, state) => getCellDisplay(val, state));
  }

  // @param { number } width
  // @param { number } height
  // @param { number } num_mines
  static generate(width, height, num_mines) {
    // Coords[]
    const mines = Coords.generateMany(width, height, num_mines);
    const values_mtx = calculateCellValues({width, height}, mines);
    const values = new Grid(values_mtx);

    // const values = new Grid(width, height, mines);
    const states = Grid.generate(width, height, CellState.Covered);

    return new Game({values, states});
  }
  // static validGameState({values, states}) {}

  toString() {}
}

module.exports = {Game, CellDisplay, CellState, MINE, calculateCellValues};
