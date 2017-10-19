const { Game } = require('./Game');
//
// let game = new Game();
const { Coords } = require('./Coords');
const { Grid, consoleOutputGrid } = require('./Grid');


class Minesweeper {

  constructor(_process) {
    if (!_process) throw new Error('Invalid process');

    // init variables
    this._game = Game.generate(10, 10, 10);

    this.printBoard();

    // bind stdin
    this._process = _process;
    this._process.stdin.on('data', this._handleData.bind(this));
    this._process.stdin.on('end', this._handleEndStream.bind(this));
  }

  printBoard() {
    let first_row = [];

    for (let i = 0; i < this._game.width; i++) {
      first_row.push(i.toString());
    }

    first_row = '  ' + first_row.join(' ');


    let e = this._game.getCellDisplayGrid().toString().split('\n');
    e = [
      first_row,
      ...e.map((row, i) => i + ' ' + row)
    ].join('\n');

    console.log(e);
  }

  _handleData(data) {
    // sanitize
    data = data.toString().replace('\n', '');
    // parse coords
    const input_coords = data.split(' ');
    // play game
    this._game.uncover(parseInt(input_coords[0]), parseInt(input_coords[1]));

    this.printBoard();
  }




  _handleEndStream(data) {

  }

}





// Start Up
console.log('Starting Minesweeper');

let main = new Minesweeper(process);
