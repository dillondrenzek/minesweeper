const Grid = require('./Grid');

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

  toString() {}
}

module.exports = Game;
