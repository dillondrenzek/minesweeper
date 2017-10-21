const {Grid, seedMatrix} = require('./Grid');
const {Coords} = require('./Coords');

const MINE = 'M';

const CellState = {
  Covered: 'C',
  Uncovered: 'U',
  Flagged: 'F',
  Triggered: 'X'
}


// Either cell value as a string, or the cell state
const CellDisplay = function(val, state) {
  return (state === CellState.Uncovered) ? val.toString() : state;
};


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
    this._mines = this._getMines();
    this._numMines = this._values.countValue(MINE);
  }

  get width() {
    return this._values.width;
  }

  get height() {
    return this._values.height;
  }

  get remainingFlags() {
    return this._numMines - this._flags.length;
  }

  getCellDisplay(x, y) {
    const val = this._values.get(x,y),
      state = this._states.get(x,y);
    return CellDisplay(val, state);
  }

  getCellDisplayGrid() {
    return Grid.reduce(this._values, this._states,
      (val, state) => CellDisplay(val, state));
  }

  // @param { number } x
  // @param { number } y
  uncover(x, y) {
    let state = this._states.get(x,y);
    let val = this._values.get(x,y);

    // Test for Mine
    if (val === MINE) {
      // Trigger mine
      this._states.set(x,y,CellState.Triggered);
      // Begin game over
      this._gameOver();
      return;
    }

    // if state is Covered
    if (state === CellState.Covered) {

      // set state to uncovered
      this._states.set(x,y, CellState.Uncovered);

      // continue uncovering neighbors
      if (val === 0) {
        // uncover neighbors
        this._uncoverAdjacentCells(x, y);
      }

      // test game over
      let totalUncoveredCells = this._states.countValue(CellState.Uncovered);
      let totalCells = this.width * this.height;
      if (totalUncoveredCells === totalCells - this._numMines) {
        this._gameOver();
        return;
      }
    }
  }

  // @param { number } x
  // @param { number } y
  flag(x, y) {
    let curr = this._states.get(x,y);
    // if current cell is covered
    if (curr === CellState.Covered) {
      // flag cell
      this._flagCell(x, y, true);
      // check if game can be ended
      if (this._checkCorrectFlags()) {
        this._gameOver();
        return;
      }
    } else if (curr === CellState.Flagged) {
      // unflag cell
      this._flagCell(x, y, false);
    }
  }

  toString() {
    return this.displayGrid.toString();
  }



  //
  // Private Methods
  //


  // gets an array of Coords, one for the coords of each Flagged cell
  _getFlags() {
    let flags = [];
    this._states.forEach((state, x, y) => {
      if (state === CellState.Flagged) flags.push(new Coords(x, y));
    });
    return flags;
  }

  // @param {number} x
  // @param {number} y
  // @param {boolean} flag - true if state should be set to Flagged
  //                       - false if state should be set to Covered (unflagged)
  _flagCell(x,y,flag) {
    if (flag) {
      // set that cell to Flagged
      this._states.set(x,y, CellState.Flagged);
      // add flag to array of flags
      this._flags = [new Coords(x,y), ...this._flags];
    } else {
      // set that cell to Covered
      this._states.set(x,y, CellState.Covered);
      // remove flag from array of flags
      this._flags = this._flags.filter((c) => !(c.x === x && c.y === y));
    }
  }

  // gets an array of Coords, one for each Mine cell
  _getMines() {
    let mines = [];
    this._values.forEach((val, x, y) => {
      if (val === MINE) mines.push(new Coords(x, y));
    });
    return mines;
  }

  _gameOver() {
    this._showRemainingMines();
  }

  // unless mine is "triggered", change from covered to MINE
  _showRemainingMines() {
    this._mines.forEach((mine_coord) => {
      let {x, y} = mine_coord;
      let state = this._states.get(x, y);
      if (!(state === CellState.Triggered)) {
        this._states.set(x, y, CellState.Uncovered);
      }
    });
  }

  // checks to see if all flags have been correctly used
  // @return {boolean} true if all flags have correctly flagged all mines
  _checkCorrectFlags() {
    // make sure all flags are used
    if (this.remainingFlags > 0) return false;

    for (let i = 0; i < this._mines.length; i++) {
      let {x, y} = this._mines[i];
      let state = this._states.get(x,y);
      if (state !== CellState.Flagged) {
        return false;
      }
    }
    return true;
  }

  _uncoverAdjacentCells(x, y) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        let x2 = x + dx;
        let y2 = y + dy;

        let inBounds =  (x2 >= 0 && y2 >=  0)
                    && (x2 < this.width && y2 < this.height);
        let notCenter = !(dx === 0 && dy === 0);
        if (inBounds && notCenter) {
          this.uncover(x2, y2);
        }
      }
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
}

module.exports = {Game, CellDisplay, CellState, MINE, calculateCellValues};
