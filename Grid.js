const {Coords} = require('./Coords');

const CellState = {
  Swept: 0,
  Covered: 1,
  Flagged: 2,
};

// Value of a Mine in a grid
const MINE = 'M';

// Seeds a two-dimensional array
// @param {width, height} size - size of the matrix
// @param {T} val - OPTIONAL - any value repeat throughout arrays
// @return {T[height][width]} - array of type <T> with size equal to `size`
const seedMatrix = (size, val) => {
  let st = [];
  for (let i = 0; i < size.height; i++) {
    let row = new Array(size.width);
    for (let j = 0; j < size.width; j++) {
      row[j] = val;
    }
    st.push(row);
  }
  return st;
}

// Calculates a value for each cell equal to the number
// of mines are immediately adjacent to each cell
// @param {width, height} size - size of the cell matrix
// @param {Coords[]} mines - an array of coordinate locaitons
//                           for each mine

const calculateCellValues = (size, mines) => {
  let values = seedMatrix(size, 0);

  const isMine = (x, y) => {
    return mines.find((e) => (e.x === x && e.y === y));
  };

  // console.log('---');
  // console.log('size', size);
  // console.log('mines', mines);
  // console.log('values', values, '\n');

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
          if (!isMine(j2, i2)) values[i2][j2] += 1;
        } else {
          // mark as mine
          values[mine.y][mine.x] = MINE;
        }
      }
    }
  }

  return values;
};


//
class Grid {

  // Initialization Methods

  constructor(width, height, mines) {
    this.size = {width, height};
    this.mines = mines;

    // set states to all grid 'covered'
    this._states = seedMatrix(this.size, CellState.Covered);

    // calculate cell values
    this._values = calculateCellValues(this.size, this.mines)
  }

  get values() {
    return this._values;
  }

  get states() {
    return this._states;
  }

  toString() {
    let itemSeparator = ' ',
        rowSeparator = '\n';
    return this.values
      .map((row) => row.join(itemSeparator))
      .join(rowSeparator);
  }

  // @return {CellValue:number}
  getCellValue(coords) {
    return this.values[coords.y][coords.x];
  }

  // @return {CellState:number}
  getCellState(coords) {
    return this.states[coords.y][coords.x];
  }

  // @return {void}
  setCellState(coords, state) {
    this._states[coords.y][coords.x] = state;
  }

  // @return {boolean}
  isCellFlagged(coords) {
    return this.getCellState(coords) === CellState.Flagged;
  }

  // @return {boolean}
  isCellCovered(coords) {
    let st = this.getCellState(coords);
    return st === CellState.Covered
        || st === CellState.Flagged;
  }

  // @return {boolean}
  isCellMine(coords) {
    return this.getCellValue(coords) === MINE;
  }


  // STATIC METHODS

  // @return {Grid}
  static generate(width, height, numMines) {
    // Coords[]
    const mines = Grid.generateMines(width, height, numMines);


    return new Grid(width, height, mines)
  }

  // @return {Coords[]}
  static generateMines(xmax, ymax, num) {
    return Coords.generateMany(xmax, ymax, num);
  }

  // @return {CellValue[width][height]}
  static generateCellValues(width, height, mines_coords) {

    let values = [];

    // construct blank values grid of correct size
    for (let x = 0; x < width; x++) {
      let mine_y_coords = mines_coords.filter(c => c.x === x).map(c => c.y);
      for (let y = 0; y < height; y++) {
        let col = [];
        if (mine_y_coords.indexOf(y) !== -1) {
          col.push(MINE);
        } else {

        }
      }
      values.push(col);
    }


    // for each mine, increment value of each adjacent square



  }


}

module.exports = {Grid, CellState, MINE, calculateCellValues, seedMatrix};
