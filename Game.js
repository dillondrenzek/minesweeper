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
    this._flags = this._getFlags();
    this._numMines = this._values.countValue(MINE);
  }

  _getFlags() {
    let flags = [];
    this._states.forEach((state, x, y) => {
      if (state === CellState.Flagged) flags.push(new Coords(x, y));
    });
    return flags;
  }

  _gameOver() {
    // console.error('GAME OVER');
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
  get remainingFlags() {
    return this._numMines - this._flags.length;
  }

  // @param { number } x
  // @param { number } y
  uncover(x, y) {
    console.log(this._states, this._values);
    let state = this._states.get(x,y);
    let val = this._values.get(x,y);
    if (state === CellState.Covered) {
      // set state to uncovered
      this._states.set(x,y, CellState.Uncovered);
      // if value is a mine
      if (val === MINE) {
        this._states.set(x,y,CellState.Triggered);
        this._gameOver();
        return;
      }
      if (val === 0) {
        // uncover neighbors
        this._uncoverNeighbors(x, y);
      }
    }
  }

  _uncoverNeighbors(x, y) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        let x2 = x + dx;
        let y2 = y + dy;

        let inBounds =  (x2 < 0 || y2 < 0)
                    || (x2 >= this.width || y2 >= this.height);

        if (inBounds) {
          this.uncover(x2, y2);
        }
      }
    }
  }

  // @param { number } x
  // @param { number } y
  flag(x, y) {
    let curr = this._states.get(x,y);
    if (curr === CellState.Covered) {
      this._states.set(x,y, CellState.Flagged);
      this._flags = [new Coords(x,y), ...this._flags];
    } else if (curr === CellState.Flagged) {
      this._states.set(x,y, CellState.Covered);
      this._flags = this._flags.filter((c) => !(c.x === x && c.y === y));
    }
  }







  // @param { number } width
  // @param { number } height
  // @param { number } num_mines
  // @return { Game }
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

  toString() { return this.displayGrid.toString(); }
}

module.exports = {Game, CellDisplay, CellState, MINE, calculateCellValues};
