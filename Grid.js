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


//
class Grid {

  // @param { T[][] } matrix
  constructor(matrix) {
    this._matrix = matrix;
  }

  // @return { number }
  get width() {
    return this._matrix[0].length;
  }

  // @return { number }
  get height() {
    return this._matrix.length;
  }

  // @param { number } x
  // @param { number } y
  // @return { T }
  get(x, y) {
    return this._matrix[y][x];
  }

  // @param { number } x
  // @param { number } y
  // @param { T } val
  set(x, y, val) {
    this._matrix[y][x] = val;
  }

  // @param { string } rowSeparator
  // @param { string } itemSeparator
  // @return {string} - representation of the grid
  toString(rowSeparator, itemSeparator) {
    return this._matrix
      .map((row) => row.join(itemSeparator))
      .join(rowSeparator);
  }



  // [UNTESTED]
  forEach(fn) {
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        fn(this.get(j,i), j, i);
      }
    }
  }


  // STATIC METHODS

  // @return {Grid}

  // static generate(width, height, numMines) {
  //   // Coords[]
  //   const mines = Coords.generateMany(width, height, numMines);
  //   return new Grid(width, height, mines)
  // }

}

module.exports = {Grid, CellState, MINE, calculateCellValues, seedMatrix};
