const Grid = require('./Grid');

const CellDisplay = {
  Covered: 'O',
  Flagged: 'F',
  Uncovered: '_'
}

class Game {


  constructor(width, height, numMines) {
    this.width = width;
    this.height = height;
    this.numMines = numMines;
    this.flags = [];
  }

  get flagsRemaining() {
    return this.numMines - this.flags.length;
  }

  get cellDisplays() {
    return [[]];
  }

  toString() {}
}

module.exports = {Game, CellDisplay};
