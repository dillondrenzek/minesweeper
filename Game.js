const Grid = require('./Grid');

const CellDisplay = {
  Covered: 'O',
  Flagged: 'F',
  Uncovered: '_'
}

class Game {

  // @param { {values: Grid, states: Grid} }
  constructor({values, states}) {
    this._values = values;
    this._states = states;
  }

  get width() {
    return this._values[0].length;
  }
  get height() {
    return this._values.length;
  }
  get displayGrid() {
    return 
  }
  // constructor(width, height, numMines) {
  //   this.width = width;
  //   this.height = height;
  //   this.numMines = numMines;
  //   this.flags = [];
  // }

  get flagsRemaining() {
    return this.numMines - this.flags.length;
  }

  get cellDisplays() {
    return [[]];
  }

  // static generate(width, height, num_mines) {}
  // static validGameState({values, states}) {}

  toString() {}
}

module.exports = {Game, CellDisplay};
