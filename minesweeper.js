// const Game = require('./Game');
//
// let game = new Game();
const { Coords } = require('./Coords');
const { Grid, consoleOutputGrid } = require('./Grid');

// Start Up
console.log('Starting Minesweeper');


// M 2 0
// M 3 1
// 1 2 M

let height = 3;
let width = 3;
let mines = [
  new Coords(0,0),
  new Coords(0,1),
  new Coords(2,2)
];
let grid = new Grid(height, width, mines);

console.log(grid.toString());
